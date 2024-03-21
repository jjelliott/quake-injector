import Contexts from '../lib/Contexts.ts';
import {useContext, useEffect, useState} from 'react';
import {Button} from "./spectre/Button.jsx";
import {navigate} from "../lib/QuaddictedLink.js";

function ConditionallyShow({condition, children}) {
  return <div className={!condition ? "hide" :""}>{children}</div>;
}

function MapDisplay() {

  const {selectedEntry} = useContext(Contexts.Database);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    if (selectedEntry) {
      console.log(selectedEntry.image_urls);
      setImgLoading(true);
      setImgFailed(false);
    }
  }, [selectedEntry]);

  if (selectedEntry) {
    return <div>
      <Button color="link" block={true}
              onClick={() => navigate(selectedEntry.id + ".html")}>{selectedEntry.title}</Button>

      <ConditionallyShow condition={!imgLoading}>
        <img onLoad={() => setImgLoading(false)}
             onError={() => setImgFailed(true)}
             alt={`Preview image for ${selectedEntry.title}`}
             style={{width: "100%"}}
             src={selectedEntry.image_urls[0]}/>
      </ConditionallyShow>
      <ConditionallyShow condition={imgFailed}>
        <p>No map preview image available</p>
      </ConditionallyShow>
      <ConditionallyShow condition={imgLoading && !imgFailed}>
        <i className="fa fa-spinner fa-pulse fa-3x"></i>
      </ConditionallyShow>

      <p style={{maxHeight: "25vh", overflowY: "scroll", marginTop: '5px'}}
         dangerouslySetInnerHTML={{__html: selectedEntry.description}}/>

    </div>;
  } else {
    return <p>No map selected</p>;
  }
}

export default MapDisplay;