export const APP_VERSION = 'v1.0.0';
export const APP_NAME = 'links-library';
export const STORAGE_PREFIX = APP_NAME + '/';
export const DRIVE_BACKUP_PATH = '/backup/links-library/';

export const KEYS = {
    CATEGORIES: STORAGE_PREFIX + 'categories',
    PLAYLISTS: STORAGE_PREFIX + 'playlists',
    SETTINGS: STORAGE_PREFIX + 'settings',
    LANG: STORAGE_PREFIX + 'lang',
    LAST_VERSION: STORAGE_PREFIX + 'last_version',
    PWA_DISMISSED: STORAGE_PREFIX + 'pwa_dismissed',
    DRIVE_TOKEN: STORAGE_PREFIX + 'drive_token',
    SYNCED_REV: STORAGE_PREFIX + 'synced_rev',
    THEME: STORAGE_PREFIX + 'theme'
};

export const CATEGORY_THEMES = [
    { id: 'default', color: '#6366f1', gradient: 'from-indigo-500 to-purple-600' },
    { id: 'music', color: '#ec4899', gradient: 'from-pink-500 to-rose-600' },
    { id: 'video', color: '#f43f5e', gradient: 'from-red-500 to-pink-600' },
    { id: 'study', color: '#10b981', gradient: 'from-emerald-500 to-teal-600' },
    { id: 'books', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600' },
    { id: 'movies', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600' },
    { id: 'tech', color: '#06b6d4', gradient: 'from-cyan-500 to-blue-600' },
    { id: 'gaming', color: '#a855f7', gradient: 'from-purple-500 to-fuchsia-600' },
    { id: 'fitness', color: '#14b8a6', gradient: 'from-teal-500 to-cyan-600' },
    { id: 'cooking', color: '#f97316', gradient: 'from-orange-500 to-red-600' }
];

export const CATEGORY_ICONS = [
    "music", "headphones", "mic", "radio", "disc",
    "video", "film", "tv", "monitor", "youtube",
    "book", "book-open", "library", "bookmark",
    "graduation-cap", "pen-tool", "edit-3", "file-text",
    "play-circle", "play", "pause", "skip-forward", "skip-back",
    "folder", "folder-open", "archive", "package",
    "star", "heart", "award", "trophy",
    "coffee", "pizza", "utensils", "chef-hat",
    "dumbbell", "activity", "zap", "target",
    "gamepad-2", "gamepad", "joystick",
    "camera", "image", "aperture",
    "code", "terminal", "cpu", "hard-drive",
    "globe", "map", "compass", "navigation",
    "shopping-bag", "shopping-cart", "gift",
    "briefcase", "tool", "settings", "sliders"
];

export const LINK_TYPES = {
    VIDEO: 'video',
    LINK: 'link',
    PDF: 'pdf',
    AUDIO: 'audio'
};
