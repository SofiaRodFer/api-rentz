# Cadastro de um carro

**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro.

**Regras de negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado com disponibilidade por padrão.
O usuário responsável pelo cadastro de um novo carro deve ser um usuário administrador.


# Listagem de carros

**Requisitos Funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de Negócio**
O usuário não precisa estar logado no sistema.


# Cadastro de especificação no carro

**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.
O usuário responsável pelo cadastro de uma nova especificação deve ser um usuário administrador.

**Regras de Negócio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação ja existente em um carro.


# Cadastro de imagens do carro

**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**Requisitos não funcionais**
Utilizar o multer para upload dos arquivos.

**Regras de Negócio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro de uma nova imagem deve ser um usuário administrador.


# Aluguel de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel.

**Regras de Negócio**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.