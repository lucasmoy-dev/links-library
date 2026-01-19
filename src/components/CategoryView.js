import { state, getPlaylistsByCategory } from '../state.js';
import { CATEGORY_THEMES } from '../constants.js';

export function renderCategoryView(categoryId) {
    const category = state.categories.find(c => c.id === categoryId);
    if (!category) return '<div class="container"><p>Sección no encontrada</p></div>';

    const playlists = getPlaylistsByCategory(categoryId);
    const theme = CATEGORY_THEMES.find(t => t.id === category.theme) || CATEGORY_THEMES[0];

    return `
        <div class="container">
            <div class="header">
                <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                    <button class="btn-icon" data-action="back-to-home" title="Volver al inicio">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <div style="flex: 1;">
                        <h1>${category.name}</h1>
                        <p>${playlists.length} ${playlists.length === 1 ? 'colección' : 'colecciones'}</p>
                    </div>
                </div>
                <button class="btn-primary" data-action="add-playlist" data-category-id="${categoryId}">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                    Nueva Colección
                </button>
            </div>
            
            ${playlists.length === 0 ? `
                <div class="empty-state card">
                    <i data-lucide="folder-open" class="w-16 h-16"></i>
                    <h3>No hay colecciones aún</h3>
                    <p>Crea tu primera colección para organizar tu contenido</p>
                    <button class="btn-primary" data-action="add-playlist" data-category-id="${categoryId}">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        Crear primera colección
                    </button>
                </div>
            ` : `
                <div class="card-grid">
                    ${playlists.map(playlist => renderPlaylistCard(playlist, theme)).join('')}
                </div>
            `}
        </div>
    `;
}

function renderPlaylistCard(playlist, theme) {
    const itemCount = playlist.items?.length || 0;

    return `
        <div class="card" data-playlist-id="${playlist.id}" data-action="open-playlist" style="cursor: pointer;">
            <div style="display: flex; flex-direction: column; gap: 1.25rem; min-height: 180px;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                    <div style="width: 64px; height: 64px; border-radius: 14px; background: linear-gradient(135deg, ${theme.gradient}); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);">
                        <i data-lucide="${playlist.icon}" class="w-7 h-7" style="color: white;"></i>
                    </div>
                    <button 
                        class="btn-icon"
                        style="width: 36px; height: 36px;"
                        data-action="edit-playlist"
                        data-playlist-id="${playlist.id}"
                        onclick="event.stopPropagation()"
                        title="Editar colección"
                    >
                        <i data-lucide="more-vertical" class="w-4 h-4"></i>
                    </button>
                </div>
                <div style="flex: 1;">
                    <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.375rem; letter-spacing: -0.015em;">${playlist.name}</h3>
                    <p style="font-size: 0.8125rem; color: var(--text-muted); font-weight: 500;">
                        <i data-lucide="list" class="w-3 h-3" style="display: inline-block; vertical-align: middle; margin-right: 0.25rem;"></i>
                        ${itemCount} ${itemCount === 1 ? 'elemento' : 'elementos'}
                    </p>
                </div>
            </div>
        </div>
    `;
}

export function renderPlaylistModal(categoryId, playlist = null) {
    const isEdit = !!playlist;
    const icons = ["play-circle", "play", "music", "music-2", "video", "film", "layers", "list", "star", "zap", "compass", "book-open", "heart", "headphones"];

    return `
        <div class="modal-overlay" data-modal="playlist">
            <div class="modal">
                <h2>${isEdit ? 'Editar' : 'Nueva'} Colección</h2>
                
                <label>Nombre de la colección</label>
                <input type="text" id="playlist-name" placeholder="Ej: Favoritos 2024, Por ver..." value="${playlist?.name || ''}" autofocus>
                
                <label>Icono</label>
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; margin-bottom: 1.5rem; padding: 0.5rem; background: var(--bg-primary); border-radius: 12px;">
                    ${icons.map(icon => `
                        <button 
                            class="btn-icon"
                            style="width: 100%; aspect-ratio: 1; background: ${playlist?.icon === icon ? 'var(--accent)' : 'var(--bg-secondary)'}; color: ${playlist?.icon === icon ? 'white' : 'var(--text-secondary)'};"
                            data-icon="${icon}"
                            data-action="select-playlist-icon"
                            title="${icon}"
                        >
                            <i data-lucide="${icon}" class="w-4 h-4"></i>
                        </button>
                    `).join('')}
                </div>
                
                <div style="display: flex; gap: 0.75rem; margin-top: 2rem;">
                    ${isEdit ? `
                        <button class="btn-secondary" style="background: var(--danger); color: white; border-color: var(--danger);" data-action="delete-playlist" data-playlist-id="${playlist.id}">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                            Eliminar
                        </button>
                    ` : ''}
                    <button class="btn-secondary" data-action="close-modal" style="flex: 1;">Cancelar</button>
                    <button class="btn-primary" data-action="save-playlist" data-category-id="${categoryId}" data-playlist-id="${playlist?.id || ''}" style="flex: 2;">
                        <i data-lucide="${isEdit ? 'check' : 'plus'}" class="w-4 h-4"></i>
                        ${isEdit ? 'Guardar cambios' : 'Crear colección'}
                    </button>
                </div>
            </div>
        </div>
    `;
}
