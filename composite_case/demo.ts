/// <reference path="compositeCase.ts" />

namespace CompositeCase {
	export namespace Demo {
		export function show() : void {
		  const cabinet = new Cabinet('PC Cabinet')
		  const chassis = new Chassis('PC Chassis')

      cabinet.add(chassis)

      const bus = new Bus('MCA Bus')
      bus.add(new Card('16Mbs Token Ring'))

      chassis.add(bus)
      chassis.add(new FloppyDisk('3.5in Floppy'))

      console.log(`The net price is ${cabinet.netPrice()}`)
		}
	}
}
