import express from 'express';
import cors from 'cors';
import totalPhoneBill from './phoneBill.js';
import {getPrice_planByPlan_name,deleteById,create,UpdatePriceById,getPrice_plan} from "./db.js";

const app = express(); 
app.use(express.static('public'))
app.use(express.json())
app.use(cors());
// const price_Plan=await getPrice_plan()
// console.log(price_Plan);
app.post(`/api/phonebill`,async function (req, res){
    const plan_name=req.query.plan_name;
    const action=req.query.action;

    const getSmsCall=await getPrice_planByPlan_name(plan_name) 
    const sms_price=getSmsCall[0].sms_price;
    const call_price=getSmsCall[0].call_price;

    const total=totalPhoneBill(action,sms_price,call_price)
    res.json({
        'status':"success",
        total
    })
 })
 app.get('/api/phonebill',async function (req,res){
    const price_Plan=await getPrice_plan()
    res.json({
        price_Plan
    })
 })


 app.post('/api/price_plan/delete',async function(req,res){
  const Id=req.query.id;
  //console.log(Id);
   await deleteById(Id);
  res.json(
       {
        "message":`${Id} was deleted from the table`
       }
  )
 })
app.post('/api/phonebill/create',async function(req,res){
    const plan_name=req.query.plan_name;
    const sms_price=req.query.sms_price;
    const call_price=req.query.call_price;
    await create(plan_name,sms_price,call_price)
    res.json({
        "status":'Success',
    })
})

app.post('/api/phonebill/update',async function(req,res){
    const plan_name=req.query.plan_name;
    const sms_price=req.query.sms_price;
    const call_price=req.query.call_price;
    const id=req.query.id;
    await UpdatePriceById(plan_name,sms_price,call_price,id)
    res.json({
        "status":`Plan name = ${plan_name},sms= ${sms_price},call= ${call_price} was updated to the database`
    })
})



// console.log(await deleteById(23))
const PORT = process.env.PORT || 4011;
app.listen(PORT, () => `Server started ${PORT}`)