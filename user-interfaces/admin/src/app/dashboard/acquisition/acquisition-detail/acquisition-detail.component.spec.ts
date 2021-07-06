import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionDetailComponent } from './acquisition-detail.component';

describe('AcquisitionDetailComponent', () => {
  let component: AcquisitionDetailComponent;
  let fixture: ComponentFixture<AcquisitionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
