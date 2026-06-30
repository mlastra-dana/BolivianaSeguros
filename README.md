# LBC Seguros | Portal

Demo comercial de una plataforma web para la gestión de grupos asegurables y la distribución digital de pólizas de seguros para La Boliviana Ciacruz Seguros.

## Objetivo

El objetivo de esta demo es presentar una experiencia funcional y visualmente alineada con La Boliviana Ciacruz que muestre cómo la aseguradora puede crear, administrar y activar nuevos canales digitales de distribución de seguros a través de grupos.

Cada grupo representa una comunidad, empresa, colegio, condominio, asociación o aliado estratégico. Sus miembros pueden afiliarse digitalmente mediante un enlace o código QR para participar en un programa comercial asociado a una póliza específica.

La demo está pensada para acompañar una presentación comercial: no busca explicar todo en pantalla, sino mostrar un flujo claro que pueda ser narrado durante la reunión.

## ¿Para qué se hará la demo?

La demo permite mostrar a La Boliviana Ciacruz cómo DANAconnect podría habilitar un portal para:

- Administrar grupos asegurables desde una plataforma centralizada.
- Asociar cada grupo a un único producto asegurador.
- Gestionar miembros dentro de cada grupo.
- Compartir un QR o enlace de afiliación digital por grupo.
- Simular el registro público de nuevos miembros.
- Consultar reportes visuales sobre afiliaciones, volumen por grupo, mix de pólizas y embudo comercial.
- Presentar una experiencia corporativa, simple y responsiva, lista para evolucionar hacia una solución productiva.

## Alcance de la demo

Esta aplicación es una demo funcional estática. No tiene backend real, base de datos ni autenticación productiva. Toda la información está mockeada en el frontend y las acciones se simulan en estado local durante la sesión.

El alcance incluye:

- Login demo con credenciales visibles.
- Pantalla de inicio con accesos rápidos y actividad reciente.
- Módulo de grupos con búsqueda, filtros y creación simulada.
- Detalle de grupo con información comercial, estado, póliza, ubicación y corredor responsable.
- Perfilamiento agregado por rango de edad para comparar suscritos vs. base.
- Administración de miembros por grupo: registrar, editar, eliminar, consultar y buscar.
- QR real generado en frontend para el enlace mock de afiliación.
- Formulario público de afiliación asociado a cada grupo.
- Tablero de reportes con métricas y gráficas visuales.

## Concepto funcional

La plataforma se organiza alrededor de grupos asegurables. Cada grupo tiene:

- Nombre.
- Descripción.
- Tipo o categoría.
- Tipo de póliza asociada.
- Ubicación geográfica.
- Fecha de creación.
- Estado: activo o inactivo.
- Corredor responsable.
- Miembros asociados.

Cada grupo debe estar asociado a un solo producto asegurador. Esto facilita la segmentación comercial, el seguimiento de oportunidades y la administración ordenada de campañas o alianzas.

## Productos aseguradores considerados

La demo contempla los siguientes tipos de póliza:

- Seguro de Automóvil.
- Seguro de Hogar.
- Seguro de Vida.
- Seguro de Accidentes.

La estructura permite incorporar otros productos definidos por La Boliviana Ciacruz.

## Módulos principales

### Login

Pantalla inicial con look & feel inspirado en el sitio oficial de LBC. Incluye acceso demo, logo de marca, navegación visual tipo sitio corporativo y credenciales visibles para facilitar la presentación.

Credenciales demo:

- Usuario: `administrador`
- Contraseña: `LBC#7Qm92!2026`

### Inicio

Pantalla limpia de entrada al portal. Muestra accesos directos a la administración de grupos y miembros, junto con actividad reciente para contextualizar la operación sin recargar la interfaz.

### Grupos

Vista para consultar y administrar grupos asegurables. Permite:

- Buscar grupos por nombre.
- Filtrar por tipo de póliza.
- Filtrar por estado.
- Crear grupos de forma simulada.
- Acceder al detalle de cada grupo.

### Detalle de grupo

Pantalla que concentra la información principal del grupo:

