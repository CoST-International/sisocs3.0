import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingDocumentListComponent } from './ending-document-list.component';

describe('EndingDocumentListComponent', () => {
  let component: EndingDocumentListComponent;
  let fixture: ComponentFixture<EndingDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndingDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
