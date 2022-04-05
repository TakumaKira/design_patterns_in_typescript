namespace FacadeCase {
  export class Scanner {
    constructor(private _inputStream: istream) {}
    scan(): Token {
      console.log('scan', this._inputStream)
      return new Token()
    }
  }

  export class Parser {
    parse(scanner: Scanner, builder: ProgramNodeBuilder): void {
      console.log('parse with...', scanner, builder)
      console.log(scanner.scan())
      let node = builder.getRootNode()
      node.add(builder.newVariable('variableName'))
      node.add(builder.newAssignment(new ProgramNode(), new ProgramNode()))
      node.add(builder.newReturnStatement(new ProgramNode()))
      node.add(builder.newCondition(new ProgramNode(), new ProgramNode(), new ProgramNode()))
    }
  }

  export class ProgramNodeBuilder {
    private _node: ProgramNode = new ProgramNode()
    newVariable(variableName: string): ProgramNode {
      console.log('newVariable with...', variableName)
      return new ExpressionNode()
    }
    newAssignment(variable: ProgramNode, expression: ProgramNode): ProgramNode {
      console.log('newAssignment with...', variable, expression)
      return new ProgramNode()
    }
    newReturnStatement(value: ProgramNode): ProgramNode {
      console.log('newReturnStatement with...', value)
      return new StatementNode()
    }
    newCondition(condition: ProgramNode, truePart: ProgramNode, falsePart: ProgramNode): ProgramNode {
      console.log('newCondition with...', condition, truePart, falsePart)
      return new ProgramNode()
    }
    getRootNode(): ProgramNode {
      console.log('getRootNode')
      return this._node
    }
  }

  export class ProgramNode {
    protected _children: ProgramNode[] = []

    // program node manipulation
    getSourcePosition(line: number, index: number): void {
      console.log('getSourcePosition with...', line, index)
    }

    // child manipulation
    add(node: ProgramNode): void {
      console.log('add with...', node)
      this._children.push(node)
    }
    remove(node: ProgramNode): void {
      console.log('remove with...', node)
    }

    traverse(cg: CodeGenerator): void {
      console.log('traverse in ProgramNode with...', cg)

      cg.visit(this)

      for (let i = 0; i < this._children.length; i++) {
        this._children[i].traverse(cg)
      }
    }
  }

  export class StatementNode extends ProgramNode {}
  export class ExpressionNode extends ProgramNode {
    override traverse(cg: CodeGenerator) {
      console.log('traverse in ExpressionNode with...', cg)

      cg.visit(this)

      for (let i = 0; i < this._children.length; i++) {
        this._children[i].traverse(cg)
      }
    }
  }

  export abstract class CodeGenerator {
    constructor(protected _output: BytecodeStream) {}
    abstract visit(node: StatementNode): void
    abstract visit(node: ExpressionNode): void
    abstract visit(node: ProgramNode): void
  }
  export class RISCCodeGenerator extends CodeGenerator {
    visit(node: StatementNode): void
    visit(node: ExpressionNode): void
    visit(node: ProgramNode): void {
      console.log('RISCCodeGenerator visit with...', node)
    }
  }

  export class Compiler {
    compile(input: istream, output: BytecodeStream): void {
      console.log('compile with...', input, output)

      const scanner = new Scanner(input)
      const builder = new ProgramNodeBuilder
      const parser = new Parser

      parser.parse(scanner, builder)

      const generator = new RISCCodeGenerator(output)
      const parseTree = builder.getRootNode()
      parseTree.traverse(generator)
    }
  }

  export class istream {}
  export class BytecodeStream implements istream {}
  export class Token {}
}