import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirecteurCedSujetComponent } from './directeur-ced-sujet.component';

describe('DirecteurCedSujetComponent', () => {
  let component: DirecteurCedSujetComponent;
  let fixture: ComponentFixture<DirecteurCedSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirecteurCedSujetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirecteurCedSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
