namespace DecoratorCase {
  export interface VisualComponent {
    draw(): void
    resize(): void
  }

  export abstract class Decorator implements VisualComponent {
    constructor(private _component: VisualComponent) {}
    draw(): void {
      this._component.draw()
    }
    resize(): void {
      this._component.resize()
    }
  }

  export class BorderDecorator extends Decorator {
    constructor(_component: VisualComponent, private _borderWidth: number) {
      super(_component)
    }
    private drawBorder(width: number): void {
      console.log(`drawBorder with borderWidth ${width}`)
    }
    draw(): void {
      super.draw()
      this.drawBorder(this._borderWidth)
    }
  }

  export class ScrollDecorator extends Decorator {
    constructor(_component: VisualComponent) {
      super(_component)
    }
    private drawScrollBar(): void {
      console.log(`drawScrollBar`)
    }
    draw(): void {
      super.draw()
      this.drawScrollBar()
    }
  }

  export class Window {
    setContents(contents: VisualComponent) {
      contents.draw()
    }
  }

  export class TextView implements VisualComponent {
    draw(): void {
      console.log('draw of TextView')
    }
    resize(): void {
      console.log('resize of TextView')
    }
  }
}