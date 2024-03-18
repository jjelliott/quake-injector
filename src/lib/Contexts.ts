import {invoke} from "@tauri-apps/api/tauri";
import {createContext} from "react";
import {SelectedEntry} from "./context/SelectedEntry";
import {DbEntry} from "./models/DbEntry";

let db: Promise<DbEntry[]>;

function fetch() {
  if (!db) db = invoke<DbEntry[]>("get_db");
  return db;
}


const DbContext = createContext({
  db: [], setDb: () => {
  }
});
const SelectedEntryContext = createContext<SelectedEntry>({selectedEntry: null, setSelectedEntry: ()=>{}});

const Contexts = {
  fetch, Database: DbContext, SelectedEntry: SelectedEntryContext
};


export default Contexts;