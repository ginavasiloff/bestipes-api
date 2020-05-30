import * as express from "express";
import * as mongoose from "mongoose";
import { Recipes } from "./routes/recipes";
import * as cors from "cors";
// import * as jwt from "express-jwt";
// import * as jwksRsa from "jwks-rsa";

export const App = () => {
  const app = express();
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.use(cors());
  app.use(express.json());
  // TODO:
  // app.use(
  //   jwt({
  //     secret: jwksRsa.expressJwtSecret({
  //       cache: true,
  //       rateLimit: true,
  //       jwksRequestsPerMinute: 5,
  //       jwksUri: process.env.JWKS_URI,
  //     }),
  //     audience: process.env.AUTH_AUDIENCE,
  //     issuer: process.env.AUTH_ISSUER,
  //   })
  // );
  new Recipes().routes(app);
  return app;
};
