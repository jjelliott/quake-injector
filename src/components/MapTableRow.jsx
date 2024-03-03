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
        <MaxSizeColumn>{entry.author}</MaxSizeColumn>
        <td>Quaddicted</td>
        <td>{entry.date}</td>
        <MaxSizeColumn>{entry.tags.join(", ")}</MaxSizeColumn>
    </tr>
}

export default MapTableRow;