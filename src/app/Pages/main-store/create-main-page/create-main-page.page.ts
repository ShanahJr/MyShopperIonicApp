import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { EventEmitterService } from 'src/app/Services/event-emitter.service';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-create-main-page',
  templateUrl: './create-main-page.page.html',
  styleUrls: ['./create-main-page.page.scss'],
})
export class CreateMainPagePage implements OnInit {

  private CreateMainStoreForm: FormGroup;
  private ErrorMessage: string;
  public message: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventEmitterService: EventEmitterService
  ) {

    this.CreateMainStoreForm = this.formBuilder.group({
      MainStoreName: ["", Validators.required],
    });

  }// Constructor

  CreateMainStore(MainStoreForm: FormGroup) {

    const mainStore = MainStoreForm.value;

    this.dataService.AddMainStore(mainStore).subscribe(() => {

      this.message = 'MainStore has been saved successfully';
      // this.CreateAnimeForm.reset();
      this.eventEmitterService.OnCreateMainStore({ option: 'onSubmitMainStore', value: 'Add component' });
      this.router.navigate(["/"]);

      // this.events.publish('functionCall:LoadAnimeData');
      //this.eventEmitterService.CallGetAnime;

    })

  }// Create MainStore

  ngOnInit() {
  }// ngOnInit

}
