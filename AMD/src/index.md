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

