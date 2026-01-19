import './style.css';
import { state, loadState, saveCategories, savePlaylists, saveSettings, addCategory, updateCategory, deleteCategory, addPlaylist, updatePlaylist, deletePlaylist, addPlaylistItem, updatePlaylistItem, deletePlaylistItem, reorderPlaylistItems, getCategoryById, getPlaylistById } from './src/state.js';
import { APP_VERSION, KEYS, DRIVE_BACKUP_PATH } from './src/constants.js';
import { renderHome, renderCategoryModal } from './src/components/Home.js';
import { renderCategoryView, renderPlaylistModal } from './src/components/CategoryView.js';
import { renderPlayer, renderAddItemModal, renderEditItemModal } from './src/components/Player.js';
import { renderSettings } from './src/components/Settings.js';
import { DriveSync } from './src/drive.js';
import { SecurityService as Security } from './src/security.js';

let ytPlayer = null;
let driveSync = null;
let tokenClient = null;

const DRIVE_CLIENT_ID = '';
const DRIVE_API_KEY = '';

function initApp() {
    console.log('🚀 Links Library', APP_VERSION);
    loadState();
    setupGlobalEvents();
    renderCurrentView();
    registerSW();
    initDriveSync();

    // Global search handler
    window.handleSearch = (value) => {
        state.searchTerm = value;
        renderCurrentView();
    };

    if (window.lucide) window.lucide.createIcons();
}

function initDriveSync() {
    window.addEventListener('app-state-changed', async () => {
        if (state.settings.autoSync && state.settings.vaultKey) {
            await syncWithDrive();
        }
    });
}

async function syncWithDrive(isManual = false) {
    if (!state.settings.vaultKey) {
        if (isManual) alert('Configura una clave de encriptación primero');
        return;
    }
    try {
        if (!driveSync) driveSync = new DriveSync('links_', DRIVE_BACKUP_PATH);
        const token = gapi?.auth?.getToken();
        if (!token) {
            if (isManual) alert('Conecta tu cuenta de Google Drive primero');
            return;
        }
        const folderId = await driveSync.getOrCreateFolder(DRIVE_BACKUP_PATH);
        await driveSync.saveChunks(state.playlists, state.categories, state.settings.vaultKey, folderId);
        if (isManual) alert('Respaldo completado');
    } catch (error) {
        console.error('[Sync] Error:', error);
        if (isManual) alert('Error al respaldar: ' + error.message);
    }
}

function renderCurrentView() {
    const root = document.getElementById('root');
    if (!root) return;

    let html = '';
    switch (state.currentView) {
        case 'home': html = renderHome(); break;
        case 'category': html = renderCategoryView(state.currentCategory); break;
        case 'player': html = renderPlayer(state.currentPlaylist); break;
        case 'settings': html = renderSettings(); break;
        default: html = renderHome();
    }
    root.innerHTML = html;

    setTimeout(() => {
        if (window.lucide) window.lucide.createIcons();
        if (state.currentView === 'player') setupYouTubePlayer();
    }, 0);
}

function setupGlobalEvents() {
    document.addEventListener('click', handleGlobalClick);
}

