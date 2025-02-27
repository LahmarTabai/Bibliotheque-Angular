import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntDetailDialogComponent } from './emprunt-detail-dialog.component';

describe('EmpruntDetailDialogComponent', () => {
  let component: EmpruntDetailDialogComponent;
  let fixture: ComponentFixture<EmpruntDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpruntDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
