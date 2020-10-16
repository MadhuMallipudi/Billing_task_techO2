const express = require("express");
const app =  express();
const bodyParser = require("body-parser");
const routes  = require("./routes/index");
const cors = require("cors");
const db = require("./dbconnection");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use("/",routes);

app.listen(3001,()=>{
    console.log("socket server running on 3001");
});




// var arr = [ 
//     {
//         color:"red",
//         number:1,
//         message:"mmmm"
//     },
//     {
//         color:"green",
//         number:1,
//         message:"mmmm"
//     },
//     {
//         color:"green",
//         number:2,
//         message:"mmmm"
//     },
//     {
//         color:"blue",
//         number:1,
//         message:"mmmm"
//     },
//     {
//         color:"red",
//         number:1,
//         message:"mmmm dasdas"
//     },
//     {
//         color:"red",
//         number:1,
//         message:"mmmm dasdas"
//     },
//     {
//         color:"red",
//         number:1,
//         message:"mmmm dasdas"
//     }
// ]
// var f =[];


// var arr2 =[];
// for(let  i=0;i<arr.length;i++){
//     if(arr2.length == 0){
//         arr2.push(arr[i]);
//     } else {
//        var v = arr2.find(item => { return item.color == arr[i].color});
//        if(v){
//            v.number += arr[i].number;
//            arr2.push(v);
//        } else {
//            arr2.push(arr[i]);
//        }
//     }
// }
      
// console.log("arrray 22",...[new Set (arr2)]);




