import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceListComponent } from './advance-list.component';

describe('AdvanceListComponent', () => {
  let component: AdvanceListComponent;
  let fixture: ComponentFixture<AdvanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
