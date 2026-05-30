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