import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    redirectTo: "recipe",
    pathMatch: "full",
  },
  {
    path: "recipe",
    loadChildren: "./RecipeBook/recipes.module#RecipesModules",
  },
  {
    path: "shopping-list",
    loadChildren: "./ShoppingList/shopping.module#ShoppingModule",
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule",
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
