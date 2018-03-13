const util={
    simulation(){
        return new Promise((re,er)=>{
            re([
                {id:1,active:false,sex:"男",age:"16",weight:"55",height:"165",name:"张一"},
                {id:2,active:false,sex:"女",age:"16",weight:"55",height:"170",name:"张二"},
                {id:3,active:false,sex:"女",age:"16",weight:"55",height:"165",name:"张三"},
                {id:4,active:false,sex:"男",age:"16",weight:"60",height:"165",name:"张四"},
                {id:5,active:false,sex:"女",age:"16",weight:"60",height:"170",name:"张五"},
                {id:6,active:false,sex:"女",age:"16",weight:"60",height:"165",name:"张六"},
                {id:7,active:false,sex:"男",age:"16",weight:"55",height:"170",name:"王一"},
                {id:8,active:false,sex:"男",age:"16",weight:"55",height:"170",name:"王二"},
                {id:9,active:false,sex:"女",age:"16",weight:"55",height:"165",name:"王三"},
                {id:10,active:false,sex:"男",age:"16",weight:"60",height:"165",name:"王四"},
                {id:11,active:false,sex:"男",age:"17",weight:"60",height:"170",name:"王四"},
                {id:12,active:false,sex:"女",age:"17",weight:"55",height:"165",name:"张二"},
                {id:13,active:false,sex:"女",age:"17",weight:"55",height:"165",name:"张三"},
                {id:14,active:false,sex:"男",age:"17",weight:"60",height:"165",name:"张四"},
                {id:15,active:false,sex:"女",age:"17",weight:"60",height:"170",name:"张五"},
                {id:16,active:false,sex:"女",age:"17",weight:"60",height:"165",name:"张六"},
                {id:17,active:false,sex:"男",age:"17",weight:"60",height:"170",name:"王一"},
                {id:18,active:false,sex:"男",age:"17",weight:"55",height:"170",name:"王二"},
                {id:19,active:false,sex:"女",age:"17",weight:"55",height:"160",name:"王三"},
                {id:20,active:false,sex:"男",age:"17",weight:"55",height:"160",name:"王四"},
            ])
        })
    },
    padStart(str,len,pad){
        const dis=len-str.length;
        if(!isNaN(dis)&&dis>0){
            for(let i=0;i<dis;i++){
                str=pad+str;
            }
        }
        return str
    }
};
const App= new Vue({
    el:"#app",
    data:{
        head:[
            {key:"name",text:"姓名"},
            {key:"sex",text:"性别"},
            {key:"age",text:"年龄"},
            {key:"weight",text:"体重"},
            {key:"height",text:"身高"},
        ],
        body:[],
        search:{
            sex:"女",
            age:"16",
            weight:"55",
            height:"165",
        },
        diff:["sex","age","weight","height"],
        result:"",
        resultOfTwo:[]
    },
    watch:{
        "search":{handler:function () {
            const result=[];
            this.body.forEach(data=>{
                for(let i=0;i<this.diff.length;i++){
                    result[i]=result[i]||"";
                    let key = this.diff[i];
                    result[i]+=String(Number(data[key]===this.search[key]));
                }
            });
            let last=null;
            result.forEach(data=>{
                if(last!==null){
                    last=parseInt(data,2)&last;
                }else {
                    last=parseInt(data,2)
                }
            });
            this.resultOfTwo=result;
            this.resultOfTwo.slice(0);
            this.result=util.padStart(last.toString(2),this.body.length,"0");
        },deep:true}
    },
    mounted(){
        util.simulation().then(res=>{
            this.body=res;
            this.body.slice(0);
            this.search.sex="男";
        });
    }
});