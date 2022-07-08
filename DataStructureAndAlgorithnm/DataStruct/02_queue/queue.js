

//队列 FIFO first in first output
//仅允许在表的前端删除元素，在表的后端添加元素。
//生活中常见的排队，最先排队的人的事情最先处理。

//线程队列
//多个任务开启多个线程处理。
// 不能让大量的线程同时运行处理任务，
// 依照次序来启动线程。

//基于数组实现
//基于链表实现

function Queue(){
    //属性
    this.items=[]
    //方法
    //1 将元素进入队列
    this.enqueue=function(element){
        this.items.push(element);
    }
    //2 从队列中删除元素
    this.dequeue=function(){
      return  this.items.shift();
    }
    //3 查看队列前端的元素，也就是队列首部的元素
    this.front=function(){
       return this.items[0];
    }
    //4 查看队列是否为空
    this.isEmpty=function(){
        return this.items.length===0;
    }
    //5 查看队列当前的数组的大小
    this.size=function(){
        return this.items.length;
    }
    //6 字符串输出
    this.toString=function(){
        if(this.isEmpty()){
            return '';
        }else{
            let formString='';
            for(let i=0;i<this.items.length;i++){
                formString+=this.items[i]+'';
            }
            return formString;
        }
    }
}

let queue=new Queue();
queue.enqueue(1999);
queue.enqueue(2000);
queue.enqueue(2001);
console.log(queue.items);
console.log(queue.front());
console.log(queue.dequeue());
console.log(queue.items);
console.log(queue.isEmpty());
console.log(queue.size());
console.log(queue.toString());
//console.log(parseInt(Math.random()*10));


//队列的应用，击鼓传花；

function playGame(nameList,number){
    //1、利用数组声明一个队列
    let queue1=new Queue();
    //2、将给定的数组元素依次入队列
    for(let i=0;i<nameList.length;i++){
        queue1.enqueue(nameList[i]);
    }
    console.log('已经全部进入队列，队列大小为',queue1.size());
    //3、游戏开始，生成的随机数从第一个人开始数数。
    while(queue1.size()>1){
        for(let i=0;i<number-1;i++){
            //将不等于给定数字的元素从队列头部删除后又添加到队列尾部
            queue1.enqueue(queue1.dequeue());
        }
        queue1.dequeue();
    }
    //4、返回剩余的人的名字和索引值
    let winner=queue1.front();
    console.log('GameOver队列当前的大小为',queue1.size());
    console.log(winner);
    console.log('最终赢家为',winner);
    let n=nameList.indexOf(winner);
    console.log('游戏赢家在队列中的索引值为',n);
    //return nameList.indexof(winner);
}

let nameList=['liu','li','sheng','hu','jiang','wu'];
num=parseInt(Math.random()*10);
console.log('当前传入的随机数为',num);
playGame(nameList,num);


//优先级队列
//优先级队列，在插入一个元素的时候会考虑此元素的优先级，根据优先级确定好具体的插入位置。
//其他的删除，查看等操作同基本的队列一样。
//每个元素不再只是一个数据，而是包含数据的优先级。
//优先级队列的应用，头等舱和经济舱的登机顺序，医院的急诊科的排队，计算机线程的优先级顺序确定。

//封装元素和优先级放在一起，封装一个新的构造函数
//添加元素时，将新插入的元素的优先级和队列中已经存在的优先级进行比较，以获得合适的插入位置。

function QueuePriority(){
    //声明属性
    this.items=[];
    //构造内部构造函数，将外部传入的元素和对应优先级传入
    function elementPriority(element,priority){
        this.element=element;
        this.priority=priority;
    }
    //根据元素的优先级将元素插入到指定位置
    this.enqueue=function(element,priority){
    //1、当队列内部为空时，直接将元素插入到对列中即可
    let queueElement=new elementPriority(element,priority)  //通过内部构造函数创建一个对象
    if(this.isEmpty()){
        this.items.push(queueElement);
    }else{
        let added=false;   //判断循环到最后一个元素是否已经加入，若未加入则在队列尾部插入。
        for(let i=0;i<this.items.length;i++){
            if(queueElement.priority<this.items[i].priority){
                this.items.splice(i,0,queueElement);
                added=true;
                break;
            }
        }
        if(!added){
            this.items.push(queueElement);
        }
    }
    }
      //2 从队列中删除元素
      this.dequeue=function(){
        return  this.items.shift();
      }
      //3 查看队列前端的元素，也就是队列首部的元素
      this.front=function(){
         return this.items[0];
      }
      //4 查看队列是否为空
      this.isEmpty=function(){
          return this.items.length===0;
      }
      //5 查看队列当前的数组的大小
      this.size=function(){
          return this.items.length;
      }
      //6 字符串输出
      this.toString=function(){
          if(this.isEmpty()){
              return '';
          }else{
              let formString='';
              for(let i=0;i<this.items.length;i++){
                  formString+=this.items[i].element+'-'+this.items[i].priority+'  ';
              }
              return formString;
          }
      }
}

let testQueue=new QueuePriority();
testQueue.enqueue('lsx',233);
testQueue.enqueue('zdy',263);
testQueue.enqueue('lls',245);
testQueue.enqueue('hyw',198);
let queueResult=testQueue.toString();
console.log(queueResult);
console.log(testQueue.items);


