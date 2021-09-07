import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingService } from "../shopping.service";
import { Subscription } from "rxjs";
import { LoggingService } from "src/app/logging.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingSubs: Subscription;
  constructor(
    private shoppingService: ShoppingService,
    private lgsvc: LoggingService
  ) {}

  ngOnInit() {
    this.lgsvc.printlog("shopping-list oninit");
    this.ingredients = this.shoppingService.GetIngredients();
    this.ingSubs = this.shoppingService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
  }

  onEditItem(i) {
    this.shoppingService.editingStarted.next(i);
  }
  ngOnDestroy() {
    this.ingSubs.unsubscribe();
  }
  // EditShopping(ingredient: Ingredient) {
  //   // this.ingredients.push(ingredient);
  // }
}
