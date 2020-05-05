import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { RecipeSchema } from "../models/recipes";

const Recipe = mongoose.model("Recipe", RecipeSchema);

export class RecipeController {
  // This is broken.
  public addNewRecipe(req: Request, res: Response) {
    const newRecipe = new Recipe(req.body);
    res
      .status(501)
      .json({ message: "Add New Recipes is not yet implemented." })
      .send();
    // newRecipe.save((err, data) => {
    //   if (err) {
    //     res.send(err);
    //   }
    //   res.json(data);
    // });
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
// app.get('/api/private', checkJwt, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//   });
// });
