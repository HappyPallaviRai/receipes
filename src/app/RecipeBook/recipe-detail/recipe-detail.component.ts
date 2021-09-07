import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipeItem: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipeItem = this.recipeService.GetRecipeById(this.id);
    });
  }
  AddToShopping() {
    this.recipeService.AddIngredients(this.recipeItem.ingredients);
  }
  DeleteRecipe() {
    this.recipeService.DeleteRecipe(this.id);
    this.route.navigate(["./recipe"]);
  }
}
