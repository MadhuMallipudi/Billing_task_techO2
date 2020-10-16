import React,{Component} from 'react';
import axios from "axios";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class NewBill extends Component {
    constructor(props){
        super(props);
        this.state ={
            name:"",
            price:0,
            quantity:0,
            errMsg:"",
            optionsList:[],
            cartItems:[],
            item:"",
            totalCost:0
        }
    }
    componentDidMount = async () => {
        await this.getItemsList(); 
    }
    getItemsList = async () => {
        try {
            let result = await axios.get("http://localhost:3001/items/listItems");
            if(result.status == 200){
                this.setState({optionsList:result.data.data});
            } else {
                this.setState({optionsList:[]});
            }      
        } catch(ex) {
            console.log("Exception",ex);
        }
    } 

    addBill  = async () => {
       let  { item, quantity,cartItems,optionsList,totalCost } = this.state;
       
       if((item == '') && (quantity === 0 || quantity === "") ){
            this.setState({errMsg:"name should not empty, and price should not empty or 0"});
       }  else {
            let itemValue = optionsList.find( val =>  val._id == item);  
            itemValue.price = quantity * itemValue.price;
            itemValue.quantity = quantity;
            totalCost += itemValue.price
            cartItems = [...cartItems,itemValue];
            this.setState({cartItems,totalCost});
       }
       this.btnElement.click();
    }
    saveBills = async () => {
        const { cartItems } =  this.state;
        let data = [];
         cartItems.forEach((item) => {
            data = [...data,{
                    quantity:item.quantity,
                    item_id:item._id,
                    created_date: new Date()
            }];   
        });
        try {
            let result =  await axios.post("http://localhost:3001/bills/addBill",data);
            if(result && result.status ==  200) {
                alert('saved successfully');  
            } else {
                alert("failed");
            }
        } catch(ex) {
            console.log("Exxx",ex);
        }
    }
    selectedChange = async (e) => {
        this.setState({item: e.target.value})
    }
    render(){
        const { errMsg ,optionsList,cartItems,quantity,totalCost} = this.state;
        
        const list = (optionsList || []).map((item)=> {
             return (
                <option key={item._id} value={item._id}>{item.name}</option>
             );
        });
        const cartList = (cartItems || []).map((item)=> {
            return (
                <div style={{justifyContent:"space-between",border:'1px solid black'}}>
                    <ul className="text-left" style={{display:"inline-block",listStyleType:"none"}}>
                        <li>{item.name}</li>
                        <li>Quantity :{quantity}</li>
                    </ul>
                    <div className="text-right">
                        <span>Rs:{item.price}</span>
                    </div>
                </div>
            );
       }); 
        return(
            <div className="card" style ={{width:'500px',height:"300px"}}>
                <div className="card-body" style={{overflowY:"auto"}}>
                    <div style={{display:'flex',justifyContent:"space-between" }}>
                        <h6 className="card-title text-left">New Item</h6>
                        <div style={{display:'flex'}} >
                            <p style={{color:'red',float:'right'}}>cart ( {cartItems.length > 0 ? (cartItems.length) : 0 } )</p>
                            <FontAwesomeIcon  style={{marginLeft: '20px',marginTop: '4px',cursor: "pointer"}}  icon= {faPlusCircle} data-toggle="modal" data-target="#newBillModal" onClick={ this.getItemsList } />
                        </div>
                    </div>
                    {cartList}    
                </div>
                <div className="card-footer">
                    <span>Amount : Rs {totalCost} </span>
                    <span>Total Items: { cartItems.length > 0 ? (cartItems.length) : 0 } </span>
                    <button type="button" onClick={this.saveBills}>Save</button>
                </div>
                <div className="text-right">
                    <div id="newBillModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Select Item</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <select class="form-control" name="item" onChange = {(e) => { this.selectedChange(e)}}>
                                                <option  value="">Select Item</option>
                                                {list}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control"  placeholder="Quantity" name="quantity" onChange = {(e) => { this.setState({quantity:e.target.value})}} />
                                        </div>
                                        <p style={{color:"red",fontSize:'10px'}}>{errMsg ? errMsg : ""}</p>
                                            <button type="button" className="btn btn-default" data-dismiss="modal" ref={btn => this.btnElement = btn}>Close</button>
                                            <button type="button" className="btn btn-default" onClick = {this.addBill}>Add</button>
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