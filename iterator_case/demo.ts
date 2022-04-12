/// <reference path="iteratorCase.ts" />

namespace IteratorCase {
	export namespace Demo {
		export function show() : void {
		  const employees = new List<Employee>()
      employees.append(new Employee('A'))
      employees.append(new Employee('B'))
      employees.append(new Employee('C'))

      const forward = new ListIterator(employees)
      const backward = new ReverseListIterator(employees)

      printEmployees(forward) // A, B, C
      printEmployees(backward) // C, B, A

      const employees2: AbstractList<Employee> = new SkipList<Employee>()
      employees2.append(new Employee('D'))
      employees2.append(new Employee('E'))
      employees2.append(new Employee('F'))

      const iterator = employees2.createIterator()
      printEmployees(iterator) // D, F

      // Internal List Iterator
      const employees3 = new List<Employee>()
      employees3.append(new Employee('G')) // 1
      employees3.append(new Employee('Ha')) // 2
      employees3.append(new Employee('I')) // 3
      employees3.append(new Employee('Ja')) // 4
      employees3.append(new Employee('K')) // 5
      employees3.append(new Employee('La')) // 6
      employees3.append(new Employee('Ma')) // 7
      employees3.append(new Employee('N')) // 8
      employees3.append(new Employee('Oa')) // 9
      employees3.append(new Employee('P')) // 10
      employees3.append(new Employee('Qa')) // 11

      const pa = new PrintNEmployee(employees3, 10)
      pa.traverse() // G, Ha, I, Ja, K, La, Ma, N, Oa, P

      // Contrast this with using an external iterator
      const i = new ListIterator<Employee>(employees3)
      let count = 0

      for (i.first(); !i.isDone(); i.next()) {
        count++
        i.currentItem().print() // G, Ha, I, Ja, K, La, Ma, N, Oa, P

        if (count >= 10) {
          break
        }
      }

      const fpa = new FilteringPrintNEmployee(employees3, 5, 'a')
      fpa.traverse() // Ha, Ja, La, Ma, Oa
		}
	}
}
