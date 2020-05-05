import { Request, Response } from "express";
import { RecipeController } from "../controllers/recipe-controller";
import { jwtCheck } from "../controllers/auth";

export class Recipes {
  public recipeController: RecipeController = new RecipeController();

  public routes(app): void {
    app.route("/status").get((req: Request, res: Response) => {
      res.status(200).send({ status: "okay" });
    });

    app.route("/recipes").get((req: Request, res: Response) => {
      this.recipeController.getRecipes(req, res);
    });

    app.route("/recipes/:id").get((req: Request, res: Response) => {
      this.recipeController.getRecipeWithID(req, res);
    });

    app.route("/recipes").post(jwtCheck, (req: Request, res: Response) => {
      this.recipeController.addNewRecipe(req, res);
    });

    app.use(jwtCheck);
    app.route("/recipes/:id").post(jwtCheck, (req: Request, res: Response) => {
      this.recipeController.getRecipeWithID(req, res);
    });

    app
      .route("/recipes/:id")
      .delete(jwtCheck, (req: Request, res: Response) => {
        this.recipeController.deleteRecipe(req, res);
      });
  }
}
