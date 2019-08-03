import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { Recipes } from './routes/recipes';

class App {
  public app: express.Application;
  public recipeRoutes: Recipes = new Recipes();
  public mongoUrl: string;

  constructor() {
    require('dotenv').config();
    this.app = express();
    this.config();
    this.recipeRoutes.routes(this.app);
    this.mongoUrl = process.env.MONGO_URL;
    this.mongoSetup(this.mongoUrl);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
  }
  private mongoSetup(url: string): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(url, { useNewUrlParser: true });
  }
}

export default new App().app;
