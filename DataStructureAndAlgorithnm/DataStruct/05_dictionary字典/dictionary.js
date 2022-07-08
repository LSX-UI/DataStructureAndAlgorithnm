//字典结构：和集合的结构十分类似，以[键，值]的形式存储元素，字典也被称之为映射。
//table[key]={key,value} ES6的语法允许我们使用方括号内填入键名获取对象的属性。

//import { defaultToString } from "../util";
function defaultToString(item){
    if(item===null) return 'NULL';
    else if(item===undefined){
       return 'UNDEFINED';
    }else if(item==='string'||item instanceof String){
       return `${item}`;
    }else{
        return item.toString();
    }
}
//声明一个创建字典内部键值对，并存在将键名字符串化的方法。
class ValuePair{
    constructor(key,value){
        this.key=key;
        this.value=value;
    }
    toString(){
        // 模板字面量前加上#可以将其字符串化。
        return `#${this.key}:${this.value}`;
    }
}

class Directionary{
    //从外部传入一个将键值转换为字符串的函数结构，并将其作为默认值传入使用。
    constructor(toSrFn=defaultToString){
       this.toSrFn=toSrFn;
       this.table={};
    }
    //1、检查字典中是否含有给定的键值
    hasKey(key){
        return this.table[this.toSrFn(key)]!==null;
    }
    //2、向字典中添加元素以及在ValuePair类中设置键和值
    set(key,value){
        if(key!==null&&value!==null){
            //将传入的键名转换为字符串形式。
            const tableKey=this.toSrFn(key);
            this.table[tableKey]=new ValuePair(key,value);
            return true;
        }
        return false;
    }
    //3、根据给定的键值删除元素
    remove(key){
        if(this.hasKey(key)){
            delete this.table[this.toSrFn(key)];
            return true;
        }
        return false;
    }
    //4、根据给定的键值名返回字典中对应的键值对方法
    get(key){
        let ValuePair=this.table[this.toSrFn(key)];
        return ValuePair=null?undefined:ValuePair.value;
    }
    //5、将存储的键值以数组形式返回
    keyValues(){
        return Object.values(this.table);
    }
    //6、字典中的键名以字符串形式返回
    keys(){
        //数组方法map返回其处理后的数组元素组成的新数组。
        return this.keyValues().map((valuePair)=>valuePair.key);
    }
    keys1(){
        let valuePairs=this.keyValues();
        const key=[];
        for(let i=0;i<valuePairs.length;i++){
          key.push(valuePairs[i].key);
        }
        return key;
    }
    //7、返回由每个键值构成的数组
    values(){
        return this.keyValues().map((valuePair)=>valuePair.value);
    }
    //8、迭代字典中的每个键值对
    forEach(callbackFn){
        const valuePair=this.keyValues();  //获取组成的数组
        for(let i=0;i<valuePair.length;i++){
            let result=callbackFn(valuePair[i].key,valuePair[i].value);
            if(result=false) break;
        }
    }
    //9、返回字典的长度
    size(){
        return this.keyValues().length;
    }
    //10、将字典内部存储的元素全部清空
    clear(){
        this.table={};
    }
    isEmpty(){
        return this.keyValues().length===0;
    }
    //10、将字典中的键值对以字符串的形式输出。
    toString(){
    if(this.isEmpty()){
        return '';
    }
    let valuePairs=this.keyValues();
    //字典中不为空的时候，先获取第一个元素字符串化的内容。
    let objString=`${valuePairs[0].toString()}`;
    //循环遍历字典中剩余的键值对将其变成字符串输出,以逗号作为分割符分开。
    for(let i=0;i<valuePairs.length;i++){
        objString=`${objString},${valuePairs[i].toString()}`;
    }
    return objString;
    }
}
//测试代码
let dicy=new Directionary();
//1、测试向字典中添加元素的方法
dicy.set('端午节','5月5日');
dicy.set('中秋节','8月15日');
dicy.set('春节','1月1日');
console.log(dicy);
//2、测试检查字典中是否存在给定键值的元素
console.log(dicy.hasKey('端午节'));
//3、测试从字典中删除给定键值的方法
dicy.remove("端午节");
console.log(dicy);
//4、获取指定键名的键值
console.log(dicy.get("春节"));
//5、键值以数组的形式返回
console.log(dicy.keyValues());
console.log(dicy.keys());
console.log(dicy.values());

//6、测试toString方法
console.log(dicy.toString());
