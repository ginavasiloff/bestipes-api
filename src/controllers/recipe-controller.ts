import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import { RecipeSchema } from '../models/recipes';

const Recipe = mongoose.model('Data', RecipeSchema);

export class RecipeController {
  public addNewRecipe(req: Request, res: Response) {
    let newRecipe = new Recipe(req.body);

    newRecipe.save((err, data) => {
      if (err) {
        res.send(err);
      }
      res.json(data);
    });
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
    Recipe.remove({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted recipe!' });
    });
  }
}
