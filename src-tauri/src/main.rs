// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


mod xml;
mod img;
use xml::{get_db};
use img::{get_image};
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_db, get_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
