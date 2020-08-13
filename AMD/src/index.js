(function (global) {
  let requireId = 0
  const modules = {
    /**
     * moduleA: {
     *  export: any, // 模块导出值
     *  watcher: string[], // require该模块的文件
     *  load: boolean, // 以及加载完毕，即script标签loaded
     * }
     */
  }
  const requires = {
    /**
     * requireId: {
     *  requireId: string, // 使用require文件的id，会被push到modules的watchers中
     *  depModules: string[], // 依赖的模块，使用require方法的第一参数，其依赖的模块名称要和define中定义的名称一致
     *  cb: function, // 模块加载完成后执行的回调函数，函数参数依次是依次加载的模块的返回值
     * }
     */
  }
  const loadModules = [] // 已经加载完成的module
  const defaultExtenstion = '.js'

  function init() {
    // todo：加载data-main
    const allScriptDOM = [...document.querySelectorAll('script')]
    for (let i = 0; i < allScriptDOM.length; i++) {
      const entry = allScriptDOM[i].getAttribute('data-main')
      if (entry) {
        const script = document.createElement('script')
        script.type = "text/javascript"
        script.charset = 'utf-8'
        script.src = entry
        document.head.appendChild(script)
        break
      }
    }
    // console.error('no has data-main attribute script')
  }
  init()

  /**
   * 
   * @param {string} moduleName 定义模块的名字
   * @param {Function} cb 
   */
  function define(moduleName, cb) {
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
          setDepModuleScript(depModuleItem, requireId)
        } else {
          modules[depModuleItem].watchers.push(requireId)
        }
      })
      requireId++ // 为下一个require做准备
    }, 0)
  }

  require.config = {
    baseURL: '',
    paths: {}
  }

  /**
   * main.js文件require了a.js文件，那么main.js文件dep就包括a.js
   * @param {string} moduleName 
   * @param {*} id 
   */
  function setDepModuleScript(moduleName, id) {
    // console.log({moduleName, id})
    const scriptNode = document.createElement('script')
    scriptNode.type = "text/javascript"
    scriptNode.charset = 'utf-8'
    scriptNode.async = true
    document.head.appendChild(scriptNode)
    scriptNode.addEventListener('load', (e) => {
      moudleLoaded(moduleName, id, e)
    })
    scriptNode.src = require.config.paths[moduleName] || `./${moduleName}.js`
    modules[moduleName] = modules[moduleName] || {}
    modules[moduleName].watchers = []
    modules[moduleName].watchers.push(id)
  }

  /**
   * 
   * @param {string} moduleName 这里的moduleName是自己在使用define模块时定义的名称
   */
  function setPath(moduleName) {
    const { baseURL, paths } = require.config
    const filePath = paths[moduleName] || `${moduleName}`
  }

  /**
   * 这里实际上是真正的require，需要require的模块已经加载完毕
   */
  function moudleLoaded(module) {
    console.log(modules, modules[module])
    /**
     * 当前模块加载完成后，遍历其watcher（也就是require该模块的文件）执行watcher的回调函数
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
