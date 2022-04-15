namespace MementoCase {
  export class Graphic {
    constructor(private _point: Point) {}
    get point(): Point {return this._point}
    move(delta: Point) {
      this._point = this._point.add(delta)
    }
    setPoint(point: Point) {
      this._point = point
    }
  }

  export class MoveCommand {
    private _state: ConstraintSolverMemento
    constructor(private _target: Graphic, private _delta: Point) {}
    execute(): void {
      const solver = ConstraintSolver.instance()
      this._state = solver.createMemento()
      this._target.move(this._delta)
      solver.solve()
    }
    unexecute(): void {
      const solver = ConstraintSolver.instance()
      this._target.move(this._delta.negative())
      solver.setMemento(this._state)
      solver.solve()
    }
  }

  export class ConstraintSolver {
    static _instance: ConstraintSolver
    static instance(): ConstraintSolver {
      if (!this._instance) {
        this._instance = new ConstraintSolver
      }
      return this._instance
    }
    private _startConnection: Graphic
    private _endConnection: Graphic
    /** distance from start to end */
    private _delta: Point
    solve(): void {
      this._endConnection.move(this._startConnection.point.add(this._delta).minus(this._endConnection.point))
    }
    /** endConnection always follow startConnection */
    addConstraint(startConnection: Graphic, endConnection: Graphic): void {
      this._startConnection = startConnection
      this._endConnection = endConnection
      this._delta = endConnection.point.minus(startConnection.point)
    }
    removeConstraint(startConnection: Graphic, endConnection: Graphic): void {
      throw new Error("Method not implemented.")
    }
    createMemento(): ConstraintSolverMemento {
      return new ConstraintSolverMemento(this._startConnection.point, this._endConnection.point)
    }
    setMemento(memento: ConstraintSolverMemento): void {
      this._startConnection.setPoint(memento.startConnectionPoint)
      this._endConnection.setPoint(memento.endConnectionPoint)
    }
  }

  export class ConstraintSolverMemento {
    private _startConnectionPoint: Point
    private _endConnectionPoint: Point
    constructor(startConnectionPoint: Point, endConnectionPoint: Point) {
      this._startConnectionPoint = startConnectionPoint.clone()
      this._endConnectionPoint = endConnectionPoint.clone()
    }
    get startConnectionPoint(): Point {
      return this._startConnectionPoint
    }
    get endConnectionPoint(): Point {
      return this._endConnectionPoint
    }
  }

  export class Point {
    constructor(private x: number) {}
    add(point: Point): Point {
      return new Point(this.x + point.x)
    }
    minus(point: Point): Point {
      return new Point(this.x - point.x)
    }
    negative(): Point {
      return new Point(-this.x)
    }
    equal(point: Point): boolean {
      return this.x === point.x
    }
    clone(): Point {
      return new Point(this.x)
    }
  }


  // IterationState example
  export class Collection<Item> {
    private _collection: Array<Item> = []
    createIterationState(): IterationState {
      return new IterationState
    }
    next(state: IterationState): void {
      state.next()
    }
    isDone(state: IterationState): boolean {
      return state.current() >= this._collection.length
    }
    currentItem(state: IterationState): Item {
      return this._collection[state.current()]
    }
    copy(state: IterationState): IterationState {
      return state.copy()
    }

    append(item: Item): void {
      this._collection.push(item)
    }
    remove(item: Item): void {

    }
  }

  export class IterationState {
    constructor(private _state: number = 0) {}
    next(): void {
      this._state++
    }
    current(): number {
      return this._state
    }
    copy(): IterationState {
      return new IterationState(this._state)
    }
  }

  export class ItemType {
    constructor(private _name: string) {}
    process(): void {
      console.log('process ItemType', this._name)
    }
  }
}
