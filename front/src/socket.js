class CustomWebSocket {
    constructor({uid,onOpenHandler, onMessageHandler, onErrorHandler, onCloseHandler}) {
        this.socket = new WebSocket("ws://localhost/ws/");
        this.id = uid;
          
        this.socket.onopen = (e) => {
          if (onOpenHandler)
            onOpenHandler(e);
        };
  
        this.socket.onmessage = (e) => {
          if (onMessageHandler)
            onMessageHandler(JSON.parse(e.data));
        };
  
        this.socket.onerror = (e) => {
          if (onErrorHandler)
            onErrorHandler(e);
        };
  
        this.socket.onclose = (e) => {
          if (onCloseHandler)
            onCloseHandler(e);
        };

        this.socket.addEventListener('ping', () => {
            this.socket.pong();
        })
    }
  
    sendMessage(pid = null) {
        return this.socket.send(JSON.stringify({
            uid: this.id,
            pid: pid
        }));
    }
  }
  
  export default CustomWebSocket;
  