import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CreateShoppingListPageRoutingModule } from "./create-shopping-list-routing.module";

import { CreateShoppingListPage } from "./create-shopping-list.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateShoppingListPageRoutingModule,
  ],
  declarations: [CreateShoppingListPage],
})
export class CreateShoppingListPageModule {}
