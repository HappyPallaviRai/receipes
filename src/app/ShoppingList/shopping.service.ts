import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingService {
  ingredientChanged = new Subject<Ingredient[]>();
  editingStarted = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];
  GetIngredients() {
    return this.ingredients.slice();
  }
  AddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  AddIngredients(ingredient: Ingredient[]) {
    // ingredient.forEach(element => {
    //     this.ingredients.push(element);
    //   });
    this.ingredients.push(...ingredient);
  }

  GetIngredient(index: number) {
    return this.ingredients[index];
  }

  EditIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;

    this.ingredientChanged.next(this.ingredients.slice());
  }

  DeleteIngredient(index: number) {
    console.log(index);
    if (this.ingredients[index]) this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
