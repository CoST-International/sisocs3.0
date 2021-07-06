import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreparationComponent } from './edit-preparation.component';

describe('EditPreparationComponent', () => {
  let component: EditPreparationComponent;
  let fixture: ComponentFixture<EditPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPreparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
