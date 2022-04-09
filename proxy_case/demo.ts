/// <reference path="proxyCase.ts" />

namespace ProxyCase {
	export namespace Demo {
		export function show() : void {
		  const text = new TextDocument
      text.insert(new ImageProxy('anImageFileName'))
		}
	}
}
