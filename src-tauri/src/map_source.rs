//use std::os::windows::fs::MetadataExt;
use serde_derive::{Deserialize, Serialize};

use crate::quaddicted::Quaddicted;

pub trait MapSource {
  fn get_packages(&self) -> Vec<MapPackage>;
  fn get_source(&self) -> String;
}

// #[derive(Serialize, Deserialize, Debug)]
// pub struct PackageList {
//   #[serde(rename = "file")]
//   files: Vec<MapPackage>,
// }

#[derive(Serialize, Deserialize, Debug, Clone)]
// #[serde(from = "QuaddictedXmlFile")]//, into = "File")]
pub struct MapPackage {
  pub(crate) id: String,
  pub(crate) author: String,
  pub(crate) title: String,
  pub(crate) date: String,
  pub(crate) description: String,
  pub(crate) user_rating: String,
  pub(crate) source: String,
  pub(crate) image_urls: Option<Vec<String>>,
  #[serde(default)]
  pub(crate) tags: Vec<String>,
  pub(crate) maps: Option<Vec<String>>,
}

#[tauri::command]
pub fn get_db() -> Vec<MapPackage> {
  let sources = &vec![Quaddicted {}];
  let mut packages = vec![];
  for source in sources.iter() {
    packages.append(source.get_packages().as_mut());
  }

  return packages;
}

