import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDocumentListComponent } from './project-document-list.component';

describe('ProjectDocumentListComponent', () => {
  let component: ProjectDocumentListComponent;
  let fixture: ComponentFixture<ProjectDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
