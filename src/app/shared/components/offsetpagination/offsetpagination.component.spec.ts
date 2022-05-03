import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsetpaginationComponent } from './offsetpagination.component';

describe('OffsetpaginationComponent', () => {
  let component: OffsetpaginationComponent;
  let fixture: ComponentFixture<OffsetpaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffsetpaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffsetpaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
