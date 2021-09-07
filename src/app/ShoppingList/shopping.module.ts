import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { EditShoppingListComponent } from "./edit-shopping-list/edit-shopping-list.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ShoppingListComponent, EditShoppingListComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: ShoppingListComponent }]),
  ],
})
export class ShoppingModule {}
