//栈是一种什么样的数据结构？
//遵循LIFO,即先进后出的规则。
//1、创建栈
// 基于数组实现，先采用基于数组实现。
// 基于链表实现
class Stack {
    constructor() {
            this.item = [];
        }
    //创建操作数组的各类方法
    push(element) {
        this.item.push(element); //栈顶添加元素，返回的是添加元素后的数组。
    }
    pop() {
        return this.item.pop(); //删除栈顶元素，需要注意的是pop方法返回的是删除后的栈
    }
    peek() {
        return this.item[this.item.length - 1]; //返回栈顶的元素，索引值从0开始的，因此栈的长度减一就是栈顶元素的索引值
    }
    size() {
        return this.item.length; //返回栈的长度值
    }
    isEmpty() {
        return this.item.length === 0; //判断栈是否为空
    }
    //清空栈
    clear() {
        this.item = [];
    }
    //转化为字符串
    toString(){
        let resultString='';
        for(let i=0;i<this.item.length;i++){
            resultString+=this.item[i]+'';
        } 
        return resultString;
    }
}
 //十进制转换成二进制的函数封装
 function decimalToBinary(decNumber){
     //1 定义栈的对象
     let stack=new Stack();
     // 2 循环操作，不确定循环次数，使用while循环体 
     while(decNumber>0){
        //循环体里面将每次取余的余数压入栈内
        stack.push(decNumber%2);
        //获取每次取余后的数再次传入循环体中,除以2后向下取整重新赋值。
        decNumber=Math.floor(decNumber/2);
     }
     //第二个循环体，当栈内不为空时，将栈内的元素循环出栈
     let binaryString='';
     while(!stack.isEmpty()){
        binaryString+=stack.pop()+'';
     }
     return binaryString;      //将转换完成后的二进制以字符串的形式输出。

}
//2、使用栈
//通过new 操作符创建栈的实例
let stack = new Stack();
//console.log(stack.isEmpty());
stack.push(199);
stack.push(2000);
//console.log(stack.item);
stack.pop();
console.log(stack.item);
stack.push(2003);
stack.push(2008);
console.log(stack.size());
console.log(stack.item);

//3、创建一个基于对象的栈，对象存储的对象复杂度相对于数组更高，使用范围也比较广。
//栈和队列都是受限制的线性结构。
//LIFO原则 last in first out后进先出。向一个栈中添加元素称之为进栈、压栈、入栈。
//从一个栈中删除元素又可以称之为出栈或退栈，删除掉栈顶的元素后，把相邻的元素成为栈顶元素。
//何为函数调用栈？不同的函数之间相互调用，外层函数依次压入栈，直到最内层的函数到栈顶开始执行后依次出栈，直到最外层函数调用完成出栈。
//递归深度过深的时候会导致栈溢出，大部分的浏览器对递归的深度都有限制。
class StackObject {
    constructor() {
        //声明一个变狼count,记录对象中元素的个数。
        this.count = 0;
        this.item = {};
    }
    push(element) {
        this.item[this.count] = element;
        this.count++; //向栈中添加对象
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.count === 0;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        } else {
            this.count--;
            let result = this.item[this.count];
            delete this.item[this.count];
            return result; //删除栈顶元素并进行弹出
        }
    }
    peek() {
        if (this.count == 0) {
            return undefined;
        } else {
            return this.item[this.count - 1];
        }
    }
    clear() {
            this.count = 0;
            this.item = []; //清空此栈的内容。
        }
        //创建一个toString对象方法
    toString() {
        if (this.isEmpty()) {
            return '';
        } else {
            let objString = `${this.item[0]}`;
            for (let i = 0; i < this.count; i++) {
                objString = `${objString},${this.item[i]}`;
            }
            return objString;
        }
    }
}