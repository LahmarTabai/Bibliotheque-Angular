import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetournerComponent } from './retourner.component';

describe('RetournerComponent', () => {
  let component: RetournerComponent;
  let fixture: ComponentFixture<RetournerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetournerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetournerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
