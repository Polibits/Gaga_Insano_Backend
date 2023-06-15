# Rotas do Backend
As rotas estão divididas entre as seguintes áreas:
- **Usuários**
- **Cursos**
- **Assinaturas**
- **Pagamentos**
- **Emails**
- **Arquivos**
- **Logs**
- **chaves**

## Rotas dos Usuários
Destinadas a tratar de todas as operações envolvendo manejo de usuários do sistema. Elas são da forma:
```
/user/<área>/<operação>
```
As áreas gerais são:
- **Criação** (_user/create_): criar novos usuários
- **Deleção** (_user/delete_): deleção de usuários cadastrados
- **Atualização** (_user/update_): atualizar os dados
- **Leitura** (_user/read_): obtenção de informações gerais
- **Bloqueio** (_user/block_): bloqueio ou desbloqueio de usuários

### Rotas de criação de usuários (user/create)
Responsáveis por criar novos usuários no sistema.<br>
As operações são:
- **Criar novo usuário padrão**
    - **método**: post
    - **rota**: _user/create/default_
    - **parâmetros**:
        - **fullname**: nome completo ou nome social
        - **username**: nome pelo qual será chamado no site 
        - **email**: email de cadastro, associado à conta
        - **password**: senha de acesso
        - **cpf**: CPF pessoal do usuário
    - **respostas**:
        - **SUCESS**: usuário cadastrado com sucesso na base de dados
        - **INVALID_DATA**: dados fornecidos não cumprem critérios
        - **ALREDY_REGISTERED_DATA**: dados já em uso
        - **FORBIDDEN_IP**: requisição vem de um IP banido
        - **FAIL**: falha na operação
- **Criar novo usuário adm**:
    - **método**: post
    - **rota**: _user/create/adm_
    - **parâmetros**:
        - **fullname**: nome completo ou nome social
        - **username**: nome pelo qual será chamado no site 
        - **email**: email de cadastro, associado à conta
        - **password**: senha de acesso
        - **cpf**: CPF pessoal do usuário
        - **key**: chave secreta para esta operação
    - **respostas**:
        - **SUCESS**: usuário cadastrado com sucesso na base de dados
        - **INVALID_DATA**: dados fornecidos não cumprem critérios
        - **ALREDY_REGISTERED_DATA**: dados já em uso
        - **INVALID_KEY**: chave fornecida é inválida
        - **FORBIDDEN_IP**: requisição vem de um IP banido
        - **FAIL**: falha na operação
- **Criar novo usuário técnico**:
    - **método**: post
    - **rota**: _user/create/tech_
    - **parâmetros**:
        - **fullname**: nome completo ou nome social
        - **username**: nome pelo qual será chamado no site 
        - **email**: email de cadastro, associado à conta
        - **password**: senha de acesso
        - **cpf**: CPF pessoal do usuário
        - **key**: chave secreta para esta operação
    - **respostas**:
        - **SUCESS**: usuário cadastrado com sucesso na base de dados
        - **INVALID_DATA**: dados fornecidos não cumprem critérios
        - **ALREDY_REGISTERED_DATA**: dados já em uso
        - **FORBIDDEN_IP**: requisição vem de um IP banido
        - **INVALID_KEY**: chave fornecida é inválida
        - **FAIL**: falha na operação

### Rotas de deleção de usuários (user/delete)
Responsáveis por remover usuários da base de dados.<br>
As operações são:
- **Deletar usuário**:
    - **método**: post
    - **rota**: _user/delete_
    - **parâmetros**:
        - **userID**: id do usuário no sistema
        - **email**: email de cadastro, associado à conta
        - **cpf**: CPF pessoal do usuário
        - **key**: chave secreta para esta operação
    - **respostas**:
        - **SUCESS**: usuário deletado com sucesso na base de dados
        - **USER_NOT_FOUND**: não foi possível localizar usuário na base de dados
        - **FORBIDDEN_IP**: requisição vem de um IP banido
        - **INVALID_KEY**: chave fornecida é inválida
        - **FAIL**: falha na operação

### Rotas de atualização de usuários (user/update)
Responsáveis por atualizar dados dos usuários na base de dados.<br>
As operações são:
TODO

### Rotas de leitura de usuários (user/read)
Responsáveis pela obtenção de informações do usuário.<br>
As operações são:

### Rotas de bloqueio de usuários (user/block)
Responsáveis pelo bloqueio e desbloqueio de usuários.<br>
As operações são:


- **Atualização** (_user/update_): atualizar os dados
- **Leitura** (_user/read_): obtenção de informações gerais
- **Bloqueio** (_user/block_): bloqueio ou desbloqueio de usuários

## Rotas dos Cursos
- Criação
- Deleção
- Atualização
- Leitura

## Rotas dos Pagamentos
- Criação
- Deleção
- Atualização
- Cobrança

## Rotas dos Assinaturas
- Criação
- Deleção
- Atualização
- Leitura

## Rotas dos Emails
- Envio

## Rotas dos Logs
- Obtenção dos Logs