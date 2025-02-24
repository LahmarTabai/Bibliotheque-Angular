import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDispoComponent } from './documents-dispo.component';

describe('DocumentsDispoComponent', () => {
  let component: DocumentsDispoComponent;
  let fixture: ComponentFixture<DocumentsDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsDispoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
