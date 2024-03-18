import "./MapTableRow.css";
function MapTableRow({entry, selectedEntry, setSelectedEntry}) {
  return <tr data-map-id={entry.id} className={"columns col-gapless entry-row " + ((selectedEntry && selectedEntry.id === entry.id) ? "selected" : "")} onClick={() => {
    console.log("changed");
    setSelectedEntry(entry);
  }}>
    <td className="table-column column col-1">{entry.id}</td>
    <td className="table-column column col-3">{entry.title}</td>
    <td className="table-column column col-3">{entry.author}</td>
    <td className="table-column column col-1">Quaddicted</td>
    <td className="table-column column col-1">{entry.date}</td>
    <td className="tag-column column col-2">{entry.tags.join(", ")}</td>
    <td className="table-column column col-1">{entry.user_rating}</td>
  </tr>;
}

export default MapTableRow;