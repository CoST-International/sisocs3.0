import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddersListComponent } from './bidders-list.component';

describe('BiddersListComponent', () => {
  let component: BiddersListComponent;
  let fixture: ComponentFixture<BiddersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
