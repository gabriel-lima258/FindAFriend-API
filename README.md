# App

Find A Friend - Pet

## RFs (Requisitos funcionais)

- [] Deve ser possível cadastrar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## RNs (Regras de negócio)

- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## RNFs (Requisitos não-funcionais)

- [] Utilizar Fastify para criar o esquema de rotas da api
- [x] Utilizar o prisma para lidar com banco de dados
- [] Multer para upload de arquivo (?)
- [] Usar a "BrasilAPI" para consultar a localização