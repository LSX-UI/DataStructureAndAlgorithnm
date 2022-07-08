//散列表又可以称之为哈希表，
//使用的是散列算法，其目的就是尽可能快的在数据结构中找到一个值。
//JavaScript语言的内部就是使用散列表来表示每个对象，对象的每个属性和方法被存储为key对象类型
//每个Key指向其对象成员

//哈希表基于数组实现
//1、可以提供快速的插入和删除操作。
//2、无论数据量多少，插入和删除值需要接近常量的时间，
//3、哈希表的速度比树还要快
//4、哈希表相对于树而言编码相对简单很多
//不足之处
//1、数据是没有顺序的，不能以一种固定的方式对其进行遍历，
//2、通常情况下，哈希表中的key是不允许重复的，不同的key用于保存不同的元素。
//对于下标值的一种变换，可以称之为哈希函数,通过哈希函数将给定的字符串键值转换为HashCode.

//如何实现呢？
//将字符串转换为下标值，并按照下标值将字符串存储在数组的指定位置，查找时直接通过数组的索引值进行快速查找。

//哈希化
//使用幂乘的方式算出来的下标值不容易重复，但是构造出来的数组很大，会造成大量存储空间的浪费。
//哈希化就是使用一种压缩算法，把幂的连乘方案中所得到的巨大整数下标值范围压缩到可以接收的数组范围。
//最简单的方法就是进行取余操作，对给定的哈希表的最大长度进行取余。
//哈希表：将数据插入到数组中，对整个结构的封装，我们就可以称之为一个哈希表。 
//冲突：两个值放在了数组中同一个下标值的位置，就称之为冲突。
//冲突是不可避免的，可以采用链地址法或开放地址法处理冲突问题。
//1、链地址法，在冲突的位置放置一个链表结构，后续重复的数值在给定的链表中依次存放。此处链表和数组都可以，效率都差不多。
//2、开放地址法，就是在产生冲突之后就继续寻找空白的单元格来添加重复的数据。
//探索空白位置的方法 线性探测、二次探测、再次哈希化。开放地址法现在用的很少，一般都使用链地址法。

//装填因子
//装填因子是指当前哈希表中已经包含的数据项和整个哈希表长度的比值。
//装填因子=总数据项/哈希表的长度
//开放地址法的装填因子最大值为1，因为它必须找到空白的单元才能将元素放入。
//链地址法的装填因子可以大于1，因为单项的链表可以无限长度延长下去。
//平均探测长度以及平均存取时间，都取决于装填因子，装填因子增大，则哈希表的插入和搜索效率降低。
//在设计哈希函数的时候，应该尽量减少乘法和除法部分的内容，因为其性能较低。
//优秀的哈希函数应该尽可能地将元素在哈希表中均匀的分布。

//多项式的优化，霍纳法则。n次多项式中不断提取公因子将乘法更多的变为加法，将时间复杂度由O(N^2)
//降到了O(N),国内又称之为秦九韶算法。
//质数的使用，质数的使用会使得哈希表的分布更加均匀一些。在下面两处使用到了质数。
//哈希表的长度
//N次幂的底数

//哈希表的扩容
//采用链地址法的时候装填因子可以大于1，但是过大的时候每一个子选项中的链表会过长，影响到
//查找效率，需要将哈希表扩容2倍以提高哈希表的效率。

//如何进行哈希表的扩容呢？
//装填因子大于0.75的时候，对哈希表进行扩容操作。
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
//将给定的键值转化成存储在哈希表的下标值。
function hashFunc(str,max){ 
    // if(typeof str==='number') {
    //     return str;
    // }
    let hashCode=0;
    //霍纳算法，就是降低算法的时间复杂度
    for(let i=0;i<str.length;i++){
        //设置一个质数为幂乘的底数，在加上字符串的ASCII码进行编码
        //使用charCodeAt方法获取字符串中每一个字符的ASCII码。
        hashCode=31*hashCode+str.charCodeAt();
    }
    //取余操作,计算出来的hashCode值很大，需要将范围缩小。
    hashCode=hashCode%max
    //将传入的字符串转化为hashCode
    return hashCode;
}
 //判断一个数是否为质数的算法
    //质数即因子只有1和本身，又被称之为素数。
function isPrime(num){
   for(let i=2;i<num;i++){
       if(num%i===0){
           return false;
       }
   }
   return false;
}
//算法的优化
//一个数存在两个因数乘积，则一个必然小于等于sqrt(n)，另一个必然大于等于sqrt(n)，即平方根
//对上述是否为质数的算法进行优化。 
function isPrimePlus(num){
    //1、获取给定数字的平方根，要取整
    let temp=Math.ceil(Math.sqrt(num));
    //2、仅需要遍历到temp，提高算法的效率
    for(let i=2;i<temp;i++){
        if(num%i===0){
            return false;
        }
    }
    return true;
}

console.log(isPrime(137));
console.log(isPrimePlus(13));

