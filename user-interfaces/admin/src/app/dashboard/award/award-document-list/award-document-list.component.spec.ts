import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardDocumentListComponent } from './award-document-list.component';

describe('AwardDocumentListComponent', () => {
  let component: AwardDocumentListComponent;
  let fixture: ComponentFixture<AwardDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
