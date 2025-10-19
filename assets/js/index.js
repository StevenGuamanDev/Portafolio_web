// funcion page load
window.onload = function () {
    var contenedor = document.getElementById('contenedor_carga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';

}

//Inicio del menu
document.addEventListener('DOMContentLoaded', function () {
    const menuInicio = document.getElementById('menuInicio');
    if (menuInicio) {
        menuInicio.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector('#inicio');

            window.scrollTo({
                top: target.offsetTop - document.getElementById('headerContainer').offsetHeight,
                behavior: 'smooth'
            });
        });
    } else {
        console.error('El elemento con id "menuInicio" no se encontró en el DOM');
    }
});

// Funcion para mostrar y ocultar menu
function mostrarOcultarMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuPath = document.getElementById('menuPath');
    const xPath = document.getElementById('xPath');

    if (mobileNav.classList.contains('hidden')) {
        mobileNav.classList.remove('hidden');
        menuPath.classList.add('hidden');
        xPath.classList.remove('hidden');
    } else {
        mobileNav.classList.add('hidden');
        menuPath.classList.remove('hidden');
        xPath.classList.add('hidden');
    }
}

//Funcion descargar Curriculum
// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelector('.cv_button').addEventListener('click', function (e) {
//         e.preventDefault();
//         var pdfUrl = './assets/pdf/currículum.pdf';
//         var link = document.createElement('a');
//         link.href = pdfUrl;
//         link.download = 'curriculum.pdf';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.open(pdfUrl, '_blank');
//     });
// });

// Obtener todas las secciones
const sections = document.querySelectorAll('section');

// Función para actualizar el enlace activo
function updateActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) { }

    sections.forEach((section, i) => {
        const link = document.querySelector(`#menuList li:nth-child(${i + 1}) a`);

        if (index === i) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
// Llamada inicial a la función para establecer el estado inicial
updateActiveLink();
// Agregar un evento de desplazamiento
window.addEventListener('scroll', updateActiveLink);

window.addEventListener('scroll', function () {
    var header = document.getElementById('header');
    var headerContainer = document.getElementById('headerContainer');
    if (window.scrollY > 0) {
        headerContainer.classList.add('shadow-lg');
        header.classList.add('bg-opacity-90');
        header.classList.remove('bg-opacity-100');
    } else {
        headerContainer.classList.remove('shadow-lg');
        header.classList.remove('bg-opacity-90');
        header.classList.add('bg-opacity-100');
    }
});
//Fin del menu

function mostrarHabilidades(id, event) {
    event.preventDefault();

    // Obtener todos los enlaces del menú
    var menuLinks = document.querySelectorAll("#menuhabilidades a");

    // Eliminar la clase "active" de todos los enlaces del menú
    menuLinks.forEach(function (link) {
        link.classList.remove("active");
    });

    // Resaltar el enlace actual
    var currentLink = event.currentTarget;
    currentLink.classList.add("active");

    // Obtener el contenedor de habilidades1
    var habilidades1Container = document.getElementById('habilidades1');

    // Obtener el contenedor de habilidades2
    var habilidades2Container = document.getElementById('habilidades2');

    // Mostrar u ocultar contenedores según el enlace clicado
    if (id === 'habilidades1') {
        habilidades1Container.style.display = 'grid';
        habilidades2Container.style.display = 'none';
    } else if (id === 'habilidades2') {
        habilidades1Container.style.display = 'none';
        habilidades2Container.style.display = 'grid';
    }
}
//Script de experiencia
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', function () {
        const extraInfo = this.closest('.cards--experiencia').nextElementSibling;
        if (extraInfo.classList.contains('hidden-card')) {
            extraInfo.classList.remove('hidden-card');
            this.innerHTML = '<i class="fas fa-minus"></i>';
        } else {
            extraInfo.classList.add('hidden-card');
            this.innerHTML = '<i class="fas fa-plus"></i>';
        }
    });
});

//Idiomas index 
if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'es');
}
let currentLanguage = localStorage.getItem('language') || 'es';

