use std::fs::File;
use std::io::Read;

#[tauri::command]
pub fn get_image(map_id: String) -> String {
    println!("getting img for {}", map_id);
    // File::options().create(true).open("./cache").expect("could not create cache directory");
    let mut file = File::options().create(true).read(true).write(true).open(format!("./cache/{}.jpg", map_id)).unwrap();
    if file.metadata().unwrap().len() == 0 {
        download_image(map_id)
    }
    println!("reading file");
    let mut file_contents: Vec<u8> = Vec::new();
    file.read_to_end(&mut file_contents).expect("unable to read file contents");
    println!("file read, returning...");
    return base64::encode(&mut file_contents);
}

fn download_image(map_id: String) {
    let mut file = File::options().create(true).read(true).write(true).open(format!("./cache/{}.jpg", map_id)).unwrap();
    println!("image empty, calling quaddicted");
    let mut response = reqwest::blocking::get(format!("https://quaddicted.com/reviews/screenshots/{}.jpg", map_id)).unwrap();
    println!("got image, copying to file");
    response.copy_to(&mut file).unwrap();
    println!("file populated");
}