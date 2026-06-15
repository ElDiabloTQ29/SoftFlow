export const COMPONENT_LIBRARY = {
  Arquitectura: {
    icon: '🏗️',
    color: '#6366f1',
    items: [
      { type: 'arch_service',   label: 'Servicio',      sub: 'Microservice',  color: '#6366f1', icon: '⬡' },
      { type: 'arch_client',    label: 'Cliente Web',   sub: 'Frontend',      color: '#10b981', icon: '💻' },
      { type: 'arch_mobile',    label: 'App Móvil',     sub: 'iOS / Android', color: '#10b981', icon: '📱' },
      { type: 'arch_gateway',   label: 'API Gateway',   sub: 'Gateway',       color: '#8b5cf6', icon: '🔀' },
      { type: 'arch_db',        label: 'Base de datos', sub: 'Database',      color: '#3b82f6', icon: '🗄️' },
      { type: 'arch_cache',     label: 'Caché',         sub: 'Redis',         color: '#ef4444', icon: '⚡' },
      { type: 'arch_queue',     label: 'Cola',          sub: 'Message Queue', color: '#f59e0b', icon: '📨' },
      { type: 'arch_cdn',       label: 'CDN',           sub: 'Edge Network',  color: '#06b6d4', icon: '🌐' },
      { type: 'arch_lb',        label: 'Load Balancer', sub: 'LB',            color: '#8b5cf6', icon: '⚖️' },
      { type: 'arch_storage',   label: 'Almacenamiento',sub: 'Object Store',  color: '#3b82f6', icon: '📦' },
    ],
  },
  UML: {
    icon: '📐',
    color: '#8b5cf6',
    items: [
      { type: 'uml_class',      label: 'Clase',         sub: 'Class',         color: '#6366f1', icon: '▣' },
      { type: 'uml_interface',  label: 'Interfaz',      sub: 'Interface',     color: '#06b6d4', icon: '⊛' },
      { type: 'uml_abstract',   label: 'Abstracta',     sub: 'Abstract',      color: '#8b5cf6', icon: '▤' },
      { type: 'uml_actor',      label: 'Actor',         sub: 'Use Case',      color: '#10b981', icon: '🧑' },
      { type: 'uml_usecase',    label: 'Caso de uso',   sub: 'Use Case',      color: '#8b5cf6', icon: '○' },
      { type: 'uml_component',  label: 'Componente',    sub: 'Component',     color: '#f59e0b', icon: '⊞' },
      { type: 'uml_package',    label: 'Paquete',       sub: 'Package',       color: '#3b82f6', icon: '📁' },
      { type: 'uml_note',       label: 'Nota',          sub: 'Note',          color: '#94a3b8', icon: '📝' },
    ],
  },
  'Base de datos': {
    icon: '🗄️',
    color: '#3b82f6',
    items: [
      { type: 'db_table',       label: 'Tabla',         sub: 'Table',         color: '#3b82f6', icon: '▦' },
      { type: 'db_view',        label: 'Vista',         sub: 'View',          color: '#8b5cf6', icon: '◫' },
      { type: 'db_procedure',   label: 'Procedimiento', sub: 'Stored Proc',   color: '#f59e0b', icon: '⚙️' },
      { type: 'db_index',       label: 'Índice',        sub: 'Index',         color: '#10b981', icon: '◈' },
      { type: 'db_trigger',     label: 'Trigger',       sub: 'Trigger',       color: '#ef4444', icon: '🔔' },
      { type: 'db_schema',      label: 'Esquema',       sub: 'Schema',        color: '#06b6d4', icon: '🗂️' },
    ],
  },
  Flujo: {
    icon: '🔄',
    color: '#10b981',
    items: [
      { type: 'flow_start',     label: 'Inicio',        sub: 'Start',         color: '#10b981', icon: '▶' },
      { type: 'flow_end',       label: 'Fin',           sub: 'End',           color: '#ef4444', icon: '⏹' },
      { type: 'flow_process',   label: 'Proceso',       sub: 'Process',       color: '#6366f1', icon: '▬' },
      { type: 'flow_decision',  label: 'Decisión',      sub: 'Decision',      color: '#f59e0b', icon: '◇' },
      { type: 'flow_io',        label: 'Entrada/Salida',sub: 'I/O',           color: '#3b82f6', icon: '↔' },
      { type: 'flow_document',  label: 'Documento',     sub: 'Document',      color: '#8b5cf6', icon: '📄' },
      { type: 'flow_delay',     label: 'Espera',        sub: 'Delay',         color: '#f59e0b', icon: '⏳' },
    ],
  },
  Wireframe: {
    icon: '🖼️',
    color: '#94a3b8',
    items: [
      { type: 'wf_page',        label: 'Página',        sub: 'Screen',        color: '#6366f1', icon: '🖥️' },
      { type: 'wf_navbar',      label: 'Navbar',        sub: 'Navigation',    color: '#374151', icon: '═' },
      { type: 'wf_button',      label: 'Botón',         sub: 'Button',        color: '#6366f1', icon: '[ ]' },
      { type: 'wf_input',       label: 'Input',         sub: 'Text field',    color: '#94a3b8', icon: '▭' },
      { type: 'wf_card',        label: 'Card',          sub: 'Card',          color: '#3b82f6', icon: '🃏' },
      { type: 'wf_modal',       label: 'Modal',         sub: 'Dialog',        color: '#8b5cf6', icon: '⬚' },
      { type: 'wf_form',        label: 'Formulario',    sub: 'Form',          color: '#10b981', icon: '📋' },
      { type: 'wf_table',       label: 'Tabla UI',      sub: 'Data table',    color: '#06b6d4', icon: '📊' },
      { type: 'wf_sidebar',     label: 'Sidebar',       sub: 'Side panel',    color: '#f59e0b', icon: '⊟' },
    ],
  },
}

export const DEFAULT_EDGES = {
  solid:   { type: 'smoothstep', markerEnd: { type: 'ArrowClosed' }, style: { strokeWidth: 2 } },
  dashed:  { type: 'smoothstep', markerEnd: { type: 'ArrowClosed' }, style: { strokeWidth: 2, strokeDasharray: '6 3' } },
  dotted:  { type: 'smoothstep', style: { strokeWidth: 1.5, strokeDasharray: '2 3' } },
  bidirectional: { type: 'smoothstep', markerEnd: { type: 'ArrowClosed' }, markerStart: { type: 'ArrowClosed' }, style: { strokeWidth: 2 } },
}
