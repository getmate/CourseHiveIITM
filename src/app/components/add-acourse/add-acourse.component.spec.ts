import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddACourseComponent } from './add-acourse.component';

describe('AddACourseComponent', () => {
  let component: AddACourseComponent;
  let fixture: ComponentFixture<AddACourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddACourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddACourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
