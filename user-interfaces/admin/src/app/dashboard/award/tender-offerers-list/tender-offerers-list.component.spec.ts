import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderOfferersListComponent } from './tender-offerers-list.component';

describe('TenderOfferersListComponent', () => {
  let component: TenderOfferersListComponent;
  let fixture: ComponentFixture<TenderOfferersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderOfferersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderOfferersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
