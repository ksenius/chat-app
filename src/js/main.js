import '../scss/style.scss';
import { createElement } from './helpers';

class ChatApp {
  constructor() {
    this.MESSAGE_CLASS = 'chat__message';
    this.BUBBLE_CLASS = 'chat__bubble';

    this._getElements();
  }

  init() {
    this._attachEventHandlers();
  }

  _getElements() {
    this.messageForm = document.forms['chat-message'];
    this.inputField = this.messageForm.elements[0];

    this.radioButtons = Array.from(document.forms['chat-options'].elements);

    this.contentElement = document.querySelector('.js-chat-content');
  }

  _attachEventHandlers() {
    this.radioButtons.forEach((button) => {
      button.addEventListener('change', (event) => {
        event.preventDefault();

        this._handleRadioChange(event);
      });
    });

    this.messageForm.addEventListener('submit', (event) => {
      event.preventDefault();

      this._handleSubmit();
    });
  }

  _handleRadioChange(event) {
    const radioButton = event.currentTarget;
    const label = radioButton.parentNode;

    this._appendMessage(label.innerText);

    // disable radio buttons
    this.radioButtons.forEach((button) => (button.disabled = true));
  }

  _handleSubmit() {
    const message = this.inputField.value;

    if (message !== '') {
      this._appendMessage(message);

      // clear input
      this.inputField.value = '';
    }
  }

  _appendMessage(messageText) {
    const message = this._createMessage(messageText);

    // change initial CSS animation delay
    message.style.animationDelay = '0.2s';

    this.contentElement.append(message);
  }

  _createMessage(messageText) {
    const message = createElement('div', this.MESSAGE_CLASS);
    const bubble = createElement('div', this.BUBBLE_CLASS, messageText);

    message.classList.add(`${this.MESSAGE_CLASS}_sent`);
    bubble.classList.add(`${this.BUBBLE_CLASS}_sent`);

    message.append(bubble);

    return message;
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const chatApp = new ChatApp();

  chatApp.init();
});
