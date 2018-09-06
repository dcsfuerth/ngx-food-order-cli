import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureComponentTestSuite } from '@dcs/ngx-tools/testing';
import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
  configureComponentTestSuite();

  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
