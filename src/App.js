import React ,{Component} from 'react';
import './App.css';
import Items from "./components/Items";
import NewBill from "./components/NewBill";
import MyBills from "./components/MyBills";
import Sales from "./components/sales";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      check : false
    }    
  }
  updateMyBill = (val) => {
    this.setState({check:val})
  }
  render(){
    return (
      <div className="App">
        <div className="container" style={{marginTop:"5%"}}>
          <div style={{display:"flex"}}>
            <NewBill billsupdate={this.updateMyBill}/>
            <Items/>
          </div>
          <div style={{display:"flex"}}>
            <MyBills updateList = {this.state.check} />
            <Sales updateList = {this.state.check} />
          </div>
        </div>
      </div>
    );
  }
}


