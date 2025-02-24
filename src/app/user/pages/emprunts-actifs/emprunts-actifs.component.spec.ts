import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntsActifsComponent } from './emprunts-actifs.component';

describe('EmpruntsActifsComponent', () => {
  let component: EmpruntsActifsComponent;
  let fixture: ComponentFixture<EmpruntsActifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntsActifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntsActifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
