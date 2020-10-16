const moment = require("moment");
const items =  require("../models/item.model.js");
const bills =  require("../models/bills.model.js");

const bills_controller =  () => {

    const _list = async (req,res) => {
        try {
            let result =  await bills.find().populate('item_id').exec();
            return res.status(200).send({status:200,data: await getOrganizeData(result)});
        } catch (ex){
            return res.status(500).send({error:ex.message});
        }
    }
    const _create =  async (req,res)=>{
        try{
            const postData = req.body;
            let result =  await  bills.create(postData);
            res.status(200).send({status:200,response:result,message:"saved successfully"});
        }catch(ex){
            res.status(500).send({status:500,message:ex.message});
        }
   };
   const _getCounts = async  (req,res) => {
        try{
            let result =  await  bills.find();
            let dayCount = result.filter(item => {  return moment(item.created_date).format("DD-MM-yyyy") == moment().format("DD-MM-yyyy")}).length;
            let monthCount = result.filter(item => { return moment(item.created_date).getMonth == moment().getMonth}).length;
            let yearCount = result.filter(item => { return moment(item.created_date).getFullYear == moment().getFullYear}).length;
            res.status(200).send({status:200,message:"fetched successfully",dayCount:dayCount,monthCount:monthCount,yearCount:yearCount});  
        } catch(ex){
            res.status(500).send({status:500,message:ex.message});
        }

   }
    return {
        list: _list,
        create:_create,
        getCounts:_getCounts
    }
}

module.exports = bills_controller();

const getOrganizeData = async (result) => {
    let data =[];
    if(result && result.length > 0){
        result.forEach((item,index)=>{
            data = [...data,{
                created_date:moment(item.created_date).format("DD/MM/YYYY"),
                rs: item.quantity ? (item.quantity * (item.item_id.price ? item.item_id.price :0 ) ) : 0,
                bill_no:`Bill ${index+1}`
            }];
        });
    }
    return data;
} 