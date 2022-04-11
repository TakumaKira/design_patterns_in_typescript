namespace CommandCase {
  export abstract class Command {
    abstract execute(): void
  }

  export class OpenCommand extends Command {
    private _response: string
    constructor(private _application: Application) {
      super()
    }
    execute(): void {
      const name = this.askUser()

      if (name) {
        const document = new Document(name)
        this._application.add(document)
        document.open()
      }
    }
    protected askUser(): string {
      console.log('Ask user file name to open')
      return 'user selected file name'
    }
  }

  export class PasteCommand extends Command {
    constructor(private _document: Document) {
      super()
    }
    execute(): void {
      this._document.paste()
    }
  }

  export class SimpleCommand<Receiver> extends Command {
    constructor(private _receiver: Receiver, private _action: Action) {
      super()
    }
    execute<Receiver>(): void {
      this._receiver[this._action]()
    }
  }

  export class MacroCommand extends Command {
    private _cmds: Array<Command> = []
    add(cmd: Command): void {
      this._cmds.push(cmd)
    }
    remove(cmd: Command): void {
      this._cmds.filter(c => c !== cmd)
    }
    execute(): void {
      for (let i = 0; i < this._cmds.length; i++) {
        const c = this._cmds[i]
        c.execute()
      }
    }
  }

  export class Application {
    private _document: Document
    add(document: Document): void {
      this._document = document
    }
    getSelectedDocument(): Document {
      return this._document
    }
  }
  export class Document {
    constructor(private _name: string) {}
    open(): void {
      console.log('open', this._name)
    }
    paste(): void {
      console.log('paste', this._name)
    }
  }
  export enum Action {
    A,
    B,
    C
  }
  export abstract class Receiver {
    [Action.A](): void {
      throw new Error("Method not implemented.")
    }
    [Action.B](): void {
      throw new Error("Method not implemented.")
    }
    [Action.C](): void {
      throw new Error("Method not implemented.")
    }
  }

  export class MyClass extends Receiver {
    static action: Action = Action.A
    override [Action.A](): void {
      console.log('MyClass.Action.A')
    }
  }
}