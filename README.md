# taboola-ihp-dashboard

Performance testing dashboard for Taboola. Built with Typescript and Next.js.

## Project Structure

### pages

Holds our Next.js page components, custom `_app` and `_document` components.

- `_app` - is in charge of the global state of the app, which we hook into with the `useContext()` function from the React hooks API
- `_document` - custom document component that allows us to use styled-components on the server
- `index` - currently renders only one working link, but will eventually be a launch point for the entire dashboard
- `analysis/index` - renders the pub search page
- `analysis/mode-list` - renders the report of all of the modes for the current publisher
- `analysis/mode-placements` - renders the report of all of the placement info per mode for the current publisher
- `analysis/mode-usage` - renders the report that separates modes in to "inactive" and "active" categories
- `analysis/mode-views` - renders the report that shows page views per mode

### public

Holds our static assets (currently just images).

### utils

Utility functions to be used throughout the application.

- `downloadCSV` - takes the current report and downloads it to the user's machine as a CSV file
- `formatNumber` - formats the number as a localeString in the user's browser language

### .env

Necessary keys:

```
BACKEND_URL
PUBCRAWL_BACKEND_URL
CLIENT_ID
BACKSTAGE_API_URL
AUTHENTICATION_URL
AUTHENTICATION_PATHNAME
RESPONSE_TYPE
```

### lib

Internal app libraries, hooks, HOC's, and contexts.

- `Adapter` - library for requesting data from the server
- `*Context` - files for creating context for different pieces of global state
- `global.d.ts` - global type definitions
- `withAuth/withPublisher` - HOC's that redirect the user if certain required pieces of global state are missing
- `hooks/*Effect` - files containing the data fetching effects for their corresponding components

### components

All of the components used throught the app. They will be divided by section corresponding to the paths in the `pages/` directory.
