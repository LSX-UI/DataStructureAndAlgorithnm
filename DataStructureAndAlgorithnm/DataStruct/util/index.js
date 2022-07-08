
//1、将传入的键名转化为字符串形式的功能函数
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

let n=0000001000010011;
function sumOneNumber(n){
    let n_String=n+'';
    console.log(typeof n_String);
    console.log([...n_String]);
    let n_Array=[...n_String];
    console.log(n_Array);
}
sumOneNumber();