let words = ["Desarrollador de Software", "Desarrollador Full-Stack"];
let index = 0;
let isDeleting = false;
let typingSpeed = 200;

const languageIcons = {
    'es': './assets/images/reino-unido.webp',
    'en': './assets/images/colombia.webp'
};

async function fetchTexts(language) {
    try {
        const response = await fetch(`./assets/lang/${language}.json`);
        if (!response.ok) {
            throw new Error('Error al cargar el archivo de idioma');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar los textos:', error);
        return {};
    }
}

async function changeLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    localStorage.setItem('language', currentLanguage);

    const iconSrc = languageIcons[currentLanguage];
    document.getElementById('languageIcon').src = iconSrc;
    document.getElementById('languageIconMobile').src = iconSrc;

    const texts = await fetchTexts(currentLanguage);
    updateTexts(texts);
}

function updateTexts(texts) {
    updateElements('[data-section][data-value]', 'innerText', texts);
    updateElements('[data-section][data-value][placeholder]', 'placeholder', texts);

    const textarea = document.getElementById('mensaje');
    if (textarea) {
        textarea.placeholder = texts.contact?.input4 || 'Mensaje';
    }

    if (texts.home && texts.home["home_text-3"]) {
        words = texts.home["home_text-3"].split(", ");
        index = 0;
        isDeleting = false;
        document.getElementById("typingEffect").textContent = "";
    }
}

function updateElements(selector, property, texts) {
    document.querySelectorAll(selector).forEach(element => {
        const section = element.getAttribute('data-section');
        const value = element.getAttribute('data-value');
        if (texts[section] && texts[section][value]) {
            element[property] = texts[section][value];
        }
    });
}

function type() {
    const word = words[index];
    const textElement = document.getElementById("typingEffect");

    if (isDeleting) {
        textElement.textContent = word.substring(0, textElement.textContent.length - 1);
    } else {
        textElement.textContent = word.substring(0, textElement.textContent.length + 1);
    }

    if (!isDeleting && textElement.textContent === word) {
        isDeleting = true;
        typingSpeed = 300;
    } else if (isDeleting && textElement.textContent === "") {
        isDeleting = false;
        index = (index + 1) % words.length;
        typingSpeed = 200;
    }

    setTimeout(type, typingSpeed);
}

document.addEventListener('DOMContentLoaded', async () => {
    const texts = await fetchTexts(currentLanguage);
    updateTexts(texts);

    // Update the language icons on page load
    const iconSrc = languageIcons[currentLanguage];
    document.getElementById('languageIcon').src = iconSrc;
    document.getElementById('languageIconMobile').src = iconSrc;

    type();
});


//Script de cambio tema
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
}
let currentTheme = localStorage.getItem('theme') || 'light';

const ThemeIcons = {
    'light': '<i class="fas fa-moon"></i>',
    'dark': '<i class="fas fa-sun"></i>'
};

