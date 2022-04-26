import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceProComponent } from './licence-pro.component';

describe('LicenceProComponent', () => {
  let component: LicenceProComponent;
  let fixture: ComponentFixture<LicenceProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenceProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
