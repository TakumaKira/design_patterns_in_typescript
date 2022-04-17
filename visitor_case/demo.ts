/// <reference path="visitorCase.ts" />

namespace VisitorCase {
  export namespace Demo {
    export function show() : void {
      const component = new Chassis('PC Chassis')
      component.add(new FloppyDisk('3.5in Floppy'))

      const pricingVisitor = new PricingVisitor
      component.accept(pricingVisitor)
      console.log('Total price', component.name(), pricingVisitor.getTotalPrice())

      const inventoryVisitor = new InventoryVisitor
      component.accept(inventoryVisitor)
      console.log('Inventory', component.name(), inventoryVisitor.getInventory())
    }
  }
}
