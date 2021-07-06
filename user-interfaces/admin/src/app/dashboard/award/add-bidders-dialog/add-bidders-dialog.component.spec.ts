import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBiddersDialogComponent } from './add-bidders-dialog.component';

describe('AddBiddersDialogComponent', () => {
  let component: AddBiddersDialogComponent;
  let fixture: ComponentFixture<AddBiddersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBiddersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBiddersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
