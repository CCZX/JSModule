const vm = require('vm')

let wrapper = [
  '(function (exports, require, module, __dirname, __filename) {\r\n',
  '\r\n})'
];

const content = wrapper[0] + "console.log(exports)" + wrapper[1]

const a = vm.runInThisContext(content)
console.log(a)
a()
