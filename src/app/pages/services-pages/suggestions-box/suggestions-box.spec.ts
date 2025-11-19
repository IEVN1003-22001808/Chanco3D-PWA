import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsBox } from './suggestions-box';

describe('SuggestionsBox', () => {
  let component: SuggestionsBox;
  let fixture: ComponentFixture<SuggestionsBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
