import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBidderComponent } from './edit-bidder.component';

describe('EditBidderComponent', () => {
  let component: EditBidderComponent;
  let fixture: ComponentFixture<EditBidderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBidderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
