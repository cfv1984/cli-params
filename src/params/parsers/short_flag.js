const FULL_FLAG = require("./full_flag");

const SHORT_FLAG = {
  canParse(str) {
    return !FULL_FLAG.canParse(str) && str.startsWith("-");
  },
  parse(str, _) {
    let [name, value] = str.slice(1).split("=");
    if (typeof(value) === 'undefined') {
      value = true;
    }
    if (["true", "false"].includes(value)) {
      value = (value === "true");
    }

    return { name, value };
  },
};

module.exports = SHORT_FLAG;
