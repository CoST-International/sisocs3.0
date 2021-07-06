import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrequalificationComponent } from './new-prequalification.component';

describe('NewPrequalificationComponent', () => {
  let component: NewPrequalificationComponent;
  let fixture: ComponentFixture<NewPrequalificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPrequalificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrequalificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
