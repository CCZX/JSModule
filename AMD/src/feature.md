## requireJS

参考：https://juejin.im/post/6844903540494712839

### 设计思路
`require`主要是使用了`script`加载模块资源，然后资源加载完成的时候将模块返回的值存储在一个对象里，方便下次直接调用，避免多次请求加载，在`require`所需模块加载完成后执行其回调函数。

#### 1、require方法

在使用`require`方法的时候会在内部创建一个`requires`对象,，然后生成一个`requireId`做为`key`，`require`依赖的模块，回调函数做为`value`存在`requires`对象中：

```js
const requires = {
  requireId: {
    requireId: string, // 使用require文件的id，会被push到modules的watchers中
    depModules: string[], // 依赖的模块，使用require方法的第一参数，其依赖的模块名称要和define中定义的名称一致
    cb: function, // 模块加载完成后执行的回调函数，函数参数依次是依次加载的模块的返回值
  }
}
```
**使用将`require`中的方法包裹起来，保证异步调用。**

在使用`define`定义模块时

调用`require`时首先会遍历`require`所依赖的模块`depModules`：
```js
depModules.forEach(depModuleItem => {
  if (!modules[depModuleItem]) {
    setDepModuleScript(depModuleItem, requireId)
  } else {
    modules[depModuleItem].watchers.push(requireId)
  }
})
```
判断`modules`中是否已经有该模块了，如果有就将该`requireId`加入到`watchers`中；如果没有就使用`script`标签加载对于的资源，加载完成后将该模块的返回值存放在`modules`中方便下次调用。模块加载完成后会遍历其``

#### 2、define方法
