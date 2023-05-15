### Localization with localize()

The localize() function is a JavaScript utility that allows you to easily add multi-language support to your web application. It works by loading language files in JSON format and using them to replace text content on the page.

## Features

- Loads language files in JSON format from specified directory.
- Allows users to switch between available languages.
- Automatically detects user's preferred language and sets it as default.
- Uses `data-localize` attribute to identify elements that need to be localized.
- Falls back to default language if selected language file is not found.

## Usage

1. Add the `localize()` function to your JavaScript code. The function takes one argument - the directory where your language files are located.

```JavaScript
import { localize } from 'localization-library';

localize('lang/');
```

2. Add the `data-localize` attribute to elements that need to be localized, with the key of the translation as the attribute value.

```HTML
<h1 data-localize="header-title">Title</h1>
<p data-localize="header-desc">Some description.</p>
```

3. Create language files in JSON format with translations for each key.
  - Save the files in the specified directory, using the language code as the file name (e.g. `en.json`, `fr.json`, etc.).
  - Use the same keys in each language file.

```json
// en.json
{
  "header-title": "Title",
  "header-desc": "Some description."
}

// fr.json
{
  "header-title": "Titre",
  "header-desc": "Une description."
}
```

4. (Optional) Add a language switcher to allow users to select their preferred language.
  - Create a button for each available language.
  - Add a `data-lang` attribute to each button with the language code as the attribute value.
  - Add an event listener to the language switcher that calls the `setLanguage()` function with the selected language code.

```html
<div id="langSwitch">
  <button data-lang="en">English</button>
  <button data-lang="fr">Français</button>
</div>
```

```JavaScript
const setLanguage = (language) => {
  // Set selected language as default
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

const registerLangSwitchListener = () => {
  const langSwitch = document.getElementById('langSwitch');
  langSwitch.addEventListener('click', (e) => {
    if (e.target.matches('button[data-lang]')) {
      const lang = e.target.getAttribute('data-lang');
      if (lang) {
        setLanguage(lang);
      }
    }
  });
};

registerLangSwitchListener();
```

## Licence

This library is licensed under the MIT License. See the LICENSE file for details.
