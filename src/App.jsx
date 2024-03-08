import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import "./App.css";
import Contexts from "./lib/Contexts.js";
import MapTable from "./components/MapTable.jsx";
import MapDisplay from './components/MapDisplay.jsx';
import ButtonSection from "./components/ButtonSection.jsx";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");
    const [db, setDb] = useState();
    const [selectedEntry, setSelectedEntry] = useState();

    useEffect(() => {
        Contexts.fetch().then(setDb);
        console.log(db)
    }, []);

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", {name}));
    }

    return (
        <Contexts.Database.Provider value={db}>
            <Contexts.CurrentEntry.Provider value={selectedEntry}>
                <div id='page-body' className='container'>
                    <div className='columns'>
                        <div id='table-column' className='column col-9'>
                            <MapTable selectedId={selectedEntry ? selectedEntry.id : null}
                                      setSelectedEntry={setSelectedEntry}/>
                        </div>
                        <div id='display-column' className='column col-3'>
                            <MapDisplay/>
                            <ButtonSection/>
                        </div>
                    </div>
                </div>
            </Contexts.CurrentEntry.Provider>
        </Contexts.Database.Provider>
    );
}

export default App;
