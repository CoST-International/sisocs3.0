import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionUnitsComponent } from './execution-units.component';

describe('ExecutionUnitsComponent', () => {
  let component: ExecutionUnitsComponent;
  let fixture: ComponentFixture<ExecutionUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
