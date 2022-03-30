import React, { useEffect, useState } from 'react';
import './App.css';

const getLocalData = ()=>{
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}

function App() {
  const [inputData,setinputData] = useState("");
  const [items,setItems] = useState(getLocalData());
  const [toggleButton,setToggleButton] = useState(false);
  const [isEditItem, setIsEditItem] = useState("")

  // Adding new item
  const addItem = ()=>{
    if(!inputData){
      alert('plz fill the data');
    }else if(isEditItem && toggleButton){
      setItems(
        items.map(item =>{
            if(item.id===isEditItem){
              return {...item, name: inputData};
            }
            return item;
        })
      )
      setinputData("");
      setToggleButton(false);
      setIsEditItem("")
    }
    else{
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items,myNewInputData])
      setinputData("")
    }
  }
  // Edit item
  const editItem = key => {
      let editData = items.find(item=>item.id===key)
      setinputData(editData.name);
      setToggleButton(true);
      setIsEditItem(key);
  }


  // Remove specfic item
  const removeItem = key =>{ 
      const updatedItems = items.filter(item=>item.id!==key)
      setItems(updatedItems)
  }

  useEffect(()=>{
      localStorage.setItem("mytodolist",JSON.stringify(items))
  },[items])

  return (
    <>
      <div className="main-div">
          <div className="child-div">
              <figure>
                <img src="images/todo.svg" alt="todologo" />
                <figcaption>Add Your List Here &#9996;</figcaption>
              </figure>
              {/* adding items */}
              <div className="addItems">
                <input type="text" 
                  placeholder="&#9997; Add Item"
                  onChange={(event)=>setinputData(event.target.value)}
                  value={inputData}
                />
                {
                  toggleButton?<i className="fa fa-edit add-btn" onClick={addItem}></i>:<i className="fa fa-plus add-btn" onClick={addItem}></i>
                }
                
              </div>
              {/* show all items */}
                 <div className="showItems">   
                   {
                     items.map( item =>    
                     <div className="eachItem" key={item.id}>
                     <h3>{item.name}</h3>
                     <div className="todo-btn">
                     <i className="far fa-edit" onClick={()=>editItem(item.id)}></i>
                     <i className="far fa-trash-alt" onClick={()=>removeItem(item.id)}></i>
                     </div>
                   </div>)
                   }   
                 </div>


              {/* remove all items */}
              <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={()=>setItems([])}>
                  <span>CHECK LIST</span>
                </button>
              </div>

          </div>
      </div>
    </>
  );
}

export default App;
