const menuLateral = document.getElementById('menuLateral');
const btnAbrir = document.getElementById('btnAbrir');
const btnCerrar = document.getElementById('btnCerrar');
const capaBorrosa = document.getElementById('capaBorrosa');
const enlacesMenu = document.querySelectorAll('.menu-lateral ul li a, .menu-escritorio ul li a');
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('salir-izquierda');
    }, 200);
});

function comprobarHistorial() {
    loader.classList.remove('entrar-derecha', 'preparar-derecha');
    loader.classList.add('salir-izquierda');
}

window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        comprobarHistorial();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const entradas = performance.getEntriesByType("navigation");
    if (entradas.length > 0 && entradas[0].type === "back_forward") {
        comprobarHistorial();
    }
});

window.addEventListener('beforeunload', () => {
    if (menuLateral.classList.contains('active')) {
        menuLateral.classList.remove('active');
        capaBorrosa.classList.remove('active');
    }
});

function abrirMenu() {
    menuLateral.classList.add('active');
    capaBorrosa.classList.add('active');
}

function cerrarMenu() {
    menuLateral.classList.remove('active');
    capaBorrosa.classList.remove('active');
}

btnAbrir.addEventListener('click', abrirMenu);
btnCerrar.addEventListener('click', cerrarMenu);
capaBorrosa.addEventListener('click', cerrarMenu);

enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const ruta = enlace.getAttribute('href');

        if (ruta.includes('/') && !ruta.startsWith('#')) {
            e.preventDefault();
            cerrarMenu();
            
            loader.classList.remove('salir-izquierda');
            loader.classList.add('preparar-derecha');
            
            void loader.offsetWidth; 
            
            loader.classList.remove('preparar-derecha');
            loader.classList.add('entrar-derecha');
            
            setTimeout(() => {
                window.location.href = ruta;
            }, 600);
        } else {
            cerrarMenu();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('main > section, header');
    const enlacesMenu = document.querySelectorAll('.menu-escritorio a, .menu-lateral a');

    const opciones = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const idSeccion = entrada.target.getAttribute('id');
                
                enlacesMenu.forEach(enlace => {
                    const href = enlace.getAttribute('href');
                    
                    if (href && (href === `#${idSeccion}` || href === `/#${idSeccion}`)) {
                        enlace.classList.add('activo');
                    } else {
                        enlace.classList.remove('activo');
                    }
                });
            }
        });
    }, opciones);

    secciones.forEach(seccion => {
        if (seccion.id) {
            observador.observe(seccion);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const loader = document.getElementById('loader');

    if (logo && loader) {
        logo.addEventListener('click', () => {
            cerrarMenu();
            
            loader.classList.remove('salir-izquierda');
            loader.classList.add('preparar-derecha');
            
            void loader.offsetWidth; 
            
            loader.classList.remove('preparar-derecha');
            loader.classList.add('entrar-derecha');
            
            setTimeout(() => {
                window.location.href = "/";
            }, 600);
        });
    }
});