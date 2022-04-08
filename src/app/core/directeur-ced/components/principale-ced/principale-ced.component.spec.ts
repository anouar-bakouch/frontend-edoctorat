import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaleCedComponent } from './principale-ced.component';

describe('PrincipaleCedComponent', () => {
  let component: PrincipaleCedComponent;
  let fixture: ComponentFixture<PrincipaleCedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipaleCedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipaleCedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
