import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateShoppingListPage } from './create-shopping-list.page';

describe('CreateShoppingListPage', () => {
  let component: CreateShoppingListPage;
  let fixture: ComponentFixture<CreateShoppingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShoppingListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateShoppingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
