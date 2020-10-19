`commonJS`定义了模块加载的规范，主要是两个函数：

- `module`：导出模块
- `require`：导入模块

由于`ECMAScript`不支持两个函数，所以**不支持在浏览器中使用**。

使用`CommonJS`在执行模块代码时，**会将代码包装在一个函数内部**，避免作用域的污染：

```javascript
(function(exports, require, module, __filename, __dirname) {
  // exec
})
```

## require

```js
const moduleA = require('moduleA')
const moduleB = require('./moduleB')
const moduleC = require('/Users/xx/moduleB')
```

导入模块的语法非常简单，对于`nodeJS`的原生模块以及`node_modules`中的模块可以直接输入模块的名称，对于自定义模块可以使用模块的相对路径或者绝对路径。

1. 如果在使用`require`时路径以`/`开头，则是加载绝对路径下的文件模块。
2. 如果在使用`requier`时路径以`./`、`../`开头则加载相对路径（相对于当前脚本执行的位置）下的模块。
3. 如果在使用`require`时路劲不以`/`、`./`、`../`开头，则表示加载一个核心模块或者`node_modules`中的模块。**在加载首先会在`/usr/local/lib/node`目录下加载核心模块；然后才是从当前的`node_modules`加载已安装的模块，如果当前`node_modules`没有找到则在父级的`node_modules`中查找，直到根目录。**

在加载模块的过程，**第一次加载会将该模块放在缓存中，后续直接从缓存中读取**。并且如果在加载时没有发现指定的文件模块，`Node`会尝试给文件加上`.js .json .node .mjs`后缀。

打印`require`：

```js
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: Module {
    id: '.',
    path: '/Users/chenchao/Desktop/my-studies/JSModule/commonJS/src',
    exports: {},
    parent: null,
    filename: '/Users/chenchao/Desktop/my-studies/JSModule/commonJS/src/index.js',
    loaded: false,
    children: [],
    paths: [
      '/Users/chenchao/Desktop/my-studies/JSModule/commonJS/src/node_modules',
      '/Users/chenchao/Desktop/my-studies/JSModule/commonJS/node_modules',
      '/Users/chenchao/Desktop/my-studies/JSModule/node_modules',
      '/Users/chenchao/Desktop/my-studies/node_modules',
      '/Users/chenchao/Desktop/node_modules',
      '/Users/chenchao/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  extensions: [Object: null prototype] {
    '.js': [Function],
    '.json': [Function],
    '.node': [Function],
    '.mjs': [Function]
  },
  cache: [Object: null prototype] {
    '/Users/chenchao/Desktop/my-studies/JSModule/commonJS/src/index.js': Module {
      id: '.',
      path: '/Users/chenchao/Desktop/my-studies/JSModule/commonJS/src',
      exports: {},
      parent: null,
      filename: '/Users/chenchao/Desktop/my-studies/JSModule/commonJS/src/index.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  }
}
```

主要涉及到四个对象：`resolve`、`main`、`extensions`、`cache`。其中使用`resolve`可以得到一个模块的绝对路径。

