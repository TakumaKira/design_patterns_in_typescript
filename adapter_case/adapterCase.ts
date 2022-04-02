namespace AdapterCase {
  export interface Shape {
    boundingBox(bottomLeft: Point, topRight: Point): void
    createManipulator(): Manipulator
  }
  export class Point {
    constructor(private _x: number, private _y: number) {}
    get x(): number { return this._x; }
    get y(): number { return this._y; }
  }
  export class Manipulator {}

  export class TextView {
    getOrigin(x: Coord, y: Coord): void {
      console.log(`Origin is set to (${x}, ${y})`)
    }
    getExtent(width: Coord, height: Coord): void {
      console.log(`Extent is set to (width: ${width}, height: ${height})`)
    }
    isEmpty(): boolean {return}
  }
  export class Coord {
    constructor(private _value: number) {}
    toString(): string {return '' + this._value}
  }

  // Class inheritance approach
  export class TextShapeA extends TextView implements Shape {
    boundingBox(bottomLeft: Point, topRight: Point): void {
      const bottom = new Coord(bottomLeft.y)
      const left = new Coord(bottomLeft.x)
      const width = new Coord(topRight.x - bottomLeft.x)
      const height = new Coord(topRight.y - bottomLeft.y)

      this.getOrigin(left, bottom)
      this.getExtent(width, height)
    }
    createManipulator(): Manipulator {
      return new TextManipulatorA(this)
    }
  }
  export class TextManipulatorA extends Manipulator {
    constructor(private textShape: TextShapeA) {
      super()
    }
  }

  // Object inheritance approach
  export class TextShapeB implements Shape {
    constructor(private _text: TextView) {}
    boundingBox(bottomLeft: Point, topRight: Point): void {
      const bottom = new Coord(bottomLeft.y)
      const left = new Coord(bottomLeft.x)
      const width = new Coord(topRight.x - bottomLeft.x)
      const height = new Coord(topRight.y - bottomLeft.y)

      this._text.getOrigin(left, bottom)
      this._text.getExtent(width, height)
    }
    isEmpty(): boolean {
      return this._text.isEmpty()
    }
    createManipulator(): Manipulator {
      return new TextManipulatorB(this)
    }
  }
  export class TextManipulatorB extends Manipulator {
    constructor(private textShape: TextShapeB) {
      super()
    }
  }
}