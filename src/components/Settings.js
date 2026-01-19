import { state } from '../state.js';

export function renderSettings() {
    return `
        <div class="container">
            <div class="header">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <button class="btn-icon" data-action="back-to-home" title="Volver al inicio">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <div>
                        <h1>Configuración</h1>
                        <p>Respaldo y ajustes de la aplicación</p>
                    </div>
                </div>
            </div>
            
            <div style="max-width: 700px;">
                <div class="card" style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem;">
                        <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent-hover)); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i data-lucide="cloud" class="w-6 h-6" style="color: white;"></i>
                        </div>
                        <div style="flex: 1;">
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.375rem;">Respaldo en Google Drive</h3>
                            <p style="font-size: 0.9375rem; color: var(--text-muted);">Mantén tus datos seguros y sincronizados en la nube</p>
                        </div>
                    </div>
                    
                    <div style="background: var(--bg-primary); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                            <div>
                                <div style="font-weight: 600; font-size: 0.9375rem; margin-bottom: 0.25rem;">Sincronización automática</div>
                                <div style="font-size: 0.8125rem; color: var(--text-muted);">Respaldar cambios automáticamente en Drive</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" data-action="toggle-sync" ${state.settings.autoSync ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <label>Clave de encriptación</label>
                    <input type="password" id="vault-key" placeholder="Tu clave secreta para encriptar datos" value="${state.settings.vaultKey || ''}">
                    <div style="display: flex; align-items: flex-start; gap: 0.5rem; margin-top: -0.5rem; margin-bottom: 1rem;">
                        <i data-lucide="shield-check" class="w-4 h-4" style="color: var(--success); margin-top: 0.125rem; flex-shrink: 0;"></i>
                        <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5;">
                            Esta clave encripta tus datos antes de subirlos. Guárdala en un lugar seguro - sin ella no podrás recuperar tus respaldos.
                        </p>
                    </div>
                    
                    <button class="btn-secondary" data-action="save-vault-key" style="width: 100%; margin-bottom: 1.5rem;">
                        <i data-lucide="key" class="w-4 h-4"></i>
                        Guardar clave de encriptación
                    </button>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                        <button class="btn-primary" data-action="auth-drive">
                            <i data-lucide="link" class="w-4 h-4"></i>
                            Conectar Drive
                        </button>
                        <button class="btn-secondary" data-action="manual-backup">
                            <i data-lucide="upload-cloud" class="w-4 h-4"></i>
                            Respaldar ahora
                        </button>
                    </div>
                </div>
                
                <div class="card">
                    <div style="display: flex; align-items: flex-start; gap: 1rem;">
                        <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i data-lucide="info" class="w-6 h-6" style="color: var(--text-secondary);"></i>
                        </div>
                        <div style="flex: 1;">
                            <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem;">Acerca de</h3>
                            <p style="font-size: 0.9375rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                                Links Library es tu organizador personal de contenido multimedia. Gestiona videos, documentos y enlaces en un solo lugar.
                            </p>
                            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--text-muted);">
                                <i data-lucide="code-2" class="w-3 h-3"></i>
                                <span>Versión ${state.version || '1.0.0'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 52px;
                height: 28px;
            }
            
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
                margin: 0;
            }
            
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--bg-tertiary);
                transition: 0.3s;
                border-radius: 28px;
                border: 1.5px solid var(--border);
            }
            
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 20px;
                width: 20px;
                left: 3px;
                bottom: 2.5px;
                background-color: var(--text-secondary);
                transition: 0.3s;
                border-radius: 50%;
            }
            
            input:checked + .toggle-slider {
                background: linear-gradient(135deg, var(--accent), var(--accent-hover));
                border-color: var(--accent);
            }
            
            input:checked + .toggle-slider:before {
                transform: translateX(24px);
                background-color: white;
            }
            
            .toggle-switch:hover .toggle-slider {
                border-color: var(--accent);
            }
        </style>
    `;
}
