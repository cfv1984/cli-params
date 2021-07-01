const FULL_FLAG = {
  canParse(str) {
    return str.startsWith("--");
  },
  parse(str, _) {
    let [name, value] = str.slice(2).split("=");
    if(!value){
      value === true;
    }
    return { name, value };
  },
};

export default FULL_FLAG;