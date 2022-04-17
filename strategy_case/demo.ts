/// <reference path="strategyCase.ts" />

namespace StrategyCase {
	export namespace Demo {
		export function show() : void {
		  const quick = new Composition(new SimpleCompositor)
      quick.repair()
      const slick = new Composition(new TexCompositor)
      slick.repair()
      const iconic = new Composition(new ArrayCompositor(100))
      iconic.repair()
		}
	}
}
