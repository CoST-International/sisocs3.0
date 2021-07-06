import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeTypesComponent } from './guarantee-types.component';

describe('GuaranteeTypesComponent', () => {
  let component: GuaranteeTypesComponent;
  let fixture: ComponentFixture<GuaranteeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuaranteeTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
