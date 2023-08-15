
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './101.db',
    driver:  sqlite3.Database
});

await db.migrate();

export async function create(plan_name,sms_price,call_price){
  const sql=`insert into price_plan(plan_name,sms_price,call_price) values (?,?,?)`;
  await db.run(sql,[plan_name,sms_price,call_price]);
}
export async function deleteById(id){
    const sql=`delete from price_plan where id=?`;
    await db.run(sql,id);
}

export async function getPrice_plan(){
    const getPrice=await db.all(`select * from price_plan`);
    return getPrice;
}

export async function getPrice_planByPlan_name(Plan_name){
    const sql=`select * from price_plan where plan_name=?`;
    return db.all(sql,Plan_name);
}

export async function UpdatePriceById(plan_name,sms_price,call_price,id){
    const sql=`update price_plan set plan_name=?,sms_price=?,call_price=? where id=?`;
    await db.run(sql,[plan_name,sms_price,call_price,id]);
}
