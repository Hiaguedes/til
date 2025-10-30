import 'reflect-metadata'; // Necessario para o inversify funcionar
import { Container, injectable, inject } from 'inversify'

interface Database {
    save(table: string, data: string): void;
}

@injectable() // Marca a classe como injetavel
class SQLDatabase implements Database { // baixo nivel
    save(table: string, data: string): void {
        console.log(`Salvando ${data} no banco de dados SQL na tabela ${table}`);
    }
}

@injectable()
class NoSQLDatabase implements Database { // baixo nivel
    save(table: string, data: string): void {
        console.log(`Salvando ${data} no banco de dados NoSQL na tabela ${table}`);
    }
}

@injectable()
class UserService { // alto nivel

    constructor(@inject("Database") private database: Database) { }
    createUser(name: string): void {
        this.database.save('users', name);
        console.log(`Usuario ${name} criado com sucesso!`);
    }
}

// Configurando o container de injeção de dependência
const container = new Container();
container.bind<Database>("Database").to(SQLDatabase); // Vincula a interface Database a SQLDatabase
// container.bind<Database>("Database").to(NoSQLDatabase); // Alternativamente, vincula a interface Database a NoSQLDatabase
container.bind<UserService>(UserService).toSelf(); // Vincula UserService a ele mesmo, pois ele é injetavel e uma classe concreta de alto nivel


// Resolvendo as dependências e criando instâncias
const userService = container.get<UserService>(UserService);
userService.createUser('Alice');

const userServiceNoSql = new UserService(new NoSQLDatabase());
userServiceNoSql.createUser('Bob');

// quando voce tem classes que dependem de outras classes, voce pode usar a injeccao de dependencia para resolver essas dependencias
// sem que as classes de alto nivel dependam diretamente das classes de baixo nivel, promovendo um acoplamento mais fraco e facilitando testes e manutencao
// o inversify e uma biblioteca popular para injeccao de dependencia em TypeScript e JavaScript

// caso eu tivesse um checkout service que dependesse de um user service que dependesse de um database service eu teria algo do tipo

// const checkoutService  = new CheckoutService(new UserService(new SQLDatabase()))

// ou usando o container do inversify

// const checkoutService = container.get<CheckoutService>(CheckoutService)

// que resolveria todas as dependencias automaticamente