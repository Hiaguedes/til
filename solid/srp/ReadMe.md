# Single Responsability Principle (SRP)

uncle bob disse que se pudesse mudar o nome de um principio seria esse, pois seria melhor se fosse o principio de unica razao pra mudanca

- Uma classe deve ter apenas uma responsabilidade bem definida com um unico motivo pra mudanca

- Cada classe deve se especializar em fazer uma tarefa especifica com excelencia, criando codigo modular e coeso

- Multiplas responsabilidades em uma classe aumentam complexidade e riscos de manutencao

## Problemas de compreensao do SRP

1. Interpretacao literal

Erro comum de pensar que uma coisa significa uma unica linha de codigo ou funcao muito especifica

2. Escopo restrito 

Mal entendido de que SRP significa limitar drasticamente a funcionalidade de uma classe

3. Abstracao inadequada

Dificuldade em identificar o nivel correto de responsabilidade e coesao

## Definicoes

Quando falamos de uma classe, uma classe deve atender apenas um ator (podendo ser um ator financeiro ou ator de produto, se ele atende mais ele gera uma fragilidade)

areas de sfotware podem ser considerados como atores tbm

As nuancias estarao no codigo

### Atores

Um ator pode ser uma pessoa, um grupo ou um sistema que requisita mudancas no software. Diferentes atores que requisita mudancas no software. Diferentes atores como usuarios finais, gestores de produto, equipes de negocios e desenvolvedores podem ter necessidades distintas

### Razoes pra mudanca

Uma razao pra mudar representa os diferentes stakeholders ou atores que podem exigir modificacoes que acabam refletindo na mudanca em uma mesma classe

### Impacto da multiplicidade de atores

Mudancas para atender um ator podem impactar outras funcionalidades, gerando fragilidade no codigo

### Atores como stakeholders

```
class Employee {
    definirSalario(){}
    fazerPagamento(){}
    gerarRelatorioAuditoria(){}
}
```

Atores como departamentos ou stakeholders envolvidos na classe

- Financeiro: Realizar pagamentos
- RH: Definicao de salario
- Compliance: Geracao de relatorio de auditoria

Nesse caso e mais escancarado as intencoes do negocio

### Atores como componentes do sistema

```
class Employee {
    salvarDB(){}
    enviarEmailConfirmacao(){}
    registrarLogAlteracoes(){}
}
```

Atores envolvidos na classe

- Persistencia de dados
- Notificacoes por email

Sao componentes que se relacionam de forma diferente, sao interacoes com o sistema

Os dois atores sao a mesma classe, mas por ter atribuicoes diferentes eles deveriam estar em classes diferentes
