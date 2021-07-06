import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisbursementComponent } from './edit-disbursement.component';

describe('EditDisbursementComponent', () => {
  let component: EditDisbursementComponent;
  let fixture: ComponentFixture<EditDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisbursementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
