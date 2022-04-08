import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirecteurCedResultatComponent } from './directeur-ced-resultat.component';

describe('DirecteurCedResultatComponent', () => {
  let component: DirecteurCedResultatComponent;
  let fixture: ComponentFixture<DirecteurCedResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirecteurCedResultatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirecteurCedResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
