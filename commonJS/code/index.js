const path = require('path')
const fs = require('fs')

// 沙箱，可执行字符串的js代码（类eval）
const vm = require('vm')

function myReqire(id) {
  const filename = Module._resolveFilename(id)
  const module = new Module(filename)
  tryModuleLoad(module)
  return module.exports
}

function Module(id) {
  this.id = id
  this.exports = {}
}

// 处理成绝对路径
Module._resolveFilename = function (id) {
  let absPath = path.resolve(id)

  if (fs.existsSync(absPath)) {
    return absPath
  }

  const extensions = Object.keys(Module.extensions)
  for (let i = 0; i < extensions.length; i++) {
    const addSuffixPath = absPath + extensions[i]
    if (fs.existsSync(addSuffixPath)) {
      return addSuffixPath
    }
  }
}

const wrapper = [
  '(function (exports, require, module, __dirname, __filename) {\r\n',
  '\r\n})'
]

// 针对不同的文件类型进行不同的处理
Module.extensions = {}

Module.extensions['.js'] = function (module) {
  const script = fs.readFileSync(module.id, 'utf-8')
  const content = wrapper[0] + script + wrapper[1]

  // 返回函数
  const func = vm.runInThisContext(content)
  const __dirname = path.dirname(module.id)
  func.call(module.exports, module.exports, myReqire, module, __dirname, module.id)
}

Module.extensions['.json'] = function (module) {
  
}

function tryModuleLoad(module) {
  const ext = path.extname(module.id)
  Module.extensions[ext](module)
}

const a = myReqire('./a')
console.log(a)
