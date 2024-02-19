use std::io::Read;
use std::os::windows::fs::MetadataExt;
use serde_derive::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Debug)]
struct Files {
    #[serde(rename = "file")]
    files: Vec<SlimmedFile>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct File {
    id: String,
    author: String,
    title: String,
    date: String,
    description: String,
    tags: Option<TagList>,
}

#[derive(Serialize, Deserialize, Debug)]
struct ValueOnlyTag {
    #[serde(rename(deserialize = "$value"))]
    content: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(from = "File")]//, into = "File")]
pub struct SlimmedFile {
    id: String,
    author: String,
    title: String,
    date: String,
    description: String,
    #[serde(default)]
    tags: Vec<String>,
}

// impl Into<File> for SlimmedFile {
//     fn into(self) -> File {
//        File {
//            id: self.id,
//            author: self.author,
//            title: self.title,
//            date: self.date,
//            description: self.description,
//            tags: TagList { tag: self.tags}
//        }
//     }
// }

impl From<File> for SlimmedFile {
    fn from(value: File) -> Self {
        SlimmedFile {
            id: value.id,
            author: value.author,
            title: value.title,
            date: value.date,
            description: value.description,
            tags: value.tags.unwrap_or(TagList {
                tag: Vec::new()
            }).tag,
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
//     let fake_records: Files = serde_xml_rs::from_str(r##"<?xml version="1.0" encoding="UTF-8"?>
// <files>can'
// <file id="002blue" type="1" rating="" normalized_users_rating="3.03">
// 	<author>sodalimonada176</author>
// 	<title>Blue Is The Darkest Shade</title>
// 	<md5sum>922c3f80b8b0df8a3a97f97043462f12</md5sum>
// 	<size>593</size>
// 	<date>08.10.2022</date>
// 	<description><![CDATA[Small blue medieval castle map for vanilla Quake.<br /><br />
//
// <i>"Since this is my second map, i decided to experiment more on the Z-axis with rooms on top of rooms and splitting paths. Still kinda small though, have fun =)"</i>]]></description>
// 	<tags>
// 		<tag>small</tag>
// 		<tag>medieval</tag>
// 		<tag>castle</tag>
// 		<tag>classic</tag>
// 		<tag>vanilla</tag>
// 		<tag>id1</tag>
// 	</tags>
// 	<techinfo>
// 		<zipbasedir>id1/maps/</zipbasedir>
// 		<startmap>blue</startmap>
// 	</techinfo>
// </file>
// <file id="1000cuts1a" type="2" rating="5" normalized_users_rating="4.23">
// 	<author>sock</author>
// 	<title>One Thousand Cuts</title>
// 	<md5sum>8e03d6c9202136c89d99707ab97a1020</md5sum>
// 	<size>10396</size>
// 	<date>15.08.2014</date>
// 	<description><![CDATA[Expanded standalone version of sock's map from <a href="func_mapjam2.html">Func Map Jam 2</a>: a medium-sized, IKblue-themed, partially ruined temple with two individual routes for replayablility. It comes with a set of medieval-style item boxes.]]></description>
// 	<tags>
// 		<tag>ikblue</tag>
// 		<tag>castle</tag>
// 		<tag>nonlinear</tag>
// 		<tag>super secret</tag>
// 		<tag>skybox</tag>
// 		<tag>fs</tag>
// 		<tag>episode</tag>
// 	</tags>
// 	<techinfo>
// 		<zipbasedir>1000cuts/</zipbasedir>
// 		<commandline>-game 1000cuts</commandline>
// 		<startmap>start</startmap>
// 	</techinfo>
// </file>
// </files>
//     "##).unwrap();
    // println!("{fake_records:?}");
    // return fake_records.files;
    let mut file = std::fs::File::options().create(true).read(true).write(true).open(format!("./cache/db.xml")).unwrap();
    println!("{}", file.metadata().unwrap().last_write_time());
    // println!("{}", std::time::UNIX_EPOCH.elapsed().unwrap().as_millis() - u128::from(file.metadata().unwrap().last_write_time()) );
    // if file.metadata().unwrap().last_write_time() == 0 {
    download_db();
    // }
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