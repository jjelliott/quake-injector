import "./MapTableRow.css"

function MaxSizeColumn(props){
    return <td style={{maxWidth: '10%'}}>{props.children}</td>
}
function MapTableRow({entry, selected, setSelectedEntry}) {
    return <tr data-map-id={entry.id} className={selected ? "selected" : ""} onClick={() => {
        console.log("changed")
        setSelectedEntry(entry);
    }}>
        <td>{entry.title}</td>
        <td className="author-column">{entry.author}</td>
        <td>Quaddicted</td>
        <td>{entry.date}</td>
        <td className="tag-column">{entry.tags.join(", ")}</td>
    </tr>
}

export default MapTableRow;