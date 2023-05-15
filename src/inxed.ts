interface Translations {
    [key: string]: string;
}

export const initLocalization = (langDirectory: string): void => {
    const loadLocalization = (): void => {
        let language = localStorage.getItem('language') || navigator.language || (navigator as any).userLanguage;
        document.documentElement.lang = language;
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam) {
            language = langParam;
            localStorage.setItem('language', langParam);
        }
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${langDirectory}${language}.json`);
        xhr.onload = (): void => {
            if (xhr.status === 200) {
                const translations: Translations = JSON.parse(xhr.responseText);
                updateLocalization(translations);
            } else {
                // Language file not found, fall back to default language 'en'
                const xhrDefault = new XMLHttpRequest();
                xhrDefault.open('GET', `${langDirectory}en.json`);
                xhrDefault.onload = (): void => {
                    if (xhrDefault.status === 200) {
                        const translations: Translations = JSON.parse(xhrDefault.responseText);
                        updateLocalization(translations);
                    }
                };
                xhrDefault.send();
            }
        };
        xhr.send();
    };

    const updateLocalization = (translations: Translations): void => {
        const localizedElements = document.querySelectorAll('[data-localize]');
        localizedElements.forEach((element: Element) => {
            const key = element.getAttribute('data-localize');
            if (key && translations[key]) {
              element.textContent = translations[key];
            }            
        });
    };

    const setLanguage = (language: string): void => {
        localStorage.setItem('language', language);

        // Update URL with selected language
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('lang', language);
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);

        // Update HTML lang attribute with selected language
        document.documentElement.lang = language;

        // Load localization with updated language
        loadLocalization();
    };

    const registerLangSwitchListener = (): void => {
        const langSwitch = document.getElementById('langSwitch') as HTMLDivElement;
        if (langSwitch) {
            langSwitch.addEventListener('click', (e: Event) => {
                if (e.target && (e.target as HTMLElement).matches('button[data-lang]')) {
                    const lang = (e.target as HTMLElement).getAttribute('data-lang');
                    if (lang) {
                        setLanguage(lang);
                    }
                }
            });
        }
    };

    loadLocalization();
    registerLangSwitchListener();
};
