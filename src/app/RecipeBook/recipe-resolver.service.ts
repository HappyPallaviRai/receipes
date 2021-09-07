import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { StorageRecipeService } from '../shared/storage-recipe.service';
import { RecipeService } from './recipe.service';
import { retry } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private datastorage: StorageRecipeService, private recipeService: RecipeService ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.GetRecipe();
        if(recipes.length === 0){
            return this.datastorage.FetchRecipe();
        }
        else{
            return recipes;
        }
    }
}