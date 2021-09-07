import { Component, OnInit, ViewChild } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingService } from "../shopping.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-shopping-list",
  templateUrl: "./edit-shopping-list.component.html",
  styleUrls: ["./edit-shopping-list.component.css"],
})
export class EditShoppingListComponent implements OnInit {
  @ViewChild("shoppingForm") shoppingForm: NgForm;
  subscrp: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  // @ViewChild("nameInput") nameInputRef: ElementRef;
  // @ViewChild("amountInput") amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.subscrp = this.shoppingService.editingStarted.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        const ingredient = this.shoppingService.GetIngredient(index);
        this.shoppingForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }
    );
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);
    if (this.editMode)
      this.shoppingService.EditIngredient(this.editedItemIndex, newIngredient);
    else this.shoppingService.AddIngredient(newIngredient);
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.DeleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
