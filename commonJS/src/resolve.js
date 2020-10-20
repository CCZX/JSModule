/**
 * 使用resolve可以得到模块的绝对路径，不会执行加载
 */

// console.log(require.resolve.paths)

const path = require.resolve('./foo.js')

console.log(path)
