import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialsListComponent } from './officials-list.component';

describe('OfficialsListComponent', () => {
  let component: OfficialsListComponent;
  let fixture: ComponentFixture<OfficialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficialsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
