import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEndingComponent } from './new-ending.component';

describe('NewEndingComponent', () => {
  let component: NewEndingComponent;
  let fixture: ComponentFixture<NewEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEndingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
