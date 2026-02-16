// Funcionalidad del menú móvil
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

navOverlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    menuToggle.querySelector('i').classList.remove('fa-times');
    menuToggle.querySelector('i').classList.add('fa-bars');
});

// Funcionalidad de dropdowns en móvil
// Funcionalidad de dropdowns en móvil
// ==============================
// DROPDOWN SOLO CON FLECHA
// ==============================

const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

dropdownItems.forEach(item => {

    const link = item.querySelector('.nav-link');
    const arrow = link.querySelector('.fa-chevron-down');
    const dropdown = item.querySelector('.dropdown');

    if (!arrow || !dropdown) return;

    arrow.addEventListener('click', function (e) {

        if (window.innerWidth <= 992) {

            e.preventDefault();
            e.stopPropagation();

            // Cerrar otros
            dropdownItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        }

    });

});



// Funcionalidad del acordeón de años
const yearHeaders = document.querySelectorAll('.year-header');

yearHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar propagación
        
        const year = header.getAttribute('data-year');
        const content = document.getElementById(`year-${year}`);
        
        if (!content) {
            console.error(`No se encontró el contenido para el año ${year}`);
            return;
        }
        
        // Cerrar otros años
        yearHeaders.forEach(h => {
            if (h !== header) {
                h.classList.remove('active');
                const otherYear = h.getAttribute('data-year');
                const otherContent = document.getElementById(`year-${otherYear}`);
                if (otherContent) {
                    otherContent.classList.remove('active');
                    otherContent.style.maxHeight = null;
                }
            }
        });
        
        // Alternar año actual
        const isActive = header.classList.contains('active');
        header.classList.toggle('active');
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
            console.log(`Año ${year} abierto`);
        } else {
            content.style.maxHeight = null;
            console.log(`Año ${year} cerrado`);
        }
    });
});

// Funcionalidad del acordeón de trimestres
const quarterHeaders = document.querySelectorAll('.quarter-header');

quarterHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar propagación
        
        const quarter = header.getAttribute('data-quarter');
        const content = document.getElementById(quarter);
        
        if (!content) {
            console.error(`No se encontró el contenido para el trimestre ${quarter}`);
            return;
        }
        
        // Alternar trimestre actual
        header.classList.toggle('active');
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            content.style.display = 'block';
            content.style.maxHeight = content.scrollHeight + "px";
            console.log(`Trimestre ${quarter} abierto`);
        } else {
            content.style.maxHeight = null;
            setTimeout(() => {
                if (!content.classList.contains('active')) {
                    content.style.display = 'none';
                }
            }, 300);
            console.log(`Trimestre ${quarter} cerrado`);
        }
    });
});

// INICIALIZAR TODO CERRADO - Página carga con todo cerrado
document.addEventListener('DOMContentLoaded', () => {
    console.log('SEVAC - Página cargada correctamente');
    
    // Asegurar que todos los acordeones de años estén cerrados
    yearHeaders.forEach(header => {
        const year = header.getAttribute('data-year');
        const content = document.getElementById(`year-${year}`);
        if (content) {
            header.classList.remove('active');
            content.classList.remove('active');
            content.style.maxHeight = null;
        }
    });
    
    // Asegurar que todos los acordeones de trimestres estén cerrados
    quarterHeaders.forEach(header => {
        const quarter = header.getAttribute('data-quarter');
        const content = document.getElementById(quarter);
        if (content) {
            header.classList.remove('active');
            content.classList.remove('active');
            content.style.display = 'none';
            content.style.maxHeight = null;
        }
    });
    
    // Cerrar menú móvil si está abierto
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    if (menuToggle.querySelector('i')) {
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    }
    
    console.log('Todos los acordeones inicializados cerrados');
});

// Cerrar menú al hacer clic en un enlace (en móvil)
const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            if (menuToggle.querySelector('i')) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
            
            // Cerrar dropdowns abiertos
            dropdownItems.forEach(item => {
                item.classList.remove('active');
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.style.maxHeight = null;
                }
            });
        }
    });
});

// Ajustar navegación para pantallas medianas
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        // Cerrar menú móvil si está abierto
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        if (menuToggle.querySelector('i')) {
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
        
        // Restaurar dropdowns
        dropdownItems.forEach(item => {
            item.classList.remove('active');
            const dropdown = item.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.maxHeight = null;
                dropdown.style.display = ''; // Restaurar display
            }
        });
    } else {
        // En móvil, cerrar todos los dropdowns
        dropdownItems.forEach(item => {
            item.classList.remove('active');
            const dropdown = item.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.maxHeight = null;
            }
        });
    }
});

// Función para forzar abrir un año (para debugging)
function abrirAnio(year) {
    const header = document.querySelector(`.year-header[data-year="${year}"]`);
    if (header) {
        header.click();
    }
}

// Función para forzar abrir un trimestre (para debugging)
function abrirTrimestre(quarter) {
    const header = document.querySelector(`.quarter-header[data-quarter="${quarter}"]`);
    if (header) {
        header.click();
    }
}

// Verificar que los elementos existen
document.addEventListener('DOMContentLoaded', () => {
    console.log('Elementos encontrados:');
    console.log('Year headers:', yearHeaders.length);
    console.log('Quarter headers:', quarterHeaders.length);
    
    // Verificar que todos los IDs sean únicos
    const ids = new Set();
    document.querySelectorAll('[id]').forEach(el => {
        if (ids.has(el.id)) {
            console.warn(`ID duplicado: ${el.id}`);
        }
        ids.add(el.id);
    });
});

// Exportar funciones para debugging
window.debugSEVAC = {
    abrirAnio,
    abrirTrimestre,
    verAcordeones: () => {
        console.log('Acordeones de años:', yearHeaders.length);
        console.log('Acordeones de trimestres:', quarterHeaders.length);
    }
};