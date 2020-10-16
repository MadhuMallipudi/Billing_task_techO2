const items =  require("../models/item.model.js");

const item_controller =  () => {

    const _list = async (req,res) => {
        try {
            return res.status(200).send({status:200,data: await items.find()});
        } catch (ex){
            return res.status(500).send({error:ex.message});
        }
    }
    const _create =  async (req,res)=>{
        try{
            const postData = req.body;
            let doc =  new items(postData);
            let result  = await doc.save();
            res.status(200).send({status:200,message:"saved successfully"});
        }catch(ex){
            res.status(500).send({status:500,message:ex.message});
        }
   };
    
    return {
        list: _list,
        create:_create
    }
}


module.exports = item_controller();
