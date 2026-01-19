import { state } from '../state.js';
import { CATEGORY_THEMES } from '../constants.js';

export function renderHome() {
    const categories = [...state.categories].sort((a, b) => a.order - b.order);
    const searchTerm = state.searchTerm || '';
    const filteredCategories = searchTerm
        ? categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : categories;

    return `
        <div class="container">
            <div class="header">
                <div style="flex: 1;">
                    <h1>Links Library</h1>
                    <p>${categories.length} ${categories.length === 1 ? 'sección' : 'secciones'} • ${state.playlists.length} ${state.playlists.length === 1 ? 'colección' : 'colecciones'}</p>
                </div>
                <div style="display: flex; gap: 0.75rem;">
                    <button class="btn-icon" data-action="open-settings" title="Configuración">
                        <i data-lucide="settings" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <div style="position: relative;">
                    <i data-lucide="search" class="w-5 h-5" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                    <input 
                        type="text" 
                        id="search-categories" 
                        placeholder="Buscar secciones..." 
                        value="${searchTerm}"
                        style="padding-left: 3rem; margin-bottom: 0;"
                        oninput="window.handleSearch(this.value)"
                    >
                </div>
            </div>
            
            ${filteredCategories.length === 0 ? `
                <div class="empty-state card">
                    <i data-lucide="search-x" class="w-16 h-16"></i>
                    <h3>No se encontraron secciones</h3>
                    <p>Intenta con otro término de búsqueda</p>
                </div>
            ` : `
                <div class="card-grid">
                    ${filteredCategories.map(category => renderCategoryCard(category)).join('')}
                
                    <div class="card" style="cursor: pointer; border-style: dashed; border-color: var(--border); background: transparent;" data-action="add-category">
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px; gap: 0.75rem;">
                            <div style="width: 56px; height: 56px; border-radius: 12px; background: var(--bg-secondary); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border);">
                                <i data-lucide="plus" class="w-6 h-6" style="color: var(--text-muted);"></i>
                            </div>
                            <span style="color: var(--text-muted); font-weight: 600; font-size: 0.9375rem;">Nueva Sección</span>
                        </div>
                    </div>
                </div>
            `}
        </div>
    `;

}

function renderCategoryCard(category) {
    const theme = CATEGORY_THEMES.find(t => t.id === category.theme) || CATEGORY_THEMES[0];

    return `
        <div class="card" data-category-id="${category.id}" data-action="open-category" style="cursor: pointer;">
            <div style="display: flex; flex-direction: column; gap: 1.25rem; min-height: 180px;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                    <div style="width: 72px; height: 72px; border-radius: 16px; background: linear-gradient(135deg, ${theme.gradient}); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);">
                        <i data-lucide="${category.icon}" class="w-8 h-8" style="color: white;"></i>
                    </div>
                    <button 
                        class="btn-icon" 
                        style="width: 36px; height: 36px;"
                        data-action="edit-category"
                        data-category-id="${category.id}"
                        onclick="event.stopPropagation()"
                        title="Editar sección"
                    >
                        <i data-lucide="more-vertical" class="w-4 h-4"></i>
                    </button>
                </div>
                <div style="flex: 1;">
                    <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.375rem; letter-spacing: -0.015em;">${category.name}</h3>
                    <p style="font-size: 0.8125rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">${category.theme || 'General'}</p>
                </div>
            </div>
        </div>
    `;
}

export function renderCategoryModal(category = null) {
    const isEdit = !!category;
    const icons = ["music", "headphones", "video", "film", "youtube", "book", "book-open", "graduation-cap", "star", "heart", "code", "globe", "briefcase", "coffee", "gamepad-2", "camera"];

    return `
        <div class="modal-overlay" data-modal="category">
            <div class="modal">
                <h2>${isEdit ? 'Editar' : 'Nueva'} Sección</h2>
                
                <label>Nombre de la sección</label>
                <input type="text" id="category-name" placeholder="Ej: Música, Películas, Cursos..." value="${category?.name || ''}" autofocus>
                
                <label>Tema de color</label>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.625rem; margin-bottom: 1.5rem;">
                    ${CATEGORY_THEMES.map(theme => `
                        <button 
                            style="width: 100%; aspect-ratio: 1; border-radius: 12px; background: linear-gradient(135deg, ${theme.gradient}); border: 2px solid ${category?.theme === theme.id ? 'var(--accent)' : 'transparent'}; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"
                            data-theme="${theme.id}"
                            data-action="select-theme"
                            title="${theme.id}"
                        ></button>
                    `).join('')}
                </div>
                
                <label>Icono representativo</label>
                <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 0.5rem; margin-bottom: 1.5rem; max-height: 200px; overflow-y: auto; padding: 0.5rem; background: var(--bg-primary); border-radius: 12px;">
                    ${icons.map(icon => `
                        <button 
                            class="btn-icon"
                            style="width: 100%; aspect-ratio: 1; background: ${category?.icon === icon ? 'var(--accent)' : 'var(--bg-secondary)'}; color: ${category?.icon === icon ? 'white' : 'var(--text-secondary)'};"
                            data-icon="${icon}"
                            data-action="select-icon"
                            title="${icon}"
                        >
                            <i data-lucide="${icon}" class="w-4 h-4"></i>
                        </button>
                    `).join('')}
                </div>
                
                <div style="display: flex; gap: 0.75rem; margin-top: 2rem;">
                    ${isEdit ? `
                        <button class="btn-secondary" style="background: var(--danger); color: white; border-color: var(--danger);" data-action="delete-category" data-category-id="${category.id}">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                            Eliminar
                        </button>
                    ` : ''}
                    <button class="btn-secondary" data-action="close-modal" style="flex: 1;">Cancelar</button>
                    <button class="btn-primary" data-action="save-category" data-category-id="${category?.id || ''}" style="flex: 2;">
                        <i data-lucide="${isEdit ? 'check' : 'plus'}" class="w-4 h-4"></i>
                        ${isEdit ? 'Guardar cambios' : 'Crear sección'}
                    </button>
                </div>
            </div>
        </div>
    `;
}