async function fetchTheme(theme) {
    try {
        const response = await fetch(`./assets/theme/${theme}.json`);
        if (!response.ok) {
            throw new Error('Error al cargar el archivo de temas');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar los textos:', error);
        return {};
    }
}

async function applyTheme(themeData) {
    if (themeData.colorTheme) {
        document.querySelectorAll('[data-section]').forEach(element => {
            const value = element.getAttribute('data-value');
            if (themeData.colorTheme[value]) {
                const styles = themeData.colorTheme[value].split(';');
                styles.forEach(style => {
                    const [property, val] = style.split(':');
                    if (property && val) {
                        element.style[property.trim()] = val.trim();
                    }
                });
            }
        });

        const logoContainer = document.getElementById('LogoContainer');
        if (themeData.colorTheme.logo) {
            logoContainer.innerHTML = `<img id="LogoImg" src="${themeData.colorTheme.logo}" alt="Logo" class="w-20 md:w-20 lg:w-20 ml-4">`;
        } else {
            logoContainer.innerHTML = '';
        }

        const tailwindContainer = document.getElementById('tailwindContainer');
        if (themeData.colorTheme.tailwind) {
            tailwindContainer.innerHTML = `<img src="${themeData.colorTheme.tailwind}" class="w-6 h-6">`;
        } else {
            tailwindContainer.innerHTML = '';
        }

        const firebaseContainer = document.getElementById('firebaseContainer');
        if (themeData.colorTheme.firebase) {
            firebaseContainer.innerHTML = `<img src="${themeData.colorTheme.firebase}" class="w-6 h-6">`;
        } else {
            firebaseContainer.innerHTML = '';
        }

        const flutterContainer = document.getElementById('flutterContainer');
        if (themeData.colorTheme.firebase) {
            flutterContainer.innerHTML = `<img src="${themeData.colorTheme.flutter}" class="w-6 h-6">`;
        } else {
            flutterContainer.innerHTML = '';
        }

        const supabaseContainer = document.getElementById('supabaseContainer');
        if (themeData.colorTheme.firebase) {
            supabaseContainer.innerHTML = `<img src="${themeData.colorTheme.supabase}" class="w-6 h-6">`;
        } else {
            supabaseContainer.innerHTML = '';
        }

        const freelanceContainer = document.getElementsByClassName('freelanceContainer');
        Array.from(freelanceContainer).forEach(container => {
            if (themeData.colorTheme.freelance) {
                container.innerHTML = `<img src="${themeData.colorTheme.freelance}" alt="Logo de Freelance" class="max-w-full h-auto">`;
            } else {
                container.innerHTML = '';
            }
        });

        // Actualizar imagen del inicio
        const homeImage = document.getElementById('homeImage');
        const homeImageSource = document.getElementById('homeImageSource');
        if (themeData.colorTheme.homeImage) {
            homeImage.src = themeData.colorTheme.homeImage;
            homeImageSource.srcset = themeData.colorTheme.homeImage;
        }

        // Actualizar imagen sobre mí
        const aboutmeImage = document.getElementById('aboutmeImage');
        if (themeData.colorTheme.aboutmeImage) {
            aboutmeImage.src = themeData.colorTheme.aboutmeImage;
        }

        updateLinkColors(themeData.colorTheme.activeColor, themeData.colorTheme.hoverColor);
        updatePseudoElementColor(themeData.colorTheme.activeColor);
        const { elementColor, textColor3, hovContact, botoncolor, iconhov, iconcolor, cardLike, cardExp, gradientText, fondText, fondScroll } = themeData.colorTheme;
        updateButtonColors(elementColor, textColor3, hovContact, botoncolor, iconhov, iconcolor, cardLike, cardExp, gradientText, fondText, fondScroll);
    } else {
        console.error('El tema no contiene un objeto "colorTheme" válido.');
    }
}

async function changeTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme || 'light');

    const iconSrc = ThemeIcons[currentTheme];
    document.getElementById('ThemeIcon').innerHTML = iconSrc;
    document.getElementById('ThemeIconMobile').innerHTML = iconSrc;

    const themeData = await fetchTheme(currentTheme);
    applyTheme(themeData);
}

function updateLinkColors(activeColor, hoverColor) {
    const styleElement = document.getElementById('linkColorStyle') || document.createElement('style');
    styleElement.id = 'linkColorStyle';
    styleElement.innerHTML = `
        #menuList a.active,
        #menuList a:hover,
        #mobileNav a.active,
        #mobileNav a:hover {
            color: ${activeColor};
        }

        #menuhabilidades a.active {
            color: ${activeColor};
            border-bottom: 2px solid ${activeColor};
        }

        #menuhabilidades a:hover {
            color: ${activeColor};
        }
    `;
    document.head.appendChild(styleElement);
}

function updatePseudoElementColor(color) {
    const styleElement = document.getElementById('pseudoElementStyle') || document.createElement('style');
    styleElement.id = 'pseudoElementStyle';
    styleElement.innerHTML = `
        #menuList a.active::after,
        #mobileNav a.active::after {
            background-color: ${color};
        }
    `;
    document.head.appendChild(styleElement);
}

