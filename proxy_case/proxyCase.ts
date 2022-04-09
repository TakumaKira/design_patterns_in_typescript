namespace ProxyCase {
  export interface Graphic {
    draw(at: Point): void
    handleMouse(event: Event): void

    getExtent(): Point

    load(from: istream): void
    save(to: ostream): void
  }

  export class Image implements Graphic {
    constructor(file: string) {}
    draw(at: Point): void {
      console.log('real Image draw at:', at)
    }
    handleMouse(event: Event): void {
      console.log('real Image handleMouse event: ', event)
    }
    getExtent(): Point {
      return new Point('Point generated in real Image')
    }
    load(from: istream): void {
      throw new Error("Method not implemented.")
    }
    save(to: ostream): void {
      throw new Error("Method not implemented.")
    }
  }

  export class ImageProxy implements Graphic {
    private _image: Image
    private _extent: Point
    private _fileName: string
    constructor(imageFile: string) {
      this._fileName = imageFile
    }
    draw(at: Point): void {
      this.getImage().draw(at)
    }
    handleMouse(event: Event): void {
      this.getImage().handleMouse(event)
    }
    getExtent(): Point {
      if (!this._extent) {
        this._extent = this.getImage().getExtent()
      }
      return this._extent
    }
    load(from: istream): void {
      from.output(this.getExtent(), this._fileName)
    }
    save(to: ostream): void {
      this._fileName = to.input(this.getExtent())
      console.log('saved fileName:', this._fileName)
    }
    protected getImage(): Image {
      if (!this._image) {
        this._image = new Image(this._fileName)
      }
      return this._image
    }
  }

  export class TextDocument {
    insert(graphic: Graphic): void {
      graphic.load(new istream)
      graphic.draw(new Point('Point generated in TextDocument'))
      console.log('graphic.getExtent():', graphic.getExtent())
      graphic.handleMouse(new Event('Event generated in TextDcument'))
      graphic.save(new ostream)
    }
  }

  export class Point {
    constructor(public description: string) {}
  }
  export class Event {
    constructor(public description: string) {}
  }
  export class istream {
    output(at: Point, fileName: string): void {
      console.log('output:', at, fileName)
    }
  }
  export class ostream {
    input(at: Point): string {
      return at.description
    }
  }
}