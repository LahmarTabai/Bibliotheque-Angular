import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntListComponent } from './emprunt-list.component';

describe('EmpruntListComponent', () => {
  let component: EmpruntListComponent;
  let fixture: ComponentFixture<EmpruntListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
