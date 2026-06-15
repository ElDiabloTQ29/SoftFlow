# SoftFlow — Editor Visual de Diagramas de Software

Una herramienta tipo Canva para diseñar arquitecturas, diagramas UML, flujos de usuarios, wireframes y modelos de bases de datos.

## 🚀 Instalación y arranque

### Requisitos
- Node.js 18+ instalado
- npm o pnpm

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en modo desarrollo
npm run dev
```

Luego abre http://localhost:5173 en tu navegador.

### Build para producción
```bash
npm run build
npm run preview
```

---

## ✨ Funcionalidades

### Canvas interactivo
- **Drag & drop** de componentes desde el panel lateral
- **Zoom** con rueda del ratón o botones de control
- **Pan** arrastrando el fondo del canvas
- **Snap to grid** configurable (16px)
- **Minimap** en esquina inferior derecha

### Bibliotecas de componentes (5 categorías)
- **Arquitectura**: Servicios, DB, API Gateway, Cache, Queue, CDN, Load Balancer...
- **UML**: Clases, Interfaces, Actores, Casos de uso, Componentes...
- **Base de datos**: Tablas, Vistas, Procedimientos, Índices, Triggers...
- **Flujo**: Inicio/Fin, Proceso, Decisión, E/S, Documentos...
- **Wireframe**: Páginas, Navbar, Botones, Inputs, Cards, Modales...

### Conexiones
- 4 tipos: **sólida**, **discontinua**, **punteada**, **bidireccional**
- Etiquetas en las conexiones
- Handles en los 4 lados de cada nodo

### Panel de propiedades
- Edita etiqueta, subtítulo e ícono (emoji) de cada nodo
- Selector de color con presets + picker
- Edita tipo y etiqueta de conexiones

### Exportación
| Formato | Descripción |
|---------|-------------|
| PNG | Captura del canvas completo (2x resolución) |
| PDF | Documento PDF landscape |
| Mermaid | Código copiable + enlace a Mermaid Live |
| JSON | Guarda y carga diagramas completos |

---

## 🗂 Estructura del proyecto

```
softflow/
├── src/
│   ├── App.jsx                    # Componente raíz + canvas React Flow
│   ├── index.css                  # Variables CSS + estilos globales
│   ├── main.jsx                   # Entry point
│   ├── components/
│   │   ├── Sidebar.jsx            # Panel lateral con componentes
│   │   ├── Toolbar.jsx            # Barra superior + exportación
│   │   └── PropertiesPanel.jsx    # Panel propiedades (derecha)
│   ├── nodes/
│   │   └── SoftNode.jsx           # Nodo personalizado React Flow
│   ├── store/
│   │   ├── useStore.js            # Estado global (Zustand)
│   │   └── library.js             # Catálogo de componentes
│   └── utils/
│       └── export.js              # PNG, PDF, Mermaid, JSON
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠 Extensiones recomendadas para VS Code

Instala estas extensiones para mejor experiencia:

- **ES7+ React/Redux/React-Native snippets** — snippets de React
- **Prettier** — formateo de código
- **ESLint** — linting
- **Tailwind CSS IntelliSense** (opcional si añades Tailwind)
- **Auto Rename Tag** — renombrado de JSX

---

## 🔧 Próximas mejoras sugeridas

- [ ] Múltiples páginas / diagramas por proyecto
- [ ] Colaboración en tiempo real (WebSockets / Liveblocks)
- [ ] Más tipos de nodos (swimlanes, ERD detallado, secuencia UML)
- [ ] Plantillas predefinidas
- [ ] Historial de deshacer/rehacer (Ctrl+Z)
- [ ] Exportación a SVG
- [ ] Modo claro
- [ ] Comentarios y anotaciones en el canvas
