# React Movie Search

Building a React application with search, loading/error states, and pagination that connects to the OMDb API.

## Features

- Search movies by title (OMDb API)
- Debounced search input (500ms) — avoids excessive API calls
- Separate loading, error, and empty states
- Pagination (Prev/Next)
- Custom hook (`useMovies`) for data fetching
- Request cancellation with AbortController to prevent race conditions

## Tech Stack

- React 18
- Vite
- OMDb API

## Project Structure

```
src/
  components/
    SearchBar.jsx
    ResultsList.jsx
    Card.jsx
    Pagination.jsx
  hooks/
    useMovies.js
  App.jsx
  App.css
  index.css
  main.jsx
```

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/alys27/react-movie-search.git
cd react-movie-search
```

2. Install dependencies:
```bash
npm install
```

3. Get a free API key from [OMDb API](https://www.omdbapi.com/apikey.aspx)

4. Create a `.env` file in the root directory:
```
VITE_OMDB_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open `http://localhost:5173` in your browser

## Screenshots

![Search results](./screenshots/Screenshot%202026-08-03%20180827.png)
![Empty state](./screenshots/Screenshot%202026-08-03%20181255.png)

## Notes

- Debounce prevents an API call on every keystroke.
- AbortController cancels stale requests, preventing race conditions (e.g. typing "Bat" then "Batman" quickly).
- Loading, error, and empty states are handled separately with distinct UI feedback.