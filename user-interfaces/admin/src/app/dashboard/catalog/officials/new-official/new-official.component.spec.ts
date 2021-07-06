import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfficialComponent } from './new-official.component';

describe('NewOfficialComponent', () => {
  let component: NewOfficialComponent;
  let fixture: ComponentFixture<NewOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOfficialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
