/// <reference path="facadeCase.ts" />

namespace FacadeCase {
	export namespace Demo {
		export function show() : void {
		  const compiler = new Compiler()
      compiler.compile(new istream, new BytecodeStream)
		}
	}
}
