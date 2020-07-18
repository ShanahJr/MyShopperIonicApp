import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainStorePageRoutingModule } from './main-store-routing.module';

import { MainStorePage } from './main-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainStorePageRoutingModule
  ],
  declarations: [MainStorePage]
})
export class MainStorePageModule {}
