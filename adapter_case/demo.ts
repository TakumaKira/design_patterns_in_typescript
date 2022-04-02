/// <reference path="adapterCase.ts" />

namespace AdapterCase {
	export namespace Demo {
		export function show() : void {
			const textShapeA = new TextShapeA()
      textShapeA.boundingBox(new Point(5, 10), new Point(15, 15))
      console.log(textShapeA)
      const manipulatorA = textShapeA.createManipulator()
      console.log(manipulatorA)

			const textShapeB = new TextShapeB(new TextView)
      textShapeB.boundingBox(new Point(5, 10), new Point(15, 15))
      console.log(textShapeB)
      const manipulatorB = textShapeB.createManipulator()
      console.log(manipulatorB)
		}
	}
}
