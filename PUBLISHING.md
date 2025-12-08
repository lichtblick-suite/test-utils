# Guia de Publicação no NPM

## Pré-requisitos

1. **Conta NPM**: Crie uma conta em https://www.npmjs.com/signup
2. **Login no NPM**: Execute `npm login` no terminal

## Passos para Publicar

### 1. Verificar o Build

```bash
yarn build
```

### 2. Testar Localmente (Opcional)

```bash
# Criar um pacote local
npm pack

# Isso criará um arquivo: lichtblick-test-builders-1.0.0.tgz
# Você pode instalá-lo em outro projeto para testar:
# npm install /caminho/para/lichtblick-test-builders-1.0.0.tgz
```

### 3. Fazer Login no NPM

```bash
npm login
```

Você precisará fornecer:

- Username
- Password
- Email
- OTP (se tiver autenticação de dois fatores)

### 4. Publicar o Pacote

**Para pacote público (recomendado):**

```bash
npm publish --access public
```

**Para pacote com escopo privado (requer conta paga):**

```bash
npm publish
```

### 5. Verificar a Publicação

Após publicar, verifique em: https://www.npmjs.com/package/@lichtblick/test-builders

## Atualizando Versões

Para publicar atualizações futuras:

```bash
# Patch (1.0.0 -> 1.0.1) - para correções de bugs
npm version patch

# Minor (1.0.0 -> 1.1.0) - para novas features
npm version minor

# Major (1.0.0 -> 2.0.0) - para breaking changes
npm version major

# Depois publique novamente
npm publish --access public
```

## Usando no Projeto Lichtblick

Depois de publicado, instale no projeto:

```bash
cd /Users/ctw02228/Documents/Git/lichtblick
yarn add -D @lichtblick/test-builders
```

E use nos testes:

```typescript
import { BasicBuilder } from "@lichtblick/test-builders";

const randomString = BasicBuilder.string();
const randomNumber = BasicBuilder.number({ min: 1, max: 100 });
```

## Mudando o Nome do Pacote (Opcional)

Se `@lichtblick/test-builders` já existe ou você quer outro nome, edite `package.json`:

```json
{
  "name": "@seu-username/test-builders",
  ...
}
```

Ou use sem escopo:

```json
{
  "name": "lichtblick-test-builders",
  ...
}
```

## Troubleshooting

### Erro: "You do not have permission to publish"

- O nome já existe no NPM
- Você não tem permissão no escopo `@lichtblick`
- Solução: Mude o nome do pacote ou peça acesso ao escopo

### Erro: "402 Payment Required"

- Pacotes com escopo (`@org/name`) são privados por padrão
- Solução: Use `--access public` ou remova o escopo

### Erro: "Package name too similar"

- O nome é muito parecido com um pacote existente
- Solução: Escolha um nome mais único
