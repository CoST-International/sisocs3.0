import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddendaComponent } from './addenda.component';

describe('AddendaComponent', () => {
  let component: AddendaComponent;
  let fixture: ComponentFixture<AddendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
