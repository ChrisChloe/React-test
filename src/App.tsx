import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import List from './components/List';
import { Context } from "./services/Context";

function App() {

  const [listData, setListData] = useState<any[]>([])

  return (
    <Context.Provider value={{listData, setListData}}>
      <div className="main">
        <div className='searchContainer'>
          <Search />
        </div>
        <div className='listContainer'>
          <List />
        </div>
      </div>
    </Context.Provider >
  );
}

export default App;
