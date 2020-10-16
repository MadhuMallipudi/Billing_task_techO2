import React from 'react';
import './App.css';
import Items from "./components/Items";
import NewBill from "./components/NewBill";
import MyBills from "./components/MyBills";
import Sales from "./components/sales";
function App() {
  return (
    <div className="App">
      <div className="container">
        <div style={{display:"flex"}}>
          <NewBill/>
          <Items/>
        </div>
        <div style={{display:"flex"}}>
          <MyBills/>
          <Sales/>
        </div>
      </div>
    </div>
  );
}

export default App;
