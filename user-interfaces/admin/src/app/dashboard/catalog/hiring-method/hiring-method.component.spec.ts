import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringMethodComponent } from './hiring-method.component';

describe('HiringMethodComponent', () => {
  let component: HiringMethodComponent;
  let fixture: ComponentFixture<HiringMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
