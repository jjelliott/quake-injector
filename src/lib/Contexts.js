import {invoke} from "@tauri-apps/api/tauri";
import {createContext} from "react";

let db;

function fetch() {
    if (!db) db = invoke("get_db");
    return db;
}



const DbContext = createContext();
const CurrentEntryContext = createContext();

const Contexts = {
    fetch, Database:DbContext, CurrentEntry: CurrentEntryContext
}


export default Contexts;