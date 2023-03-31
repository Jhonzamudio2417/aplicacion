import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatpopupCrUpComponent } from './catpopup-cr-up.component';

describe('CatpopupCrUpComponent', () => {
  let component: CatpopupCrUpComponent;
  let fixture: ComponentFixture<CatpopupCrUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatpopupCrUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatpopupCrUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