function updateButtonColors(elementColor, textColor3, hovContact, botoncolor, iconhov, iconcolor, cardLike, cardExp, gradientText, fondText, fondScroll) {
    const styleElement = document.getElementById('buttonColorStyle') || document.createElement('style');
    styleElement.id = 'buttonColorStyle';
    styleElement.innerHTML = ` 
        .pelotas {
            background-color: ${elementColor};
        }
        .cv_button {
            color: ${elementColor};
            border: 2px solid ${elementColor};
            box-shadow: inset 0 0 0 0 ${elementColor};
        }
        .cv_button:hover {
            box-shadow: inset 400px 0 0 0 ${elementColor};
        }
        .cv_button:hover {
            color: ${textColor3};
        }
        .contact_button {
            color: ${textColor3};
            background-color: ${elementColor};
        }
        .contact_button:hover {
            background-color: ${hovContact};
        }
        .icon-circle {
            background-color: ${botoncolor};
        }
        .icon-circle:hover {
            background-color: ${iconhov};
        }
        .icon {
            color: ${iconcolor};
        }
        .cards--habilidades {
            background-color: ${cardLike};
        }
        .cards--habilidades:hover {
            background-color: ${cardLike};
            border: 2px solid ${iconcolor};
        }
        .cards--habilidades1 {
            background-color: ${cardExp};
        }
        .cards--habilidades1:hover {
            background-color: ${cardExp};
            border: 1px solid ${iconcolor};
        }
        .cards--proyectos {
            background-color: ${cardExp}; 
            transition: background-color 0.3s, border-color 0.3s; 
        }
        .cards--proyectos:hover {
            background-color: ${cardExp}; 
            border: 2px solid ${iconcolor};
            border-color: ${iconcolor}; 
        }
        .bg-gradient-to-t {
            background: linear-gradient(to top, ${gradientText}, transparent);
        }
        .btn-custom {
            background-color: ${elementColor} !important;
            border: 2px solid ${elementColor} !important;
            color: ${textColor3} !important;
        }
        .btn-custom:hover {
            background-color: ${hovContact}!important;
            border-color: ${elementColor} !important;
        }
        .btn-custom-outline {
            border: 2px solid ${elementColor} !important;
            color: ${elementColor} !important;
        }
        .btn-custom-outline:hover {
            background-color: ${elementColor} !important;
            color: ${textColor3}  !important;
        }
        .nombre-input:focus,
        input:focus,
        textarea:focus {
            outline: none;
            border: 2px solid ${elementColor};
            background-color: ${fondText}; 
            opacity: 0.6; 
            pointer-events: none;
        }  
        .go-top-button {
            background-color: ${elementColor}; 
            color: ${textColor3}; 
            cursor: pointer; 
            transition: background-color 0.3s; 
        }
        .go-top-button:hover {
            background-color: ${hovContact}; 
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${elementColor};
            cursor: pointer;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: ${hovContact};
        }
        ::-webkit-scrollbar-track {
            background-color: ${fondScroll};
        }
            
        .swal2-confirm.custom-button {
            color: ${textColor3}; 
            background-color: ${elementColor};
        }
    
        .swal2-confirm.custom-button:hover {
            background-color: ${hovContact};
        }
    `;
    document.head.appendChild(styleElement);
}

document.addEventListener('DOMContentLoaded', async () => {
    const themeData = await fetchTheme(currentTheme);

    if (themeData.colorTheme) {
        applyTheme(themeData);

        const iconSrc = ThemeIcons[currentTheme];
        document.getElementById('ThemeIcon').innerHTML = iconSrc;
        document.getElementById('ThemeIconMobile').innerHTML = iconSrc;
    } else {
        console.error('El tema no contiene un objeto "colorTheme" válido.');
    }
});
//Script boton Scroll 
document.addEventListener('DOMContentLoaded', function () {
    const goTopButton = document.getElementById('goTopButton');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) { // Muestra el botón después de hacer scroll 300px
            goTopButton.classList.remove('hidden');
            goTopButton.classList.add('visible');
        } else {
            goTopButton.classList.remove('visible');
            goTopButton.classList.add('hidden');
        }
    });

    goTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplaza al inicio con animación
    });
});


