"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localize = void 0;
/**
 * Loads and applies the localization for the current page.
 * @param langDirectory - The directory containing the language files.
 * @param langSwitch - (Optional) The element that will be used to switch languages.
 */
const localize = (langDirectory, langSwitch) => {
    /**
     * Loads the language file and updates the DOM with the translations.
     */
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
                // Language file not found, fall back to default language 'en'
                const xhrDefault = new XMLHttpRequest();
                xhrDefault.open('GET', `${langDirectory}en.json`);
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
    /**
     * Updates the DOM with the translations.
     * @param translations - An object containing the translations.
     */
    const updateLocalization = (translations) => {
        const localizedElements = document.querySelectorAll('[data-localize]');
        localizedElements.forEach((element) => {
            const key = element.getAttribute('data-localize');
            if (key && translations[key]) {
                element.textContent = translations[key];
            }
        });
    };
    /**
     * Sets the selected language and updates the DOM and URL.
     * @param language - The selected language.
     */
    const setLanguage = (language) => {
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
    /**
     * Registers a listener for the language switch element.
     * @param langSwitch - The element that will be used to switch languages.
     */
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
exports.localize = localize;
