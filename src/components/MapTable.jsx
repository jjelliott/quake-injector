import MapTableRow from "./MapTableRow.jsx";
import {useContext} from "react";
import Contexts from "../lib/Contexts.js";

function MapTable({selectedId, setSelectedEntry}) {

    let db = useContext(Contexts.Database)
    if (!db || db.length === 0){
        return "loading..."
    } else {
        return <table style={{ borderCollapse: 'collapse'}}>
            <thead>
            <tr>
                <th>Name</th>
                <th style={{maxWidth: '10%'}}>Author(s)</th>
                <th>Source</th>
                <th>Release Date</th>
                <th style={{maxWidth: '10%'}}>Tags</th>
            </tr>
            </thead>
            <tbody>
            {db.map(entry => <MapTableRow entry={entry} selected={selectedId && selectedId === entry.id} setSelectedEntry={setSelectedEntry}/>)}
            </tbody>

        </table>
    }
}

export default MapTable;