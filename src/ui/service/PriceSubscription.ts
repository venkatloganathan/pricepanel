import ClientSocket from "../network/ClientSocket";

class PriceSubscription {
  private socket: ClientSocket;

  private subscriptionMap: Map<string, (data: unknown) => void>;

  constructor() {
    this.socket = new ClientSocket("ws://localhost:8000");
    this.socket.addEventListener("message", this.socketMessage.bind(this));
    this.subscriptionMap = new Map();
  }

  socketMessage(event: CustomEventInit) {
    const messages = JSON.parse(event.detail) as { id: string }[];
    for (let i = 0; i < messages?.length; i++) {
      queueMicrotask(() => {
        const price = messages[i];
        const callbackFn = this.subscriptionMap.get(price?.id);
        if (callbackFn) {
          callbackFn(price);
        }
      })
    }
  }

  subscribe(pair: string, callback: (data: unknown) => void) {
    this.subscriptionMap.set(pair, callback);
  }

  unsubscribe(pair: string) {
    this.subscriptionMap.delete(pair);
  }

  stopSubscription() {
    this.socket.sendMessage("unsubscribe");
  }

  startSubscription() {
    this.socket.sendMessage("subscribe");
  }
}

const PriceSubscriptionInstance = new PriceSubscription();

Object.freeze(PriceSubscriptionInstance);

export default PriceSubscriptionInstance;
