import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfficialComponent } from './edit-official.component';

describe('EditOfficialComponent', () => {
  let component: EditOfficialComponent;
  let fixture: ComponentFixture<EditOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOfficialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
