import { NgModule } from "@angular/core";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipesRouterModule } from "./recipes-router.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    SelectRecipeComponent,
    EditRecipeComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    RecipesRouterModule,
  ],
})
export class RecipesModules {}
