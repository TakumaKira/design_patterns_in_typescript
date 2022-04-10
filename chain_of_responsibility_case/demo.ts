/// <reference path="chainOfResponsibilityCase.ts" />

namespace ChainOfResponsibilityCase {
	export namespace Demo {
		export function show() : void {
		  const application = new Application(Topic.APPLICATION_TOPIC)
			const dialog = new Dialog(application, Topic.PRINT_TOPIC)
			const button = new Button(dialog, Topic.PAPER_ORIENTATION_TOPIC)
			button.handleHelp()

			const buttonWithoutHelpTopic = new Button(dialog)
			buttonWithoutHelpTopic.handleHelp()

			const dialogWithoutHelpTopic = new Dialog(application)
			const buttonWithoutHelpTopic2 = new Button(dialogWithoutHelpTopic)
			buttonWithoutHelpTopic2.handleHelp()
		}
	}
}
