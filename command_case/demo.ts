/// <reference path="commandCase.ts" />

namespace CommandCase {
	export namespace Demo {
		export function show() : void {
			const application = new Application
			const openCommand = new OpenCommand(application)
			openCommand.execute()

			const selectedDocument = application.getSelectedDocument()
			const pasteCommand = new PasteCommand(selectedDocument)

		  const receiver = new MyClass
      const aCommand = new SimpleCommand<MyClass>(receiver, MyClass.action)

			const macroCommand = new MacroCommand()
			macroCommand.add(pasteCommand)
			macroCommand.add(aCommand)
			macroCommand.execute()
		}
	}
}
