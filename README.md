# Cadê Meu Pacote!?

Rastreamento unificado de encomendas com **20+ provedores** nacionais e internacionais. Preparado para deploy na Vercel.

## 🇧🇷 Provedores Nacionais (Brasil)
- 📦 **Correios** - Empresa Brasileira de Correios e Telégrafos
- 📬 **JadLog** - Transportadora brasileira
- ✈️ **Azul Cargo Express** - Transporte aéreo nacional
- 🔥 **TNT Mercurio** - Express brasileiro (FedEx)
- 🏍️ **Loggi** - Delivery urbano e same-day

## 🌍 Provedores Internacionais
- 🌐 **17track** - Rastreamento global multi-carrier
- 📍 **TrackMyPackage** - Open source tracking API
- 📊 **PackageTrackr** - Community-driven tracking  
- 🚀 **AfterShip** - Global package tracking platform
- 📈 **TrackingMore** - Multi-carrier tracking service
- 📦 **Parcels App** - European tracking specialist
- 🗺️ **Package Tracker** - UK-based tracking service

## 🇺🇸 Provedores Americanos
- 📮 **EasyPost** - USPS & multi-carrier API
- ⚓ **ShipEngine** - FedEx, UPS, DHL integration
- 🚢 **ShipStation** - E-commerce shipping platform
- 🏢 **Pitney Bowes** - Global shipping technology
- 📮 **Stamps.com** - USPS shipping platform

## 🇪🇺 Provedores Europeus  
- 🔍 **ParcelMonitor** - European package tracking
- 📊 **TrackingEx** - DHL, Hermes, PostNL
- 🤔 **WhereIsMyPackage** - Nordic tracking aggregator

## 🇨🇳 Provedores Asiáticos
- 🐲 **Cainiao** - Alibaba logistics platform
- ☁️ **YunExpress** - Chinese international shipping

## ⚡ Funcionalidades
- 🔍 **Busca simultânea** em 20+ provedores globalmente
- 🔄 **API unificada** `/api/track` com normalização inteligente
- 📅 **Previsão de entrega** com níveis de confiança por provedor
- 📱 **Timeline horizontal** responsivo e moderno
- ⚡ **Cache inteligente** e rate limiting por IP
- 🎨 **UI moderna** com Tailwind CSS e componentes reutilizáveis
- 🌍 **Suporte global** - Brasil, EUA, Europa, Ásia
- 🚀 **Edge Runtime** - Deploy otimizado na Vercel

## Variáveis de ambiente
```bash
# APIs Opcionais (usar mocks se não definidas)
SEVENTEENTRACK_API_KEY=your_17track_key
AFTERSHIP_API_KEY=your_aftership_key  
EASYPOST_API_KEY=your_easypost_key
SHIPENGINE_API_KEY=your_shipengine_key
TRACKINGMORE_API_KEY=your_trackingmore_key

# App Config
NEXT_PUBLIC_APP_NAME=Cadê Meu Pacote!?
```

## Desenvolvimento
Como `npx` não estava disponível, o scaffold foi criado manualmente. Para continuar:

1) Instalar Node.js LTS (se ainda não tiver) e depois instalar dependências:

```powershell
npm init -y ; npm install next react react-dom tailwindcss autoprefixer postcss class-variance-authority lucide-react
npm install -D typescript @types/react @types/node
npx tailwindcss init -p
```

2) Scripts no package.json (ajuste se necessário):
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

3) Rodar em desenvolvimento:
```powershell
npm run dev
```

## Deploy na Vercel
- Conecte o repositório no painel da Vercel
- Project Settings: Framework = Next.js
- Environment Variables: defina `SEVENTEENTRACK_API_KEY` se usar 17track real
- Deploy

## Deploy Online

O projeto está disponível publicamente em:
[https://cade-meu-pacote.vercel.app/](CadeMeuPacote!?)

## Observações
- O adapter dos Correios está com mock por não haver API pública livre de captcha. Considere usar serviços terceiros ou contratos oficiais.
- O adapter 17track precisa de API key e endpoints de produção.

## 👨‍💻 Desenvolvedor
**Gabriel Arezi**  
📱 Portfólio: [https://portifolio-beta-five-52.vercel.app/](https://portifolio-beta-five-52.vercel.app/)

---
*Este projeto demonstra integração com múltiplas APIs de rastreamento e arquitetura escalável com Next.js.*
