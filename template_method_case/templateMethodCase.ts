namespace TemplateMethodCase {
  export abstract class View {
    private _focus: boolean
    display(): void {
      this.setFocus()
      this.doDisplay()
      this.resetFocus()
    }
    private setFocus(): void {
      this._focus = true
    }
    protected doDisplay(): void {
      console.log('View must always be focused before display:', this._focus)
      if (!this._focus) throw new Error('This throw will never happen')
    }
    private resetFocus(): void {
      this._focus = false
    }
  }

  export class MyView extends View {
    override doDisplay(): void {
      super.doDisplay()
      console.log(`render the MyView's contents`)
    }
  }

  export class MyView2 extends View {
    override doDisplay(): void {
      super.doDisplay()
      console.log(`render the MyView2's contents`)
    }
  }
}
