import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditShoppingListPageRoutingModule } from "./edit-shopping-list-routing.module";

import { EditShoppingListPage } from "./edit-shopping-list.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditShoppingListPageRoutingModule,
  ],
  declarations: [EditShoppingListPage],
})
export class EditShoppingListPageModule {}
