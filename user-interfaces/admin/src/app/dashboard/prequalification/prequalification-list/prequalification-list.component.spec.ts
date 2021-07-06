import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrequalificationListComponent } from './prequalification-list.component';

describe('PrequalificationListComponent', () => {
  let component: PrequalificationListComponent;
  let fixture: ComponentFixture<PrequalificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrequalificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrequalificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
