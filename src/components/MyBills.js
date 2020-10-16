import React,{Component} from 'react';
import axios from "axios";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class MyBills extends Component {
    constructor(props){
        super(props);
        this.state ={
            mybills:[]
        }
    }
    componentDidMount = async () => {
        await this.getItemsList(); 
    }
    getItemsList = async () => {
        try {
            let result = await axios.get("http://localhost:3001/bills/listBills");
            if(result.status == 200){
                this.setState({mybills:result.data.data});
            } else {
                this.setState({mybills:[]});
            }      
        } catch(ex) {
            console.log("Exception",ex);
        }
    } 

    
    render(){
        const { mybills} = this.state;
        
        const MyBillsList = (mybills || []).map((item,index)=> {
           
            return (

                <div style={{justifyContent:"center",border:'1px solid black'}}>
                    <div className="text-left">
                        <p>{`Bill`+index+1}</p>
                        <p>Date :{item.created_date}</p>
                    </div>
                    <div className="text-right">
                        <p>Rs:{item.rs}</p>
                    </div>
                </div>
            );
       }); 
        return(
            <div className="card" style ={{width:'500px',height:"300px",overflowY:"auto"}}>
                <div className="card-body">
                    <h6 className="card-title text-left">My Bills</h6>
                    {MyBillsList}
                </div>
            </div>
        );
    }
}