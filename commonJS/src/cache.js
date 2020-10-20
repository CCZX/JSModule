/**
 * 第一次加载的模块会放入cache，后续从cache中取，可以使用delete删除缓存
 */

// delete require.cache[moduleId]

console.log(Object.values(require.cache))
console.log(Object.keys(require.cache))
