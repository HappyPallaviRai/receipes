import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../RecipeBook/recipe.service";
import { Recipe } from "../RecipeBook/recipe.model";
import { map, tap, take, exhaustMap, catchError } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { throwError } from "rxjs";
@Injectable({ providedIn: "root" })
export class StorageRecipeService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  SaveRecipe() {
    const recipes = this.recipeService.GetRecipe();
    this.http
      .put("https://recipebook-261a6.firebaseio.com/recpes.json", recipes)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  FetchRecipe() {
    return this.http
      .get<Recipe[]>("https://recipebook-261a6.firebaseio.com/recpes.json")
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          console.log(recipes);
          this.recipeService.CreateRecipe(recipes);
        })
      );
  }
}
