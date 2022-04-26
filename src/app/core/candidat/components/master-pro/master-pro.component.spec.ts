import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProComponent } from './master-pro.component';

describe('MasterProComponent', () => {
  let component: MasterProComponent;
  let fixture: ComponentFixture<MasterProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
