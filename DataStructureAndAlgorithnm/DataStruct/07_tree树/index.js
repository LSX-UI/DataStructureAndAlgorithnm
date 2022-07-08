//树结构  0606
//从实际生活中的树来理解树的结构，树根、树干、树枝、树叶。
//模拟公司的组织架构。
//树这种数据结构综合了前面的数据结构的一些优点。
//树的结构是非线性的，可以表示一对多的关系。
//比如文件目录，家族谱。


//树：n(n>=0) 个节点构成的有限集合。
//n=0 时称之为空树。/
//树的结构中有一个称之为根的特殊节点，其余节点可以分为m个互不相交子集合，每个集合本身就是一颗树，称之为原来树的子树。
//节点的度Degree；节点的子树个数。
//树的度：树的所有节点中最大的度数。
//叶节点leaf;度为0的节点
//父节点Parent;有子树的节点是其子树的根节点的父节点
//子节点child；父节点的相对关系。
//路径和路径长度；从节点n1到节点nk的路径为一个节点序列，路径所包含边的个数为路径的长度。
//节点的层次level;一般规定根节点在1层，其他的就是在其父节点的层数加1。
//数的深度Depth;树中所有的节点中最大层次是树的深度。

//关于二叉树
//每个节点最多只有两个子节点
//可以为空，也就是没有节点，存在五种形态。
//二叉树几个重要的特性
//1、一个二叉树中第i层的最大节点为：2^(i-1),i>=1
//2、深度为k的二叉树节点总数为2^k-1 ；k>=1; 
//3、对于任何的非空二叉树T,若n0表示叶节点的个数、n2是度为2的非叶节点个数，则两者满足n0=n2+1;
//完美二叉树，除了最下面一层的叶子节点以外，每层节点都具有2个子节点。
//完全二叉树，除了二叉树的最后一层以外，其他各层的节点数都达到最大个数。
//二叉树存储的常见方式是数组和链表
//完全二叉树从上至下、从左往右进行存储，此种方式对于非完全二叉树会造成空间的浪费。
//二叉搜索树BST Binary Search Tree 如此特性便于查找到指定的数值。
//非空左子树的所有键值小于其根节点的键值
//非空右子树的所有键值大于其根节点的键值
//左右子树本身也都是二叉搜索树。
//查找时的思想用到了二分查找的思想，插入节点时也使用到了类似的方法，一层层的比较大小，找到新节点合适的位置。
//便于快速创建树中的节点元素。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
class Node{
    constructor(key){
        this.key=key;
        this.left=null;
        this.right=null;
    }
} 

class BinarySearchTree{
    constructor(){
        this.root=null;    //指向树的根节点。
    }

    //1、向数中插入一个子节点
    insert(key){
        //创建一个新的子节点
        const newNode=new Node(key);
        //判断根节点是否为空，如果为空，则直接插在根节点上，否则调用函数进行查找空节点
        if(this.root==null){
            this.root=newNode;
        }else{
            this.insertNode(this.root,newNode);
        }
    }
    //使用递归的节点查找插入函数 
    insertNode(node,newNode){
        //debugger;  //错误调试
        if(newNode.key>node.key){
            if(node.right===null){
                node.right=newNode;
            }else{
                //利用递归直到查找到满足条件的插入位置。
                this.insertNode(node.right,newNode);
            }
        }else{
            if(node.left===null){
               node.left=newNode;
            }else{
                this.insertNode(node.left,newNode);
            }
        }
    }

