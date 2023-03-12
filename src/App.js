import { useEffect, useState } from 'react';
import { Tree } from 'react-arborist';
import fileimg from './assets/file.svg'
import folderimg from './assets/folder.svg'

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];

function App() {
  const [term,setTerm] = useState()
  const [datafetch,setData] = useState()
  useEffect(() =>{
      fetch('app.json')
      .then(data => data.json())
        .then(data => setData(data))
  },[])

  return (
    <div className="treeComponent">
      <div className="input-container">
        <input type="text" value={term} onChange={(event) => setTerm(event.target.value)} />
        <label htmlFor="">Search</label>
      </div>
    {datafetch && 
    
    <Tree
    initialData={datafetch}
    openByDefault={false}
    width={600}
    height={1000}
    indent={24}
    rowHeight={36}
    overscanCount={1}
    paddingTop={30}
    paddingBottom={10}
    padding={25 /* sets both */}
    searchTerm={term}
    searchMatch={
      (node, term) => node.data.name.toLowerCase().includes(term.toLowerCase())
    }
  >
    {Node}
  </Tree>
    }  

    </div>
  );
}

function Node({ node, style, dragHandle }) {
  /* This node instance can do many things. See the API reference. */
  let file =  <img src={fileimg}/>
  let folder =  <img src={folderimg}/>
  return (
    <div className="node-tree" onClick={() => node.toggle()} style={style} ref={dragHandle}>
      {node.isLeaf ? file : folder}
      {node.data.name}
    </div>
  );
}

export default App;
