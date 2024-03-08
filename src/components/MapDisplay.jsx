import Contexts from '../lib/Contexts.js';
import { useContext } from 'react';

function MapDisplay(props) {

	const currentEntry = useContext(Contexts.CurrentEntry);

	if (currentEntry) {
		return <div>
			<b>{currentEntry.title}</b>
			<p style={{maxHeight:"10%", overflowY: "scroll"}} dangerouslySetInnerHTML={{__html:currentEntry.description}}/>

		</div>
	} else {
		return <p>No map selected</p>
	}
}

export default MapDisplay;