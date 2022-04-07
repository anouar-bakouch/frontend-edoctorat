import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfSujetComponent } from './prof-sujet.component';

describe('ProfSujetComponent', () => {
  let component: ProfSujetComponent;
  let fixture: ComponentFixture<ProfSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfSujetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
