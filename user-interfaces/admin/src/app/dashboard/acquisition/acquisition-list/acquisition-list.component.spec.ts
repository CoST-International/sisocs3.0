import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionListComponent } from './acquisition-list.component';

describe('AcquisitionListComponent', () => {
  let component: AcquisitionListComponent;
  let fixture: ComponentFixture<AcquisitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
