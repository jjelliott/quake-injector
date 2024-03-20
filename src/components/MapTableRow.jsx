import "./MapTableRow.css";

function MapTableRowCell({className, children}) {
  return <td title={children} className={`${className ? className : "table-column"} `}>{children}</td>;
}

function MapTableRow({entry, selectedEntry, setSelectedEntry}) {
  return <tr data-map-id={entry.id}
             className={" entry-row " + ((selectedEntry && selectedEntry.id === entry.id) ? "selected" : "")}
             onClick={() => {
               setSelectedEntry(entry);
             }}>
    <MapTableRowCell className="id-column">{entry.id}</MapTableRowCell>
    <MapTableRowCell>{entry.title}</MapTableRowCell>
    <MapTableRowCell>{entry.author}</MapTableRowCell>
    <MapTableRowCell>Quaddicted</MapTableRowCell>
    <MapTableRowCell>{entry.date}</MapTableRowCell>
    <MapTableRowCell className="tag-column">{entry.tags.join(", ")}</MapTableRowCell>
    <MapTableRowCell>{entry.user_rating}</MapTableRowCell>
  </tr>;
}

export default MapTableRow;