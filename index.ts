interface Translations {
    [key: string]: string;
}

interface LocalizeOptions {
    langDirectory: string;
    defaultLanguage?: string;
    langSwitch?: HTMLElement;
  }

  export const localize = (options: LocalizeOptions): void => {
    const { langDirectory, defaultLanguage = 'en', langSwitch } = options;
  
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
          const xhrDefault = new XMLHttpRequest();
          xhrDefault.open('GET', `${langDirectory}${defaultLanguage}.json`);
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
      const localizedElements = document.querySelectorAll('[data-localize], [data-localize-placeholder], [data-localize-aria-label], [data-localize-title]');
      localizedElements.forEach((element: Element) => {
        const key = element.getAttribute('data-localize');
        const placeholderKey = element.getAttribute('data-localize-placeholder');
        const ariaLabelKey = element.getAttribute('data-localize-aria-label');
        const titleKey = element.getAttribute('data-localize-title');
    
        if (key && translations[key]) {
          const tagName = element.tagName.toLowerCase();
          const attributesToTranslate = ['title', 'aria-label', 'placeholder'];
    
          if (attributesToTranslate.includes(tagName)) {
            if (placeholderKey && tagName === 'input') {
              (element as HTMLInputElement).placeholder = translations[placeholderKey];
            } else if (ariaLabelKey && tagName === 'input') {
              element.setAttribute('aria-label', translations[ariaLabelKey]);
            } else if (titleKey) {
              element.setAttribute('title', translations[titleKey]);
            }
          } else {
            element.textContent = translations[key];
          }
        }
      });
    };
    
    const setLanguage = (language: string): void => {
      localStorage.setItem('language', language);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('lang', language);
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
      document.documentElement.lang = language;
      loadLocalization();
    };
  
    const registerLangSwitchListener = (langSwitch?: HTMLElement): void => {
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
    registerLangSwitchListener(langSwitch);
  };
  