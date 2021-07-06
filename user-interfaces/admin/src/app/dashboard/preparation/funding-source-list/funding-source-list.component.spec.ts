import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingSourceListComponent } from './funding-source-list.component';

describe('FundingSourceListComponent', () => {
  let component: FundingSourceListComponent;
  let fixture: ComponentFixture<FundingSourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingSourceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingSourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