// console.log(hashFunc('lsx',13));
// console.log(hashFunc('hyw',13));
// console.log(hashFunc('zdy',13));
//实现一个哈希散列表
class HashTable{
    constructor(toSrFn=defaultToString){
        this.toSrFn=toSrFn;
        this.storage=[]; //数组存储元素
        this.count=0;  //哈希表中的元素个数
        this.limit=7; // 哈希表中元素的最大容量。
        //this.hashFunction=hashFunction;  //获取哈希函数处理后的下标值，并将其存储在数组中
    }
    //实现一个哈希函数
    hashFunc(str,max){ 
        // if(typeof str==='number') {
        //     return str;
        // }
        let hashCode=0;
        //霍纳算法，就是降低算法的时间复杂度
        for(let i=0;i<str.length;i++){
            //设置一个质数为幂乘的底数，在加上字符串的ASCII码进行编码
            //使用charCodeAt方法获取ASCII码。
            hashCode=31*hashCode+str.charCodeAt();
        }
        //取余操作,计算出来的hashCode值很大，需要将范围缩小。
        hashCode=hashCode%max
        //将传入的字符串转化为hashCode
        return hashCode;
    }
    //哈希表的方法比较简单
    //仅仅包括增加，删除，查找三个方法。
    //1、哈希表中存放,更新元素
    //基于链地址法处理冲突的问题。
    put(key,value){
        //1、映射到下标值
        let storageIndex=this.hashFunc(key,this.limit);
        //2、取出数组，在链地址方法中使用数组，也可使用之前封装好的链表new ValuePair()
        let bucket=this.storage[storageIndex];
        if(bucket===undefined){
            bucket=[];
            this.storage[storageIndex]=bucket;
        }
        //3、判断是插入还是更新元素 。
        //声明一个值，标明是否覆盖了。
        //debugger;
        let isOveride=false;
        for(let i=0;i<bucket.length;i++){
            //声明一个元组，由数组存储查找到的元素的键值和键名
            let tuple=["key","value"];
            tuple=bucket[i];
            // for(let i=0;i<tuple.length;i++){
            //     if(tuple[i]===key){
            //         tuple[i+1]=value;
            //         isOveride=true;
            //     }
            // }
            if(tuple[0]===key){
                tuple[1]=value;
                isOveride=true;  //标记为已经覆盖。
            }
        }
        //4、没有覆盖则直接加入到指定的bucket中
        if(!isOveride){
            bucket.push(key,value);
            this.count++;
            //填充因子大于0.75，则直接进行2倍的扩容。
            if(this.count>0.75*this.limit){
                this.resize(this.limit*2);   
            }
        }
        
    }
    //2、获取元素的方法
    get(key){
    //1、获取到指定的hashCode
    let storageIndex=this.hashFunc(key,this.limit);
    //2、查找到指定的bucket
    let bucket=this.storage[storageIndex];
    //3、遍历bucket获取到指定的key值
    if(bucket===undefined) return null;
    for(let i=0;i<bucket.length;i++){
      let tuple=bucket[i];
      if(tuple[0]===key){
          return tuple[1];
      }
    }
    return null;     
    }
    //3、删除指定key的元素
    remove(key){
        //获取给定元素的hashCode
        let storageIndex=this.hashFunc(key,this.limit);
        //获取对应的bucket
        let bucket=this.storage[storageIndex];
        if(bucket===undefined) return null;
        for(let i=0;i<bucket.length;i++){
            let tuple=bucket[i];
            if(tuple[0]===key){
                bucket.splice(i,1);
                this.count--;
                return tuple[1]; 
            }
        }
    }
    //4、判断是否为空
    isEmpty(){
        return this.count===0;
    }
    //5、返回该哈希表的元素个数
    size(){
        return this.count;
    }
    //6、对哈希表进行扩容操作
    resize(newLimit){
        //1 存储旧的哈希表中的所有元素
        let oldStorage=this.storage;
        //2 重置哈希表中的所有属性
        this.limit=newLimit;
        this.storage=[];
        this.count=0;
        // 3 循环遍历将旧元素插入到扩容后的哈希表中
        storage.forEach((bucket)=>{
            if(bucket===undefined) return null;
            for(let i=0;i<bucket.length;i++){
                let tuple=bucket[i];
                this.put(tuple[0],tuple[1]);
                this.count++;
            }
        })
    }
   
}

let hashExamlpe=new HashTable();
hashExamlpe.put("name","lsx");
hashExamlpe.put("age","23");
hashExamlpe.put("gender","man");
hashExamlpe.put("nation","China");
hashExamlpe.put("home","JiangXi");
console.log(hashExamlpe.get("gender"));
console.log(hashExamlpe);

//使用线性查找的put方法
class ValuePair{
    constructor(){
        this.key=key;
        this.value=value;
    }
    toString(){
        return `#${this.key},${this.value}`
    }
}

function put(key,value){
    if(key!==null&&value!==null){
        let position=hashFunc(key);
        if(this.HashTable[position]===null){
            this.HashTable[position]=new ValuePair(key,value);
        }else{
            let index=position+1;
            while(this.HashTable[index]!==null&&index<HashTable.length){
                index++;
            }
            this.HashTable[index]=new ValuePair(key,value);
        }
        return true;
    }
  return false;

}