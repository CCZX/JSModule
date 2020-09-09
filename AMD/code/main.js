
// https://cdn.bootcdn.net/ajax/libs/jquery/1.10.0/jquery.min.js
require.config({
  paths: {
    "jquery": "https://cdn.bootcdn.net/ajax/libs/jquery/1.10.0/jquery.min"
  }
})
require(['a', 'jquery'], function (m1, $) {
  console.log({m1, $})
})