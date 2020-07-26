import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditShoppingListPage } from './edit-shopping-list.page';

describe('EditShoppingListPage', () => {
  let component: EditShoppingListPage;
  let fixture: ComponentFixture<EditShoppingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShoppingListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditShoppingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
