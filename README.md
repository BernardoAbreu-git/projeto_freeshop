import os

# Conteúdo do README baseado nos requisitos do usuário
readme_content = """# 🛒 FakeStore E-commerce

Este é um projeto de e-commerce funcional desenvolvido com **React.js**, consumindo a [FakeStoreAPI](https://fakestoreapi.com/). O projeto foi construído para aplicar conceitos avançados de desenvolvimento front-end, incluindo gestão de estado global, autenticação via JWT, rotas protegidas e validação de formulários.

## 🚀 Tecnologias e Conceitos Aplicados

### ⚛️ React Core & Hooks
O projeto utiliza uma arquitetura baseada em componentes funcionais, explorando os seguintes hooks:
* `useState`: Gestão de estados locais (carrinho, inputs, carregamento).
* `useEffect`: Sincronização com a API e manipulação de efeitos colaterais.
* `useContext`: Estado global para o sistema de autenticação e gestão do carrinho.
* `useRef`: Referência de elementos para otimização e foco em formulários.

### 🛣️ Roteamento (React Router)
* Navegação entre múltiplas páginas (Home, Produtos, Carrinho, Login).
* **Rotas Protegidas:** Implementação de lógica para restringir o acesso ao Checkout e Perfil apenas para utilizadores autenticados.

### 🔐 Autenticação e API
* **Consumo de API:** Realizado através do **Axios** (ou Fetch), tratando pedidos assíncronos e estados de erro.
* **Autenticação JWT:** Sistema de Login/Logout que consome o token da API e o armazena para persistência da sessão.

### 📝 Formulários e Validação
* Utilização de bibliotecas para controlo de formulários.
* **Yup:** Esquemas de validação rigorosos para garantir a integridade dos dados inseridos pelo utilizador.

### 🎨 Interface e Estilização
* UI desenvolvida com **[Tailwind CSS / PrimeReact / Material UI]** (ajuste conforme o que utilizou).
* Design totalmente responsivo.

---

## 🛠️ Funcionalidades principais
- [x] Listagem dinâmica de produtos por categoria.
- [x] Detalhes individuais de produtos via rotas dinâmicas.
- [x] Sistema de Carrinho (Adicionar, remover e atualizar quantidades).
- [x] Sistema de Login com geração de Token JWT.
- [x] Proteção de rotas para utilizadores não logados.
- [x] Validação de campos de formulário (E-mail, Password).