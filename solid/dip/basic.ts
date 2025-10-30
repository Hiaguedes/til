// DIP - Dependency Inversion Principle
// High-level modules should not depend on low-level modules. Both should depend on abstractions.
// Abstractions should not depend on details. Details should depend on abstractions.

// Modulos de alto nivel - contem regras de negocio mais abstratas, qe orquestram funcionalidades do sistema
// Modulos de baixo nivel - contem detalhes de implementacao, como acesso a banco de dados, servicos externos, mmanipulacao de arquivos, etc

class UserService { // alto nivel
    private database: SQLDatabase; // basicamente condeno meu sistema a sempre usar o SQL 

    constructor() {
        this.database = new SQLDatabase(); // Dependencia direta do modulo de baixo nivel
        // toda classe que der new dentro da outra esta violando o DIP, pois indica acoplamento forte
    }

    createUser(name: string): void {
        this.database.save('users', name);
        console.log(`Usuario ${name} criado com sucesso!`);
    }
}

class SQLDatabase { // baixo nivel
    save(table: string, data: string): void {
        console.log(`Salvando ${data} no banco de dados SQL na tabela ${table}`);
    }
}

// solucao - introduzir uma abstracao (interface) que defina o contrato para o acesso ao banco de dados

interface Database {
    save(table: string, data: string): void;
}

class RefactoredUserService { // alto nivel
    private database: Database;
    constructor(database: Database) { // Injetando a dependencia via construtor
        this.database = database;
    }
    createUser(name: string): void {
        this.database.save('users', name);
        console.log(`Usuario ${name} criado com sucesso!`);
    }
}

class NoSQLDatabase implements Database { // baixo nivel
    save(table: string, data: string): void {
        console.log(`Salvando ${data} no banco de dados NoSQL na tabela ${table}`);
    }
}

class PostgreSQLDatabase implements Database { // baixo nivel
    save(table: string, data: string): void {
        console.log(`Salvando ${data} no banco de dados PostgreSQL na tabela ${table}`);
    }
}

// Agora o UserService depende de uma abstracao (interface Database) em vez de uma implementacao concreta (SQLDatabase)
const sqlDb = new SQLDatabase();
const userService = new RefactoredUserService(sqlDb);
userService.createUser('Alice');

const noSqlDb = new NoSQLDatabase();
const userServiceNoSql = new RefactoredUserService(noSqlDb);
userServiceNoSql.createUser('Bob');

// voce nao cria uma nova instancia dentro da classe e sim injeta a dependencia via construtor ou outro padrao de injeccao de dependencia

// Assim, o UserService pode trabalhar com qualquer implementacao de Database, promovendo flexibilidade e facilitando testes unitarios
// O modulo de alto nivel (UserService) e o modulo de baixo nivel (SQLDatabase, NoSQLDatabase, PostgreSQLDatabase) dependem da abstracao (interface Database)
// A abstracao (interface Database) nao depende dos detalhes (implementacoes concretas), mas sim o contrario

// isso ajuda muito pra teste unitario, pois voce pode criar uma implementacao mock da interface Database para testar o UserService sem depender de um banco de dados real
