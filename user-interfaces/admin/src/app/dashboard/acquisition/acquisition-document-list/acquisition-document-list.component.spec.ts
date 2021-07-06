import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionDocumentListComponent } from './acquisition-document-list.component';

describe('AcquisitionDocumentListComponent', () => {
  let component: AcquisitionDocumentListComponent;
  let fixture: ComponentFixture<AcquisitionDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
