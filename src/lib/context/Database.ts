import {DbEntry} from "../models/DbEntry";

export type Database = {
  db: DbEntry[] | undefined;
  setDb: (db: DbEntry[]) => void;
  selectedEntry: DbEntry | undefined;
  setSelectedEntry: (entry: DbEntry) => void;
};