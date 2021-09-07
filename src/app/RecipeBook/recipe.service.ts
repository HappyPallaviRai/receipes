import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../ShoppingList/shopping.service";
import { Observable, Subject } from "rxjs";
@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  constructor(private spService: ShoppingService) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Bhatura",
  //     "tasty Bhatura",
  //     "https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2010/06/bhatura-recipe-1a.jpg",
  //     [new Ingredient("soda", 50), new Ingredient("Maida", 200)]
  //   ),
  //   new Recipe(
  //     "Maggi",
  //     "tasty Maggy",
  //     "https://www.viniscookbook.com/wp-content/uploads/2018/10/2018-10-06-11-26-17.jpg",
  //     [new Ingredient("Water", 500), new Ingredient("Maggi Masala", 1)]
  //   ),
  // ];
  private recipes : Recipe[]= [];
  GetRecipe() {
    return this.recipes.slice();
  }
  GetRecipeById(id) {
    return this.recipes[id];
  }
  AddIngredients(ingredients: Ingredient[]) {
    this.spService.AddIngredients(ingredients);
  }
  AddRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  UpdateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  DeleteRecipe(index: number) {
    if (this.recipes[index]) this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  CreateRecipe(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
}
