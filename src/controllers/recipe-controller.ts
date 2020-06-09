import * as mongoose from "mongoose";
import { Request, Response } from "express";
import * as fetch from "node-fetch";
import { RecipeSchema } from "../models/recipes";
import { getRecipes } from "./read-source";

const Recipe = mongoose.model("Recipe", RecipeSchema);

export class RecipeController {
  // This is broken.
  public addNewRecipe(req: Request, res: Response) {
    const newRecipe = new Recipe(req.body);
    res
      .status(501)
      .json({ message: "Add New Recipes is not yet implemented." })
      .send();
  }
  // newRecipe.save((err, data) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.json(data);
  // });

  public async uploadRecipe(req: Request, res: Response) {
    try {
      const uploadUrl = req.body.uploadUrl;
      const src = await fetch(uploadUrl);
      const page = await src.text();
      const recipe = getRecipes(page);
      res
        .status(200)
        .json({
          message: `Add New Recipes is not yet implemented.`,
        })
        .send();
    } catch (err) {
      console.error(err);
    }
  }

  public getRecipes(req: Request, res: Response) {
    Recipe.find({}, (err, recipe) => {
      if (err) {
        res.send(err);
      }
      res.json(recipe);
    });
  }

  public getRecipeWithID(req: Request, res: Response) {
    Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
        res.send(err);
      }
      res.json(recipe);
    });
  }

  public deleteRecipe(req: Request, res: Response) {
    Recipe.remove({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted recipe!" });
    });
  }
}
