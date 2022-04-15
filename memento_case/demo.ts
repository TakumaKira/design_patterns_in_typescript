/// <reference path="mementoCase.ts" />

namespace MementoCase {
	export namespace Demo {
		export function show() : void {
			const solver = ConstraintSolver.instance()
			const graphicA = new Graphic(new Point(0))
			const graphicB = new Graphic(new Point(1))
			solver.addConstraint(graphicA, graphicB)
			console.log('before')
			const moveCommand = new MoveCommand(graphicA, new Point(1))
			console.log('graphicA.point', graphicA.point) // Point{x:0}
			console.log('graphicB.point', graphicB.point) // Point{x:1}
			console.log('execute')
      moveCommand.execute()
			console.log('graphicA.point', graphicA.point) // Point{x:1}
			console.log('graphicB.point', graphicB.point) // Point{x:2}
			console.log('unexecute')
      moveCommand.unexecute()
			console.log('graphicA.point', graphicA.point) // Point{x:0}
			console.log('graphicB.point', graphicB.point) // Point{x:1}


			// IterationState example
			const aCollection = new Collection<ItemType>()
			aCollection.append(new ItemType('a'))
			aCollection.append(new ItemType('b'))
			aCollection.append(new ItemType('c'))
			const state = aCollection.createIterationState() // memento -> 1. can use multiple states, 2. no need to break encapsulation to support iteration

			while (!aCollection.isDone(state)) {
				aCollection.currentItem(state).process()
				aCollection.next(state)
			}
		}
	}
}
