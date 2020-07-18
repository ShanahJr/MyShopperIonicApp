import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMainStorePage } from './edit-main-store.page';

describe('EditMainStorePage', () => {
  let component: EditMainStorePage;
  let fixture: ComponentFixture<EditMainStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMainStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
