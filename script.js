const menuLateral = document.getElementById('menuLateral');
const btnAbrir = document.getElementById('btnAbrir');
const btnCerrar = document.getElementById('btnCerrar');
const capaBorrosa = document.getElementById('capaBorrosa');
const enlacesMenu = document.querySelectorAll('.menu-lateral ul li a, .menu-escritorio ul li a');
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('desaparecer');
    }, 200);
});

window.addEventListener('beforeunload', () => {
    if (menuLateral.classList.contains('active')) {
        menuLateral.classList.remove('active');
        menuLateral.classList.add('recarga-cerrar');
        capaBorrosa.classList.remove('active');
    }
});

function abrirMenu() {
    menuLateral.classList.remove('recarga-cerrar');
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
        e.preventDefault();
        cerrarMenu();
        
        const ruta = enlace.getAttribute('href');
        const idSeccion = ruta.replace('/', '');
        const elementoDestino = document.getElementById(idSeccion);
        
        if (elementoDestino) {
            window.history.pushState(null, '', ruta);
            elementoDestino.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('popstate', () => {
    const rutaActual = window.location.pathname.replace('/', '');
    const elementoDestino = document.getElementById(rutaActual || 'inicio');
    if (elementoDestino) {
        elementoDestino.scrollIntoView({ behavior: 'smooth' });
    }
});