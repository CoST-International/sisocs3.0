import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStandardComponent } from './data-standard.component';

describe('DataStandardComponent', () => {
  let component: DataStandardComponent;
  let fixture: ComponentFixture<DataStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
