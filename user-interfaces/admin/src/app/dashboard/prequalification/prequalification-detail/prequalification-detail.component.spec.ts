import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrequalificationDetailComponent } from './prequalification-detail.component';

describe('PrequalificationDetailComponent', () => {
  let component: PrequalificationDetailComponent;
  let fixture: ComponentFixture<PrequalificationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrequalificationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrequalificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
