/// <reference path="bridgeCase.ts" />

namespace BridgeCase {
	export namespace Demo {
		export function show() : void {
      const xApplicationWindow = new ApplicationWindow(new View, 'X')
      xApplicationWindow.drawContents()
      console.log('xApplicationWindow.drawRect')
      xApplicationWindow.drawRect(new Point(new Coord(0), new Coord(1)), new Point(new Coord(2), new Coord(3)))
      const xIconWindow = new IconWindow(new View, 'X')
      xIconWindow.drawContents()
      console.log('xIconWindow.drawRect')
      xIconWindow.drawRect(new Point(new Coord(1), new Coord(2)), new Point(new Coord(3), new Coord(4)))

      const pmApplicationWindow = new ApplicationWindow(new View, 'PM')
      pmApplicationWindow.drawContents()
      console.log('pmApplicationWindow.drawRect')
      pmApplicationWindow.drawRect(new Point(new Coord(0), new Coord(1)), new Point(new Coord(2), new Coord(3)))
      const pmIconWindow = new IconWindow(new View, 'PM')
      pmIconWindow.drawContents()
      console.log('pmIconWindow.drawRect')
      pmIconWindow.drawRect(new Point(new Coord(1), new Coord(2)), new Point(new Coord(3), new Coord(4)))
		}
	}
}
