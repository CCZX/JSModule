(function (global) {
  let moduleId = 0
  let requireId = 0
  const modules = {}
  const requires = {}
  const loadModules = [] // 已经加载完成的module
  const defaultExtenstion = '.js'

  function init() {
    // todo：加载data-main
  }

  /**
   * 
   * @param {string} moduleName 定义模块的名字
   * @param {Function} cb 
   */
  function define(moduleName, cb) {
    // modules[moduleName] = {
    //   export: cb(),
    //   // watchers: modules[moduleName].watchers || [], // require此模块的文件，传入requireId表示
    //   // loaded:  false // script标签加载完成置为true
    // }
    // console.log('do define')
    modules[moduleName].export = cb()
  }

  /**
   * 
   * @param {string[]} depModules 依赖的模块，需要和定义的模块名字一致
   * @param {Function} cb 
   */
  function require(depModules, cb) {
    // 异步调用
    setTimeout(() => {
      requires[requireId] = {
        requireId,
        depModules,
        cb
      }
      depModules.forEach(depModuleItem => {
        if (!modules[depModuleItem]) {
          setScript(depModuleItem, requireId)
        } else {
          modules[depModuleItem].watchers.push(requireId)
        }
      })
      requireId++ // 为下一个require做准备
    }, 1000 / 60)
  }

  require.config = {
    paths: {}
  }

  function setScript(dep, id) {
    // console.log({dep, id})
    const scriptNode = document.createElement('script')
    scriptNode.type = "text/javascript"
    scriptNode.charset = 'utf-8'
    scriptNode.async = true
    document.head.appendChild(scriptNode)
    scriptNode.addEventListener('load', (e) => {
      moudleLoaded(dep, id, e)
    })
    scriptNode.src = require.config.paths[dep] || `./${dep}.js`
    modules[dep] = modules[dep] || {}
    modules[dep].watchers = []
    modules[dep].watchers.push(id)
  }

  /**
   * 这里实际上是真正的require，需要require的模块已经加载完毕
   */
  function moudleLoaded(module) {
    console.log(modules, modules[module])
    /**
     * 当前模块加载完成后，遍历其watcher执行watcher的回调函数
     */
    modules[module].load = true
    modules[module].watchers.forEach(/**watcherItem对应着requireId */ watcherItem => {
      let reqireIdShouldExec = true
      // watcher依赖的module
      const watcherDepModules = requires[watcherItem].depModules
      loadModules.push(module)
      watcherDepModules.forEach(item => {
        if (!loadModules.includes(item)) {
          reqireIdShouldExec = false
        }
      })
      if (reqireIdShouldExec) {
        let args = []
        requires[watcherItem].depModules.forEach(moduleItem => {
          args.push(modules[moduleItem].export)
        })
        requires[watcherItem].cb(...args)
      }
    })
  }

  global.define = define
  global.require = require
  // todo：删除下面代码，现在为了方便在浏览器查看
  global.modules = modules
  global.requires = requires
})(window)
