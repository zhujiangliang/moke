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

### function

```js
function test(a, b) {
    console.log(test.length) //形参
    console.log(arguments.length) //实参
}
test(1, 2)
```



