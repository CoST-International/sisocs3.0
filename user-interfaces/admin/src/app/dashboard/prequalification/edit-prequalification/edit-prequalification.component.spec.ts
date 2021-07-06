import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrequalificationComponent } from './edit-prequalification.component';

describe('EditPrequalificationComponent', () => {
  let component: EditPrequalificationComponent;
  let fixture: ComponentFixture<EditPrequalificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPrequalificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrequalificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
