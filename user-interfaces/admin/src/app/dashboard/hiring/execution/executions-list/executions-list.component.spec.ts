import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionsListComponent } from './executions-list.component';

describe('ExecutionsListComponent', () => {
  let component: ExecutionsListComponent;
  let fixture: ComponentFixture<ExecutionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
