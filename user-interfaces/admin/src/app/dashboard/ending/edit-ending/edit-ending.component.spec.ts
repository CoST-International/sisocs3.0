import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEndingComponent } from './edit-ending.component';

describe('EditEndingComponent', () => {
  let component: EditEndingComponent;
  let fixture: ComponentFixture<EditEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEndingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