function handleGlobalClick(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;

    // Navigation
    if (action === 'back-to-home') {
        state.currentView = 'home';
        state.currentCategory = null;
        state.currentPlaylist = null;
        renderCurrentView();
        return;
    }

    if (action === 'back-to-category') {
        state.currentView = 'category';
        state.currentPlaylist = null;
        renderCurrentView();
        return;
    }

    if (action === 'open-settings') {
        state.currentView = 'settings';
        renderCurrentView();
        return;
    }

    if (action === 'open-category') {
        state.currentCategory = target.dataset.categoryId;
        state.currentView = 'category';
        renderCurrentView();
        return;
    }

    if (action === 'open-playlist') {
        state.currentPlaylist = target.dataset.playlistId;
        state.currentView = 'player';
        state.player = { currentIndex: 0, isRandom: false, playedIndices: [] };
        renderCurrentView();
        return;
    }

    // Modals
    if (action === 'close-modal') {
        closeModal();
        return;
    }

    // Category CRUD
    if (action === 'add-category') {
        showModal(renderCategoryModal());
        return;
    }

    if (action === 'edit-category') {
        const cat = getCategoryById(target.dataset.categoryId);
        showModal(renderCategoryModal(cat));
        return;
    }

    if (action === 'save-category') {
        saveCategoryFromModal(target.dataset.categoryId);
        return;
    }

    if (action === 'delete-category') {
        if (confirm('¿Eliminar esta sección?')) {
            deleteCategory(target.dataset.categoryId);
            closeModal();
            state.currentView = 'home';
            renderCurrentView();
        }
        return;
    }

    if (action === 'select-theme') {
        document.querySelectorAll('[data-action="select-theme"]').forEach(el => {
            el.style.border = '2px solid transparent';
        });
        target.style.border = '2px solid var(--accent)';
        target.dataset.selected = 'true';
        return;
    }

    if (action === 'select-icon') {
        document.querySelectorAll('.btn-icon[data-action="select-icon"]').forEach(el => {
            el.style.background = 'var(--bg-primary)';
        });
        target.style.background = 'var(--accent)';
        target.dataset.selected = 'true';
        return;
    }

    // Playlist CRUD
    if (action === 'add-playlist') {
        showModal(renderPlaylistModal(target.dataset.categoryId));
        return;
    }

    if (action === 'edit-playlist') {
        const pl = getPlaylistById(target.dataset.playlistId);
        showModal(renderPlaylistModal(pl.categoryId, pl));
        return;
    }

    if (action === 'save-playlist') {
        savePlaylistFromModal(target.dataset.categoryId, target.dataset.playlistId);
        return;
    }

    if (action === 'delete-playlist') {
        if (confirm('¿Eliminar esta colección?')) {
            deletePlaylist(target.dataset.playlistId);
            closeModal();
            state.currentView = 'category';
            renderCurrentView();
        }
        return;
    }

    if (action === 'select-playlist-icon') {
        document.querySelectorAll('[data-action="select-playlist-icon"]').forEach(el => {
            el.style.background = 'var(--bg-primary)';
        });
        target.style.background = 'var(--accent)';
        target.dataset.selected = 'true';
        return;
    }

    // Item CRUD
    if (action === 'add-item') {
        showModal(renderAddItemModal(target.dataset.playlistId));
        return;
    }

    if (action === 'edit-item') {
        const pl = getPlaylistById(target.dataset.playlistId);
        const item = pl.items.find(i => i.id === target.dataset.itemId);
        showModal(renderEditItemModal(item));
        return;
    }

    if (action === 'save-item') {
        savePlaylistItemFromModal(target.dataset.playlistId);
        return;
    }

    if (action === 'update-item') {
        updatePlaylistItemFromModal(target.dataset.playlistId, target.dataset.itemId);
        return;
    }

    if (action === 'delete-item') {
        if (confirm('¿Eliminar este elemento?')) {
            deletePlaylistItem(target.dataset.playlistId, target.dataset.itemId);
            renderCurrentView();
        }
        return;
    }

    // Player actions
    if (action === 'play-item') {
        state.player.currentIndex = parseInt(target.dataset.index);
        renderCurrentView();
        return;
    }

    if (action === 'next-item') {
        playNextItem();
        return;
    }

    if (action === 'previous-item') {
        if (state.player.currentIndex > 0) {
            state.player.currentIndex--;
            renderCurrentView();
        }
        return;
    }

    if (action === 'toggle-random') {
        state.player.isRandom = !state.player.isRandom;
        if (state.player.isRandom) {
            state.player.playedIndices = [state.player.currentIndex];
        } else {
            state.player.playedIndices = [];
        }
        renderCurrentView();
        return;
    }

    // Settings
    if (action === 'toggle-sync') {
        state.settings.autoSync = target.checked;
        saveSettings();
        return;
    }

    if (action === 'save-vault-key') {
        state.settings.vaultKey = document.getElementById('vault-key')?.value;
        saveSettings();
        alert('Clave guardada');
        return;
    }

    if (action === 'auth-drive') {
        handleDriveAuth();
        return;
    }

    if (action === 'manual-backup') {
        syncWithDrive(true);
        return;
    }
}

