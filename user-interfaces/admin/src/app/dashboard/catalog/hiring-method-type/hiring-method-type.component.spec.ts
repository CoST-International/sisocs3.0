import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringMethodTypeComponent } from './hiring-method-type.component';

describe('HiringMethodTypeComponent', () => {
  let component: HiringMethodTypeComponent;
  let fixture: ComponentFixture<HiringMethodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringMethodTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringMethodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
