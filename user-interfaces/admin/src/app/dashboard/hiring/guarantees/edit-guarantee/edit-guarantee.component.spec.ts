import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGuaranteeComponent } from './edit-guarantee.component';

describe('EditGuaranteeComponent', () => {
  let component: EditGuaranteeComponent;
  let fixture: ComponentFixture<EditGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGuaranteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
