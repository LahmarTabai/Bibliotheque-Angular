import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntCloturesComponent } from './emprunt-clotures.component';

describe('EmpruntCloturesComponent', () => {
  let component: EmpruntCloturesComponent;
  let fixture: ComponentFixture<EmpruntCloturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntCloturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntCloturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
