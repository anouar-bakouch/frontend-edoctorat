import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatPreRegisterComponent } from './candidat-pre-register.component';

describe('CandidatPreRegisterComponent', () => {
  let component: CandidatPreRegisterComponent;
  let fixture: ComponentFixture<CandidatPreRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatPreRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatPreRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
