import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSectorComponent } from './new-sector.component';

describe('NewSectorComponent', () => {
  let component: NewSectorComponent;
  let fixture: ComponentFixture<NewSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
