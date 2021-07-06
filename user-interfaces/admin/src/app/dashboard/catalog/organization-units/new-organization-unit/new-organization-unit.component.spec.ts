import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrganizationUnitComponent } from './new-organization-unit.component';

describe('NewOrganizationUnitComponent', () => {
  let component: NewOrganizationUnitComponent;
  let fixture: ComponentFixture<NewOrganizationUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrganizationUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrganizationUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
