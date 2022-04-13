/// <reference path="mediatorCase.ts" />

namespace MediatorCase {
	export namespace Demo {
		export function show() : void {
			const fontDialog1 = new FontDialog
			console.log('click cancel button')
      fontDialog1.cancelButton.handleMouse(new MouseEvent)

			const fontDialog2 = new FontDialog
			console.log('select index 2 of font list')
      fontDialog2.fontList.handleMouse(new MouseEvent({selectedIndex: 2}))
			console.log('click ok button')
      fontDialog2.okButton.handleMouse(new MouseEvent)
		}
	}
}
