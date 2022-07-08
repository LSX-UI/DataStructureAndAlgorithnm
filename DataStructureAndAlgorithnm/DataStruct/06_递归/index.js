//什么是递归呢？递归只是一种解决问题的方法，将大的问题划分为很多个小的问题，一般涉及到函数的自身调用问题。
//递归函数就是能直白的直接调用自身的一种函数结构。每一个递归函数都必须存在一个基线条件，也就是停止自身调用的临界点。
//和迭代相比，递归的计算速度比较慢，但其简化代码，而且可以在不能使用迭代的算法中使用。

//计算一个数的阶乘
//传统的迭代阶乘
function factorialInterative(num){
    if(num<0) return undefined;
    let multiply=1;
    for(let i=num;i>0;i--){
       multiply*=i;
    }
    return multiply;
}
console.log(factorialInterative(100));

//递归阶乘

function factorial(num){
    //设置基线条件，当num减到1的时候退出递归调用。
    if(num===1){
        return 1;
    }
    return num*factorial(num-1);
}
console.log(factorial(100));

//如果递归函数结构中没有补充基线条件，则会陷入到无限的循环调用中，浏览器会抛出栈溢出错误。
//不同操作系统和不同的浏览器对于递归深度的限制不同，但相差不大，基本上在15000次左右。

//ES6提供了尾部调用优化，如果函数内的最后一个操作是函数调用，会通过跳转指令，而不是子程序调用，也就是可以一直执行下去。


//斐波那契数列，求数列中第n项的值
//传统的迭代方法

function fabInterative(n){
    //先考虑一下开始的三个特殊的位置
    if(n<1) return 0;
    if(n<=2) return 1;
    let fabNum0=0;
    let fabNum1=1;
    let fabN=n;
    for(let i=2;i<=n;i++){
        //循环往复赋值调用。
        fabN=fabNum1+fabNum0; //f(n-1)+f(n-2);
        fabNum0=fabNum1;
        fabNum1=fabN;
    }
    console.log(fabN);
}
fabInterative(6);

//递归函数计算方法
function fibonacci(n){
    if(n<1) return 0;
    if(n<=2) return 1;
    return fibonacci(n-1)+fibonacci(n-2); //当前项等于前两项之和。
}

console.log(fibonacci(6));

//记忆化的斐波那契数列
function fibonacciMemoization(n){
    let memo=[0,1];
    const fibonacci=(n)=>{
        if(memo[n]!==null) return memo[n];
        return memo[n]=fibonacci(n-1)+fibonacci(n-2);
    };
    return fibonacci;
    
}