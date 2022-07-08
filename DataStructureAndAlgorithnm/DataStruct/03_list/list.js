//链表：
//1、数组的创建通常需要申请一段连续的内存空间，大小是固定的。当数组容量不能很好的满足容量
//需求时，需要进行扩容，扩容很消耗性能。
//2、在数组头部和中间插入元素时成本很高，需要进行大量数据的移动操作。

//链表的好处；
//1、链表中的元素在内存中不必是连续的内存空间。
//2、链表的每一个元素是由一个存储元素本身的节点和指向下一个元素的引用所组成的。

//优点
//1、内存空间不必要连续
//2、不必在创建时就确定大小，并且大小可以无限延伸下去。
//3、链表在插入和删除数据时，时间复杂度可以达到常数级，相对于数组效率高很多。
//数组的效率高在可以直接通过索引值查找对应的元素值，各有优缺点。
// 链表类似于火车头，火车头会连接一个节点，节点上有数据，并且这个节点会连接到下一个节点，以此
//类推。

// class LinkList{
//     constructor(element){
//         this.element=element;
//         this.head=undefined;
//     }
// }

function LinkList(){
    //1 内部节点类
    function Node(data){
           this.data=data;
           this.next=null;
    }
    //属性
    this.head=null;
    this.length=0;

    //方法
    //1、向列表的尾部添加一个新的项。
    this.append=(data)=>{
        let newNode=new Node(data);
        //链表里面如果为空，则直接将head指向插入的节点元素。
        if(this.length===0){
            this.head=newNode;    //将newNode赋值给this.head表示其指向。
        }else{
            //循环找到最后一个节点，while循环体可以实现查找到满足条件的元素
            let current=this.head;  //声明一个变量表示链表中的第一个节点。
           while(current.next!==null){
                current=current.next;
           }
           //并将其指向赋值给newNode完成在链表尾部添加元素
           current.next=newNode;
        }
        //插入元素后别忘了将链表的长度加1
        this.length+=1;
    }
    //2、insert方法，将元素插入到链表指定的位置
    this.insert=(position,data)=>{
        let newNode=new Node(data);
        //检查越界值，如果不在范围内，则返回false
        if(position<0||position>this.length) return false;
        //当链表内部为空时，直接插入到第一个位置，默认的索引位置从1开始
        // this.append(data);
        // this.length+=1;
        if(position==0){
            //断开head和当前第一个元素的关系，将插入的元素的next指向当前第一个元素
            newNode.next=this.head;
            //再将head的指向调整为newNode。
            this.head=newNode;
        }else{
            //插入的位置不是第一个
            //声明一个变量存储第一个元素，以及一个变量接收当前元素的前一个元素
            //声明一个变量index作为查找指定位置的循环条件
            let index=0;
            let current=this.head;
            let previous=null;
            while(index++!=position){
                previous=current;   //存储当前位置元素
                current=current.next; //将当前元素指向下一个循环
            }
            //查找到指定位置后，将需要插入的元素位置的next指向current表示其向后移动一位
            newNode.next=current;
            //前一个元素的next指向需要插入的元素。
            previous.next=newNode
        }
        //插入元素完成后，链表长度增加1
        this.length+=1;
        return true;
    }
    //3、返回指定位置的元素值
    this.getPosition=(position)=>{
        if(position<0||position>=this.length) return null; 
        let current=this.head; //存储第一个元素
        let index=0; //查找到满足条件的元素
        while(index++!==position){
            current=current.next;
        }
        return current.data;
    }
    //4、返回元素在列表中的索引。如果没有该元素，则返回-1
    //链表中查找元素要从第一个元素开始
    this.indexOf=(data)=>{
        let current=this.head;
        let index=0;
        //依旧使用当current为空作为循环退出条件
        while(current){
            if(current.data==data){
                return index;
            }
            current=current.next;
            index+=1;
        }
        //循环体结束还没有找到，表示元素不存在。
        return -1;
    }
    //5、修改某个元素的位置。即根据给定的位置信息将其替换成最新的
    this.update=(position,data)=>{
        //先做是否越界的判断
        if(position<0||position>=this.length) return false;
        let current=this.head;
        let index=0;
        while(index!==position){
            current=current.next;
            index+=1;
        }
        //找到了指定位置的元素，将其新传入的值重新赋值
        current.data=data;
        return true;
    }
    //6、将指定位置的移出一项
    this.removeAt=(position)=>{
       if(position<0||position>=this.length) return false;
       if(position==0){
           this.head=this.head.next;
       }
       let current=this.head;
       let previous=null;
       let index=0;
       while(index!==position){
           previous=current;
           current=current.next;
           index+=1;
       }
       previous.next=current.next; //断开指定元素的连接就是将指定元素的下一个元素和当前元素的前一个元素建立索引关系
       //delete current;  无需删除
       this.length-=1;
       return true;
    }
    //7、删除指定位置的一项。
    this.remove=(data)=>{
        //直接调用前面封装好的查找和删除方法
        let position=this.indexOf(data);
        //根据查找到的位置信息删除元素
        return this.removeAt(position);
    }
    //判断链表内容是否为空
    this.isEmpty=()=>{
        return this.length===0;
    }
    // 返回链表中元素的个数多少
    this.size=()=>{
        return this.length;
    }
    //toString方法
      this.toString=()=>{
          //1、获取链表中的第一个元素,实际上根据this.head表示的就是第一个元素。
          let current=this.head;
          //2、定义一个空的字符串来接收结果
          let resultString="";
          while(current){
              resultString+=current.data+" ";  //循环迭代字符串化。
              current=current.next;   //自身字符串化之后指向下一个节点，直到指向空退出循环
          }
          return resultString;
      }
}

let links=new LinkList();
//1、测试向链表尾部添加元素的方法
links.append('lsx');
links.append('lls');
links.append('zdy');
console.log(links.toString())
//2、测试向链表的指定位置添加元素的方法
links.insert(3,'hyw'); 
//3、测试将链表中的数据字符串输出的方法
console.log(links.toString());
console.log(links.length);
//4、测试链表的长度是否正确
console.log(links.isEmpty());
//5、测试获取指定位置元素的方法
console.log(links.getPosition(3));
//6、查找指定元素在链表中索引值的方法
console.log(links.indexOf('lls'));
console.log(links.indexOf('zzz'));
//7、将链表中指定位置的元素进行更新的方法
console.log(links.update(1,'sjj'));
console.log(links.toString());
//8、移出指定位置元素的方法
console.log(links.removeAt(3));
console.log(links.toString());
//9、移出指定元素的方法
console.log(links.remove("zdy"));  //测试remove其返回值结果为true，证明查找到了此元素进行删除。
console.log(links.toString());
