import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancesComponent } from './advances.component';

describe('AdvancesComponent', () => {
  let component: AdvancesComponent;
  let fixture: ComponentFixture<AdvancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
