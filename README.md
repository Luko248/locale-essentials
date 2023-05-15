# LocalEssentials

LocalEssentials is a JavaScript library for adding localization to web pages. It allows you to easily load and apply translations to the current page using JSON files for different languages.


## Installation

To use LocalEssentials in your project, you can install it via NPM by running the following command in your terminal:

```sh
npm install local-essentials
```


## Features

- Loads language files in JSON format from specified directory.
- Allows users to switch between available languages.
- Automatically detects user's preferred language and sets it as default.
- Uses `data-localize` attribute to identify elements that need to be localized.
- Falls back to default language if selected language file is not found.

## Usage

1. To use LocalEssentials, simply import it into your project and call the `localEssentials` function, passing in the path to the directory containing the language files and an optional language switch element.

```JavaScript
import { localize } from 'locale-essentials';

document.addEventListener('DOMContentLoaded', () => {
  localize('/path/to/lang/files/', document.getElementById('yourLangSwitchElement'));
});
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


## Licence

This library is licensed under the MIT License. See the LICENSE file for details.