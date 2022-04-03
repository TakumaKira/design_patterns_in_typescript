/// <reference path="decoratorCase.ts" />

namespace DecoratorCase {
	export namespace Demo {
		export function show() : void {
			const window = new Window
      const textView = new TextView

      window.setContents(textView)
      window.setContents(
        new BorderDecorator(new ScrollDecorator(textView), 1)
      )
		}
	}
}
