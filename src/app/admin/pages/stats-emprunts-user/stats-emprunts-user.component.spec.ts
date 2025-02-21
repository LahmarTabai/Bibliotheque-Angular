import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsEmpruntsUserComponent } from './stats-emprunts-user.component';

describe('StatsEmpruntsUserComponent', () => {
  let component: StatsEmpruntsUserComponent;
  let fixture: ComponentFixture<StatsEmpruntsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsEmpruntsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsEmpruntsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
