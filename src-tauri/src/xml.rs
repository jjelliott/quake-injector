use std::io::Read;
use std::time::{SystemTime, UNIX_EPOCH};
//use std::os::windows::fs::MetadataExt;
use serde_derive::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Debug)]
struct Files {
  #[serde(rename = "file")]
  files: Vec<SlimmedFile>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct QuaddictedXmlFile {
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

#[derive(Serialize, Deserialize, Debug)]
struct ValueOnlyTag {
  #[serde(rename(deserialize = "$value"))]
  content: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(from = "QuaddictedXmlFile")]//, into = "File")]
pub struct SlimmedFile {
  id: String,
  author: String,
  title: String,
  date: String,
  description: String,
  user_rating: String,
  #[serde(default)]
  tags: Vec<String>,
  maps: Option<Vec<String>>,
}

impl From<QuaddictedXmlFile> for SlimmedFile {
  fn from(value: QuaddictedXmlFile) -> Self {
    let split_date : Vec<&str>= value.date.split(".").collect();

    SlimmedFile {
      id: value.id,
      author: value.author,
      title: value.title,
      date: format!("{}-{}-{}", split_date[2], split_date[1], split_date[0]),
      description: value.description,
      user_rating: value.user_rating,
      tags: value.tags.unwrap_or(TagList {
        tag: Vec::new()
      }).tag,
      maps: value.techinfo.startmap,
    }
  }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct TagList {
  #[serde(default)]
  tag: Vec<String>,
}

#[tauri::command]
pub fn get_db() -> Vec<SlimmedFile> {
  let mut file = std::fs::File::options().read(true).open(format!("./cache/db.xml")).unwrap();
  println!("{}", SystemTime::now().duration_since(file.metadata().unwrap().modified().unwrap()).unwrap().as_secs());
  if SystemTime::now().duration_since(file.metadata().unwrap().modified().unwrap()).unwrap().as_secs() > 21600 {
    download_db();
  }
  println!("reading file");
  let mut str: String = String::from("");
  file.read_to_string(&mut str).expect("TODO: panic message");
  let records: Files = serde_xml_rs::from_str(&mut str).unwrap();
  return records.files;
}

fn download_db() {
  let mut file = std::fs::File::options().create(true).read(true).write(true).open(format!("./cache/db.xml")).unwrap();
  println!("db empty, calling quaddicted");
  let mut response = reqwest::blocking::get("https://quaddicted.com/reviews/quaddicted_database.xml").unwrap();
  println!("got image, copying to file");
  response.copy_to(&mut file).unwrap();
  println!("file populated");
}
