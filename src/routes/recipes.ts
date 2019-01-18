import { Request, Response } from "express";

import recipes = require("../db.json"); //load our local database file

export class Recipes {
  public routes(app): void {
    app.route("/recipes").get((req: Request, res: Response) => {
      res.status(200).send(recipes);
    });
    app.route("/recipes/:id").get((req: Request, res: Response) => {
      const id = req.params.id;
      res.status(200).send(recipes[id]);
    });
    app.route("/recipes").post((req: Request, res: Response) => {
      const name = req.body.name;
      const ingredients = req.body.ingredients;
      const source = req.body.source;
      const image = req.body.image;
      const instructions = req.body.instructions;
      //TODO: use database
      res.status(200).send(true);
    });
  }
}
