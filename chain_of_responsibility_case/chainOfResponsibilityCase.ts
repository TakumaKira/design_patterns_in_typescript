namespace ChainOfResponsibilityCase {
  export enum Topic {
    NO_HELP_TOPIC,
    PRINT_TOPIC,
    PAPER_ORIENTATION_TOPIC,
    APPLICATION_TOPIC
  }

  export abstract class HelpHandler {
    constructor(private _successor: HelpHandler, private _topic: Topic) {}
    hasHelp(): boolean {
      return this._topic !== Topic.NO_HELP_TOPIC
    }
    setHandler(h: HelpHandler, t: Topic): void {
      this._successor = h
      this._topic = t
    }
    handleHelp(): void {
      if (this._successor) {
        this._successor.handleHelp()
      }
    }
  }

  export abstract class Widget extends HelpHandler {
    constructor(private _parent: Widget, topic: Topic = Topic.NO_HELP_TOPIC) {
      super(_parent, topic)
    }
  }

  export class Button extends Widget {
    constructor(h: Widget, t: Topic = Topic.NO_HELP_TOPIC) {
      super(h, t)
    }
    override handleHelp(): void {
      if (this.hasHelp()) {
        console.log('offer help on the button')
      } else {
        super.handleHelp()
      }
    }
  }

  export class Dialog extends Widget {
    constructor(h: HelpHandler, t: Topic = Topic.NO_HELP_TOPIC) {
      super(null)
      this.setHandler(h, t)
    }

    override handleHelp() {
      if (this.hasHelp()) {
        console.log('offer help on the dialog')
      } else {
        super.handleHelp()
      }
    }
  }

  export class Application extends HelpHandler {
    constructor(t: Topic) {
      super(null, t)
    }

    override handleHelp(): void {
      console.log('show a list of help topics')
    }
  }
}