import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSettingComponent } from './new-setting.component';

describe('NewSettingComponent', () => {
  let component: NewSettingComponent;
  let fixture: ComponentFixture<NewSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
