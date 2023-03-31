import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsupopupCrUpComponent } from './usupopup-cr-up.component';

describe('UsupopupCrUpComponent', () => {
  let component: UsupopupCrUpComponent;
  let fixture: ComponentFixture<UsupopupCrUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsupopupCrUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsupopupCrUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
