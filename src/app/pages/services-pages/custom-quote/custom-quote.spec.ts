import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomQuote } from './custom-quote';

describe('CustomQuote', () => {
  let component: CustomQuote;
  let fixture: ComponentFixture<CustomQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomQuote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomQuote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
