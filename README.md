# PhraseAppLandingPage

## Development
To start development version of demo app run these commands in project's root directory (`yarn` library is required):
- `yarn`
- `yarn start`

Then, you can navigate to [http://localhost:8080/](http://localhost:8080/) in your browser.

## Notes

###Styling: 
- use of REM font size for responsive control sizes for fonts
- we do not use `ID` selector as they are saved inside window object, so if there is no need to polute `window` it's preferable to use `class` instead of `ID`