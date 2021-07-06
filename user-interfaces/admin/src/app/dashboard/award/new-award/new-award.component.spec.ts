import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAwardComponent } from './new-award.component';

describe('NewAwardComponent', () => {
  let component: NewAwardComponent;
  let fixture: ComponentFixture<NewAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
