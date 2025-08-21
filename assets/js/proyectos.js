// funcion page load
window.onload = function () {
    var contenedor = document.getElementById('contenedor_carga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';

}

//Menu movil index inicio
document.addEventListener('DOMContentLoaded', function () {
    const menuInicio = document.getElementById('menuInicio');
    if (menuInicio) {
        menuInicio.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = "../../index.html";
            setTimeout(function () {
                const target = document.querySelector('#inicio');
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - document.getElementById('headerContainer').offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
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

//Idiomas 
let currentLanguage = localStorage.getItem('language'); // Default to 'es' if no language is stored

const languageIcons = {
    'es': '../images/reino-unido.webp', // Icon for Spanish language
    'en': '../images/colombia.webp'     // Icon for English language
};

async function fetchTexts(language) {
    try {
        const response = await fetch(`../lang/${language}.json`);
        if (!response.ok) {
            throw new Error('Error al cargar el archivo de idioma');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar los textos:', error);
        return {}; // Devolver un objeto vacío en caso de error para evitar problemas
    }
}

async function updateTexts(texts) {
    document.querySelectorAll('[data-section]').forEach(element => {
        const section = element.getAttribute('data-section');
        const value = element.getAttribute('data-value');
        if (texts[section] && texts[section][value]) {
            element.textContent = texts[section][value];
        }
    });
}

function changeLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateLanguage(newLanguage);
}

async function updateLanguage(newLanguage) {
    currentLanguage = newLanguage;
    localStorage.setItem('language', currentLanguage);

    const texts = await fetchTexts(currentLanguage);
    await updateTexts(texts);

    const iconSrc = languageIcons[currentLanguage];
    document.getElementById('languageIcon').src = iconSrc;
    document.getElementById('languageIconMobile').src = iconSrc;
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const texts = await fetchTexts(currentLanguage);
    await updateTexts(texts);

    // Update the language icons on page load
    const iconSrc = languageIcons[currentLanguage];
    document.getElementById('languageIcon').src = iconSrc;
    document.getElementById('languageIconMobile').src = iconSrc;
});

//Script de cambio tema
let currentTheme = localStorage.getItem('theme');

const ThemeIcons = {
    'light': '<i class="fas fa-moon"></i>',
    'dark': '<i class="fas fa-sun"></i>'
};

async function fetchTheme(theme) {
    try {
        const response = await fetch(`../theme/${theme}.json`);
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
            logoContainer.innerHTML = `<img id="LogoImg" src="${themeData.colorTheme.logo2}" alt="Logo" class="w-20 md:w-20 lg:w-20 ml-4">`;
        } else {
            logoContainer.innerHTML = '';
        }

        const tailwindContainers = document.getElementsByClassName('tailwind-container');
        Array.from(tailwindContainers).forEach(container => {
            if (themeData.colorTheme.tailwindProyect) {
                container.innerHTML = `<img src="${themeData.colorTheme.tailwindProyect}" class="w-6 h-6">`;
            } else {
                container.innerHTML = '';
            }
        });

        const firebaseContainers = document.getElementsByClassName('firebase-container');
        Array.from(firebaseContainers).forEach(container => {
            if (themeData.colorTheme.firebaseProyect) {
                container.innerHTML = `<img src="${themeData.colorTheme.firebaseProyect}" class="w-6 h-6">`;
            } else {
                container.innerHTML = '';
            }
        });

        const netContainer = document.getElementsByClassName('net-container');
        Array.from(netContainer).forEach(container => {
            if (themeData.colorTheme.netProyect) {
                container.innerHTML = `<img src="${themeData.colorTheme.netProyect}" class="w-6 h-6">`;
            } else {
                container.innerHTML = '';
            }
        });

          const flutterContainer = document.getElementsByClassName('flutter-container');
        Array.from(flutterContainer).forEach(container => {
            if (themeData.colorTheme.flutterProyect) {
                container.innerHTML = `<img src="${themeData.colorTheme.flutterProyect}" class="w-6 h-6">`;
            } else {
                container.innerHTML = '';
            }
        });

          const supabaseContainer = document.getElementsByClassName('supabase-container');
        Array.from(supabaseContainer).forEach(container => {
            if (themeData.colorTheme.supabaseProyect) {
                container.innerHTML = `<img src="${themeData.colorTheme.supabaseProyect}" class="w-6 h-6">`;
            } else {
                container.innerHTML = '';
            }
        });

        updateLinkColors(themeData.colorTheme.hoverColor);
        updatePseudoElementColor(themeData.colorTheme.activeColor);
        const { elementColor, textColor3, hovContact, botoncolor, iconhov, iconcolor, cardExp, gradientText1, fondScroll } = themeData.colorTheme;
        updateButtonColors(elementColor, textColor3, hovContact, botoncolor, iconhov, iconcolor, cardExp, gradientText1, fondScroll);
    } else {
        console.error('El tema no contiene un objeto "colorTheme" válido.');
    }
}

async function changeTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);

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
    #menuList a:hover,
    #mobileNav a:hover {
        color: ${activeColor};
        
    }

    #link_proyect{
        color: ${activeColor};
        border-bottom: 3px solid ${activeColor};
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

function updateButtonColors(elementColor, textColor3, hovContact, botoncolor, iconhov, iconcolor, cardExp, gradientText1, fondScroll) {
    const styleElement = document.getElementById('buttonColorStyle') || document.createElement('style');
    styleElement.id = 'buttonColorStyle';
    styleElement.innerHTML = ` 
    .pelotas {
        background-color: ${elementColor};
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
        background: linear-gradient(to top, ${gradientText1}, transparent);
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
        if (window.scrollY > 150) {
            goTopButton.classList.remove('hidden');
            goTopButton.classList.add('visible');
        } else {
            goTopButton.classList.remove('visible');
            goTopButton.classList.add('hidden');
        }
    });

    goTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
