namespace StrategyCase {
  export class Composition {
    /** the list of components */
    private _components: Component
    /** the number of components */
    private _componentCount: number
    /** the Composition's line width */
    private _lineWidth: number
    /** the position of linebreaks in components */
    private _lineBreaks: number
    /** the number of lines */
    private _lineCount: number
    constructor(private _compositor: Compositor) {}
    repair(): void {
      console.log('prepare the arrays with the desired component sizes')
      const natural: Coord[] = []
      const stretchability: Coord[] = []
      const shrinkability: Coord[] = []
      const componentCount = 1000
      const breaks = []

      console.log('determine where the breaks are')
      const breakCount = this._compositor.compose(natural, stretchability, shrinkability, componentCount, this._lineWidth, breaks)

      console.log('lay out components according to breaks', breakCount)
      // ...
    }
  }

  export interface Compositor {
    compose(natural: Coord[], stretch: Coord[], shrink: Coord[], componentCount: number, lineWidth: number, lineBreaks: number[]): number
  }
  export class SimpleCompositor implements Compositor {
    compose(natural: Coord[], stretch: Coord[], shrink: Coord[], componentCount: number, lineWidth: number, lineBreaks: number[]): number {
      console.log('calculate break counts using every parameters except stretchabilities:', 'natural', natural, 'componentCount', componentCount, 'lineWidth', lineWidth, 'lineBreaks', lineBreaks)
      return 110
    }
  }
  export class TexCompositor implements Compositor {
    compose(natural: Coord[], stretch: Coord[], shrink: Coord[], componentCount: number, lineWidth: number, lineBreaks: number[]): number {
      console.log('calculate break counts using every parameters:', 'natural', natural, 'stretch', stretch, 'shrink', shrink, 'componentCount', componentCount, 'lineWidth', lineWidth, 'lineBreaks', lineBreaks)
      return 90
    }
  }
  export class ArrayCompositor implements Compositor {
    constructor(private _interval: number) {}
    compose(natural: Coord[], stretch: Coord[], shrink: Coord[], componentCount: number, lineWidth: number, lineBreaks: number[]): number {
      console.log('calculate break counts only using this._interval:', 'this._interval', this._interval)
      return 100
    }
  }

  export interface Component {}
  export class Coord {}
}
