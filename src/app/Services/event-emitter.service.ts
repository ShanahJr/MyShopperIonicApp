import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventEmitter, } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();

  CallGetAnime = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  public OnCreateMainStore(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  public OnCreateStore(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

}