- Estado.
- Tipo de póliza.
- Descripción.
- Categoría.
- Ubicación.
- Fecha de creación.
- Corredor responsable.
- Cantidad de miembros.
- QR de afiliación.
- Perfilamiento agregado por edad.
- Módulo de miembros.

También permite editar, desactivar, activar o eliminar el grupo de manera simulada.

### Perfilamiento agregado

Cada detalle de grupo incluye una lectura agregada de sus miembros por rango de edad. Esta vista compara la composición de la base visible contra los miembros afiliados y muestra una señal comercial para cada segmento:

- Balanceado.
- Sub-representado.
- Vigilar.
- Oportunidad.

El objetivo es ayudar a identificar grupos etarios con mayor o menor representación dentro de la base suscrita y orientar decisiones comerciales o campañas segmentadas.

### Miembros

Cada grupo tiene su propio módulo de miembros. El sistema permite:

- Registrar miembros.
- Editar información.
- Eliminar miembros.
- Consultar miembros.
- Buscar por nombre, correo electrónico o teléfono.

Por cada miembro se registra:

- Nombre.
- Apellidos.
- Correo electrónico.
- Número de teléfono.
- Género.
- Edad.
- Fecha de afiliación.
- Estado comercial.

Estados usados en la demo:

- Registrado.
- Contactado.
- En seguimiento.
- Afiliado.

### Afiliación pública

Ruta pública simulada para registrar nuevos miembros desde el QR o enlace del grupo:

`https://lbc.bo/afiliacion/{groupSlug}`

En la demo local se accede mediante:

`/affiliation/{groupSlug}`

El formulario solicita datos básicos del miembro y simula una afiliación exitosa.

### Reportes

Tablero visual para apoyar la conversación comercial. Incluye:

- Total de miembros.
- Grupos activos.
- Afiliaciones del mes.
- Conversión.
- Mix de pólizas.
- Afiliaciones por grupo.
- Embudo comercial.
- Volumen por grupo.
- Top grupos.

## Look & feel

La interfaz fue diseñada tomando como referencia visual el sitio oficial de La Boliviana Ciacruz. Se priorizó una experiencia corporativa y profesional, con:

- Uso del logo LBC.
- Favicon de marca.
- Paleta inspirada en azul corporativo, verde de acento, blanco y grises suaves.
- Tarjetas limpias, bordes redondeados y sombras suaves.
- Badges de estado y póliza.
- Íconos simples mediante `lucide-react`.
- Diseño responsivo para laptop, tablet y móvil.

## Stack técnico

- React.
- Vite.
- TailwindCSS.
- React Router.
- lucide-react.
- qrcode.

La aplicación está preparada para ejecutarse como frontend estático y desplegarse en AWS Amplify Hosting.

## Estructura relevante

```text
src/
  App.jsx
  data/mockData.js
  pages/
    LoginPage.jsx
    DashboardPage.jsx
    GroupsPage.jsx
    GroupDetailPage.jsx
    PublicAffiliationPage.jsx
    ReportsPage.jsx
  components/
    AppLayout.jsx
    BrandMark.jsx
    GroupCard.jsx
    GroupFormModal.jsx
    MembersTable.jsx
    MemberFormModal.jsx
    QRCard.jsx
    Badge.jsx
public/
  brand/logo-lbc-seguros-2026.svg
  favicon.svg
```

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Levantar el servidor local:

```bash
npm run dev
```

Generar build de producción:

```bash
npm run build
```

Previsualizar el build:

```bash
npm run preview
```

## Despliegue en AWS Amplify

Configuración sugerida para Amplify Hosting:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: versión LTS compatible con Vite

La aplicación no requiere variables de entorno ni servicios backend para esta demo.

## Notas de demo

- Los datos viven en `src/data/mockData.js`.
- La autenticación es simulada con `localStorage`.
- Las altas, ediciones y eliminaciones funcionan en memoria durante la sesión.
- El QR se genera en frontend con la librería `qrcode`.
- El diseño está optimizado para que la persona que presenta explique el valor del portal sin saturar la pantalla con texto.
