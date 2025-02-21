import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntByUserComponent } from './emprunt-by-user.component';

describe('EmpruntByUserComponent', () => {
  let component: EmpruntByUserComponent;
  let fixture: ComponentFixture<EmpruntByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntByUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
