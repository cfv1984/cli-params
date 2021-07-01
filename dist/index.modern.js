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

const FULL_FLAG = {
  canParse(str) {
    return str.startsWith("--");
  },

  parse(str, _) {
    let [name, value] = str.slice(2).split("=");

    return {
      name,
      value
    };
  }

};

const SHORT_FLAG = {
  canParse(str) {
    return !FULL_FLAG.canParse(str) && str.startsWith("-");
  },

  parse(str, _) {
    let [name, value] = str.slice(1).split("=");

    if (typeof value === "undefined") {
      value = true;
    }

    if (["true", "false"].includes(value)) {
      value = value === "true";
    }

    return {
      name,
      value
    };
  }

};

const POSITIONAL = {
  canParse(str) {
    return !SHORT_FLAG.canParse(str) && !FULL_FLAG.canParse(str);
  },

  parse(str, all) {
    const name = all.indexOf(str);
    const value = str;
    return {
      name,
      value
    };
  }

};

function params(args = process.argv, aliases = {}) {
  if (!args instanceof Array) {
    throw new Error("Bad input, expecting an array of cli parameters");
  }

  const RAW = Symbol("raw");
  const PARSERS = [SHORT_FLAG, FULL_FLAG, POSITIONAL];
  let params = {
    [RAW]: {
      list: args
    }
  };

  if (isProcessArgv(args)) {
    params = {
      [RAW]: {
        file: args[1],
        list: args.slice(2)
      }
    };
  }

  params.positional = [];
  params.RAW = RAW;
  const {
    list
  } = params[RAW];
  list.forEach(arg => {
    const parser = PARSERS.filter(p => p.canParse(arg)).pop();

    if (typeof parser !== "undefined") {
      const {
        name,
        value
      } = parser.parse(arg, list);

      if (name === Number(name)) {
        params.positional[name] = value;
      } else {
        params[name] = value;
      }
    }
  });
  Object.keys(aliases).forEach(newKey => {
    const oldKey = aliases[newKey];
    const value = params[oldKey];

    if (typeof value === "undefined") {
      return;
    }

    delete params[oldKey];
    params = _extends({}, params, {
      [newKey]: value
    });
  });
  return params;
}

export { params };
//# sourceMappingURL=index.modern.js.map
