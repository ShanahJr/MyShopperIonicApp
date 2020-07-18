import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainStorePage } from './main-store.page';

describe('MainStorePage', () => {
  let component: MainStorePage;
  let fixture: ComponentFixture<MainStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
