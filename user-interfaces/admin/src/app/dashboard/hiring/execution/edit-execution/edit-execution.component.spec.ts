import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExecutionComponent } from './edit-execution.component';

describe('EditExecutionComponent', () => {
  let component: EditExecutionComponent;
  let fixture: ComponentFixture<EditExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
