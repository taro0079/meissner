#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::process::{Command, Stdio};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct MyMessage {
    field_str: String,
    field_u32: u32,
}

#[tauri::command]
fn command_with_object(message: MyMessage) -> MyMessage {
    let MyMessage {
        field_str,
        field_u32,
    } = message;

    MyMessage {
        field_str: format!("hello {}", field_str),
        field_u32: field_u32 + 1,
    }
}

#[tauri::command]
fn simple_command() {
    println!("I was invoked from JS!");
}

#[tauri::command]
fn command_with_message(message: String) -> String {
    format!("hello {}", message)
}

#[tauri::command]
fn command_with_error(arg: u32) -> Result<String, String> {
    if arg % 2 == 0 {
        Ok(format!("even value {}", arg))
    } else {
        Err(format!("odd value {}", arg))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            simple_command,
            command_with_message,
            command_with_object,
            command_with_error,
            cut_movie
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn cut_movie() {
    let command = |start, end, output| {
        format!(
            "ffmpeg -i ~/input.mp4 -ss {start} -c copy -t {end} {output}",
            start = start,
            end = end,
            output = output
        )
    };
    let start = "00:00:00.0";
    let end = "00:00:05.0";
    let name = "output.mp4";

    let mut ffmpeg = Command::new("/bin/sh")
        .args(&["-c", &command(start, end, name)])
        .stdin(Stdio::piped())
        .spawn()
        .unwrap();

    ffmpeg.wait().unwrap();
}
