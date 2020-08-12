## requireJS简介

`requireJS`是提供给浏览器使用的，由于浏览器在加载模块时模块可能存放于服务端，所以不能使用同步的加载方式，否则可能会造成浏览器假死的现象，所以`requireJS`采用的是`AMD（asynchronous module defineition）`异步模块加载。

### use：

1. 首先需要使用`script`标签引入最新的`requireJS`源码

```js
<script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js"></script>
```
2. 引入成功后在`script`标签上加上`data-main`引入主模块。

```js
<script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js" data-main="./main.js"></script>
```

3. 在`mian.js`文件中可以使用`require`导入模块。

```js
require(['moduleA', 'moduleB'], function(moduleA, moduleB) {
 // do...
})
```
`require`的第一个参数表示依赖的模块数组，当模块加载完成后就会执行后面的回调函数。加载模块的会按照加载顺序作为参数传入回调函数。

4. require config

```js
require.config({
  baseUrl: '',
  paths: {
    moduleA: './path/moduleA',
    moduleB: './path/moduleB'
  }
})
```
使用`require.config`可以对加载模块进行一些相关的配置。

5. 定义模块

```js
define(function() {
  const add = (x, y) => {
    return x + y
  }
  return {
    add
  }
})
```
定义模块使用`define`函数，接收一个回调函数，回调函数的返回值就是模块的导出值。
