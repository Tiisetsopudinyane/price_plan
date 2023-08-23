document.addEventListener("alpine:init", ()=>{
    Alpine.data('phoneBill',()=>{
        return {
    pricePlan:'Phone Bill',
    myPrice_plan:[],
    plan_name:'',
    action:'',
    sms_price:0,
    call_price:0,
    total:0,
    id:0,
    deleteId:0,
    message:'',
    Createplan_name:'',
    Createsms_price:'',
    Createcall_price:'',
    Createmessage:'',
    deleteIdmessage:'',
    Updatemessage:'',
    Updatecall_price:'',
    Updatesms_price:'',
    Updateplan_name:'',
    Updateid:0,

    init(){
      return axios
      .get('/api/phonebill')
      .then((result)=>{
        //console.log(this.deleteId)
        this.myPrice_plan=result.data.price_Plan;
      })
    }, 
    
    bill(){
    return axios
    .post(`/api/phonebill?plan_name=${this.plan_name}&action=${this.action}`)
    .then((result)=>{
      //console.log(result.data.total)
      this.total=result.data.total;
    })
  },

  deletes(){
    return axios
    .post(`/api/price_plan/delete?id=${this.deleteId}`)
    .then((result)=>{
      this.deleteIdmessage=result.data.message;
    })
   // console.log(this.deleteId)
  },

  create(){
     return axios
    .post(`/api/phonebill/create?plan_name=${this.Createplan_name}&sms_price=${this.Createsms_price}&call_price=${this.Createcall_price}`)
    .then((result)=>{
      this.Createplan_name=result.data.plan_name;
      this.Createsms_price=result.data.sms_price;
      this.Createcall_price=result.data.call_price;
      this.Createmessage=result.data.status;
    })
  },

  update(){
     return axios
    .post(`/api/phonebill/update?plan_name=${this.Updateplan_name}&sms_price=${this.Updatesms_price}&call_price=${this.Updatecall_price}&id=${this.Updateid}`)
    .then((result)=>{
      this.Updateplan_name=result.data.plan_name;
      this.Updatesms_price=result.data.sms_price;
      this.Updatecall_price=result.data.call_price;
      this.Updateid=result.data.id;
      this.Updatemessage=result.data.status;
    }, this.Updateplan_name="",
    this.Updatesms_price="",
    this.Updatecall_price="",
    this.Updateid="",
    this.Updatemessage="",);
      
  }

  
  }
  
  
  
        }
    )});