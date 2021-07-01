import FULL_FLAG from "./full_flag";
import SHORT_FLAG from "./short_flag";

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

export default POSITIONAL;;
