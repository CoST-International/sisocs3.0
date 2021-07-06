import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExecutionComponent } from './new-execution.component';

describe('NewExecutionComponent', () => {
  let component: NewExecutionComponent;
  let fixture: ComponentFixture<NewExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
