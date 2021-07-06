import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationDocumentListComponent } from './preparation-document-list.component';

describe('PreparationDocumentListComponent', () => {
  let component: PreparationDocumentListComponent;
  let fixture: ComponentFixture<PreparationDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparationDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
