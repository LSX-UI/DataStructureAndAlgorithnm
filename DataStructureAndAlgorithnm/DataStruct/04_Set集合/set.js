//0601
//集合：集合是一种不允许值重复的顺序数据结构
//可以视作一个没有重复元素也没有顺序概念的数组。
//需要掌握的内容
//1、如何添加、删除和查找值，如何确定值是否存在。
//2、如何进行集合的并集、交集和差集的运算。
//3、如何使用ES6的原生Set集合类

class Set{
    constructor(){
        this.items={};
    }
    //1、判断元素在集合中是否存在。
    has(element){
        return element in this.items;  //借用了in运算符
    }
    //2、添加一个元素
    //根据集合的特点，当集合中不存在此元素时，才允许添加，否则丢弃
    add(element){
        if(!this.has(element)){
            this.items[element]=element; //键值同名不仅有利于查找，还有利于触发简写方式。
            return true;
        }
        return false;
    }
    //3、删除集合中的一个元素
    delete(element){
        if(this.has(element)){
            delete this.items[element];
            return true;
        }
        return false;
    }
    //4、移出集合中的所有元素，则可以直接将this.items置空
    clear(){
        this.items={};
    }
    //5、查看集合中元素的个数
    size(){
        return Object.keys(this.items).length;  //接用对象原型上的keys返回给定对象所有属性的数组的长度来判断
    }
    //6、返回一个由对象中所有属性值组成的数组
    values(){
        return Object.values(this.items); //使用对象原型上的values方法返回
    }

    //不同集合之间的运算
    //1、并集运算
    union(otherSet){
       const unionSet=new Set();  //创建一个新的集合存储并集之后的所有元素值
       this.values().forEach((value)=>unionSet.add(value));
       otherSet.values().forEach((value)=>unionSet.add(value));
       return unionSet;
    }
    //2、并集运算的第二种方式
    union2(otherSet){
        let unionSet=new Set();
        //将属性值存储的数组单独赋值再进行相关的运算
        let values=this.values();
        for(let i=0;i<values.length;i++){
            unionSet.add(values[i]);
        }
        values=otherSet.values();
        for(let i=0;i<values.length;i++){
            unionSet.add(values[i]);
        }
        return unionSet;
    }
    //3、交集的运算
    intersection(otherSet){
        let intersectionSet=new Set();
        let values=this.values();
        for(let i=0;i<values.length;i++){
            if(otherSet.has(values[i])){
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }
    //4、交集运算的优化，先比较两个集合的大小，迭代小的集合效率会更高
    intersection2(otherSet){
        let intersectionSet=new Set();
        let values=this.values();
        let otherValues=otherSet.values();
        let BiggerSet=values;
        let SmallerSet=otherValues;
        if(values.length-otherValues.length<0){
            BiggerSet=otherValues;
            SmallerSet=values;
        }
        SmallerSet.forEach((value)=>{
            if(BiggerSet.has()){
                intersectionSet.add(value);
            }
        })
        return intersectionSet;
    }
    //5、差集的运算
    //就是将另外一个集合中没有的元素值加入到新的集合中
    difference(otherSet){
        let differenceSet=new Set();
        let values=this.values();
        for(let i=0;i<values.length;i++){
            if(!otherSet.has(values[i])){
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    }
    //6、测试是否为子集的运算方法
    isSubsetOf(otherSet){
        if(this.size()>otherSet.size())  return false;
        let values=this.values();
        let isSubset=true;
        values.every((value)=>{
            if(!otherSet.has(value)){
                isSubset=false;
                return false;
            }
            return true;   //every方法只要其返回值为true，则就会继续循环执行下去
        })
        return isSubset;
    }
}

//用于测试的第三方集合otherSet

class otherSet{
    constructor(){
        this.items={};
    }
    //1、判断元素在集合中是否存在。
    has(element){
        return element in this.items;  //借用了in运算符
    }
    //2、添加一个元素
    //根据集合的特点，当集合中不存在此元素时，才允许添加，否则丢弃
    add(element){
        if(!this.has(element)){
            this.items[element]=element; //键值同名不仅有利于查找，还有利于触发简写方式。
            return true;
        }
        return false;
    }
    //3、删除集合中的一个元素
    delete(element){
        if(this.has(element)){
            delete this.items[element];
            return true;
        }
        return false;
    }
    //4、移出集合中的所有元素，则可以直接将this.items置空
    clear(){
        this.items={};
    }
    //5、查看集合中元素的个数
    size(){
        return Object.keys(this.items).length;  //接用对象原型上的keys返回给定对象所有属性的数组的长度来判断
    }
    //6、返回一个由对象中所有属性值组成的数组
    values(){
        return Object.values(this.items); //使用对象原型上的values方法返回
    }
}

let testSet=new Set();
testSet.add(400);
testSet.add(500);
testSet.add(600);
testSet.add(100);
console.log(testSet);

let testSet1=new Set();
testSet.add(400);
testSet.add(500);
testSet.add(600);
console.log(testSet1);

//测试代码
let set=new Set();
//#region 
//1、测试add添加元素的方法
set.add(100);
set.add(200);
set.add(300);
//2、测试检查元素是否存在的方法
console.log(set.has(200));
console.log(set);

//2、测试删除一个元素
set.delete(300);
console.log(set);

//4、测试返回集合的长度的方法
console.log(set.size());

//5、测试返回属性值组成的数组
console.log(set.values());
//#endregion

//测试集合的运算方法
console.log(set);
console.log(testSet);
console.log(testSet1);
console.log('集合的并集运算结果为：',set.union(testSet));
console.log('集合的交集运算结果为：',set.intersection(testSet));
console.log('集合的差集运算结果为：',set.difference(testSet));
console.log('testSet1是testSet的子集吗？',testSet1.isSubsetOf(testSet))

//ES6中Set提供的API和我们上述封装好的集合方法是一样的，使用原生JS封装一个集合。