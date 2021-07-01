const FULL_FLAG = {
  canParse(str) {
    return str.startsWith("--");
  },
  parse(str, _) {
    const [name, value] = str.slice(2).split("=");
    return { name, value };
  },
};

module.exports = FULL_FLAG;
