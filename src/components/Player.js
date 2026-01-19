import { state, getPlaylistById, getCategoryById } from '../state.js';
import { CATEGORY_THEMES, LINK_TYPES } from '../constants.js';

export function renderPlayer(playlistId) {
    const playlist = getPlaylistById(playlistId);
    if (!playlist) return '<div class="container"><p>Playlist no encontrada</p></div>';

    const category = getCategoryById(playlist.categoryId);
    const theme = CATEGORY_THEMES.find(t => t.id === category?.theme) || CATEGORY_THEMES[0];

    if (!state.player) {
        state.player = { currentIndex: 0, isRandom: false, playedIndices: [] };
    }

    const items = playlist.items || [];
    const currentItem = items[state.player.currentIndex];

    return `
        <div class="container">
            <div class="header">
                <div style="display: flex; align-items: center; gap: 1rem; flex: 1; min-width: 0;">
                    <button class="btn-icon" data-action="back-to-category" data-category-id="${playlist.categoryId}" title="Volver a ${category?.name || 'categoría'}">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <div style="flex: 1; min-width: 0;">
                        <h1 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${playlist.name}</h1>
                        <p>${category?.name || ''} • ${items.length} ${items.length === 1 ? 'elemento' : 'elementos'}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <button class="btn-icon ${state.player.isRandom ? 'active' : ''}" data-action="toggle-random" title="${state.player.isRandom ? 'Desactivar' : 'Activar'} modo aleatorio">
                        <i data-lucide="shuffle" class="w-4 h-4"></i>
                    </button>
                    <button class="btn-primary" data-action="add-item" data-playlist-id="${playlistId}">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        <span style="display: none; @media (min-width: 640px) { display: inline; }">Añadir</span>
                    </button>
                </div>
            </div>
            
            ${items.length === 0 ? renderEmptyState(playlistId) : `
                <div class="player-container">
                    <div>
                        ${renderMediaContent(currentItem)}
                        
                        <div style="margin-top: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem;">
                            <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.015em;">${currentItem?.title || 'Sin título'}</h2>
                            <p style="color: var(--text-muted); font-size: 0.9375rem; margin-bottom: 1.5rem;">
                                <i data-lucide="list-music" class="w-4 h-4" style="display: inline-block; vertical-align: middle; margin-right: 0.25rem;"></i>
                                Elemento ${state.player.currentIndex + 1} de ${items.length}
                            </p>
                            
                            <div style="display: flex; gap: 0.75rem;">
                                <button class="btn-secondary" data-action="previous-item" ${state.player.currentIndex === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                                    <i data-lucide="skip-back" class="w-4 h-4"></i>
                                    Anterior
                                </button>
                                <button class="btn-secondary" data-action="next-item" ${state.player.currentIndex >= items.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                                    Siguiente
                                    <i data-lucide="skip-forward" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="playlist">
                        <h3>Lista de reproducción</h3>
                        ${items.map((item, index) => renderPlaylistItem(item, index, state.player.currentIndex, playlistId)).join('')}
                    </div>
                </div>
            `}
        </div>
    `;
}

function renderMediaContent(item) {
    if (!item) return '';
    const type = detectItemType(item);

    if (type === LINK_TYPES.VIDEO) {
        return `
            <div class="video-wrapper">
                <iframe id="video-player" src="${getEmbedUrl(item.url)}&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        `;
    }

    if (type === LINK_TYPES.PDF) {
        return `
            <div class="card" style="padding: 4rem 3rem; text-align: center;">
                <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem; border-radius: 16px; background: linear-gradient(135deg, var(--accent), var(--accent-hover)); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);">
                    <i data-lucide="file-text" class="w-10 h-10" style="color: white;"></i>
                </div>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem;">${item.title}</h3>
                <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9375rem;">Documento PDF</p>
                <a href="${item.url}" target="_blank" class="btn-primary">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                    Abrir documento
                </a>
            </div>
        `;
    }

    return `
        <div class="card" style="padding: 4rem 3rem; text-align: center;">
            <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem; border-radius: 16px; background: linear-gradient(135deg, var(--accent), var(--accent-hover)); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);">
                <i data-lucide="link-2" class="w-10 h-10" style="color: white;"></i>
            </div>
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem;">${item.title}</h3>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9375rem; word-break: break-all;">${item.url}</p>
            <a href="${item.url}" target="_blank" class="btn-primary">
                <i data-lucide="external-link" class="w-4 h-4"></i>
                Abrir enlace
            </a>
        </div>
    `;
}

function renderPlaylistItem(item, index, currentIndex, playlistId) {
    const isActive = index === currentIndex;

    return `
        <div class="playlist-item ${isActive ? 'active' : ''}" data-action="play-item" data-index="${index}">
            <div class="playlist-item-index">${index + 1}</div>
            <div class="playlist-item-content">
                <div class="playlist-item-title">${item.title || 'Sin título'}</div>
                <div class="playlist-item-url">${item.url}</div>
            </div>
            <div class="playlist-item-actions">
                <button class="btn-icon" style="width: 32px; height: 32px; ${isActive ? 'background: rgba(255, 255, 255, 0.2); border-color: transparent;' : ''}" data-action="edit-item" data-playlist-id="${playlistId}" data-item-id="${item.id}" data-index="${index}" onclick="event.stopPropagation()" title="Editar">
                    <i data-lucide="edit-3" class="w-3 h-3" style="${isActive ? 'color: white;' : ''}"></i>
                </button>
                <button class="btn-icon" style="width: 32px; height: 32px; ${isActive ? 'background: rgba(255, 255, 255, 0.2); border-color: transparent;' : ''}" data-action="delete-item" data-playlist-id="${playlistId}" data-item-id="${item.id}" onclick="event.stopPropagation()" title="Eliminar">
                    <i data-lucide="trash-2" class="w-3 h-3" style="${isActive ? 'color: white;' : ''}"></i>
                </button>
            </div>
        </div>
    `;
}

function renderEmptyState(playlistId) {
    return `
        <div class="empty-state card">
            <i data-lucide="inbox" class="w-16 h-16"></i>
            <h3>Lista vacía</h3>
            <p>Añade tu primer elemento para comenzar a disfrutar de tu contenido</p>
            <button class="btn-primary" data-action="add-item" data-playlist-id="${playlistId}">
                <i data-lucide="plus" class="w-4 h-4"></i>
                Añadir primer elemento
            </button>
        </div>
    `;
}

function detectItemType(item) {
    const url = (item.url || '').toLowerCase();
    if (url.includes('youtube.com') || url.includes('youtu.be')) return LINK_TYPES.VIDEO;
    if (url.endsWith('.pdf')) return LINK_TYPES.PDF;
    return LINK_TYPES.LINK;
}

function getEmbedUrl(url) {
    if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtube.com/shorts/')) {
        const videoId = url.split('shorts/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
}

export function renderAddItemModal(playlistId) {
    return `
        <div class="modal-overlay" data-modal="add-item">
            <div class="modal">
                <h2>Nuevo Elemento</h2>
                
                <label>URL del contenido</label>
                <input type="url" id="item-url" placeholder="https://youtube.com/watch?v=..." autofocus>
                <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: -0.5rem; margin-bottom: 1rem;">
                    Soporta YouTube, PDFs y enlaces web
                </p>
                
                <label>Título (opcional)</label>
                <input type="text" id="item-title" placeholder="Nombre descriptivo del contenido">
                
                <div style="display: flex; gap: 0.75rem; margin-top: 2rem;">
                    <button class="btn-secondary" data-action="close-modal" style="flex: 1;">Cancelar</button>
                    <button class="btn-primary" data-action="save-item" data-playlist-id="${playlistId}" style="flex: 2;">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        Añadir elemento
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function renderEditItemModal(item) {
    return `
        <div class="modal-overlay" data-modal="edit-item">
            <div class="modal">
                <h2>Editar Elemento</h2>
                
                <label>Título</label>
                <input type="text" id="edit-item-title" value="${item.title || ''}" placeholder="Nombre descriptivo" autofocus>
                
                <label>URL (solo lectura)</label>
                <input type="url" value="${item.url}" disabled style="opacity: 0.6; cursor: not-allowed;">
                
                <div style="display: flex; gap: 0.75rem; margin-top: 2rem;">
                    <button class="btn-secondary" data-action="close-modal" style="flex: 1;">Cancelar</button>
                    <button class="btn-primary" data-action="update-item" data-playlist-id="${state?.currentPlaylist || ''}" data-item-id="${item.id}" style="flex: 2;">
                        <i data-lucide="check" class="w-4 h-4"></i>
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    `;
}
