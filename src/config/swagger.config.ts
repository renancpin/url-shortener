import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwaggerPlugin(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('UrlShortener')
    .setDescription(
      `### API encurtadora de URLs

<details open>
<summary>**Começando**</summary>

É possível criar e acessar urls encurtadas mesmo sem estar autenticado.

Porém, dessa forma, não é possível listar, editar ou apagar qualquer url (já que não poderemos identificá-las como suas)

Se deseja poder gerenciar suas urls encurtadas, primeiro siga os passos a seguir:

1. Crie seu usuário em \`POST /auth/register\`

2. Faça login em \`POST /auth/login\` com os dados usados no passo 1

3. Copie o conteúdo do \`access_token\` da resposta e adicione-o no menu Authorize (campo \`value\`)

Pronto, agora é possível acessar as outras rotas disponíveis.

Bom proveito!

> Ps: Se desejar acessar novamente de forma anônima, basta remover o header _Authorization_ de suas requisições
</details>
---

<details>
<summary>**Links Úteis**</summary>
- Esta documentação: <https://localhost:3000/openapi>
  * Formato [yaml](/openapi-yaml)
  * Formato [json](/openapi-json)
- [Código Fonte](https://github.com/renancpin/url-shortener) da API
</details>

<details open>
<summary>**Minhas redes**</summary>
- Github: <https://github.com/renancpin>
- Linkedin: <https://linkedin.com/in/renan-c-pinheiro>
- Email: [renan.coelho.p@gmail.com](mailto://renan.coelho.p@gmail.com)
</details>`,
    )
    .setVersion('1.0')
    .setLicense(
      'GLP v3.0',
      'https://github.com/renancpin/url-shortener?tab=GPL-3.0-1-ov-file#readme',
    )
    .setContact(
      'Renan Pinheiro',
      'github.com/renancpin',
      'renan.coelho.p@gmail.com',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, documentFactory, {
    customSiteTitle: 'UrlShortener Docs - OpenAPI',
  });
}