// Modal helpers
function showModal(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div.firstElementChild);
    setTimeout(() => {
        if (window.lucide) window.lucide.createIcons();
    }, 0);
}

function closeModal() {
    document.querySelectorAll('.modal-overlay').forEach(el => el.remove());
}

// Data helpers
function saveCategoryFromModal(id) {
    const name = document.getElementById('category-name').value.trim();
    if (!name) {
        alert('El nombre es requerido');
        return;
    }

    const themeEl = document.querySelector('[data-action="select-theme"][data-selected="true"]');
    const theme = themeEl?.dataset.theme || 'default';

    const iconEl = document.querySelector('[data-action="select-icon"][data-selected="true"]');
    const icon = iconEl?.dataset.icon || 'folder';

    if (id) {
        updateCategory(id, { name, theme, icon });
    } else {
        addCategory(name, icon, theme);
    }

    closeModal();
    renderCurrentView();
}

function savePlaylistFromModal(catId, plId) {
    const name = document.getElementById('playlist-name').value.trim();
    if (!name) {
        alert('El nombre es requerido');
        return;
    }

    const iconEl = document.querySelector('[data-action="select-playlist-icon"][data-selected="true"]');
    const icon = iconEl?.dataset.icon || 'play-circle';

    if (plId) {
        updatePlaylist(plId, { name, icon });
    } else {
        addPlaylist(catId, name, icon);
    }

    closeModal();
    renderCurrentView();
}

function savePlaylistItemFromModal(plId) {
    const url = document.getElementById('item-url').value.trim();
    if (!url) {
        alert('La URL es requerida');
        return;
    }

    const title = document.getElementById('item-title').value.trim() || url;
    addPlaylistItem(plId, url, title);
    closeModal();
    renderCurrentView();
}

function updatePlaylistItemFromModal(plId, itemId) {
    const title = document.getElementById('edit-item-title').value.trim();
    if (!title) {
        alert('El título es requerido');
        return;
    }

    updatePlaylistItem(plId, itemId, { title });
    closeModal();
    renderCurrentView();
}

function playNextItem() {
    const pl = getPlaylistById(state.currentPlaylist);
    if (!pl || !pl.items.length) return;

    if (state.player.isRandom) {
        const unplayed = pl.items
            .map((_, i) => i)
            .filter(i => !state.player.playedIndices.includes(i));

        if (unplayed.length === 0) {
            state.player.playedIndices = [];
            state.player.currentIndex = Math.floor(Math.random() * pl.items.length);
        } else {
            state.player.currentIndex = unplayed[Math.floor(Math.random() * unplayed.length)];
        }
        state.player.playedIndices.push(state.player.currentIndex);
    } else {
        if (state.player.currentIndex < pl.items.length - 1) {
            state.player.currentIndex++;
        }
    }

    renderCurrentView();
}

function setupYouTubePlayer() {
    const iframe = document.getElementById('video-player');
    if (!iframe || window.YT) return;

    if (!document.getElementById('yt-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
        ytPlayer = new YT.Player('video-player', {
            events: {
                'onStateChange': (e) => {
                    if (e.data === YT.PlayerState.ENDED) playNextItem();
                },
                'onError': () => playNextItem()
            }
        });
    };
}

function handleDriveAuth() {
    if (!DRIVE_CLIENT_ID) {
        alert('Configura DRIVE_CLIENT_ID en main.js');
        return;
    }

    gapi.load('client', async () => {
        await gapi.client.init({
            apiKey: DRIVE_API_KEY,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        });

        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: DRIVE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/drive.file',
            callback: (resp) => {
                if (!resp.error) alert('Conectado a Google Drive');
            }
        });

        tokenClient.requestAccessToken({ prompt: 'consent' });
    });
}

function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => { });
    }
}

initApp();
