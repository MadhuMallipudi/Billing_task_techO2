import React,{Component} from 'react';
import axios from "axios";

export default class Sales extends Component {
    constructor(props){
        super(props);
        this.state = {
            dayCount:0,
            monthCount:0,
            yearCount:0
        }
    }
    componentWillReceiveProps = async ({updateList}) => {
        if(updateList){
            await this.getCounts();
        }
    }
    componentDidMount = async () => {
        await this.getCounts();
    }
    getCounts = async () => {
        let result = await axios.get("http://localhost:3001/bills/counts");
        if(result.status == 200){
            this.setState({
                dayCount:result.data.dayCount,
                monthCount:result.data.monthCount,
                yearCount:result.data.yearCount,
            });
        } else {
            this.setState({itemList:[]});
        } 
    } 

    render(){
        const { dayCount ,monthCount, yearCount } =  this.state; 
        return(
            <div className="card" style ={{width:'500px',height:"300px",overflowY:"auto"}}>
                <div className="card-body">
                    <h6 className="card-title text-left">Sales</h6>
                     <div style={{display:"flex"}}>
                        <div style={{width:'200px',height:'150px',textAlign:'center',padding:'33px',border:'1px #eee solid'}}>
                                <h4>Rs {dayCount}</h4>
                                <p>ToDay</p>
                        </div>
                        <div style={{width:'200px',height:'150px',textAlign:'center',padding:'33px',border:'1px #eee solid',marginLeft:'5PX'}}>
                                <h4>Rs {monthCount}</h4>
                                <p>This Month</p>
                        </div>
                        <div style={{width:'200px',height:'150px',textAlign:'center',padding:'33px',border:'1px #eee solid',marginLeft:'5PX'}}>
                                <h4>Rs {yearCount}</h4>
                                <p>This Year</p>
                        </div>
                     </div>                          
                </div>
            </div>
        );
    }
}