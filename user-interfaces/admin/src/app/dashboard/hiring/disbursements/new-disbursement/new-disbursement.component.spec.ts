import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDisbursementComponent } from './new-disbursement.component';

describe('NewDisbursementComponent', () => {
  let component: NewDisbursementComponent;
  let fixture: ComponentFixture<NewDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDisbursementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
