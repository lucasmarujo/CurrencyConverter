# Currency Converter

Um conversor de moedas desenvolvido com Angular, Angular Material e ngx-translate, utilizando a ExchangeRate API para obter taxas de câmbio atualizadas.

## Moedas suportadas

- Real Brasileiro (BRL)
- Dólar Americano (USD)
- Dólar Canadense (CAD)
- Euro (EUR)
- Libra Esterlina (GBP)
- Yuan Chinês (CNY)
- Iene Japonês (JPY)

## Funcionalidades

- Conversão entre as moedas suportadas
- Interface responsiva com Angular Material
- Suporte a temas claro e escuro
- Internacionalização com suporte para Português e Inglês
- Exibição de taxas de câmbio atualizadas

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)
- Angular CLI (versão 16 ou superior)

## Configuração

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/currency-converter.git
cd currency-converter
```

2. Instale as dependências:
```
npm install
```

3. Configure sua chave de API:
   - Obtenha uma chave de API gratuita em [ExchangeRate-API](https://www.exchangerate-api.com/)
   - Abra o arquivo `src/environments/environment.ts` e substitua `YOUR_API_KEY` pela sua chave

4. Execute o aplicativo localmente:
```
ng serve
```

5. Acesse o aplicativo em `http://localhost:4200`

