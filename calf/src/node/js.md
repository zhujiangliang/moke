### object

```js
const a = [1, 2, 3]
const b = a
// 1
a.push(4)
console.log(b) // [1, 2, 3, 4]

//2
a = [...a, 4]
console.log(b) // [1, 2, 3]
```

### 显示转换

```js
parseFloat() 所解析的字符串中第一个小数点是有效的，而parseInt() 遇到小数点会停止解析，因为小数点并不是有效的数字字符。
parseFloat() 始终会忽略前导的零，十六进制格式的字符串始终会被转换成0，而parseInt() 第二个参数可以设置基数，按照这个基数的进制来转换。

toFixed(2) 保留小数位数
str.toString() 有参数，进制转换

NaN不等于任何数，包括本身
 
undefined == 0 // > < == false
null == 0 // > < == false
null == undefind // true

isNaN(null) // false
isNaN(undefined) // true  首先经过Number()再对比
```

```js
console.log(a) // error
console.log(typeof(a)) // 'undefined'

console.log(-true) // -1
console.log(+undefined) // NaN
```



### function

```js
JS: GO 和 AO
GO： global object 即 全局上下文

AO :activation object 活跃对象，函数上下文,在函数执行之前进行的一个步骤

AO
AO步骤：

创建AO（Activation Object）对象，又叫执行期上下文；
寻找形式参数和变量声明作为AO的属性名，并赋值为undefined；
传入实际参数的值；
在函数体内寻找函数声明，放入作为AO的属性，并赋值为其函数体。
GO
GO步骤：

创建GO（Global Object）对象；
寻找变量声明作为GO的属性名，并赋值为undefined；
寻找函数声明，放入作为GO的属性，并赋值为其函数体。
函数作用域[[scope]]：
运行期上下文：当函数执行时，会创建一个名为执行期上下文的内部对象，它定义了一个函数执行时的环境。函数每次执行时其上下文是唯一的，多次调用一个函数会生成多个执行期上下文，当函数调用完，其对应的执行期上下文被销毁。查找变量时则从作用域的顶端开始查找。
```

![](C:\Users\ZhuLiang\AppData\Roaming\Typora\typora-user-images\1637549632978.png)

![1637549780853](C:\Users\ZhuLiang\AppData\Roaming\Typora\typora-user-images\1637549780853.png)

```js
function test(a, b) {
    console.log(test.length) //形参
    console.log(arguments.length) //实参
}
test(1, 2)

function test(a = 1, b = 2) {
    //上面这是es6的写法，低版本不支持
    a = arguments[0] || 1
    b = arguments[1] || 2
    console.log(a, b) //1, 4
}
test(undefined, 4)
```

##### 递归

```js
// 阶乘
function fact (n) {
    if (n === 1) return 1
    return n * fact(n - 1)
}
console.log(fact(4))
// fact(4) = 4 * fact(3)
// fact(3) = 3 * fact(2)
// fact(2) = 2 * fact(1)

// 斐波拉契
function sum (n) {
    if (n <= 2) return 1
    return sum(n - 1) + sum(n - 2)
}
console.log(sum(5))  // 5
// sum(5) = sum(4) + sum(3) = sum(2) + sum(1) + sum(2) + sum(2) + sum(1)
// sum(4) = sum(3) + sum(2)
// sum(3) = sum(2) + sum(1)
```

### 预编译

```js
函数声明整体提升，变量只有声明提升，赋值不提升

A0：（GO少了第一步形参和第二步）
1、形参和变量声明
2、实参值赋值给形参
3、寻找函数声明
4、执行函数


function test() {
    var a = b = 1
}
test()
console.log(a) // error
console.log(window) // undefined
```

```js
// 作用域提升

function test (a) {
    console.log(a)
    a = 1
    console.log(a)
    function a () { }
    console.log(a)
    var b = function () { }
    console.log(b)
    function d () { }
}
test(2)
```

### 闭包

```js
立即执行函数表达式：IIFE（Immediately-invoked function expression）
(function(){})()
(function(){}())  // w3c建议
函数声明变成表达式的方法：前面加+、-、！、1 &&、0||
+ function test1(){
    console.log('test1')
} ()

// 立即执行函数执行后销毁	？有争议
var test = function () {
    console.log("2")
}()
console.log(test1)
// 打印出：   2    undefined
```

```js
一定是表达式才能被执行符合执行
(function test1(){
    console.log('test1')
})()

var test2 = function (){
    console.log('test2')
}()

fuction test3() {
    console.log('test3')
}()								// 错误

函数声明变成表达式的方法：前面加+、-、！、1 &&、0||
+ function test1(){
    console.log('test1')
} ()
```

```js
变成了表达式，忽略名字
(function (){
    console.log(123)
})()

(function test(){
    console.log(123)
})()
```

```js
// 面试：
function test(a) {
    console.log(1)
}(6)	// 不报错，但是函数也不执行

function test(a) {
    console.log(1)
}()		// 报错

// 逗号是一种运算符，返回最后一个
console.log((3, 4 + 4))  // 8
```



### new

```js
不能说string有length属性，而是包装类

console.log(new String())

const str = 'abc';
str.length = 1;  		//  => new String(str).length = 1; delete
console.lo(str.length); //	=> console.lo(new String('abc').length); // 3

```

