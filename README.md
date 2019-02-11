This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Currency Converter

Currency Converter allows you to calculate how much other currency you can get based on up to date exchange rates.

## Development

Before start please run:

### `yarn install`

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn mock`

In a localhost development API calls are mocked with a mockserver. It saves the monthly API calls limit to be used for testing build and production only.

Currently only EUR, USD and PLN currencies are mocked in the /latest endpoint and all available currencies in /symbols endpoint.

Check out /mocks folder for more information.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

To generate code coverate, please run:

### `yarn test -- --coverage`

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## API

App uses fixer.io API service, please add your API key to .env based on .env.example

## Possible improvements

- Don't fetch rates/currencies if already in store
- Add search / autocomplete in CurrencySelect component
- Handle different types of errors properly, currently only API call errors are handled on the UI
- Add reselect for selectors
- Write e2e tests
