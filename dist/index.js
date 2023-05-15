"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localize = void 0;
/**
 * Loads and applies the localization for the current page.
 * @param langDirectory - The directory containing the language files.
 * @param langSwitch - (Optional) The element that will be used to switch languages.
 */
var localize = function (langDirectory, langSwitch) {
    /**
     * Loads the language file and updates the DOM with the translations.
     */
    var loadLocalization = function () {
        var language = localStorage.getItem('language') || navigator.language || navigator.userLanguage;
        document.documentElement.lang = language;
        var urlParams = new URLSearchParams(window.location.search);
        var langParam = urlParams.get('lang');
        if (langParam) {
            language = langParam;
            localStorage.setItem('language', langParam);
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "".concat(langDirectory).concat(language, ".json"));
        xhr.onload = function () {
            if (xhr.status === 200) {
                var translations = JSON.parse(xhr.responseText);
                updateLocalization(translations);
            }
            else {
                // Language file not found, fall back to default language 'en'
                var xhrDefault_1 = new XMLHttpRequest();
                xhrDefault_1.open('GET', "".concat(langDirectory, "en.json"));
                xhrDefault_1.onload = function () {
                    if (xhrDefault_1.status === 200) {
                        var translations = JSON.parse(xhrDefault_1.responseText);
                        updateLocalization(translations);
                    }
                };
                xhrDefault_1.send();
            }
        };
        xhr.send();
    };
    /**
     * Updates the DOM with the translations.
     * @param translations - An object containing the translations.
     */
    var updateLocalization = function (translations) {
        var localizedElements = document.querySelectorAll('[data-localize]');
        localizedElements.forEach(function (element) {
            var key = element.getAttribute('data-localize');
            if (key && translations[key]) {
                element.textContent = translations[key];
            }
        });
    };
    /**
     * Sets the selected language and updates the DOM and URL.
     * @param language - The selected language.
     */
    var setLanguage = function (language) {
        localStorage.setItem('language', language);
        // Update URL with selected language
        var urlParams = new URLSearchParams(window.location.search);
        urlParams.set('lang', language);
        window.history.replaceState({}, '', "".concat(window.location.pathname, "?").concat(urlParams));
        // Update HTML lang attribute with selected language
        document.documentElement.lang = language;
        // Load localization with updated language
        loadLocalization();
    };
    /**
     * Registers a listener for the language switch element.
     * @param langSwitch - The element that will be used to switch languages.
     */
    var registerLangSwitchListener = function (langSwitch) {
        if (langSwitch) {
            langSwitch.addEventListener('click', function (e) {
                if (e.target && e.target.matches('button[data-lang]')) {
                    var lang = e.target.getAttribute('data-lang');
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
//# sourceMappingURL=index.js.map