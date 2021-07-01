const FULL_FLAG = require("./full_flag");
const SHORT_FLAG = require("./short_flag");

const POSITIONAL = {
  canParse(str) {
    return !SHORT_FLAG.canParse(str) && !FULL_FLAG.canParse(str);
  },
  parse(str, all) {
    const name = all.indexOf(str);
    const value = str;
    return { name, value };
  },
};

module.exports = POSITIONAL;