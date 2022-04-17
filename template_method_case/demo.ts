/// <reference path="templateMethodCase.ts" />

namespace TemplateMethodCase {
	export namespace Demo {
		export function show() : void {
			const view = new MyView
      view.display()
			const view2 = new MyView2
      view2.display()
		}
	}
}
