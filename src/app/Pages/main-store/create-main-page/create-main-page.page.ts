import { Component, OnInit, SecurityContext } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/Services/data.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from "@capacitor/core";
import { Platform, ActionSheetController } from "@ionic/angular";
import { MainStoreModel } from "src/app/Models/MainStore/main-store-model";
const { Camera } = Plugins;

import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-create-main-page",
  templateUrl: "./create-main-page.page.html",
  styleUrls: ["./create-main-page.page.scss"],
})
export class CreateMainPagePage implements OnInit {
  private CreateMainStoreForm: FormGroup;
  private ErrorMessage: string;
  public message: string;
  Logo: string;
  isLogoAvailable = false;
  TempLogo: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private sanitizer: DomSanitizer
  ) {} // Constructor

  ngOnInit() {
    this.CreateMainStoreForm = this.formBuilder.group({
      mainStoreName: ["", Validators.required],
      imageTitle: [""],
      mainStoreLogo: [""],
    });
  } // ngOnInit

  transformer() {
    if (this.isLogoAvailable) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image;base64," + this.Logo
      );
    } else {
      return "../../../../assets/NoImage.jpg";
    }
  }

  CreateMainStore(MainStoreForm: FormGroup) {
    var mainStore: MainStoreModel = MainStoreForm.value;
    mainStore.mainStoreLogo = this.Logo;

    this.dataService.AddMainStore(mainStore);
    this.router.navigate([""]);
  } // Create MainStore

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
    this.isLogoAvailable = true;
    this.Logo = image.base64String;
    console.log(this.Logo);
    // this.InjectImage();
  }
}
