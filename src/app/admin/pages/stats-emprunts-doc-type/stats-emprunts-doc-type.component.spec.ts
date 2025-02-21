import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsEmpruntsDocTypeComponent } from './stats-emprunts-doc-type.component';

describe('StatsEmpruntsDocTypeComponent', () => {
  let component: StatsEmpruntsDocTypeComponent;
  let fixture: ComponentFixture<StatsEmpruntsDocTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsEmpruntsDocTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsEmpruntsDocTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
