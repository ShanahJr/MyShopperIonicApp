import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMainStorePageRoutingModule } from './edit-main-store-routing.module';

import { EditMainStorePage } from './edit-main-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditMainStorePageRoutingModule
  ],
  declarations: [EditMainStorePage]
})
export class EditMainStorePageModule { }
