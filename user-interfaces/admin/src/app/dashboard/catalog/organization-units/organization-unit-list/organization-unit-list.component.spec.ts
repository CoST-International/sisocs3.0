import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUnitListComponent } from './organization-unit-list.component';

describe('OrganizationUnitListComponent', () => {
  let component: OrganizationUnitListComponent;
  let fixture: ComponentFixture<OrganizationUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
