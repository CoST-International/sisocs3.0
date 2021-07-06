import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddendaListComponent } from './addenda-list.component';

describe('AddendaListComponent', () => {
  let component: AddendaListComponent;
  let fixture: ComponentFixture<AddendaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddendaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
