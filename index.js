export const localize = (options) => {
    const { langDirectory, defaultLanguage = 'en', langSwitch } = options;
    const loadLocalization = () => {
        let language = localStorage.getItem('language') || navigator.language || navigator.userLanguage;
        document.documentElement.lang = language;
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam) {
            language = langParam;
            localStorage.setItem('language', langParam);
        }
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${langDirectory}${language}.json`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const translations = JSON.parse(xhr.responseText);
                updateLocalization(translations);
            }
            else {
                const xhrDefault = new XMLHttpRequest();
                xhrDefault.open('GET', `${langDirectory}${defaultLanguage}.json`);
                xhrDefault.onload = () => {
                    if (xhrDefault.status === 200) {
                        const translations = JSON.parse(xhrDefault.responseText);
                        updateLocalization(translations);
                    }
                };
                xhrDefault.send();
            }
        };
        xhr.send();
    };
    const updateLocalization = (translations) => {
        const localizedElements = document.querySelectorAll('[data-localize]');
        localizedElements.forEach((element) => {
            const key = element.getAttribute('data-localize');
            if (key && translations[key]) {
                const tagName = element.tagName.toLowerCase();
                const attributesToTranslate = ['title', 'aria-label', 'placeholder'];
                if (attributesToTranslate.includes(tagName)) {
                    element.setAttribute(tagName, translations[key]);
                }
                else {
                    element.textContent = translations[key];
                }
            }
        });
    };
    const setLanguage = (language) => {
        localStorage.setItem('language', language);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('lang', language);
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
        document.documentElement.lang = language;
        loadLocalization();
    };
    const registerLangSwitchListener = (langSwitch) => {
        if (langSwitch) {
            langSwitch.addEventListener('click', (e) => {
                if (e.target && e.target.matches('button[data-lang]')) {
                    const lang = e.target.getAttribute('data-lang');
                    if (lang) {
                        setLanguage(lang);
                    }
                }
            });
        }
    };
    loadLocalization();
    registerLangSwitchListener(langSwitch);
};
