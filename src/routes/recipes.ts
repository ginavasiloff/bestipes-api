import { Request, Response } from "express";
import { RecipeController } from "../controllers/recipe-controller";

export class Recipes {
  public recipeController: RecipeController = new RecipeController();

  public routes(app): void {
    app.get("/status", (req: Request, res: Response) => {
      res.status(200).send({ status: "okay" });
    });

    app.get("/recipes", (req: Request, res: Response) => {
      this.recipeController.getRecipes(req, res);
    });
    app.post("/recipes/upload", (req: Request, res: Response) => {
      this.recipeController.uploadRecipe(req, res);
    });

    app.get("/recipes/:id", (req: Request, res: Response) => {
      this.recipeController.getRecipeWithID(req, res);
    });

    app.post("/recipes", (req: Request, res: Response) => {
      this.recipeController.addNewRecipe(req, res);
    });

    app.post("/recipes/:id", (req: Request, res: Response) => {
      this.recipeController.getRecipeWithID(req, res);
    });

    app.delete("/recipes/:id", (req: Request, res: Response) => {
      this.recipeController.deleteRecipe(req, res);
    });
  }
}
