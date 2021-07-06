import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganizationUnitComponent } from './edit-organization-unit.component';

describe('EditOrganizationUnitComponent', () => {
  let component: EditOrganizationUnitComponent;
  let fixture: ComponentFixture<EditOrganizationUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrganizationUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganizationUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
