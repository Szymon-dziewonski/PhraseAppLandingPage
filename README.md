# PhraseAppLandingPage

Demo contains structured project with many features. 

## Development
To start development version of demo app run these commands in project's root directory (`yarn` library is required):
- `yarn`
- `yarn start`

Then, you can navigate to [http://localhost:8080/](http://localhost:8080/) in your browser.

## Production

- `yarn build` 

##Testing

- `yarn test`

## Notes

###Javascript :

- minification html,js,css 
- minify classNames for css
- handling of assets with webpack
- testing with jest

###Styling (scss): 

- bootstrap grid only used for flexbox features for faster building (custom breakpoints and column numbers)
- use of REM font size for responsive control sizes for fonts
- we do not use `ID` selector as they are saved inside window object, so if there is no need to polute `window` it's preferable to use `class` instead of `ID`

### SEO 

- we used aria tags for tabs on header section
- html5 tags semantically structured document
- since it is demo app there is much more to do in terms of SEO (schemas, favicons, robots.txt, sitemaps etc).