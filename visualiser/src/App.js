import React, { useState, useRef, useEffect } from 'react';
import LinkedListAnimation from './Animation/LinkedList/linkedListAnimation';

function App() {

  // Setting up the list animation instance with default values
  const defaultListValues = [2, 3, 4, 5];
  const [list, setList] = useState();
  const nodesGroupRef = useRef();
  const pointersGroupRef = useRef();
  useEffect(() => {
    const newList = new LinkedListAnimation(defaultListValues ,nodesGroupRef.current, pointersGroupRef.current)
    setList(newList);
  }, []);

  // Managing user input from the forms
  const [valueAppended, setValueAppended] = useState("");
  const [indexDeleted, setIndexDeleted] = useState("");

  const handleAppend = (e) => {
    e.preventDefault();
    list && list.animateAppend(parseInt(valueAppended));
  }

  const handleDelete = (e) => {
    e.preventDefault();
    list && list.animateDelete(parseInt(indexDeleted));
  }

  return (
    <div classname="App">
      <header classname="App-header">
        <form className="list-append-form" onSubmit={handleAppend}>
          <input name="value" placeholder="number to append" value={valueAppended} onChange={e => setValueAppended(e.target.value)}/>
          <button type="submit" name="append">append</button>
        </form>
        <form className="list-delete-form" onSubmit={handleDelete}>
          <input name="index" placeholder="position to delete" value={indexDeleted} onChange={e => setIndexDeleted(e.target.value)} />
          <button type="submit" name="delete">delete </button>
        </form>
        <div className="visualiser">
          <svg className="visualiser-svg" overflow="auto" style={{ width: '100%' }}>
            <g ref={nodesGroupRef} className="nodes" transform="translate(0, 20)"/>
            <g ref={pointersGroupRef} className="pointers" transform="translate(0, 20)" />
          </svg>
        </div>
      </header >
    </div >
  );
}

export default App;
