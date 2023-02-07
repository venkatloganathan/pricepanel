class ClientSocket extends EventTarget {
  private websocketClient: WebSocket;

  constructor(url:string) {
    super();
    this.websocketClient = new WebSocket(url);
    this.websocketClient.onopen = this.onOpen.bind(this);
    this.websocketClient.onmessage = this.onMessage.bind(this);
  }

  onOpen() {
    console.log("Web socket client opened");
  }

  onMessage(event: MessageEvent) {
    const customEvent = new CustomEvent("message", {
      detail: event.data,
    });
    this.dispatchEvent(customEvent);
  }

  sendMessage(data: any) {
    if (this.websocketClient.readyState) {
      this.websocketClient.send(data);
    }
  }
}

export default ClientSocket;
