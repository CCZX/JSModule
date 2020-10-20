exports.a = 2

define(['package/lib'], function (lib) {
  function foo() {
    lib.log('hello world!');
  }
  return { foo: foo };
})

define(function (require, exports, module) {
  var someModule = require("someModule");
  var anotherModule = require("anotherModule");
  
  someModule.doTehAwesome();
  anotherModule.doMoarAwesome();

  exports.asplode = function () {
    someModule.doTehAwesome();
    anotherModule.doMoarAwesome();
  };
});
