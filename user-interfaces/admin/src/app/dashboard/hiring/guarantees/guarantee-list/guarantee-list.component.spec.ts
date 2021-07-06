import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeListComponent } from './guarantee-list.component';

describe('GuaranteeListComponent', () => {
  let component: GuaranteeListComponent;
  let fixture: ComponentFixture<GuaranteeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuaranteeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
