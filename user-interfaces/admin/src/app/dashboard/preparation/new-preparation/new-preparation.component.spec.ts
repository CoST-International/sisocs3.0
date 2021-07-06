import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPreparationComponent } from './new-preparation.component';

describe('NewPreparationComponent', () => {
  let component: NewPreparationComponent;
  let fixture: ComponentFixture<NewPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPreparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
