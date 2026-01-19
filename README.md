# 🎵 Links Library

Una aplicación PWA (Progressive Web App) moderna para organizar y reproducir tus playlists de enlaces favoritos. Ideal para gestionar videos, tutoriales, música, libros digitales y más.

## ✨ Características

- **📱 PWA Completa**: Instálala en tu dispositivo móvil y úsala como una app nativa
- **🎨 Categorías Personalizables**: Crea categorías con iconos y temas de colores únicos
- **📝 Playlists Organizadas**: Agrupa tus enlaces en playlists dentro de cada categoría
- **🎬 Reproductor Integrado**: Reproduce videos de YouTube, Vimeo y más directamente en la app
- **🔀 Modo Aleatorio**: Reproduce tus playlists en orden aleatorio
- **☁️ Sincronización con Google Drive**: Respalda automáticamente en `/backup/links-library/`
- **🌙 Modo Oscuro**: Diseño moderno con tema oscuro
- **📱 Responsive**: Optimizado para móviles y escritorio

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone [tu-repo-url]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Despliegue

```bash
# Desplegar a GitHub Pages
npm run deploy
```

## 📖 Uso

### Crear una Categoría

1. En la pantalla de inicio, haz clic en "Nueva Categoría"
2. Ingresa un nombre (ej: "Música", "Tutoriales", "Películas")
3. Selecciona un tema de color
4. Elige un icono representativo
5. Haz clic en "Crear"

### Crear una Playlist

1. Entra a una categoría
2. Haz clic en "Nueva Playlist"
3. Ingresa un nombre para tu playlist
4. Selecciona un icono
5. Haz clic en "Crear"

### Agregar Enlaces

1. Abre una playlist
2. Haz clic en el botón "+"
3. Pega la URL (YouTube, Vimeo, PDF, etc.)
4. Opcionalmente agrega un título descriptivo
5. Haz clic en "Agregar"

### Reproducir

- **Videos**: Se reproducen automáticamente en el reproductor integrado
- **Enlaces**: Se abren en una nueva pestaña
- **Navegación**: Usa los botones de anterior/siguiente
- **Modo Aleatorio**: Activa el botón de shuffle para reproducción aleatoria

## 🛠️ Tecnologías

- **Vite**: Build tool ultra-rápido
- **Tailwind CSS**: Framework de utilidades CSS
- **Lucide Icons**: Iconos modernos y personalizables
- **Google Drive API**: Sincronización en la nube
- **Service Workers**: Funcionalidad offline

## 📁 Estructura del Proyecto

```
links-library/
├── src/
│   ├── components/
│   │   ├── Home.js           # Pantalla principal con categorías
│   │   ├── CategoryView.js   # Vista de playlists
│   │   └── Player.js         # Reproductor de medios
│   ├── constants.js          # Constantes y configuración
│   ├── state.js              # Gestión de estado
│   ├── drive.js              # Sincronización con Drive
│   └── security.js           # Encriptación
├── public/
│   ├── manifest.json         # Configuración PWA
│   └── sw.js                 # Service Worker
├── main.js                   # Punto de entrada
├── style.css                 # Estilos globales
└── index.html                # HTML principal
```

## 🎨 Personalización

### Temas de Categorías

Los temas están definidos en `src/constants.js`:

```javascript
export const CATEGORY_THEMES = [
    { id: 'default', color: '#6366f1', gradient: 'from-indigo-500 to-purple-600' },
    { id: 'music', color: '#ec4899', gradient: 'from-pink-500 to-rose-600' },
    // ... más temas
];
```

### Iconos Disponibles

Usa cualquier icono de [Lucide Icons](https://lucide.dev/icons/)

## 🔒 Privacidad y Seguridad

- Los datos se almacenan localmente en tu navegador
- La sincronización con Google Drive es opcional
- Los datos sincronizados están encriptados

## 📝 Tipos de Enlaces Soportados

- **Videos**: YouTube, Vimeo, Dailymotion
- **Documentos**: PDFs
- **Audio**: MP3, WAV, OGG
- **Enlaces**: Cualquier URL

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🙏 Agradecimientos

- Iconos por [Lucide](https://lucide.dev/)
- Fuentes por [Google Fonts](https://fonts.google.com/)

---

Hecho con ❤️ para organizar mejor tus contenidos favoritos
