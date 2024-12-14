import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementDetailsComponent } from './departement-details.component';

describe('DepartementDetailsComponent', () => {
  let component: DepartementDetailsComponent;
  let fixture: ComponentFixture<DepartementDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartementDetailsComponent]
    });
    fixture = TestBed.createComponent(DepartementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
