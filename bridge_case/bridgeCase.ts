namespace BridgeCase {
  export class Window {
    private _imp: WindowImp

    constructor(private _contents: View, private _env: 'X' | 'PM') {}

    drawContents(): void {throw new Error("Method not implemented.")}

    open(): void {throw new Error("Method not implemented.")}
    close(): void {throw new Error("Method not implemented.")}
    iconify(): void {throw new Error("Method not implemented.")}
    deiconify(): void {throw new Error("Method not implemented.")}

    setOrigin(at: Point): void {throw new Error("Method not implemented.")}
    setExtent(extent: Point): void {throw new Error("Method not implemented.")}
    raise(): void {throw new Error("Method not implemented.")}
    lower(): void {throw new Error("Method not implemented.")}

    drawLine(from: Point, to: Point): void {throw new Error("Method not implemented.")}
    drawRect(p1: Point, p2: Point): void {
      const imp = this.getWindowImp()
      imp.deviceRect(p1.x, p1.y, p2.x, p2.y)
    }
    drawPolygon(at: Point, sides: number): void {throw new Error("Method not implemented.")}
    drawText(text: string, at: Point): void {throw new Error("Method not implemented.")}

    protected getWindowImp(): WindowImp {
      if (!this._imp) {
        this._imp = WindowSystemFactory.instance().makeWindowImp(this._env)
      }
      return this._imp
    }
    protected getView(): View {return this._contents}
  }
  export class WindowSystemFactory {
    static _instance: WindowSystemFactory
    static instance(): WindowSystemFactory {
      if (!this._instance) {
        this._instance = new WindowSystemFactory()
      }
      return this._instance
    }
    makeWindowImp(env: 'X' | 'PM'): WindowImp {
      switch (env) {
        case 'X':
          return new XWindowImp()
        case 'PM':
          return new PMWindowImp()
        default:
          return new WindowImp()
      }
    }
  }

  export class WindowImp {
    impTop(): void {throw new Error("Method not implemented.")}
    impBottom(): void {throw new Error("Method not implemented.")}
    impSetExtent(extent: Point): void {throw new Error("Method not implemented.")}
    impSetOrigin(at: Point): void {throw new Error("Method not implemented.")}

    deviceRect(x0: Coord, y0: Coord, x1: Coord, y1: Coord): void {throw new Error("Method not implemented.")}
    deviceText(text: string, x: Coord, y: Coord): void {throw new Error("Method not implemented.")}
    deviceBitmap(text: string, x: Coord, y: Coord): void {throw new Error("Method not implemented.")}

    protected windowImp(): void {}
  }

  export class ApplicationWindow extends Window {
    override drawContents(): void {
      this.getView().drawOn(this)
    }
  }

  export class IconWindow extends Window {
    private _bitMapName: string = 'bitMapName'
    override drawContents(): void {
      const imp = this.getWindowImp()
      if (imp) {
        imp.deviceBitmap(this._bitMapName, new Coord(0.0), new Coord(0.0))
      }
    }
  }

  export class XWindowImp extends WindowImp {
    private _dpy: Display = new Display()
    private _winid: Drawable = new Drawable()
    private _gc: GC = new GC()

    override deviceRect(x0: Coord, y0: Coord, x1: Coord, y1: Coord) {
      console.log(`deviceRect of XWindowImp is triggered with...`, x0, y0, x1, y1)

      const x = new Coord(Math.round(Math.min(x0.value, x1.value)))
      const y = new Coord(Math.round(Math.min(y0.value, y1.value)))
      const w = new Coord(Math.round(Math.abs(x0.value - x1.value)))
      const h = new Coord(Math.round(Math.abs(x0.value - x1.value)))
      XDrawRectangle(this._dpy, this._winid, this._gc, x, y, w, h)
    }
    override deviceBitmap(text: string, x: Coord, y: Coord): void {
      console.log(`deviceBitmap of XWindowImp is triggered with...`, text, x, y)
    }
  }
  export function XDrawRectangle(dpy: Display, winid: Drawable, gc: GC, x: Coord, y: Coord, w: Coord, h) {
    console.log(`XDrawRectangle triggered with...`, dpy, winid, gc, x, y, w, h)
  }

  export class PMWindowImp extends WindowImp {
    private _hps: HPS

    override deviceRect(x0: Coord, y0: Coord, x1: Coord, y1: Coord) {
      console.log(`deviceRect of PMWindowImp is triggered with...`, x0, y0, x1, y1)

      const left = new Coord(Math.min(x0.value, x1.value))
      const right = new Coord(Math.max(x0.value, x1.value))
      const bottom = new Coord(Math.min(y0.value, y1.value))
      const top = new Coord(Math.max(y0.value, y1.value))

      const point: PPOINTL = new Array<Point>(4)
      for (let i = 0; i < point.length; i++) {
        point[i] = new Point
      }

      point[0].x = left
      point[0].y = top
      point[1].x = right
      point[1].y = top
      point[2].x = right
      point[2].y = bottom
      point[3].x = left
      point[3].y = bottom

      if (
        !GpiBeginPath(this._hps, CONST_1L) ||
        !GpiSetCurrentPosition(this._hps, point[3]) ||
        GpiPolyLine(this._hps, CONST_4L, point) === GPI_ERROR ||
        !GpiEndPath(this._hps)
      ) {
        console.error('report error')
      } else {
        GpiStrokePath(this._hps, CONST_1L, CONST_0L)
      }
    }
    override deviceBitmap(text: string, x: Coord, y: Coord): void {
      console.log(`deviceBitmap of PMWindowImp is triggered with...`, text, x, y)
    }
  }
  export type PPOINTL = Array<Point>
  export const CONST_0L = '0L'
  export const CONST_1L = '1L'
  export const CONST_4L = '4L'
  export const GPI_ERROR = 'GPI_ERROR'
  export function GpiBeginPath(hps: HPS, l: string): boolean {
    console.log('GpiBeginPath')
    return true
  }
  export function GpiSetCurrentPosition(hps: HPS, point: Point): boolean {
    console.log('GpiSetCurrentPosition')
    return true
  }
  export function GpiPolyLine(hps: HPS, l: string, point: PPOINTL): string {
    return ''
  }
  export function GpiEndPath(hps: HPS): boolean {
    console.log('GpiEndPath')
    return true
  }
  export function GpiStrokePath(hps: HPS, l1: string, l2: string): boolean {
    console.log('GpiStrokePath')
    return true
  }

  export class View {
    drawOn(window: Window): void {
      console.log('draw: ', this, ', on: ', window)
    }
  }
  export class Point {
    constructor(private _x?: Coord, private _y?: Coord) {}
    get x(): Coord { return this._x; }
    get y(): Coord { return this._y; }
    set x(value: Coord) {this._x = value}
    set y(value: Coord) {this._y = value}
  }
  export class Coord {
    constructor(private _value: number) {}
    get value(): number {return this._value}
  }

  export class Display {}
  export class Drawable {}
  export class GC {}

  export class HPS {}
}
