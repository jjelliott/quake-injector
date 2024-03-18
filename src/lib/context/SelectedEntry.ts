import {DbEntry} from "../models/DbEntry";

export type SelectedEntry = {
  selectedEntry: DbEntry | undefined;
  setSelectedEntry: (entry: DbEntry) => void;
};