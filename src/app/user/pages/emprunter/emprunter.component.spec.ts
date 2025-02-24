import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprunterComponent } from './emprunter.component';

describe('EmprunterComponent', () => {
  let component: EmprunterComponent;
  let fixture: ComponentFixture<EmprunterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmprunterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
