import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAcquisitionComponent } from './new-acquisition.component';

describe('NewAcquisitionComponent', () => {
  let component: NewAcquisitionComponent;
  let fixture: ComponentFixture<NewAcquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAcquisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
