import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementsListComponent } from './disbursements-list.component';

describe('DisbursementsListComponent', () => {
  let component: DisbursementsListComponent;
  let fixture: ComponentFixture<DisbursementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisbursementsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
