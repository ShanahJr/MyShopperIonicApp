import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMainPagePage } from './create-main-page.page';

describe('CreateMainPagePage', () => {
  let component: CreateMainPagePage;
  let fixture: ComponentFixture<CreateMainPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMainPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMainPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
