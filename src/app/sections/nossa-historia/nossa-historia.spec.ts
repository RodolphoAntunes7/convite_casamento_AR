import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NossaHistoria } from './nossa-historia';

describe('NossaHistoria', () => {
  let component: NossaHistoria;
  let fixture: ComponentFixture<NossaHistoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NossaHistoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NossaHistoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
