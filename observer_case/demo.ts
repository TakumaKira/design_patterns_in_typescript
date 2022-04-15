/// <reference path="observerCase.ts" />

namespace ObserverCase {
	export namespace Demo {
		export function show() : void {
			const timer = new ClockTimer
      const analogClock = new AnalogClock(timer)
      const digitalClock = new DigitalClock(timer)

      timer.tick()
      setTimeout(() => timer.tick(), 1000)
      setTimeout(() => timer.tick(), 2000)
		}
	}
}
