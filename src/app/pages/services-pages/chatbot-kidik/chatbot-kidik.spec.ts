import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotKIDIK } from './chatbot-kidik';

describe('ChatbotKIDIK', () => {
  let component: ChatbotKIDIK;
  let fixture: ComponentFixture<ChatbotKIDIK>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotKIDIK]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotKIDIK);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
