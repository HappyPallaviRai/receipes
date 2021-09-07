import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolverService } from "./recipe-resolver.service";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardService],
    component: RecipesComponent,
    children: [
      { path: "", component: SelectRecipeComponent, pathMatch: "full" },
      { path: "new", component: EditRecipeComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ":id/edit",
        component: EditRecipeComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRouterModule {}
