export class MainController {

  constructor(toastr, socket) {
    'ngInject';

    this.toastr = toastr;
    this.messageText = null;
    this.socket = socket;
    this.messages = [];

    socket.on('message', message => {

      message.date = new Date();

      this.addMessage(message);

      toastr.info(message.text, `From: ${message.from}`);

    });

    socket.on('welcome', messages => {
      this.messages = messages;
    })

  }

  onSubmit() {

    let text = this.messageText;

    if (!text) return;

    this.messageText = '';

    this.socket.emit('post', text, message => {
      message.from = 'me';
      this.addMessage(message);
    });

  }

  addMessage(message) {
    this.messages.splice(0, 0, message);
    while (this.messages.length > 50) {
      this.messages.pop()
    }
  }

}
