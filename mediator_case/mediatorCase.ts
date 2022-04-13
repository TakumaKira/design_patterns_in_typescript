namespace MediatorCase {
  export abstract class DialogDirector {
    showDialog(): void {
      throw new Error("Method not implemented.")
    }
    abstract widgetChanged(widget: Widget): void

    protected abstract createWidgets(): void
  }

  export abstract class Widget {
    constructor(private _director: DialogDirector) {}

    abstract handleMouse(event: MouseEvent): void

    changed(): void {
      this._director.widgetChanged(this)
    }
  }

  export class ListBox extends Widget {
    private _listItems: Array<string>
    private _selectedIndex: number
    getSelection(): string {
      return this._listItems[this._selectedIndex]
    }
    setList(listItems: Array<string>) {
      this._listItems = listItems
    }
    handleMouse(event: MouseEvent): void {
      this._selectedIndex = event.option.selectedIndex
      this.changed()
    }
  }

  export class EntryField extends Widget {
    private _text: string
    setText(text: string): void {
      this._text = text
    }
    getText(): string {
      return this._text
    }
    handleMouse(event: MouseEvent): void {
      throw new Error("Method not implemented.")
    }
  }

  export class Button extends Widget {
    setText(text: string): void {
      throw new Error("Method not implemented.")
    }
    handleMouse(event: MouseEvent): void {
      this.changed()
    }
  }

  export class FontDialogDirector extends DialogDirector {
    private _ok: Button
    private _cancel: Button
    private _fontList: ListBox
    private _fontName: EntryField
    constructor(private _dialog: FontDialog) {
      super()
      this.createWidgets()
    }
    widgetChanged(theChangedWidget: Widget): void {
      if (theChangedWidget === this._fontList) {
        this._fontName.setText(this._fontList.getSelection())
      } else if (theChangedWidget === this._ok) {
        this._dialog.ok()
      } else if (theChangedWidget === this._cancel) {
        this._dialog.cancel()
      }
    }
    protected createWidgets(): void {
      this._ok = new Button(this)
      this._cancel = new Button(this)
      this._fontList = new ListBox(this)
      this._fontName = new EntryField(this)

      const getAvailableFontNames = () => ['font-a', 'font-b', 'font-c']
      this._fontList.setList(getAvailableFontNames())

      this._dialog.setWidgets({ok: this._ok, cancel: this._cancel, fontList: this._fontList, fontName: this._fontName})
    }
  }

  export abstract class Dialog {
    protected _director: DialogDirector
  }
  export class FontDialog extends Dialog {
    okButton: Button
    cancelButton: Button
    fontList: ListBox
    fontName: EntryField
    constructor() {
      super()
      this._director = new FontDialogDirector(this)
    }
    setWidgets(props: {ok: Button, cancel: Button, fontList: ListBox, fontName: EntryField}) {
      this.okButton = props.ok
      this.cancelButton = props.cancel
      this.fontList = props.fontList
      this.fontName = props.fontName
    }
    ok(): void {
      console.log('apply font', this.fontName.getText())
      console.log('dismiss dialog')
    }
    cancel(): void {
      console.log('dismiss dialog')
    }
  }

  export class MouseEvent {
    constructor(public option?: any) {}
  }
}
