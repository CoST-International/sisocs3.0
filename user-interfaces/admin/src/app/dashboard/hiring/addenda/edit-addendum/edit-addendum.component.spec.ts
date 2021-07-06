import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddendumComponent } from './edit-addendum.component';

describe('EditAddendumComponent', () => {
  let component: EditAddendumComponent;
  let fixture: ComponentFixture<EditAddendumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddendumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
