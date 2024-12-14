import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartementDialogComponent } from './add-departement-dialog.component';

describe('AddDepartementDialogComponent', () => {
  let component: AddDepartementDialogComponent;
  let fixture: ComponentFixture<AddDepartementDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDepartementDialogComponent]
    });
    fixture = TestBed.createComponent(AddDepartementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
