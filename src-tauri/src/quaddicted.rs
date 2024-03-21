use std::fs;
use std::fs::File;
use std::io::Read;
use std::time::SystemTime;
use base64::Engine;
use base64::prelude::BASE64_STANDARD;
use reqwest::StatusCode;

use serde_derive::{Deserialize, Serialize};

use crate::map_source::{MapPackage, MapSource};

fn get_image_link(map_id: &String) -> String {
  return format!("https://quaddicted.com/reviews/screenshots/{}.jpg", map_id);
}

#[derive(Serialize, Deserialize, Debug)]
struct QuaddictedPackageList {
  #[serde(rename = "file")]
  files: Vec<QuaddictedXmlFile>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
// #[serde(into = "MapPackage")]
struct QuaddictedXmlFile {
  id: String,
  author: String,
  title: String,
  date: String,
  description: String,
  #[serde(alias = "normalized_users_rating")]
  user_rating: String,
  tags: Option<TagList>,
  techinfo: TechInfo,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct TechInfo {
  startmap: Option<Vec<String>>,
  zipbasedir: Option<String>,
  commandline: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct TagList {
  #[serde(default)]
  tag: Vec<String>,
}

impl From<QuaddictedXmlFile> for MapPackage {
  fn from(value: QuaddictedXmlFile) -> Self {
    let split_date: Vec<&str> = value.date.split(".").collect();
    let img_link = get_image_link(&value.id);
    MapPackage {
      id: value.id,
      author: value.author,
      title: value.title,
      date: format!("{}-{}-{}", split_date[2], split_date[1], split_date[0]),
      description: value.description,
      user_rating: value.user_rating,
      image_urls: Option::from(vec![img_link]),
      tags: value.tags.unwrap_or(TagList {
        tag: Vec::new()
      }).tag,
      maps: value.techinfo.startmap,
      source: String::from("Quaddicted"),
    }
  }
}
// impl Into<MapPackage> for QuaddictedXmlFile {
//   fn into(self) -> MapPackage {
//     let split_date: Vec<&str> = self.date.split(".").collect();
//
//     MapPackage {
//       id: self.id,
//       author: self.author,
//       title: self.title,
//       date: format!("{}-{}-{}", split_date[2], split_date[1], split_date[0]),
//       description: self.description,
//       user_rating: self.user_rating,
//       tags: self.tags.unwrap_or(TagList {
//         tag: Vec::new()
//       }).tag,
//       maps: self.techinfo.startmap,
//       source: String::from("Quaddicted")
//     }
//   }
// }

pub struct Quaddicted {}

impl Quaddicted {
  fn download_db(&self) {
    let mut file = std::fs::File::options().create(true).read(true).write(true).open(format!("./cache/quaddicted_db.xml")).unwrap();
    println!("db empty, calling quaddicted");
    let mut response = reqwest::blocking::get("https://quaddicted.com/reviews/quaddicted_database.xml").unwrap();
    println!("got image, copying to file");
    response.copy_to(&mut file).unwrap();
    println!("file populated");
  }

  fn download_image(&self, map_id: String) {
    let mut path = format!("./cache/quaddicted_{}.jpg", map_id);
    let mut file = File::options().create(true).read(true).write(true).open(&mut path).unwrap();
    println!("image empty, calling quaddicted");
    let mut response = reqwest::blocking::get(format!("https://quaddicted.com/reviews/screenshots/{}.jpg", map_id)).unwrap();
    println!("got image, copying to file");
    if response.status() == StatusCode::OK {
      response.copy_to(&mut file).unwrap();
      println!("file populated");
    } else {
      fs::remove_file(path).expect("TODO: panic message");
    }
  }
}

impl MapSource for Quaddicted {
  fn get_packages(&self) -> Vec<MapPackage> {
    let mut file_result = std::fs::File::options().read(true).open(format!("./cache/quaddicted_db.xml"));
    if file_result.is_err() {
      self.download_db();
      file_result = std::fs::File::options().read(true).open(format!("./cache/quaddicted_db.xml"));
    }
    let mut file = file_result.unwrap();
    if SystemTime::now().duration_since(file.metadata().unwrap().modified().unwrap()).unwrap().as_secs() > 21600 {
      self.download_db();
      file_result = std::fs::File::options().read(true).open(format!("./cache/quaddicted_db.xml"));
      file = file_result.unwrap();
    }
    println!("reading file");
    let mut str: String = String::from("");
    file.read_to_string(&mut str).expect("TODO: panic message");
    let records: QuaddictedPackageList = serde_xml_rs::from_str(&mut str).unwrap();
    return records.files.iter().map(|record| MapPackage::from(record.to_owned())).collect();
  }

  fn get_source(&self) -> String {
    return String::from("Quaddicted");
  }
}

