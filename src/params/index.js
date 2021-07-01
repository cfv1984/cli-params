import isProcessArgv from "./isProcessArgv";
import { SHORT_FLAG, FULL_FLAG, POSITIONAL } from "./parsers";

function params(args = process.argv, aliases = {}) {
  if (!args instanceof Array) {
    throw new Error("Bad input, expecting an array of cli parameters");
  }
  const RAW = Symbol("raw");
  const PARSERS = [SHORT_FLAG, FULL_FLAG, POSITIONAL];
  let params = {
    [RAW]: {
      list: args,
    },
  };

  if (isProcessArgv(args)) {
    params = {
      [RAW]: {
        file: args[1],
        list: args.slice(2),
      },
    };
  }

  params.positional = [];
  params.RAW = RAW;
  const { list } = params[RAW];

  list.forEach((arg) => {
    const parser = PARSERS.filter((p) => p.canParse(arg)).pop();
    if (typeof parser !== "undefined") {
      const { name, value } = parser.parse(arg, list);
      if (name === Number(name)) {
        params.positional[name] = value;
      } else {
        params[name] = value;
      }
    }
  });

  Object.keys(aliases).forEach((newKey) => {
    const oldKey = aliases[newKey];
    const value = params[oldKey];
    if (typeof value === "undefined") {
      return;
    }
    delete params[oldKey];
    params = {
      ...params,
      [newKey]: value,
    };
  });

  return params;
}

export default params;
