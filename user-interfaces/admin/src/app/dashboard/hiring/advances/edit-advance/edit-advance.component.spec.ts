import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvanceComponent } from './edit-advance.component';

describe('EditAdvanceComponent', () => {
  let component: EditAdvanceComponent;
  let fixture: ComponentFixture<EditAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
