/// <reference path="interpreterCase.ts" />

namespace InterpreterCase {
	export namespace Demo {
		export function show() : void {
			// (true and x) or (y and (not x)) where x = false, y = true
      const context = new Context

      const x = new VariableExp('X')
      const y = new VariableExp('Y')

      const expression = new OrExp(
        new AndExp(new Constant(true), x),
        new AndExp(y, new NotExp(x))
      )

      context.assign(x, false)
      context.assign(y, true)

      const result = expression.evaluate(context)

      console.log('(true and x) or (y and (not x)) where x=false, y=true', result) // true

			// (true and x) or ((not z) and (not x)) where x = false, z = true
      const z = new VariableExp('Z')
      const notZ = new NotExp(z)

      const replacement = expression.replace('Y', notZ)

      context.assign(z, true)

      const result2 = replacement.evaluate(context)

      console.log('(true and x) or ((not z) and (not x)) where x=false, z=true', result2) // false
		}
	}
}
