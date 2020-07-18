import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditStorePage } from './edit-store.page';

describe('EditStorePage', () => {
  let component: EditStorePage;
  let fixture: ComponentFixture<EditStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
