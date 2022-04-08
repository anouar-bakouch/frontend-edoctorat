import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCedComponent } from './main-ced.component';

describe('MainCedComponent', () => {
  let component: MainCedComponent;
  let fixture: ComponentFixture<MainCedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
