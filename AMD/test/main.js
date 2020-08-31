require.config.paths = {
  "jquery": "https://cdn.bootcdn.net/ajax/libs/jquery/1.10.0/jquery.min.js"
}

console.log('this is first log...')

require(['a', 'b', 'jquery'], function (a, b, $) {
  console.log('this is last log...')
  console.log(a, b, $)
})

console.log('this is second log...')
