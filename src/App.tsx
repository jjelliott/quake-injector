import {useEffect, useState} from "react";
import "./App.scss";
import Contexts from "./lib/Contexts";
import MapTable from "./components/MapTable";
import MapDisplay from './components/MapDisplay';
import ButtonSection from "./components/ButtonSection";
import {DbEntry} from "./lib/models/DbEntry";

function App() {

  const [db, setDb] = useState<DbEntry[]>();
  const [selectedEntry, setSelectedEntry] = useState<DbEntry>();

  useEffect(() => {
    Contexts.fetch().then((loaded: DbEntry[]) => {
      setDb(loaded);
    });
  }, []);

  return <Contexts.Database.Provider value={{db, setDb, selectedEntry, setSelectedEntry}}>
    <div id='page-body' className='container' style={{padding: "0"}}>
      <div className='columns col-gapless'>
        <div id='table-column' className='column col-9 col-md-8'>
          <MapTable/>
        </div>
        <div id='display-column' className='column col-3 col-md-4'>
          <MapDisplay/>
          <ButtonSection/>
        </div>
      </div>
    </div>
  </Contexts.Database.Provider>;
}

export default App;
