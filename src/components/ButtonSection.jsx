import {Button, InputGroupButton} from "./spectre/Button.jsx";
import Contexts from "../lib/Contexts.ts";
import {useContext, useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";


function ButtonSection() {
  const {selectedEntry: currentSelection} = useContext(Contexts.Database);
  const [selectedMap, setSelectedMap] = useState("");
  useEffect(() => {
    if (currentSelection)
      setSelectedMap(currentSelection.maps ? currentSelection.maps[0] : currentSelection.id);
  }, [currentSelection]);
  if (currentSelection) {
    return <div>
      <div className="input-group">
        <Button color="primary" block={true}>Install</Button>
      </div>
      <div className="input-group">
        <select className="form-input" onChange={ev => {
          setSelectedMap(ev.target.value);
        }}>
          {currentSelection.maps ? currentSelection.maps.map(map => <option key={map}>{map}</option>) :
            <option>{currentSelection.id}</option>}
        </select>
        <InputGroupButton color="success" onClick={() => {
          // TODO: invoke("launch_map")
          console.log("calling launch...");
          invoke("launch_map", {packageId: currentSelection.id, source: currentSelection.source, mapName: selectedMap});
        }}>Play</InputGroupButton>
      </div>
    </div>;
  } else {
    return <></>;
  }
}

export default ButtonSection;