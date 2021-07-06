import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrequalificationDocumentListComponent } from './prequalification-document-list.component';

describe('PrequalificationDocumentListComponent', () => {
  let component: PrequalificationDocumentListComponent;
  let fixture: ComponentFixture<PrequalificationDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrequalificationDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrequalificationDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
