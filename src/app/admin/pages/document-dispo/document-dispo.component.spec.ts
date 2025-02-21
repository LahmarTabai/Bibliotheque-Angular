import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDispoComponent } from './document-dispo.component';

describe('DocumentDispoComponent', () => {
  let component: DocumentDispoComponent;
  let fixture: ComponentFixture<DocumentDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDispoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
