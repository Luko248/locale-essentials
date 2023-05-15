Localization
A simple localization library for web applications.

Installation
To install the library, use npm:

bash
Copy code
npm install @your-username/localization
Usage
To use the library, import it and call the initLocalization function, passing in the path to the directory containing the language JSON files:

typescript
Copy code
import { initLocalization } from '@your-username/localization';

initLocalization('/path/to/lang/files/');
Language Files
Language files should be named using the ISO 639-1 language code and have a .json file extension. For example, the language file for English should be named en.json.

The contents of each language file should be a JSON object with string keys and string values. The keys correspond to the localization keys used in the HTML, and the values are the localized strings.

json
Copy code
{
  "greeting": "Hello, world!",
  "farewell": "Goodbye, world!"
}
Localization Keys
Localization keys are specified in the HTML using the data-localize attribute:

html
Copy code
<p data-localize="greeting"></p>
When the library is initialized, it will replace the text content of all elements with a data-localize attribute with the corresponding localized string from the language file.

Language Switching
The library includes a simple language switcher that allows the user to switch between languages. To use the language switcher, add a container element with the ID langSwitch and button elements with the data-lang attribute set to the ISO 639-1 language code for each supported language.

html
Copy code
<div id="langSwitch">
  <button data-lang="en">English</button>
  <button data-lang="fr">Français</button>
</div>
When a button is clicked, the library will switch to the corresponding language and update the text content of all elements with a data-localize attribute. The selected language will be stored in local storage and added to the URL as a query parameter.

License
This library is licensed under the MIT License.