import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSectorsComponent } from './sub-sectors.component';

describe('SubSectorsComponent', () => {
  let component: SubSectorsComponent;
  let fixture: ComponentFixture<SubSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
