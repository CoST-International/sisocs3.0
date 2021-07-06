import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddendaDocumentListComponent } from './addenda-document-list.component';

describe('AddendaDocumentListComponent', () => {
  let component: AddendaDocumentListComponent;
  let fixture: ComponentFixture<AddendaDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddendaDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddendaDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
