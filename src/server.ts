import * as dotenv from "dotenv";
import { App } from "./app";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = App();

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
