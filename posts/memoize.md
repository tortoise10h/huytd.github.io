# Kĩ thuật Memoize cải thiện performance

Memoize là một kĩ thuật cache lại giá trị trả về của các hàm dựa trên tham số truyền vào nó.

```
var memoize = function(func) {
  var cache = {};
  return function() {
    var key = JSON.stringify(arguments);
    if(cache[key]) {
      return cache[key];
    }
    else {
      var val = func.apply(this, arguments);
      cache[key] = val;
      return val;
    }
  };
};
```
