import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from "@capacitor/core";
const { Camera } = Plugins;
import { Platform, ActionSheetController } from "@ionic/angular";

import * as fromRoot from "../../../app.reducer";
import * as fromMainStore from "../../../Reducers/MainStore/MainStore.reducer";
import * as MainStoreActions from "../../../Reducers/MainStore/MainStore.actions";

import { MainStoreModel } from "../../../Models/MainStore/main-store-model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Component({
  selector: "app-edit-main-store",
  templateUrl: "./edit-main-store.page.html",
  styleUrls: ["./edit-main-store.page.scss"],
})
export class EditMainStorePage implements OnInit, OnDestroy {
  EditMainStoreForm: FormGroup;
  private ErrorMessage: string;
  public message: string;

  ActiveMainStore$: Observable<MainStoreModel>;
  isLogoChanged = false;
  Logo: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private actionSheetCtrl: ActionSheetController,
    private store: Store<fromMainStore.MainStoreState>
  ) {} // Constructor

  ngOnInit() {
    this.ActiveMainStore$ = this.store
      .select(fromRoot.GetActiveMainStore)
      .pipe(take(1));
    //this.ActiveMainStore = this.store.select(fromRoot.GetActiveMainStore);

    this.ActiveMainStore$.pipe(take(1)).subscribe((store) => {
      this.EditMainStoreForm = this.formBuilder.group({
        mainStoreId: [store.mainStoreId],
        mainStoreName: [store.mainStoreName, Validators.required],
        imageTitle: [store.imageTitle],
        mainStoreLogo: [store.mainStoreLogo],
      });

      this.Logo = store.mainStoreLogo;
    });

    //console.log(this.CurrentMainStore.mainStoreName);
  } //ngOnInit

  transform(image: string) {
    if (image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image;base64," + image
      );
    } else {
      return "../../../assets/NoImage.jpg";
    }
  }

  EditMainStore(EditMainStoreForm: FormGroup) {
    const store: MainStoreModel = EditMainStoreForm.value;

    if (this.isLogoChanged) {
      store.mainStoreLogo = this.Logo;
    }

    this.dataService.UpdateMainStore(store, store.mainStoreId);
    this.router.navigate([""]);
  } // Edit main store

  async selectImageSource() {
    const buttons = [
      {
        text: "Take Photo",
        icon: "camera",
        handler: () => {
          this.addImage(CameraSource.Camera);
        },
      },
      {
        text: "Gallery",
        icon: "image",
        handler: () => {
          this.addImage(CameraSource.Photos);
        },
      },
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Select Image Source",
      buttons,
    });
    await actionSheet.present();
  } // End of select image source

  async addImage(source: CameraSource) {
    console.log("I clicked on Gallery");
    var image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source,
    });
    this.isLogoChanged = true;
    this.Logo = image.base64String;
    // console.log(this.Logo);
    // this.InjectImage();
  } // Add Image

  ngOnDestroy() {
    this.store.dispatch(new MainStoreActions.RemoveActiveMainStore());
  }
} // Export
