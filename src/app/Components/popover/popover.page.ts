import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }

  ClosePopOver() {
    this.popover.dismiss();
  }

}
