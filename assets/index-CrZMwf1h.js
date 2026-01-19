(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const U="v1.0.1",q="links-library",b=q+"/",B="/backup/links-library/",C={CATEGORIES:b+"categories",PLAYLISTS:b+"playlists",SETTINGS:b+"settings",LANG:b+"lang",LAST_VERSION:b+"last_version",PWA_DISMISSED:b+"pwa_dismissed",DRIVE_TOKEN:b+"drive_token",SYNCED_REV:b+"synced_rev",THEME:b+"theme"},k=[{id:"default",color:"#6366f1",gradient:"from-indigo-500 to-purple-600"},{id:"music",color:"#ec4899",gradient:"from-pink-500 to-rose-600"},{id:"video",color:"#f43f5e",gradient:"from-red-500 to-pink-600"},{id:"study",color:"#10b981",gradient:"from-emerald-500 to-teal-600"},{id:"books",color:"#f59e0b",gradient:"from-amber-500 to-orange-600"},{id:"movies",color:"#8b5cf6",gradient:"from-violet-500 to-purple-600"},{id:"tech",color:"#06b6d4",gradient:"from-cyan-500 to-blue-600"},{id:"gaming",color:"#a855f7",gradient:"from-purple-500 to-fuchsia-600"},{id:"fitness",color:"#14b8a6",gradient:"from-teal-500 to-cyan-600"},{id:"cooking",color:"#f97316",gradient:"from-orange-500 to-red-600"}],T={VIDEO:"video",LINK:"link",PDF:"pdf"},n={categories:[],playlists:[],settings:{theme:"dark",lang:"es",autoSync:!1,vaultKey:""},currentView:"home",currentCategory:null,currentPlaylist:null},_=()=>{window.dispatchEvent(new CustomEvent("app-state-changed"))};function Y(){try{const t=localStorage.getItem(C.CATEGORIES);t?n.categories=JSON.parse(t):(n.categories=[{id:x(),name:"Música",icon:"music",theme:"music",order:0},{id:x(),name:"Estudio",icon:"graduation-cap",theme:"study",order:1},{id:x(),name:"Libros",icon:"book",theme:"books",order:2},{id:x(),name:"Películas",icon:"film",theme:"movies",order:3}],R());const e=localStorage.getItem(C.PLAYLISTS);e&&(n.playlists=JSON.parse(e));const a=localStorage.getItem(C.SETTINGS);a&&(n.settings={...n.settings,...JSON.parse(a)})}catch(t){console.error("Error loading state:",t)}}function R(){try{localStorage.setItem(C.CATEGORIES,JSON.stringify(n.categories)),_()}catch(t){console.error("Error saving categories:",t)}}function I(){try{localStorage.setItem(C.PLAYLISTS,JSON.stringify(n.playlists)),_()}catch(t){console.error("Error saving playlists:",t)}}function z(){try{localStorage.setItem(C.SETTINGS,JSON.stringify(n.settings)),_()}catch(t){console.error("Error saving settings:",t)}}function J(t,e,a){const i={id:x(),name:t,icon:e,theme:a,order:n.categories.length,createdAt:Date.now()};return n.categories.push(i),R(),i}function W(t,e){const a=n.categories.findIndex(i=>i.id===t);return a!==-1?(n.categories[a]={...n.categories[a],...e},R(),n.categories[a]):null}function X(t){n.categories=n.categories.filter(e=>e.id!==t),n.playlists=n.playlists.filter(e=>e.categoryId!==t),R(),I()}function Q(t,e,a){const i={id:x(),categoryId:t,name:e,icon:a,items:[],order:n.playlists.filter(r=>r.categoryId===t).length,createdAt:Date.now()};return n.playlists.push(i),I(),i}function Z(t,e){const a=n.playlists.findIndex(i=>i.id===t);return a!==-1?(n.playlists[a]={...n.playlists[a],...e},I(),n.playlists[a]):null}function ee(t){n.playlists=n.playlists.filter(e=>e.id!==t),I()}function te(t,e,a,i="link"){const r=n.playlists.find(o=>o.id===t);if(r){const o={id:x(),url:e,title:a,type:i,order:r.items.length,addedAt:Date.now()};return r.items.push(o),I(),o}return null}function ae(t,e,a){const i=n.playlists.find(r=>r.id===t);if(i){const r=i.items.findIndex(o=>o.id===e);if(r!==-1)return i.items[r]={...i.items[r],...a},I(),i.items[r]}return null}function ie(t,e){const a=n.playlists.find(i=>i.id===t);a&&(a.items=a.items.filter(i=>i.id!==e),I())}function F(t){return n.categories.find(e=>e.id===t)}function N(t){return n.playlists.find(e=>e.id===t)}function re(t){return n.playlists.filter(e=>e.categoryId===t).sort((e,a)=>e.order-a.order)}function x(){return Date.now().toString(36)+Math.random().toString(36).substr(2,9)}function M(){const t=[...n.categories].sort((i,r)=>i.order-r.order),e=n.searchTerm||"",a=e?t.filter(i=>i.name.toLowerCase().includes(e.toLowerCase())):t;return`
        <div class="container">
            <div class="header">
                <div style="flex: 1;">
                    <h1>Links Library</h1>
                    <p>${t.length} ${t.length===1?"sección":"secciones"} • ${n.playlists.length} ${n.playlists.length===1?"colección":"colecciones"}</p>
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
                        value="${e}"
                        style="padding-left: 3rem; margin-bottom: 0;"
                        oninput="window.handleSearch(this.value)"
                    >
                </div>
            </div>
            
            ${a.length===0?`
                <div class="empty-state card">
                    <i data-lucide="search-x" class="w-16 h-16"></i>
                    <h3>No se encontraron secciones</h3>
                    <p>Intenta con otro término de búsqueda</p>
                </div>
            `:`
                <div class="card-grid">
                    ${a.map(i=>ne(i)).join("")}
                
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
    `}function ne(t){const e=k.find(a=>a.id===t.theme)||k[0];return`
        <div class="card" data-category-id="${t.id}" data-action="open-category" style="cursor: pointer;">
            <div style="display: flex; flex-direction: column; gap: 1.25rem; min-height: 180px;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                    <div style="width: 72px; height: 72px; border-radius: 16px; background: linear-gradient(135deg, ${e.gradient}); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);">
                        <i data-lucide="${t.icon}" class="w-8 h-8" style="color: white;"></i>
                    </div>
                    <button 
                        class="btn-icon" 
                        style="width: 36px; height: 36px;"
                        data-action="edit-category"
                        data-category-id="${t.id}"
                        onclick="event.stopPropagation()"
                        title="Editar sección"
                    >
                        <i data-lucide="more-vertical" class="w-4 h-4"></i>
                    </button>
                </div>
                <div style="flex: 1;">
                    <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.375rem; letter-spacing: -0.015em;">${t.name}</h3>
                    <p style="font-size: 0.8125rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">${t.theme||"General"}</p>
                </div>
            </div>
        </div>
    `}function O(t=null){const e=!!t,a=["music","headphones","video","film","youtube","book","book-open","graduation-cap","star","heart","code","globe","briefcase","coffee","gamepad-2","camera"];return`
        <div class="modal-overlay" data-modal="category">
            <div class="modal">
                <h2>${e?"Editar":"Nueva"} Sección</h2>
                
                <label>Nombre de la sección</label>
                <input type="text" id="category-name" placeholder="Ej: Música, Películas, Cursos..." value="${(t==null?void 0:t.name)||""}" autofocus>
                
                <label>Tema de color</label>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.625rem; margin-bottom: 1.5rem;">
                    ${k.map(i=>`
                        <button 
                            style="width: 100%; aspect-ratio: 1; border-radius: 12px; background: linear-gradient(135deg, ${i.gradient}); border: 2px solid ${(t==null?void 0:t.theme)===i.id?"var(--accent)":"transparent"}; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"
                            data-theme="${i.id}"
                            data-action="select-theme"
                            title="${i.id}"
                        ></button>
                    `).join("")}
                </div>
                
                <label>Icono representativo</label>
                <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 0.5rem; margin-bottom: 1.5rem; max-height: 200px; overflow-y: auto; padding: 0.5rem; background: var(--bg-primary); border-radius: 12px;">
                    ${a.map(i=>`
                        <button 
                            class="btn-icon"
                            style="width: 100%; aspect-ratio: 1; background: ${(t==null?void 0:t.icon)===i?"var(--accent)":"var(--bg-secondary)"}; color: ${(t==null?void 0:t.icon)===i?"white":"var(--text-secondary)"};"
                            data-icon="${i}"
                            data-action="select-icon"
                            title="${i}"
                        >
                            <i data-lucide="${i}" class="w-4 h-4"></i>
                        </button>
                    `).join("")}
                </div>
                
                <div style="display: flex; gap: 0.75rem; margin-top: 2rem;">
                    ${e?`
                        <button class="btn-secondary" style="background: var(--danger); color: white; border-color: var(--danger);" data-action="delete-category" data-category-id="${t.id}">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                            Eliminar
                        </button>
                    `:""}
                    <button class="btn-secondary" data-action="close-modal" style="flex: 1;">Cancelar</button>
                    <button class="btn-primary" data-action="save-category" data-category-id="${(t==null?void 0:t.id)||""}" style="flex: 2;">
                        <i data-lucide="${e?"check":"plus"}" class="w-4 h-4"></i>
                        ${e?"Guardar cambios":"Crear sección"}
                    </button>
                </div>
            </div>
        </div>
    `}function oe(t){const e=n.categories.find(r=>r.id===t);if(!e)return'<div class="container"><p>Sección no encontrada</p></div>';const a=re(t),i=k.find(r=>r.id===e.theme)||k[0];return`
        <div class="container">
            <div class="header">
                <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                    <button class="btn-icon" data-action="back-to-home" title="Volver al inicio">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <div style="flex: 1;">
                        <h1>${e.name}</h1>
                        <p>${a.length} ${a.length===1?"colección":"colecciones"}</p>
                    </div>
                </div>
                <button class="btn-primary" data-action="add-playlist" data-category-id="${t}">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                    Nueva Colección
                </button>
            </div>
            
            ${a.length===0?`
                <div class="empty-state card">
                    <i data-lucide="folder-open" class="w-16 h-16"></i>
                    <h3>No hay colecciones aún</h3>
                    <p>Crea tu primera colección para organizar tu contenido</p>
                    <button class="btn-primary" data-action="add-playlist" data-category-id="${t}">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        Crear primera colección
                    </button>
                </div>
            `:`
                <div class="card-grid">
                    ${a.map(r=>se(r,i)).join("")}
                </div>
            `}
        </div>
    `}function se(t,e){var i;const a=((i=t.items)==null?void 0:i.length)||0;return`
        <div class="card" data-playlist-id="${t.id}" data-action="open-playlist" style="cursor: pointer;">
            <div style="display: flex; flex-direction: column; gap: 1.25rem; min-height: 180px;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                    <div style="width: 64px; height: 64px; border-radius: 14px; background: linear-gradient(135deg, ${e.gradient}); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);">
                        <i data-lucide="${t.icon}" class="w-7 h-7" style="color: white;"></i>
                    </div>
                    <button 
                        class="btn-icon"
                        style="width: 36px; height: 36px;"
                        data-action="edit-playlist"
                        data-playlist-id="${t.id}"
                        onclick="event.stopPropagation()"
                        title="Editar colección"
                    >
                        <i data-lucide="more-vertical" class="w-4 h-4"></i>
                    </button>
                </div>
                <div style="flex: 1;">
                    <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.375rem; letter-spacing: -0.015em;">${t.name}</h3>
                    <p style="font-size: 0.8125rem; color: var(--text-muted); font-weight: 500;">
                        <i data-lucide="list" class="w-3 h-3" style="display: inline-block; vertical-align: middle; margin-right: 0.25rem;"></i>
                        ${a} ${a===1?"elemento":"elementos"}
                    </p>
                </div>
            </div>
        </div>
    `}function j(t,e=null){const a=!!e,i=["play-circle","play","music","music-2","video","film","layers","list","star","zap","compass","book-open","heart","headphones"];return`
        <div class="modal-overlay" data-modal="playlist">
            <div class="modal">
                <h2>${a?"Editar":"Nueva"} Colección</h2>
                
                <label>Nombre de la colección</label>
                <input type="text" id="playlist-name" placeholder="Ej: Favoritos 2024, Por ver..." value="${(e==null?void 0:e.name)||""}" autofocus>
                
                <label>Icono</label>
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; margin-bottom: 1.5rem; padding: 0.5rem; background: var(--bg-primary); border-radius: 12px;">
                    ${i.map(r=>`
                        <button 
                            class="btn-icon"
                            style="width: 100%; aspect-ratio: 1; background: ${(e==null?void 0:e.icon)===r?"var(--accent)":"var(--bg-secondary)"}; color: ${(e==null?void 0:e.icon)===r?"white":"var(--text-secondary)"};"
                            data-icon="${r}"
                            data-action="select-playlist-icon"
                            title="${r}"
                        >
                            <i data-lucide="${r}" class="w-4 h-4"></i>
                        </button>
                    `).join("")}
                </div>
                
                <div style="display: flex; gap: 0.75rem; margin-top: 2rem;">
                    ${a?`
                        <button class="btn-secondary" style="background: var(--danger); color: white; border-color: var(--danger);" data-action="delete-playlist" data-playlist-id="${e.id}">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                            Eliminar
                        </button>
                    `:""}
                    <button class="btn-secondary" data-action="close-modal" style="flex: 1;">Cancelar</button>
                    <button class="btn-primary" data-action="save-playlist" data-category-id="${t}" data-playlist-id="${(e==null?void 0:e.id)||""}" style="flex: 2;">
                        <i data-lucide="${a?"check":"plus"}" class="w-4 h-4"></i>
                        ${a?"Guardar cambios":"Crear colección"}
                    </button>
                </div>
            </div>
        </div>
    `}function le(t){const e=N(t);if(!e)return'<div class="container"><p>Playlist no encontrada</p></div>';const a=F(e.categoryId);k.find(o=>o.id===(a==null?void 0:a.theme))||k[0],n.player||(n.player={currentIndex:0,isRandom:!1,playedIndices:[]});const i=e.items||[],r=i[n.player.currentIndex];return`
        <div class="container">
            <div class="header">
                <div style="display: flex; align-items: center; gap: 1rem; flex: 1; min-width: 0;">
                    <button class="btn-icon" data-action="back-to-category" data-category-id="${e.categoryId}" title="Volver a ${(a==null?void 0:a.name)||"categoría"}">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <div style="flex: 1; min-width: 0;">
                        <h1 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${e.name}</h1>
                        <p>${(a==null?void 0:a.name)||""} • ${i.length} ${i.length===1?"elemento":"elementos"}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <button class="btn-icon ${n.player.isRandom?"active":""}" data-action="toggle-random" title="${n.player.isRandom?"Desactivar":"Activar"} modo aleatorio">
                        <i data-lucide="shuffle" class="w-4 h-4"></i>
                    </button>
                    <button class="btn-primary" data-action="add-item" data-playlist-id="${t}">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        <span style="display: none; @media (min-width: 640px) { display: inline; }">Añadir</span>
                    </button>
                </div>
            </div>
            
            ${i.length===0?ue(t):`
                <div class="player-container">
                    <div>
                        ${de(r)}
                        
                        <div style="margin-top: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem;">
                            <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.015em;">${(r==null?void 0:r.title)||"Sin título"}</h2>
                            <p style="color: var(--text-muted); font-size: 0.9375rem; margin-bottom: 1.5rem;">
                                <i data-lucide="list-music" class="w-4 h-4" style="display: inline-block; vertical-align: middle; margin-right: 0.25rem;"></i>
                                Elemento ${n.player.currentIndex+1} de ${i.length}
                            </p>
                            
                            <div style="display: flex; gap: 0.75rem;">
                                <button class="btn-secondary" data-action="previous-item" ${n.player.currentIndex===0?'disabled style="opacity: 0.5; cursor: not-allowed;"':""}>
                                    <i data-lucide="skip-back" class="w-4 h-4"></i>
                                    Anterior
                                </button>
                                <button class="btn-secondary" data-action="next-item" ${n.player.currentIndex>=i.length-1?'disabled style="opacity: 0.5; cursor: not-allowed;"':""}>
                                    Siguiente
                                    <i data-lucide="skip-forward" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="playlist">
                        <h3>Lista de reproducción</h3>
                        ${i.map((o,l)=>ce(o,l,n.player.currentIndex,t)).join("")}
                    </div>
                </div>
            `}
        </div>
    `}function de(t){if(!t)return"";const e=pe(t);return e===T.VIDEO?`
            <div class="video-wrapper">
                <iframe id="video-player" src="${me(t.url)}&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        `:e===T.PDF?`
            <div class="card" style="padding: 4rem 3rem; text-align: center;">
                <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem; border-radius: 16px; background: linear-gradient(135deg, var(--accent), var(--accent-hover)); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);">
                    <i data-lucide="file-text" class="w-10 h-10" style="color: white;"></i>
                </div>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem;">${t.title}</h3>
                <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9375rem;">Documento PDF</p>
                <a href="${t.url}" target="_blank" class="btn-primary">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                    Abrir documento
                </a>
            </div>
        `:`
        <div class="card" style="padding: 4rem 3rem; text-align: center;">
            <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem; border-radius: 16px; background: linear-gradient(135deg, var(--accent), var(--accent-hover)); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);">
                <i data-lucide="link-2" class="w-10 h-10" style="color: white;"></i>
            </div>
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem;">${t.title}</h3>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9375rem; word-break: break-all;">${t.url}</p>
            <a href="${t.url}" target="_blank" class="btn-primary">
                <i data-lucide="external-link" class="w-4 h-4"></i>
                Abrir enlace
            </a>
        </div>
    `}function ce(t,e,a,i){const r=e===a;return`
        <div class="playlist-item ${r?"active":""}" data-action="play-item" data-index="${e}">
            <div class="playlist-item-index">${e+1}</div>
            <div class="playlist-item-content">
                <div class="playlist-item-title">${t.title||"Sin título"}</div>
                <div class="playlist-item-url">${t.url}</div>
            </div>
            <div class="playlist-item-actions">
                <button class="btn-icon" style="width: 32px; height: 32px; ${r?"background: rgba(255, 255, 255, 0.2); border-color: transparent;":""}" data-action="edit-item" data-playlist-id="${i}" data-item-id="${t.id}" data-index="${e}" onclick="event.stopPropagation()" title="Editar">
                    <i data-lucide="edit-3" class="w-3 h-3" style="${r?"color: white;":""}"></i>
                </button>
                <button class="btn-icon" style="width: 32px; height: 32px; ${r?"background: rgba(255, 255, 255, 0.2); border-color: transparent;":""}" data-action="delete-item" data-playlist-id="${i}" data-item-id="${t.id}" onclick="event.stopPropagation()" title="Eliminar">
                    <i data-lucide="trash-2" class="w-3 h-3" style="${r?"color: white;":""}"></i>
                </button>
            </div>
        </div>
    `}function ue(t){return`
        <div class="empty-state card">
            <i data-lucide="inbox" class="w-16 h-16"></i>
            <h3>Lista vacía</h3>
            <p>Añade tu primer elemento para comenzar a disfrutar de tu contenido</p>
            <button class="btn-primary" data-action="add-item" data-playlist-id="${t}">
                <i data-lucide="plus" class="w-4 h-4"></i>
                Añadir primer elemento
            </button>
        </div>
    `}function pe(t){const e=(t.url||"").toLowerCase();return e.includes("youtube.com")||e.includes("youtu.be")?T.VIDEO:e.endsWith(".pdf")?T.PDF:T.LINK}function me(t){return t.includes("youtube.com/watch")?`https://www.youtube.com/embed/${new URL(t).searchParams.get("v")}?autoplay=1`:t.includes("youtu.be/")?`https://www.youtube.com/embed/${t.split("youtu.be/")[1].split("?")[0]}?autoplay=1`:t.includes("youtube.com/shorts/")?`https://www.youtube.com/embed/${t.split("shorts/")[1].split("?")[0]}?autoplay=1`:t}function ye(t){return`
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
                    <button class="btn-primary" data-action="save-item" data-playlist-id="${t}" style="flex: 2;">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        Añadir elemento
                    </button>
                </div>
            </div>
        </div>
    `}function ge(t){return`
        <div class="modal-overlay" data-modal="edit-item">
            <div class="modal">
                <h2>Editar Elemento</h2>
                
                <label>Título</label>
                <input type="text" id="edit-item-title" value="${t.title||""}" placeholder="Nombre descriptivo" autofocus>
                
                <label>URL (solo lectura)</label>
                <input type="url" value="${t.url}" disabled style="opacity: 0.6; cursor: not-allowed;">
                
                <div style="display: flex; gap: 0.75rem; margin-top: 2rem;">
                    <button class="btn-secondary" data-action="close-modal" style="flex: 1;">Cancelar</button>
                    <button class="btn-primary" data-action="update-item" data-playlist-id="${(n==null?void 0:n.currentPlaylist)||""}" data-item-id="${t.id}" style="flex: 2;">
                        <i data-lucide="check" class="w-4 h-4"></i>
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    `}function fe(){return`
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
                                <input type="checkbox" data-action="toggle-sync" ${n.settings.autoSync?"checked":""}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <label>Clave de encriptación</label>
                    <input type="password" id="vault-key" placeholder="Tu clave secreta para encriptar datos" value="${n.settings.vaultKey||""}">
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
                                <span>Versión ${n.version||"1.0.0"}</span>
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
    `}class S{static async hash(e,a="salt_cloud_notes_2026"){const r=new TextEncoder().encode(e+a),o=await crypto.subtle.digest("SHA-512",r);return Array.from(new Uint8Array(o)).map(m=>m.toString(16).padStart(2,"0")).join("")}static async deriveVaultKey(e){return await this.hash(e,"vault_v3_internal_key")}static async compress(e){const i=new Blob([e]).stream().pipeThrough(new CompressionStream("gzip"));return await new Response(i).arrayBuffer()}static async decompress(e){const i=new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip"));return await new Response(i).text()}static async deriveKey(e,a){const i=new TextEncoder,r=await crypto.subtle.importKey("raw",i.encode(e),{name:"PBKDF2"},!1,["deriveKey"]);return await crypto.subtle.deriveKey({name:"PBKDF2",salt:i.encode(a),iterations:25e4,hash:"SHA-512"},r,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}static async encrypt(e,a,i={algo:"aes-256-gcm"}){try{const r=crypto.getRandomValues(new Uint8Array(16)),o=crypto.getRandomValues(new Uint8Array(12)),l=await this.deriveKey(a,this.bufToBase64(r)),m=typeof e=="string"?e:JSON.stringify(e),c=await this.compress(m),d=await crypto.subtle.encrypt({name:"AES-GCM",iv:o},l,c);return{payload:this.bufToBase64(new Uint8Array(d)),iv:this.bufToBase64(o),salt:this.bufToBase64(r),algo:i.algo||"aes-256-gcm",compressed:!0,v:"4.0"}}catch(r){throw console.error("[Security] Encryption failed:",r),new Error("No se pudo encriptar la información")}}static async decrypt(e,a){try{if(!e||!e.payload||!e.iv||!e.salt)throw new Error("Formato de datos encriptados inválido");const{payload:i,iv:r,salt:o,compressed:l}=e,m=await this.deriveKey(a,o),c=await crypto.subtle.decrypt({name:"AES-GCM",iv:this.base64ToBuf(r)},m,this.base64ToBuf(i)),d=l?await this.decompress(c):new TextDecoder().decode(c);try{return JSON.parse(d)}catch{return d}}catch(i){throw console.error("[Security] Decryption failed:",i),new Error("Contraseña incorrecta o datos corruptos")}}static bufToBase64(e){return btoa(String.fromCharCode(...new Uint8Array(e)))}static base64ToBuf(e){return new Uint8Array(atob(e).split("").map(a=>a.charCodeAt(0)))}}class he{constructor(e="links_",a="/backup/links-library/",i=50){this.basePath=a,this.dbPrefix=e,this.itemsPerChunk=i,this.metaFile=e+"meta_v1.bin",this.groupPrefix=e+"group_v1_"}async getOrCreateFolder(e){const a=e.split("/").filter(r=>r);let i="root";for(const r of a){const o=`name = '${r}' and mimeType = 'application/vnd.google-apps.folder' and '${i}' in parents and trashed = false`,m=(await gapi.client.drive.files.list({q:o,fields:"files(id, name)"})).result.files;if(m.length>0)i=m[0].id;else{const c={name:r,mimeType:"application/vnd.google-apps.folder",parents:[i]};i=(await gapi.client.drive.files.create({resource:c,fields:"id"})).result.id}}return i}async calculateHash(e){const a=JSON.stringify(e),i=new TextEncoder().encode(a),r=await crypto.subtle.digest("SHA-256",i);return Array.from(new Uint8Array(r)).map(l=>l.toString(16).padStart(2,"0")).join("")}async saveChunks(e,a,i,r){console.log(`[Drive] Saving ${e.length} playlists in groups of ${this.itemsPerChunk}`);const o=`'${r}' in parents and trashed = false`,m=(await gapi.client.drive.files.list({q:o,fields:"files(id, name)"})).result.files||[],c=new Map(m.map(s=>[s.name,s.id]));let d=null;const p=c.get(this.metaFile);if(p)try{const s=gapi.auth.getToken().access_token,h=`https://www.googleapis.com/drive/v3/files/${p}?alt=media`,y=await(await fetch(h,{headers:{Authorization:`Bearer ${s}`}})).json();d=await S.decrypt(y,i)}catch{console.log("Failed to load previous meta.")}const f={},g=[];for(let s=0;s<e.length;s+=this.itemsPerChunk)g.push(e.slice(s,s+this.itemsPerChunk));for(let s=0;s<g.length;s++){const h=await this.calculateHash(g[s]);f[s]=h;const v=!d||!d.groupHashes||d.groupHashes[s]!==h,y=`${this.groupPrefix}${s.toString().padStart(5,"0")}.bin`;if(v||!c.has(y)){const A=await S.encrypt(g[s],i);await this.uploadFileWithId(y,JSON.stringify(A),r,c.get(y)),console.log(`[Drive] ${c.has(y)?"Updated":"Created"} ${y}`)}}if(d&&d.groupHashes){const s=Object.keys(d.groupHashes).map(Number);for(const h of s)if(h>=g.length){const v=`${this.groupPrefix}${h.toString().padStart(5,"0")}.bin`,y=c.get(v);y&&(await gapi.client.drive.files.delete({fileId:y}),console.log(`[Drive] Deleted orphaned group: ${v}`))}}const P={categories:a,groupHashes:f},w=await S.encrypt(P,i);return await this.uploadFileWithId(this.metaFile,JSON.stringify(w),r,p),console.log("[Drive] Push complete."),g.length}async loadChunks(e,a){const i=`'${e}' in parents and trashed = false`,o=(await gapi.client.drive.files.list({q:i,fields:"files(id, name)"})).result.files||[],l=new Map(o.map(p=>[p.name,p.id])),m=l.get(this.metaFile);if(m)try{const p=gapi.auth.getToken().access_token,f=`https://www.googleapis.com/drive/v3/files/${m}?alt=media`,P=await(await fetch(f,{headers:{Authorization:`Bearer ${p}`}})).json(),w=await S.decrypt(P,a);console.log(`[Drive] Loading v1 data. Groups: ${Object.keys(w.groupHashes).length}`);const s=[],h=Object.keys(w.groupHashes).sort((v,y)=>v-y);for(const v of h){const y=`${this.groupPrefix}${v.toString().padStart(5,"0")}.bin`,A=l.get(y);if(A){const G=`https://www.googleapis.com/drive/v3/files/${A}?alt=media`,H=await(await fetch(G,{headers:{Authorization:`Bearer ${p}`}})).json(),K=await S.decrypt(H,a);s.push(...K)}}return{playlists:s,categories:w.categories}}catch(p){console.error("[Drive] v1 Load failed",p)}const c="data_part_",d=o.filter(p=>p.name.startsWith(this.dbPrefix+c)).sort((p,f)=>p.name.localeCompare(f.name));if(d.length>0){console.log(`[Drive] Migrating ${d.length} legacy chunks...`);const p=gapi.auth.getToken().access_token;let f="";for(const g of d){const P=`https://www.googleapis.com/drive/v3/files/${g.id}?alt=media`,w=await fetch(P,{headers:{Authorization:`Bearer ${p}`}});f+=await w.text()}try{const g=JSON.parse(f);return await S.decrypt(g,a)}catch(g){console.error("[Drive] Legacy migration failed",g)}}return null}async uploadFileWithId(e,a,i,r=null){const o={name:e,parents:r?[]:[i]},l=new Blob([a],{type:"application/json"}),m=gapi.auth.getToken().access_token;if(r){const c=`https://www.googleapis.com/upload/drive/v3/files/${r}?uploadType=media`;await fetch(c,{method:"PATCH",headers:{Authorization:`Bearer ${m}`},body:l})}else{const c="https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",d=new FormData;d.append("metadata",new Blob([JSON.stringify(o)],{type:"application/json"})),d.append("file",l),await fetch(c,{method:"POST",headers:{Authorization:`Bearer ${m}`},body:d})}}}let D=null;function ve(){console.log("🚀 Links Library",U),Y(),we(),u(),Pe(),be(),window.handleSearch=t=>{n.searchTerm=t,u()},window.lucide&&window.lucide.createIcons()}function be(){window.addEventListener("app-state-changed",async()=>{n.settings.autoSync&&n.settings.vaultKey&&await V()})}async function V(t=!1){var e;if(!n.settings.vaultKey){t&&alert("Configura una clave de encriptación primero");return}try{if(D||(D=new he("links_",B)),!((e=gapi==null?void 0:gapi.auth)==null?void 0:e.getToken())){t&&alert("Conecta tu cuenta de Google Drive primero");return}const i=await D.getOrCreateFolder(B);await D.saveChunks(n.playlists,n.categories,n.settings.vaultKey,i),t&&alert("Respaldo completado")}catch(a){console.error("[Sync] Error:",a),t&&alert("Error al respaldar: "+a.message)}}function u(){const t=document.getElementById("root");if(!t)return;let e="";switch(n.currentView){case"home":e=M();break;case"category":e=oe(n.currentCategory);break;case"player":e=le(n.currentPlaylist);break;case"settings":e=fe();break;default:e=M()}t.innerHTML=e,setTimeout(()=>{window.lucide&&window.lucide.createIcons(),n.currentView==="player"&&Ee()},0)}function we(){document.addEventListener("click",xe)}function xe(t){var i;const e=t.target.closest("[data-action]");if(!e)return;const a=e.dataset.action;if(a==="back-to-home"){n.currentView="home",n.currentCategory=null,n.currentPlaylist=null,u();return}if(a==="back-to-category"){n.currentView="category",n.currentPlaylist=null,u();return}if(a==="open-settings"){n.currentView="settings",u();return}if(a==="open-category"){n.currentCategory=e.dataset.categoryId,n.currentView="category",u();return}if(a==="open-playlist"){n.currentPlaylist=e.dataset.playlistId,n.currentView="player",n.player={currentIndex:0,isRandom:!1,playedIndices:[]},u();return}if(a==="close-modal"){$();return}if(a==="add-category"){E(O());return}if(a==="edit-category"){const r=F(e.dataset.categoryId);E(O(r));return}if(a==="save-category"){$e(e.dataset.categoryId);return}if(a==="delete-category"){confirm("¿Eliminar esta sección?")&&(X(e.dataset.categoryId),$(),n.currentView="home",u());return}if(a==="select-theme"){document.querySelectorAll('[data-action="select-theme"]').forEach(r=>{r.style.border="2px solid transparent"}),e.style.border="2px solid var(--accent)",e.dataset.selected="true";return}if(a==="select-icon"){document.querySelectorAll('.btn-icon[data-action="select-icon"]').forEach(r=>{r.style.background="var(--bg-primary)"}),e.style.background="var(--accent)",e.dataset.selected="true";return}if(a==="add-playlist"){E(j(e.dataset.categoryId));return}if(a==="edit-playlist"){const r=N(e.dataset.playlistId);E(j(r.categoryId,r));return}if(a==="save-playlist"){ke(e.dataset.categoryId,e.dataset.playlistId);return}if(a==="delete-playlist"){confirm("¿Eliminar esta colección?")&&(ee(e.dataset.playlistId),$(),n.currentView="category",u());return}if(a==="select-playlist-icon"){document.querySelectorAll('[data-action="select-playlist-icon"]').forEach(r=>{r.style.background="var(--bg-primary)"}),e.style.background="var(--accent)",e.dataset.selected="true";return}if(a==="add-item"){E(ye(e.dataset.playlistId));return}if(a==="edit-item"){const o=N(e.dataset.playlistId).items.find(l=>l.id===e.dataset.itemId);E(ge(o));return}if(a==="save-item"){Ie(e.dataset.playlistId);return}if(a==="update-item"){Se(e.dataset.playlistId,e.dataset.itemId);return}if(a==="delete-item"){confirm("¿Eliminar este elemento?")&&(ie(e.dataset.playlistId,e.dataset.itemId),u());return}if(a==="play-item"){n.player.currentIndex=parseInt(e.dataset.index),u();return}if(a==="next-item"){L();return}if(a==="previous-item"){n.player.currentIndex>0&&(n.player.currentIndex--,u());return}if(a==="toggle-random"){n.player.isRandom=!n.player.isRandom,n.player.isRandom?n.player.playedIndices=[n.player.currentIndex]:n.player.playedIndices=[],u();return}if(a==="toggle-sync"){n.settings.autoSync=e.checked,z();return}if(a==="save-vault-key"){n.settings.vaultKey=(i=document.getElementById("vault-key"))==null?void 0:i.value,z(),alert("Clave guardada");return}if(a==="auth-drive"){Ce();return}if(a==="manual-backup"){V(!0);return}}function E(t){const e=document.createElement("div");e.innerHTML=t,document.body.appendChild(e.firstElementChild),setTimeout(()=>{window.lucide&&window.lucide.createIcons()},0)}function $(){document.querySelectorAll(".modal-overlay").forEach(t=>t.remove())}function $e(t){const e=document.getElementById("category-name").value.trim();if(!e){alert("El nombre es requerido");return}const a=document.querySelector('[data-action="select-theme"][data-selected="true"]'),i=(a==null?void 0:a.dataset.theme)||"default",r=document.querySelector('[data-action="select-icon"][data-selected="true"]'),o=(r==null?void 0:r.dataset.icon)||"folder";t?W(t,{name:e,theme:i,icon:o}):J(e,o,i),$(),u()}function ke(t,e){const a=document.getElementById("playlist-name").value.trim();if(!a){alert("El nombre es requerido");return}const i=document.querySelector('[data-action="select-playlist-icon"][data-selected="true"]'),r=(i==null?void 0:i.dataset.icon)||"play-circle";e?Z(e,{name:a,icon:r}):Q(t,a,r),$(),u()}function Ie(t){const e=document.getElementById("item-url").value.trim();if(!e){alert("La URL es requerida");return}const a=document.getElementById("item-title").value.trim()||e;te(t,e,a),$(),u()}function Se(t,e){const a=document.getElementById("edit-item-title").value.trim();if(!a){alert("El título es requerido");return}ae(t,e,{title:a}),$(),u()}function L(){const t=N(n.currentPlaylist);if(!(!t||!t.items.length)){if(n.player.isRandom){const e=t.items.map((a,i)=>i).filter(a=>!n.player.playedIndices.includes(a));e.length===0?(n.player.playedIndices=[],n.player.currentIndex=Math.floor(Math.random()*t.items.length)):n.player.currentIndex=e[Math.floor(Math.random()*e.length)],n.player.playedIndices.push(n.player.currentIndex)}else n.player.currentIndex<t.items.length-1&&n.player.currentIndex++;u()}}function Ee(){if(!(!document.getElementById("video-player")||window.YT)){if(!document.getElementById("yt-api-script")){const e=document.createElement("script");e.id="yt-api-script",e.src="https://www.youtube.com/iframe_api",document.head.appendChild(e)}window.onYouTubeIframeAPIReady=()=>{new YT.Player("video-player",{events:{onStateChange:e=>{e.data===YT.PlayerState.ENDED&&L()},onError:()=>L()}})}}}function Ce(){{alert("Configura DRIVE_CLIENT_ID en main.js");return}}function Pe(){"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js").catch(()=>{})}ve();
