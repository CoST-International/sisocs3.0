import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrequalificationComponent } from './prequalification.component';

describe('PrequalificationComponent', () => {
  let component: PrequalificationComponent;
  let fixture: ComponentFixture<PrequalificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrequalificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrequalificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
