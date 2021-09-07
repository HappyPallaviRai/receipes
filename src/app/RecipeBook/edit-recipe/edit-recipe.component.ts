import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormControlName,
  Validators,
} from "@angular/forms";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-edit-recipe",
  templateUrl: "./edit-recipe.component.html",
  styleUrls: ["./edit-recipe.component.css"],
})
export class EditRecipeComponent implements OnInit {
  id: number;
  isEditMode: boolean;
  recipeForm: FormGroup;
  get IngredientsControl() {
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.isEditMode = params["id"] != null;
      this.InitForm();
    });
  }

  private InitForm() {
    let recipeName = "";
    let imagePath = "";
    let recipeDesc = "";
    let ingredients = new FormArray([]);

    if (this.isEditMode) {
      let recipe = this.recipeService.GetRecipeById(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe.ingredients) {
        recipe.ingredients.forEach((element) => {
          ingredients.push(
            new FormGroup({
              name: new FormControl(element.name, Validators.required),
              amount: new FormControl(element.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: ingredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onIngredientDelete(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onSubmit() {
    if (this.isEditMode)
      this.recipeService.UpdateRecipe(this.id, this.recipeForm.value);
    else this.recipeService.AddRecipe(this.recipeForm.value);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
