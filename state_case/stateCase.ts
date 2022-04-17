namespace StateCase {
  export class TCPOctetStream {}

  export abstract class TCPState {
    transmit(t: TCPConnection, o: TCPOctetStream): void {
      console.log('default behavior of transmit at TCPState', t, o)
    }
    activeOpen(t: TCPConnection): void {
      console.log('default behavior of activeOpen at TCPState', t)
    }
    passiveOpen(t: TCPConnection): void {
      console.log('default behavior of passiveOpen at TCPState', t)
    }
    close(t: TCPConnection): void {
      console.log('default behavior of close at TCPState', t)
    }
    synchronize(t: TCPConnection): void {
      console.log('default behavior of synchronize at TCPState', t)
    }
    acknowledge(t: TCPConnection): void {
      console.log('default behavior of acknowledge at TCPState', t)
    }
    send(t: TCPConnection): void {
      console.log('default behavior of send at TCPState', t)
    }
    protected changeState(t: TCPConnection, s: TCPState): void {
      t.changeState(s) // better to access as a friend if possible
    }
  }

  export class TCPConnection {
    private _state: TCPState

    constructor() {
      this._state = TCPClosed.instance()
    }

    activeOpen(): void {
      this._state.activeOpen(this)
    }
    passiveOpen(): void {
      this._state.passiveOpen(this)
    }
    close(): void {
      this._state.close(this)
    }
    send(): void {
      this._state.send(this)
    }
    acknowledge(): void {
      this._state.acknowledge(this)
    }
    synchronize(): void {
      this._state.synchronize(this)
    }

    processOctet(o: TCPOctetStream): void {
      console.log('processOctet at TCPConnection', o)
    }

    changeState(s: TCPState): void { // better to provide access as a friend if possible
      this._state = s
    }
  }

  export class TCPEstablished extends TCPState {
    static _instance: TCPState
    static instance(): TCPState {
      if (!this._instance) {
        this._instance = new this
      }
      return this._instance
    }

    transmit(t: TCPConnection, o: TCPOctetStream): void {
      t.processOctet(o)
    }
    close(t: TCPConnection): void {
      this.changeState(t, TCPClosed.instance())
    }
  }

  export class TCPListen extends TCPState {
    static _instance: TCPState
    static instance(): TCPState {
      if (!this._instance) {
        this._instance = new this
      }
      return this._instance
    }

    send(t: TCPConnection): void {
      console.log('send at TCPListen: send SYN, receive SYN, ACK, etc.')
      this.changeState(t, TCPEstablished.instance())
    }
    close(t: TCPConnection): void {
      console.log('close at TCPListen: send FIN, receive ACK of FIN')
      this.changeState(t, TCPClosed.instance())
    }
  }

  export class TCPClosed extends TCPState {
    static _instance: TCPState
    static instance(): TCPState {
      if (!this._instance) {
        this._instance = new this
      }
      return this._instance
    }

    activeOpen(t: TCPConnection): void {
      console.log('activeOpen at TCPClosed: send SYN, receive SYN, ACK, etc.')
      this.changeState(t, TCPEstablished.instance())
    }
    passiveOpen(t: TCPConnection): void {
      this.changeState(t, TCPListen.instance())
    }
  }
}