    //2、关于二叉树的遍历问题，适用于一切二叉树，而不仅仅是搜索二叉树。
    //存在着三种方式，中序、先序、以及后序。
    //1)先序遍历：先访问根节点、先序遍历其左子树、再遍历其右子树。
    preOrderTraverse(){
       this.preOrderTraverseNode(this.root);
    }
    preOrderTraverseNode(node){
       if(node===null) return;
       console.log(node.key);
       //使用递归先查找左子树，再执行查找右子树，按照插入的顺序重新进行打印。
       this.preOrderTraverseNode(node.left);
       this.preOrderTraverseNode(node.right); 
    }
    //2)中序遍历,中序遍历其左子树，访问根节点，中序遍历其右子树。按照从小到大顺序将树中的元素进行排列
    //中序遍历中的按照从小到大的顺序有利于我们查找最大值和最小值。
    inOrderTraverse(){
        this.inOrderTraversNode(this.root);
    }
    inOrderTraversNode(node){
        //递归使用到了函数调用栈，先进后出，直到为空后依次出栈。再执行下一次的函数调用栈压栈和入栈操作。
       if(node===null) return;  //返回为空的意思是？
       this.inOrderTraversNode(node.left);
       console.log(node.key);  
       this.inOrderTraversNode(node.right);
    }
    //3)后序遍历，后序遍历其左子树，遍历其左子树，访问根节点。
    postOrderTraverse(){
       this.postOrderTraverseNode(this.root);
    }
    postOrderTraverseNode(node){
      if(node===null) return;
      this.postOrderTraverseNode(node.left);
      this.postOrderTraverseNode(node.right);
      console.log(node.key);
    }

    //3、查找二叉树中的最大值和最小值
    //二叉树中最左侧的叶子节点值最小，最右侧的叶子节点值最大。
    findMinNode(){
        let node=this.root;
        while(node.left!==null){
            node=node.left;
        }
        return node.key;
    }
    findMaxNode(){
        let node=this.root;
        while(node.right!==null){
           node=node.right;
        }
        return node.key;
    }
    //4、搜索操作封装，获取特定的值。可以使用二分查找的思想方法。
    searchByRecursive(key){
        //从根节点开始查找满足指定值的元素节点。
        return this.searchNode(this.root,key);
    }
    searchNode(node,key){
        //如果二叉树为空，则直接返回值为false
        if(node===null)  return false;
        //不为空则进行分类搜索
        if(key>node.key){
           return this.searchNode(node.right,key);
        }else if(key<node.key){
           return this.searchNode(node.left,key);
        }else{
            return true;
        }
    }
    searchByCircle(key){
        let node=this.root;
        if(node===null) return false;
        //while循环适用于循环次数不确定的时候，而for循环适用于循环次数确定的时候。
        while(node!==null){
            if(key>node.key){
                node=node.right;
            }else if(key<node.key){
                node=node.left;
            }else{
                return true;
            }
        }
      return false;
    }
    //5、从二叉树中删除指定元素，此方法最为复杂，分类的情况最多。
    //1)删除叶子节点，即没有子节点
    // 需要检测current的left和right是否都为null
    // 都为null之后还要检测current是否为根，如果为根，则要清空二叉树
    // 否则就将父节点的right或left设置为null即可。
    //2)存在一个子节点
    //3)存在两个子节点。

    //删除操作的总结
    //1、很多程序员都想避开删除操作，其做法是在Node类中添加一个boolean字段，比如名称为isDeleted
    //2、需要删除节点时将此元素设置为true，其他操作比如find()在查找之前先判断此节点是否已删除。
    //3、相对比较简单，不会改变原来树的结构
    //4、但二叉树中依旧保存着本应该删除的元素值
    //上述做法会造成很大的空间浪费
    //且不利于自己思维逻辑的锻炼。

