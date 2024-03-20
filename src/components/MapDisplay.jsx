import Contexts from '../lib/Contexts.ts';
import {useContext, useEffect, useState} from 'react';
import {Button} from "./spectre/Button.jsx";
import {invoke} from "@tauri-apps/api/tauri";
import {navigate} from "../lib/QuaddictedLink.js";

function MapDisplay() {

  const [img, setImg] = useState();
  const {selectedEntry} = useContext(Contexts.Database);
  const [imgLoading, setImgLoading] = useState(false);

  useEffect(() => {
    if (selectedEntry) {
      setImgLoading(true);
      invoke("get_image", {mapId: selectedEntry.id}).then(imgReturn => {
        setImgLoading(false);
        setImg(imgReturn);
      });
    }
  }, [selectedEntry]);

  if (selectedEntry) {
    return <div>
      <Button color="link" block={true} onClick={() => navigate(selectedEntry.id + ".html")}>{selectedEntry.title}</Button>
      {!imgLoading
        ? (
          img
            ? <img alt={`Preview image for ${selectedEntry.title}`} style={{width: "100%"}}
                   src={`data:image/jpeg;base64, ${img}`}/>
            : <p>No preview available</p>
        )
        : <i className="fa fa-spinner fa-pulse fa-3x"></i>
      }
      <p style={{maxHeight: "25vh", overflowY: "scroll", marginTop: '5px'}}
         dangerouslySetInnerHTML={{__html: selectedEntry.description}}/>

    </div>;
  } else {
    return <p>No map selected</p>;
  }
}

export default MapDisplay;