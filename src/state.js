import { KEYS } from './constants.js';

// Global state
export const state = {
    categories: [],
    playlists: [],
    settings: {
        theme: 'dark',
        lang: 'es',
        autoSync: false,
        vaultKey: ''
    },
    currentView: 'home',
    currentCategory: null,
    currentPlaylist: null
};

// Custom event for auto-sync
const notifyChange = () => {
    window.dispatchEvent(new CustomEvent('app-state-changed'));
};


// Load from localStorage
export function loadState() {
    try {
        const categoriesData = localStorage.getItem(KEYS.CATEGORIES);
        if (categoriesData) {
            state.categories = JSON.parse(categoriesData);
        } else {
            // Initialize with default categories
            state.categories = [
                { id: generateId(), name: 'Música', icon: 'music', theme: 'music', order: 0 },
                { id: generateId(), name: 'Estudio', icon: 'graduation-cap', theme: 'study', order: 1 },
                { id: generateId(), name: 'Libros', icon: 'book', theme: 'books', order: 2 },
                { id: generateId(), name: 'Películas', icon: 'film', theme: 'movies', order: 3 }
            ];
            saveCategories();
        }

        const playlistsData = localStorage.getItem(KEYS.PLAYLISTS);
        if (playlistsData) {
            state.playlists = JSON.parse(playlistsData);
        }

        const settingsData = localStorage.getItem(KEYS.SETTINGS);
        if (settingsData) {
            state.settings = { ...state.settings, ...JSON.parse(settingsData) };
        }
    } catch (error) {
        console.error('Error loading state:', error);
    }
}

// Save functions
export function saveCategories() {
    try {
        localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(state.categories));
        notifyChange();
    } catch (error) {
        console.error('Error saving categories:', error);
    }
}

export function savePlaylists() {
    try {
        localStorage.setItem(KEYS.PLAYLISTS, JSON.stringify(state.playlists));
        notifyChange();
    } catch (error) {
        console.error('Error saving playlists:', error);
    }
}

export function saveSettings() {
    try {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
        notifyChange();
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Category operations
export function addCategory(name, icon, theme) {
    const category = {
        id: generateId(),
        name,
        icon,
        theme,
        order: state.categories.length,
        createdAt: Date.now()
    };
    state.categories.push(category);
    saveCategories();
    return category;
}

export function updateCategory(id, updates) {
    const index = state.categories.findIndex(c => c.id === id);
    if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...updates };
        saveCategories();
        return state.categories[index];
    }
    return null;
}

export function deleteCategory(id) {
    state.categories = state.categories.filter(c => c.id !== id);
    // Also delete all playlists in this category
    state.playlists = state.playlists.filter(p => p.categoryId !== id);
    saveCategories();
    savePlaylists();
}

// Playlist operations
export function addPlaylist(categoryId, name, icon) {
    const playlist = {
        id: generateId(),
        categoryId,
        name,
        icon: icon || 'play-circle',
        items: [],
        order: state.playlists.filter(p => p.categoryId === categoryId).length,
        createdAt: Date.now()
    };
    state.playlists.push(playlist);
    savePlaylists();
    return playlist;
}

export function updatePlaylist(id, updates) {
    const index = state.playlists.findIndex(p => p.id === id);
    if (index !== -1) {
        state.playlists[index] = { ...state.playlists[index], ...updates };
        savePlaylists();
        return state.playlists[index];
    }
    return null;
}

export function deletePlaylist(id) {
    state.playlists = state.playlists.filter(p => p.id !== id);
    savePlaylists();
}

// Playlist item operations
export function addPlaylistItem(playlistId, url, title, type = 'link') {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist) {
        const item = {
            id: generateId(),
            url,
            title,
            type,
            order: playlist.items.length,
            addedAt: Date.now()
        };
        playlist.items.push(item);
        savePlaylists();
        return item;
    }
    return null;
}

export function updatePlaylistItem(playlistId, itemId, updates) {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist) {
        const index = playlist.items.findIndex(i => i.id === itemId);
        if (index !== -1) {
            playlist.items[index] = { ...playlist.items[index], ...updates };
            savePlaylists();
            return playlist.items[index];
        }
    }
    return null;
}

export function deletePlaylistItem(playlistId, itemId) {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist) {
        playlist.items = playlist.items.filter(i => i.id !== itemId);
        savePlaylists();
    }
}

export function reorderPlaylistItems(playlistId, itemIds) {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist) {
        const reordered = itemIds.map((id, index) => {
            const item = playlist.items.find(i => i.id === id);
            return { ...item, order: index };
        });
        playlist.items = reordered;
        savePlaylists();
    }
}

// Helper functions
export function getCategoryById(id) {
    return state.categories.find(c => c.id === id);
}

export function getPlaylistById(id) {
    return state.playlists.find(p => p.id === id);
}

export function getPlaylistsByCategory(categoryId) {
    return state.playlists.filter(p => p.categoryId === categoryId).sort((a, b) => a.order - b.order);
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
