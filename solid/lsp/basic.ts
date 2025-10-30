// LSP - Liskoc Substiturion Principle

// conceito fundamental: garante que subclasses mantenham o comportamento esperado da classe pai, preservando invariantes e respeitando os contratos de metodo

class Rectangle {
    constructor(protected width: number, protected height: number) { }

    setDimensions(width: number, height: number): void {
        this.width = width
        this.height = height
    }

    getArea(): number {
        return this.width * this.height
    }
}

class Square extends Rectangle {
    constructor(size: number) {
        super(size, size)
    }

    // setDimensions(width: number, height: number): void { // sobrescrevendo o metodo da classe pai, que espera dois parametros, quebrei o contrato de liskov
    //     if(width !== height) { // me gera um erro, quebrei o contrato de liskov
    //         throw new Error("Width and height must be equal for a square")
    //     }
    //     super.setDimensions(width, height)
    // }

    setDimensions(size: number): void { // sobrescrevendo o metodo da classe pai, que espera dois parametros, quebrei o contrato de liskov

        super.setDimensions(size, size) // no fundo no fundo isso ainda e um retangulo

    }
}

const square = new Square(5)
console.log(square.getArea()) // 25


function resize(rectangle: Rectangle, newWidth: number, newHeight: number) {
    rectangle.setDimensions(newWidth, newHeight);
}

const rect = new Rectangle(10, 5);
resize(rect, 20, 10); // This works as expected 

const newSquare = new Square(10);
resize(newSquare, 20, 10); // Liskov Violation! This will set the square's dimensions to 20x20, not 20x10.


// A better design might be to have Shape as the base class, and Rectangle and Square as separate subclasses. Or, you could use composition instead of inheritance.