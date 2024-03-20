// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


mod map_source;
mod img;
mod quaddicted;

use map_source::{get_db};
use img::{get_image};
use std::process::Command;


#[tauri::command]
fn launch_map(package_id: String, map_name: String){
    println!("loading {} from {}", map_name, package_id);
    Command::new("C:\\Games\\Quake\\ironwail.exe").current_dir("C:\\Games\\Quake").arg(format!("+map {}", map_name))
      .output().expect("failed to launch");
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_db, get_image, launch_map])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
