# LocaleEssentials

LocaleEssentials is a localization library that provides functionality for easily localizing your web application. It allows you to load language files and dynamically update the content based on the selected language.


## Features

- Loads language files in JSON format from specified directory.
- Allows users to switch between available languages.
- Automatically detects user's preferred language and sets it as default.
- Uses `data-localize` attribute to identify elements that need to be localized.
- Falls back to default language if selected language file is not found.


## Getting Started

To use LocaleEssentials, follow these steps:

1. Install the LocaleEssentials library in your project:
```sh
npm install locale-essentials
```

2. Import the `localize` function into your project:

```JavaScript
import { localize } from 'locale-essentials';
```

3. Call the `localize` function, passing in the following options as a single object parameter:
- `langDirectory` (required): The path to the directory containing the language files.
- `defaultLanguage` (optional): The default language to use as a fallback. If not provided, English ('en') will be used as the default.
- `langSwitch` (optional): An optional language switch element that allows users to change the language.

Example usage:
```JavaScript
localize({
  langDirectory: 'path/to/language/files/',
  defaultLanguage: 'fr',
  langSwitch: document.getElementById('lang-switch')
});
```

## Language Files

LocaleEssentials expects language files to be in JSON format and follow a specific structure. Each language file should contain key-value pairs where the keys represent the translation keys and the values represent the translated strings.

Example language file (`en.json`):

```json
{
  "greeting": "Hello!",
  "message": "Welcome to our website.",
  "button": "Click Me"
}
```

## HTML Markup

To enable localization in your HTML markup, use the `data-localize` attribute on the elements that need to be localized. The value of the attribute should correspond to the translation key in the language files.

```HTML
<h1 data-localize="greeting"></h1>
<p data-localize="message"></p>
<button data-localize="button"></button>
```

When the `localize` function is called, it will update the content of these elements based on the selected language.


## Language Switch (optional)

If you provide a language switch element (`langSwitch`) in the `localize` function options, LocaleEssentials will enable the functionality to switch between different languages. The language switch element should contain buttons or links with a `data-lang` attribute specifying the language code.

```HTML
<div id="lang-switch">
  <button data-lang="en">English</button>
  <button data-lang="fr">Français</button>
</div>
```
When a language button is clicked, the `localize` function will be called with the selected language, and the content will be updated accordingly.


## Licence

This library is licensed under the MIT License.