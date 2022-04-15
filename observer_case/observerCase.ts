namespace ObserverCase {
  export interface Observer {
    update(theChangedSubject: Subject): void
  }
  export abstract class Subject {
    private _observers: Array<Observer> = []

    attach(o: Observer): void {
      this._observers.push(o)
    }
    detach(o: Observer): void {
      this._observers = [...this._observers.filter(obs => obs !== o)]
    }
    notify(): void {
      const i = new ListIterator<Observer>(this._observers)

      for (i.first(); !i.isDone(); i.next()) {
        i.currentItem().update(this)
      }
    }
  }

  export class ClockTimer extends Subject {
    private _hour: number = 0
    private _minute: number = 0
    private _second: number = -1

    getHour(): number {
      return this._hour
    }
    getMinute(): number {
      return this._minute
    }
    getSecond(): number {
      return this._second
    }

    tick(): void {
      this._updateTime()
      this.notify()
    }
    private _updateTime(): void {
      this._second++
      if (this._second < 60) return
      this._second = 0
      this._minute++
      if (this._minute < 60) return
      this._hour++
    }
  }

  export class DigitalClock implements Widget, Observer {
    constructor(private _subject: ClockTimer) {
      _subject.attach(this)
    }
    update(theChangedSubject: Subject): void {
      if (theChangedSubject === this._subject) {
        this.draw()
      }
    }
    draw(): void {
      const hour = this._subject.getHour()
      const minute = this._subject.getMinute()
      const second = this._subject.getSecond()

      console.log('draw the digital clock', `${hour}:${minute}:${second}`)
    }
  }

  export class AnalogClock implements Widget, Observer {
    constructor(private _subject: ClockTimer) {
      _subject.attach(this)
    }
    update(theChangedSubject: Subject): void {
      if (theChangedSubject === this._subject) {
        this.draw()
      }
    }
    draw(): void {
      const hour = this._subject.getHour()
      const minute = this._subject.getMinute()
      const second = this._subject.getSecond()

      console.log('draw the analog clock', `${hour}:${minute}:${second}`)
    }
  }

  export class ListIterator<ListItem> {
    private _index: number
    constructor(private _items: Array<ListItem>) {}
    first(): void {
      this._index = 0
    }
    next(): void {
      this._index++
    }
    currentItem(): ListItem {
      return this._items[this._index]
    }
    isDone(): boolean {
      return this._index >= this._items.length
    }
  }

  export interface Widget {
    draw(): void
  }
}
