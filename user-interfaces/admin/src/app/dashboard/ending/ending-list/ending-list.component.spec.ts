import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingListComponent } from './ending-list.component';

describe('EndingListComponent', () => {
  let component: EndingListComponent;
  let fixture: ComponentFixture<EndingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
