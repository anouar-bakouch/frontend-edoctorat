import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CIngenieurComponent } from './c-ingenieur.component';

describe('CIngenieurComponent', () => {
  let component: CIngenieurComponent;
  let fixture: ComponentFixture<CIngenieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CIngenieurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CIngenieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
