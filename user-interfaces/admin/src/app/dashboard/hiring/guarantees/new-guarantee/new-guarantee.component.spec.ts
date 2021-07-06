import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGuaranteeComponent } from './new-guarantee.component';

describe('NewGuaranteeComponent', () => {
  let component: NewGuaranteeComponent;
  let fixture: ComponentFixture<NewGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGuaranteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
