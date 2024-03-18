import MapTableRow from "./MapTableRow.jsx";
import {createContext, useContext, useState} from "react";
import Contexts from "../lib/Contexts.ts";
import {timeout} from "../lib/Timeout.js";

const SortContext = createContext();

const TableSortOrders = {
  ASC: "asc",
  DESC: "desc"
};

class TableSortOrder {
  field = 'id';
  order = 'asc';

  constructor(field, order) {
    this.field = field;
    this.order = order;
  }
}

function SortIcon({field, sortOrder}) {
  if (sortOrder.field === field) {
    if (sortOrder.order === TableSortOrders.ASC) {
      return <i className="fa fa-sort-up"></i>;

    } else {
      return <i className="fa fa-sort-down"></i>;
    }
  } else {
    return <i className="fa fa-sort"></i>;
  }
}

function SortableColumn({field, col, children}) {
  const {sortOrder, setSortOrder, db, setDb} = useContext(SortContext);
  const sortTable = (field, sortFn) => {
    return () => {
      console.log(`sorting | current sort: ${sortOrder} | requested sort: ${field}}`);
      const sorted = [...db].sort(sortFn ? sortFn : (a, b) => a[field].localeCompare(b[field]));
      let newOrder = new TableSortOrder(field, TableSortOrders.ASC);
      if (sortOrder.field === field && sortOrder.order === TableSortOrders.ASC) {
        newOrder = new TableSortOrder(field, TableSortOrders.DESC);
        sorted.reverse();
      }
      setDb(sorted);
      setSortOrder(newOrder);
    };
  };
  return <th className={`column col-${col}`} onClick={sortTable(field)}>{children}&nbsp;<SortIcon field={field}
                                                                                                  sortOrder={sortOrder}></SortIcon>
  </th>;
}

function MapTable({db, setDb}) {
  const {selectedEntry, setSelectedEntry} = useContext(Contexts.SelectedEntry);
  const [sortOrder, setSortOrder] = useState(new TableSortOrder("id", TableSortOrders.ASC));
  const contextValue = {sortOrder, setSortOrder, db, setDb};
  const [searchDebounce, setSearchDebounce] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState("");
  console.log(sortOrder);

  if (!db || db.length === 0) {
    return "loading...";
  } else {
    const filtered =db.filter((it) => {
      if (searchCriteria) {
        return [it.id, it.title, it.author, JSON.stringify(it.tags)]
          .reduce((acc, current) => acc || current.toLowerCase().includes(searchCriteria), false);
      }
      return true;
    } );
    return <table style={{borderCollapse: 'collapse', width: "100%"}}>
      <SortContext.Provider value={contextValue}>
        <thead className="p-sticky" style={{top: 0, backgroundColor: "whitesmoke"}}>
          <tr className="columns col-gapless">
            <th className={"column col-9"}></th>
            <th className={"column col-3 "}>
              <form className="form-horizontal">
                <div className="form-group">
                  <label className="col-2" htmlFor="search-box">Filter</label>
                  <input id="search-box"
                         className="col-10"
                         onChange={(event) => {
                           // if (event.target.value.length > 0 && event.target.value.length < 3) return;
                           setSearchDebounce(searchDebounce + 1);
                           const localDebounce = searchDebounce;
                           timeout(1000).then(() => {
                             if (searchDebounce === localDebounce) {
                               setSearchCriteria(event.target.value.toLowerCase());
                               console.log("filter the db... somehow...");
                             }
                           });
                         }}/>
                </div>
              </form>
            </th>
          </tr>
          <tr className="columns col-gapless">
            <SortableColumn col={1} field="id">Name</SortableColumn>
            <SortableColumn col={3} field="title">Title</SortableColumn>
            <SortableColumn col={3} field="author">Author(s)</SortableColumn>
            <th className="column col-1">Source</th>
            <SortableColumn col={1} field={"date"}>Release Date</SortableColumn>
            <th className="column col-2">Tags</th>
            <SortableColumn col={1} field={"user_rating"}> User Rating</SortableColumn>
          </tr>
        </thead>
      </SortContext.Provider>
      <tbody>
        {filtered.map(entry => <MapTableRow key={entry.id} entry={entry} selectedEntry={selectedEntry}
                                     setSelectedEntry={setSelectedEntry}/>)}
      </tbody>
      <tfoot className="p-sticky" style={{bottom: 0, backgroundColor: "whitesmoke"}}>
      {filtered.length} maps {searchCriteria ? `displayed out of ${db.length}` : ""}
      </tfoot>
    </table>;
  }
}

export default MapTable;