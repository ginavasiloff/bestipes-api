import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Recipes } from "./routes/recipes";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { jwtCheck } from "./controllers/auth";

dotenv.config();
export class App {
  public app: express.Application;
  public recipeRoutes: Recipes = new Recipes();
  public mongoUrl: string = process.env.MONGO_URL;
  public jwtCheck: object;

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup(this.mongoUrl);
    this.app.use(cors());
    this.recipeRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
  }
  private mongoSetup(url: string): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(url, { useNewUrlParser: true });
  }
}
