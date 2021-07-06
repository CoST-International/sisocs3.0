import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionsComponent } from './acquisitions.component';

describe('AcquisitionsComponent', () => {
  let component: AcquisitionsComponent;
  let fixture: ComponentFixture<AcquisitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
