import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntActifsComponent } from './emprunt-actifs.component';

describe('EmpruntActifsComponent', () => {
  let component: EmpruntActifsComponent;
  let fixture: ComponentFixture<EmpruntActifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntActifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntActifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
