import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcquisitionComponent } from './edit-acquisition.component';

describe('EditAcquisitionComponent', () => {
  let component: EditAcquisitionComponent;
  let fixture: ComponentFixture<EditAcquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAcquisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
