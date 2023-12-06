import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const mainDbConn = {
  url: `${process.env.DB_URL}`,
};

export default {
  mainDbConn,
};
