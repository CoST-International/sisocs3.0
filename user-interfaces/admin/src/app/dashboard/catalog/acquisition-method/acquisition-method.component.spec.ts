import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionMethodComponent } from './acquisition-method.component';

describe('AcquisitionMethodComponent', () => {
  let component: AcquisitionMethodComponent;
  let fixture: ComponentFixture<AcquisitionMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
