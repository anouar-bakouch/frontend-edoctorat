import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutComponent } from './dut.component';

describe('DutComponent', () => {
  let component: DutComponent;
  let fixture: ComponentFixture<DutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
