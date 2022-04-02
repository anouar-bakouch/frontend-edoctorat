import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoratMedecineComponent } from './doctorat-medecine.component';

describe('DoctoratMedecineComponent', () => {
  let component: DoctoratMedecineComponent;
  let fixture: ComponentFixture<DoctoratMedecineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctoratMedecineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoratMedecineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
