import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropopupCrUpComponent } from './propopup-cr-up.component';

describe('PropopupCrUpComponent', () => {
  let component: PropopupCrUpComponent;
  let fixture: ComponentFixture<PropopupCrUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropopupCrUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropopupCrUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
