//单向链表
//1、只能从头部遍历到尾部
//2、链表相连的过程是单向的
//3、实现的原理是上一个链表中有一个指向下一个的引用。
//在链表中可以轻松的到达下一个节点，但是回到前一个节点得从头开始，比较麻烦。

//双向链表 
//1、既可以从头遍历到尾部，又可以从尾部遍历到头部。
//2、链表的相连过程是双向的，一个节点中既有向前一个元素的引用，也有一个向后连接的引用。
//双向链表的插入和删除操作时比较复杂，需要处理好四个引用关系，所占用的内存空间也会更大。
class DoubleNode{
    constructor(element){
       this.element=element;
       this.next=null;
       this.prev=null;
    }
}
class DoubleLinkList{
    constructor(){
      this.head=null;
      this.tail=null;
      this.length=0;
    }
    //1、向链表的尾部添加一个元素。
    append(element){
      //如果链表为空，则将元素插入到第一个位置
      let newNode=new DoubleNode(element)
      if(this.length===0){
          //head指向第一个节点，实际上就是第一个元素。
          this.head=newNode;
          //tail指向最后一个节点,实际上就是最后一个元素
          this.tail=newNode;
      }else{
          //链表中存在一个tail表示尾部的节点元素，可以实现从尾部开始查找
          //需要先获取到当前最后一个节点，将其next指向新插入的节点，再改变其tail的指向
          this.tail.next=newNode;
          newNode.prev=this.tail;  //newNode的prev指向当前最后一个节点，
          this.tail=newNode;  //再改变this.tail的指向。
      }
      //链表长度增加1
      this.length+=1;
    }
    //2、向链表的指定位置插入一个元素
    insert(position,element){
        let newNode=new DoubleNode(element);
    //先做越界判断
    if(position<0||position>this.length) return false;
    //其实和单向链表类似，首先是需要找到指定位置的元素，然会对指引进行多一步的处理即可
    //但是需要充分考虑在首部和尾部插入元素时两个tail和head的指向都需要移动变化
    if(position==0){
        if(this.length==0){
            this.head=newNode;
            this.tail=newNode;
        }else{
            //链表中的首部存在了一个元素
            newNode.next=this.head;
            this.head.prev=newNode;
            this.head=newNode;
        }
    }else if(position==this.length){
        //在链表的末尾插入元素
        this.tail.next=newNode;
        newNode.prev=this.tail;
        this.tail=newNode;
    }else{
        //插入到链表的中间部分位置，先要求找到对应的位置，再进行插入操作。
        let current=this.head;
        let previous=null;
        let index=0;
        //通过while循环查找到对应的元素
        while(index<position){
            //保存当前元素
            previous=current;
            //继续赋值下一个元素
            current=current.next;
            //索引值加1
            index++;
        }
        //通过循环查找到了对应的元素值。
        //先断开建立右侧元素的关系
        newNode.next=current;
        current.prev=newNode;
        //再断开建立右侧的联系
        previous.next=newNode;
        newNode.prev=previous;

    } 
    //完成插入后链表的长度加1
    this.length+=1;
    return true;
}
    //3、删除指定位置的元素
    removeAt(position){
        if(position<0||position>=this.length) return null;
        //1 删除链表首部的元素？
        let current=this.head;
        if(position===0){
            //如果链表中仅有一个元素
            if(this.length===1){
                this.head=null;
                this.tail=null;
            }else{
                //链表中不只有一个元素
                this.head=this.head.next;
                this.head.prev=null;
            }  
        }else if(position===this.length-1){
            current=this.tail;
            this.tail.prev.next=null;
            this.tail=this.tail.prev;
        }else{
            let previous=null;
            let index=0;
            while(index!==position){
                previous=current;
                current=current.next;
                index++;
            }
            //找到目标元素后，断开指向关系并建立新的指引关系
            //右侧写需要指向的值，左侧写相关节点元素的指引
            current.next.prev=previous;
            previous.next=current.next;
            this.length--;
        }
        return current.element;
    }
    //双向链表中的update方法其实和普通链表中的一样，找到元素后，进行替换掉
    update(position,newElement){
          if(position<0||position>=this.length) return false;
          //let newNode=new DoubleNode(position,newElement);
          let current=this.head;
          let index=0;
          while(index!==position){
             if(current.element==newElement){
                 return current;
             }
             current=current.next;
             index++;
          } 
           current.element=newElement;
          return true;
    }
    //返回指定元素值的下标索引值
    indexOf(newElement){
        let current=this.head;
        let index=0;  //作为定义的索引值数据返回
        //以current不为空作为循环判断条件
        while(current){
            if(current.element==newElement){
                return index;
            }
            current=current.next;
            index++;
        }
        return -1; //没有查找到，则返回空值。
    }

    isEmpty(){
        return this.length===0;
    }
    size(){
        return this.length;
    }
    //将链表中的所有数据以字符串的形式输出
    toString(){
     let resultString='';
     let current=this.head;
     while(current){
         resultString+=current.element+' ';
         current=current.next;
     }
     return resultString;
    }
}

const dbl=new DoubleLinkList();
//1、测试向链表尾部添加元素的方法
dbl.append('lsx');
dbl.append('zdy');
dbl.append('hyw');
dbl.append('sx');
dbl.append('tz');
console.log(dbl.length);
console.log(dbl.toString())
//2、测试Insert方法
dbl.insert(3,'wsy');
dbl.insert(2,'sjj');
console.log(dbl.toString());
//3、测试指定位置删除元素，并返回所删除的元素的方法
console.log(dbl.removeAt(2));
//console.log(dbl.length);
console.log(dbl.toString());
//4、测试更新指定位置元素的方法
dbl.update(1,'dsd');
//5、测试返回指定元素下标索引的方法。
console.log(dbl.indexOf('dsd')); 
console.log(dbl.toString());
console.log(dbl.length);
//console.log(dbl);

class StackLinkList{
    constructor(){
        //使用双向链表来存储数据
        this.items=new DoubleLinkList();
    }
    //1、将元素压入栈
    push(element){
        this.items.append(element)
    }
    //2、将元素出栈
    pop(){
        //先判断栈内是否为空，为空则返回Undefined;
        if(this.items.isEmpty()) return undefined;
        return this.items.removeAt(this.items.length-1);  //将栈顶的元素定向删除，也就是出栈
    }
}
//测试代码
let stack=new StackLinkList();
stack.push('111');
stack.push('222');
console.log(stack);
console.log(stack.pop('222'));
