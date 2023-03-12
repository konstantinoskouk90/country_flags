# Country Flags

Displays a list of all countries

## Features

- See all countries on the homepage
- Search for a country using a search `input` field
- Filter countries by region
- Sort countries by population (Most-Less / Less-Most) and name (A-Z / Z-A)
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page

### `yarn install`

Installs all project dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Assumptions

- Sorting the countries was not depicted in the designs. I added it next to the filtering on the home page.
- The country flags were not the same aspect ratio, however I tried to make them occupy the entirety of the country card component's width and matched the height to achieve consistency.
- When filtering the sorting is preserved, however the search result is not and the search field is cleared.
- When sorting both the filtering and searching are preserved.
- When searching both the filtering and sorting are preserved.
- Pagination is not depicted in the designs. The application renders almost instantly and therefore pagination in the front end has not been implemented. Pagination via an endpoint might have helped speed things up from a fetching point of view and decrease the size of the response body, but since the endpoint we are using does not allow for that we fetch all country data using a single call and render it. The number of countries is more or less a constant number and thus we are guaranteed the same rendering speed in the future. If this data was more dynamic and likely to fluctuate significantly, in my opinion, front end pagination would have been required to guarantee the same rendering speed irrespective of the data we get back from the API.

## Design Changes

- The button that takes users back to the home page contained the text 'Back', however due to the country details page being a dynamic URL, changing the text to saying 'All Countries' made more sense to me as 'Back' does not apply if the first page they land on is the country details pages.
- The width of the search, sort, filter components has been changed to 100% on mobile as I found it to be more consistent and provides users with more space to tap on. This change was mainly made due to the addition of the sorting component which is not depicted in the designs.

I would double-check with the designer for both of the above changes. Any change to the designs needs to be justified.

## Trade-offs

- The pages as a whole have not been tested, instead I focused on testing the components which consist the home page at an individual level due to time constraints. *Therefore code coverage is not what it should be*. Testing the pages as a whole would require significantly more time. Had I had done it I would have focused on initial rendering of the data and combinations of interactions. Example: Search for a country and then change the region and check the results are what they should be or Change the region and make sure the search input field is cleared.
