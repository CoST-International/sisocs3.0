import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDocumentListComponent } from './contract-document-list.component';

describe('ContractDocumentListComponent', () => {
  let component: ContractDocumentListComponent;
  let fixture: ComponentFixture<ContractDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
