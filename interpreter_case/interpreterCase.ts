namespace InterpreterCase {
  export interface BooleanExp {
    evaluate(context: Context): boolean
    replace(name: string, exp: BooleanExp): BooleanExp
    copy(): BooleanExp
  }

  export class Context {
    private _assigned: {[name in string]: boolean} = {}
    lookup(name: string): boolean {
      return this._assigned[name]
    }
    assign(exp: VariableExp, result: boolean): void {
      this._assigned[exp.name] = result
    }
  }

  export class VariableExp implements BooleanExp {
    constructor(private _name: string) {}
    get name(): string {return this._name}
    evaluate(context: Context): boolean {
      return context.lookup(this._name)
    }
    replace(name: string, exp: BooleanExp): BooleanExp {
      if (name === this._name) {
        return exp.copy()
      } else {
        return new VariableExp(this._name)
      }
    }
    copy(): BooleanExp {
      return new VariableExp(this._name)
    }
  }

  export class AndExp implements BooleanExp {
    constructor(private _operand1: BooleanExp, private _operand2: BooleanExp) {}
    evaluate(context: Context): boolean {
      return this._operand1.evaluate(context)
        && this._operand2.evaluate(context)
    }
    replace(name: string, exp: BooleanExp): BooleanExp {
      return new AndExp(
        this._operand1.replace(name, exp),
        this._operand2.replace(name, exp)
      )
    }
    copy(): BooleanExp {
      return new AndExp(this._operand1.copy(), this._operand2.copy())
    }
  }

  export class OrExp implements BooleanExp {
    constructor(private _operand1: BooleanExp, private _operand2: BooleanExp) {}
    evaluate(context: Context): boolean {
      return this._operand1.evaluate(context)
        || this._operand2.evaluate(context)
    }
    replace(name: string, exp: BooleanExp): BooleanExp {
      return new OrExp(
        this._operand1.replace(name, exp),
        this._operand2.replace(name, exp)
      )
    }
    copy(): BooleanExp {
      return new OrExp(this._operand1.copy(), this._operand2.copy())
    }
  }

  export class NotExp implements BooleanExp {
    constructor(private _operand: BooleanExp) {}
    evaluate(context: Context): boolean {
      return !this._operand.evaluate(context)
    }
    replace(name: string, exp: BooleanExp): BooleanExp {
      return new NotExp(this._operand.replace(name, exp))
    }
    copy(): BooleanExp {
      return new NotExp(this._operand.copy())
    }
  }

  export class Constant implements BooleanExp {
    constructor(private _operand: boolean) {}
    evaluate(context: Context): boolean {
      return this._operand
    }
    replace(name: string, exp: BooleanExp): BooleanExp {
      return new Constant(this._operand)
    }
    copy(): BooleanExp {
      return new Constant(this._operand)
    }
  }
}