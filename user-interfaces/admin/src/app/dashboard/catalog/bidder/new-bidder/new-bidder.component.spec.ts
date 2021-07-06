import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBidderComponent } from './new-bidder.component';

describe('NewBidderComponent', () => {
  let component: NewBidderComponent;
  let fixture: ComponentFixture<NewBidderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBidderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
