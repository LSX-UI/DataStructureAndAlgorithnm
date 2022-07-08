

//堆的相关概念
//堆的本质上还是一种特殊的二叉树，可以用于快速高效的查找出最大值和最小值，常被用于优先队列。
//1、是一颗完全二叉树，表示树的每一层都具有左侧和右侧节点（除了最外侧的叶子节点），并且最后一层的叶子节点都尽可能的是左侧节点。
//2、二叉堆不是最小堆就是最大堆，最小堆允许你快速导出树的最小值，最大堆允许你导出树的最大值。所有节点都大于等于（最大堆）或小于等于
//（最小堆）它的每个子节点。这被称之为堆特性。

function defaultCompare(a,b){
    if(a===b){
        return 0;
    }
    return a<b?-1:1;
}

//基于数组实现一个最小堆结构
class miniHeap{
    constructor(compareFn=defaultCompare){
        this.compareFn=compareFn;
        this.heap=[];
    }
    getLeftIndex(index){
      return index*2+1;
    }
    getRightIndex(index){
        return index*2+2;
    }
    getParentIndex(index){
        if(index===0){
            return undefined;
        }
    return Math.floor((index-1)/2)
    }
    //堆数据结构中的主要三个操作方法
    //向堆中插入一个元素，插入成功则返回true,否则返回值为false。
    //交换函数swap进行两个元素的位置的交换
    swap(array,a,b){
        let temp=array[a];
        array[a]=array[b];
        array[b]=temp;

    }
    //向上移动的函数
    siftUp(index){
        let parent=this.getParentIndex(index);
        while(index>0&&(this.heap[parent]-this.heap[index]>0)){
            this.swap(this.heap,parent,index);
            index=parent; //重复此过程进行循环迭代
            parent=this.getParentIndex(index);
        }
    }
    insert(value){
      if(value!==null){
        this.heap.push(value);
        //将此节点与其父节点进行交换，直至其大于父节点
        this.siftUp(this.heap.length-1);
        return true;    
      }
      return false;
    }
    //返回堆中元素的个数
    size(){
        return this.heap.length;
    }
    isEmpty(){
        return this.heap.length===0;
    }
    //返回堆中的最小元素值
    endMiniNum(){
        return this.isEmpty?undefined:this.heap[0];
    }
     //导出堆中的最小值，对于最小堆而言，就是导出其根节点
   extract(){
    if(this.isEmpty()){
       return undefined;
    }
    if(this.size()==1){
       return this.heap.shift();
    }
    //将堆中的第一个元素移除后，再将最后一个元素赋值到第一个元素的位置，传入执行下移操作即可。
    const removeValue=this.heap.shift();
    this.heap[0]=this.heap.pop();
    //传入堆中的第一个元素，也就是最小值。
    this.siftDown(0);
    return removeValue;
  }
   //下移操作，实现导出堆中的最大值或最小值，具体的根据最大堆还是最小堆来确定
   //已经确定是最小堆的情况下，可以知道移除根节点之后将数组的最后一位元素放入到根节点之中，然后依次将其和子节点比较下移。
   siftDown(index){
    let element=index;
    //获取左右节点的索引值以便于进行对比
    let right=this.getRightIndex(index);
    let left=this.getLeftIndex(index);
    const size=this.size();
    //优先插入到左子树，根据堆的结构特性。
    //直接比较左右子节点的位置，直接和小的交换位置
    const changeWithLeft=left<size&&(right>left);
    const changeWithRight=right<size&&(right<left);
    if(changeWithLeft){
        element=left;
    }
    if(changeWithRight){
        element=right;
    }
    
    // if(left<size&&(this.heap[left]-this.heap[element])<0){
    //         element=left;
    // }
    // if(right<size&&(this.heap[right]-this.heap[element]<0)){
    //     element=right;
    // }
    if(index!==element){
        this.swap(this.heap,index,element);
        //自身的递归调用
        this.siftDown(element);
    }
   }

  
   
}


let exapmle=new miniHeap();
exapmle.insert(2);
exapmle.insert(3);
exapmle.insert(4);
exapmle.insert(5);
exapmle.insert(1);
exapmle.insert(1.5);
console.log(exapmle);
console.log(exapmle.heap);
console.log(exapmle.extract());
//exapmle.extract();
console.log(exapmle.heap);
//在代码结束后面加上一个断点，可以直接在调试控制台打印输出对象并展开各属性。
debugger;