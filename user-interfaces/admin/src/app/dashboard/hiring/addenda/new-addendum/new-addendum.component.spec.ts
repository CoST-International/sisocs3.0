import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddendumComponent } from './new-addendum.component';

describe('NewAddendumComponent', () => {
  let component: NewAddendumComponent;
  let fixture: ComponentFixture<NewAddendumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAddendumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
