import * as express from "express";
import * as bodyParser from "body-parser";

import { Recipes } from "./routes/recipes";

class App {
  public app: express.Application;
  public recipeRoutes: Recipes = new Recipes();

  constructor() {
    this.app = express();
    this.config();
    this.recipeRoutes.routes(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
  }
}

export default new App().app;
