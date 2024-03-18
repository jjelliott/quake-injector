import {Button, InputGroupButton} from "./spectre/Button.jsx";
import Contexts from "../lib/Contexts.ts";
import {useContext, useEffect, useState} from "react";


function ButtonSection() {
  const {selectedEntry: currentSelection} = useContext(Contexts.SelectedEntry);
  const [selectedMap, setSelectedMap] = useState();
  useEffect(() => {
    if (currentSelection)
      setSelectedMap(currentSelection.maps ? currentSelection.maps[0] : currentSelection.id);
  }, [currentSelection]);
  console.log(selectedMap);
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
        }}>Play</InputGroupButton>
      </div>
    </div>;
  } else {
    return <></>;
  }
}

export default ButtonSection;