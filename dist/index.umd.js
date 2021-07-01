(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.pasamanos = {}));
}(this, (function (exports) {
  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function isProcessArgv(obj) {
    return obj === process.argv;
  }

  var FULL_FLAG = {
    canParse: function canParse(str) {
      return str.startsWith("--");
    },
    parse: function parse(str, _) {
      var _str$slice$split = str.slice(2).split("="),
          name = _str$slice$split[0],
          value = _str$slice$split[1];

      return {
        name: name,
        value: value
      };
    }
  };

  var SHORT_FLAG = {
    canParse: function canParse(str) {
      return !FULL_FLAG.canParse(str) && str.startsWith("-");
    },
    parse: function parse(str, _) {
      var _str$slice$split = str.slice(1).split("="),
          name = _str$slice$split[0],
          value = _str$slice$split[1];

      if (typeof value === "undefined") {
        value = true;
      }

      if (["true", "false"].includes(value)) {
        value = value === "true";
      }

      return {
        name: name,
        value: value
      };
    }
  };

  var POSITIONAL = {
    canParse: function canParse(str) {
      return !SHORT_FLAG.canParse(str) && !FULL_FLAG.canParse(str);
    },
    parse: function parse(str, all) {
      var name = all.indexOf(str);
      var value = str;
      return {
        name: name,
        value: value
      };
    }
  };

  function params(args, aliases) {
    var _params;

    if (args === void 0) {
      args = process.argv;
    }

    if (aliases === void 0) {
      aliases = {};
    }

    if (!args instanceof Array) {
      throw new Error("Bad input, expecting an array of cli parameters");
    }

    var RAW = Symbol("raw");
    var PARSERS = [SHORT_FLAG, FULL_FLAG, POSITIONAL];
    var params = (_params = {}, _params[RAW] = {
      list: args
    }, _params);

    if (isProcessArgv(args)) {
      var _params2;

      params = (_params2 = {}, _params2[RAW] = {
        file: args[1],
        list: args.slice(2)
      }, _params2);
    }

    params.positional = [];
    params.RAW = RAW;
    var list = params[RAW].list;
    list.forEach(function (arg) {
      var parser = PARSERS.filter(function (p) {
        return p.canParse(arg);
      }).pop();

      if (typeof parser !== "undefined") {
        var _parser$parse = parser.parse(arg, list),
            name = _parser$parse.name,
            value = _parser$parse.value;

        if (name === Number(name)) {
          params.positional[name] = value;
        } else {
          params[name] = value;
        }
      }
    });
    Object.keys(aliases).forEach(function (newKey) {
      var _extends2;

      var oldKey = aliases[newKey];
      var value = params[oldKey];

      if (typeof value === "undefined") {
        return;
      }

      delete params[oldKey];
      params = _extends({}, params, (_extends2 = {}, _extends2[newKey] = value, _extends2));
    });
    return params;
  }

  exports.params = params;

})));
//# sourceMappingURL=index.umd.js.map
