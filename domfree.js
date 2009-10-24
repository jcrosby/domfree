// domfree.js / Jon Crosby / http://github.com/jcrosby/domfree
DF = function() {
  var that = {};

  Array.prototype.each = function(callback) {
    var i;
    for(i = 0; i < this.length; i++) {
      callback.apply(callback, [i, this[i]]);
    }
  };

  Object.prototype.ownPropertyNames = function() {
    var names = [];
    for(property in this) {
      if(this.hasOwnProperty(property)) names.push(property);
    }
    return names;
  };

  that.isFunction = function(object) {
    return toString.call(object) === "[object Function]";
  };

  that.isArray = function(object) {
    return toString.call(object) === "[object Array]";
  };

  that.extend = function() {
    var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

    if(typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }

    if(typeof target !== "object" && !isFunction(target)) target = {};

    for(; i < length; i++) {
      if((options = arguments[i]) != null) {
        for(var name in options) {
          var src = target[name], copy = options[name];

          if(target === copy) continue;

          if(deep && copy && typeof copy === "object" && !copy.nodeType) {
            target[name] = this.extend(deep, 
              src || (copy.length != null ? [] : {})
            , copy);
          } else if (copy !== undefined) {
           target[name] = copy;
          }
        }
      }
    }

    return target;
  };

  that.clone = function(target) {
    return that.extend(true, {}, target);
  };

  return that;
}();
