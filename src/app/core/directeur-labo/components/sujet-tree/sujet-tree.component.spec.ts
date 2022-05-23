import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetTreeComponent } from './sujet-tree.component';

describe('SujetTreeComponent', () => {
  let component: SujetTreeComponent;
  let fixture: ComponentFixture<SujetTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
