import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingSourceComponent } from './financing-source.component';

describe('FinancingSourceComponent', () => {
  let component: FinancingSourceComponent;
  let fixture: ComponentFixture<FinancingSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
