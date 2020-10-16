import React,{Component} from 'react';
import axios from "axios";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Item extends Component {
    constructor(props){
        super(props);
        this.state ={
            name:"",
            price:"",
            errMsg:"",
            itemList:[]
        }
    }
    componentDidMount = async () => {
        await this.listItem();
    }
    listItem =  async () => {
        let result = await axios.get("http://localhost:3001/items/listItems");
        console.log("result",result);
        if(result.status == 200){
            this.setState({itemList:result.data.data});
        } else {
            this.setState({itemList:[]});
        } 
    }
    addItem  = async () => {
       const  {name, price} = this.state;
       if((name == "") && (price == 0 || price == "") ){
            this.setState({errMsg:"name should not empty, and price should not empty or 0"});
       } 
       try {
            let result =  await axios.post("http://localhost:3001/items/addItems",{name,price});
            if(result && result.status ==  200){
              alert('saved success');  
            } else {
              alert("failed");
            }
            this.listItem();
            this.btnElement.click();
            this.setState({name:"",price:""});
       } catch(ex) {
           console.log("Exxx",ex);
       }
    }
    render(){
        const { errMsg ,itemList} = this.state;
        const list = (itemList || [] ).map((item,index)=> {
            return (
                    <div key={index} style={{justifyContent:"center",border:'1px solid #eee',marginBottom:'10px',padding:'5px'}}>
                        <div className="text-left">
                            <span>{item.name}</span>
                        </div>
                        <div className="text-right">
                            <span>Rs:{item.price}</span>
                        </div>
                    </div>
            );
       });
        return(
            <div className="card" style ={{width:'500px',height:"300px",overflowY:"auto"}}>
                <div className="card-body">
                    <h6 className="card-title text-left">Items</h6>
                       { list }
                </div>
                <div className="text-right">
                    <FontAwesomeIcon icon= {faPlusCircle} style={{marginRight: '20px',marginBottom: '20px',cursor: "pointer"}} data-toggle="modal" data-target="#myModal" />
                    <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Item</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control"  placeholder="Name" name="name" value={this.state.name} onChange = {(e) => { this.setState({name:e.target.value})}} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control"  placeholder="Price" name="price" value ={this.state.price} onChange = {(e) => { this.setState({price:e.target.value})}} />
                                    </div>
                                    <p style={{color:"red",fontSize:'10px'}}>{errMsg ? errMsg : ""}</p>
                                    <button type="button" className="btn btn-default" onClick = {this.addItem}>Add</button>
                                    <button type="button" className="btn btn-default" data-dismiss="modal" ref={btn => this.btnElement = btn}>Close</button>
                                </form>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}