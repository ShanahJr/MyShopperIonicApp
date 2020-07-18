import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMainPagePageRoutingModule } from './create-main-page-routing.module';

import { CreateMainPagePage } from './create-main-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateMainPagePageRoutingModule
  ],
  declarations: [CreateMainPagePage]
})
export class CreateMainPagePageModule { }