    //1、先在二叉树中找到此节点
    removeNode(key){
        //声明一些变量记录状态
        let current=this.root;
        let parent=null;
        let isLeftChild=true;
        while(current.key!==key){
            parent=current;
            //分左右节点分别讨论
            if(key<current.key){
                isLeftChild=true;
                current=current.left;
            }else{
                isLeftChild=false;
                current=current.right;
            }
            //未找到节点，说明需要删除的节点元素在二叉树中并不存在的，直接返回值为false。
            if(current===null)  return false;
        }
        //离开while循环，说明找到了指定的元素
        //1、删除的节点是叶子节点，即左右都是null
        if(current.right===null&&current.left===null){
            if(current==this.root){
                this.root=null;
            }else if(isLeftChild){
                parent.left=null;  //current记录的是当前需要删除的元素，通过parent来进行删除操作。
            }else{
                parent.right=null
            }
        }
        //2、仅存在一个节点，左节点或右节点
        else if(current.right===null){
            //仅存在左节点
            if(current==this.root){
                this.root=current.left;
            }else if(isLeftChild){
                parent.left=current.left;
            }else{
                parent.right=current.left;
            }
        }
        else if(current.left===null){
            //仅存在着右节点
            if(current==this.root){
                this.root=current.right;
            }else if(isLeftChild){
                parent.left=current.right;
            }else{
                parent.right=current.right;
            }
        }
        //3、存在两个节点，即左右节点同时存在的情况。
        //子节点中还存在着有1个子节点、2个子节点的情况，此时我们需要从下面的子节点中找到一个节点，来替换当前的节点。
        //需要找到的节点有什么特征呢？应该是current节点下面所有节点中最接近current节点值的。
        //比current小一点点的节点，一定是current中左子树的最大值，此节点称之为前驱。
        //比current大一点点的节点，一定是current中右子树的最小值，此节点称之为后继。
        //找到前驱和后继是删除有两个子节点的current的关键。
        else{
            //1、获取后继节点
            let successor=this.getSuccessor(current);
            //2、是否是根节点 
            if(current==this.root){
                this.root=successor;  //直接将后继节点赋值给根节点
            }else if(isLeftChild){
                //判断是左节点
                parent.left=successor;
            }else{
                //判断为右节点的时候
                parent.right=successor;
            }
            successor.left=current.left;   //此处应该如何理解呢？将被删除节点的左子树中的元素索引变换为替换删除节点的后继节点的左子树。
            
        }
        return true;
    }
    //获取需要删除元素的后继节点
    getSuccessor(delNode){
        //定义变量、来存储临时节点
        let successerParent=delNode;
        let successor=delNode;
        let current=delNode.right;   //后继节点在右子树中最小的节点值，一直往右侧查找。
        //寻找节点
        while(current!=null){
            successerParent=successor;
            successor=current;
            current=current.left;
        }
        if(successor!=delNode.right){
            //如果不是叶子节点，则需要进行以下的指针指向变化。
            //将后继节点的右子节点分配给后继节点的父节点左侧
            //将被删除节点的右侧节点赋值给后继节点的右侧，相当于断开被删除节点，后继节点与被删除节点进行位置的替换操作。
             successerParent.left=successor.right;
             successor.right=delNode.right;
        }
        return successor;
    }

}


//测试代码
let treeTest=new BinarySearchTree();
//1、测试插入元素节点
treeTest.insert(100);
treeTest.insert(90);
treeTest.insert(110);
treeTest.insert(70);
treeTest.insert(85);
treeTest.insert(74);
treeTest.insert(65);
treeTest.insert(80);
treeTest.insert(87);
treeTest.insert(105);
treeTest.insert(115);
console.log(treeTest);
//2、测试三种遍历方法
console.log(treeTest.preOrderTraverse());
console.log(treeTest.inOrderTraverse());
console.log(treeTest.postOrderTraverse());
//3、测试查找二叉树中的最大值和最小值问题
console.log('此二叉树中最大的元素值为：',treeTest.findMaxNode());
console.log('此二叉树中最小的元素值为：',treeTest.findMinNode());
//4、测试查找指定元素是否在二叉树中存在。 递归和循环迭代两种方法
//1)递归的方法
console.log(treeTest.searchByRecursive(65));
console.log(treeTest.searchByRecursive(40));
//2)循环迭代的方法
console.log(treeTest.searchByCircle(74));
console.log(treeTest.searchByCircle(75));
//5、删除二叉树中的指定节点
console.log(treeTest.inOrderTraverse());
console.log('移出掉二叉树中的',treeTest.removeNode(87));
console.log(treeTest.removeNode(70))
treeTest.inOrderTraverse();
