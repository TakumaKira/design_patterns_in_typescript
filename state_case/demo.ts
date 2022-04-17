/// <reference path="stateCase.ts" />

namespace StateCase {
	export namespace Demo {
		export function show() : void {
			const connection = new TCPConnection
			connection.activeOpen()
			connection.send()
			connection.close()

			connection.passiveOpen()
			connection.acknowledge()
			connection.synchronize()
			connection.close()
		}
	}
}
