import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination';
import useMovies from './hooks/useMovies';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { movies, totalResults, loading, error } = useMovies(debouncedQuery, page);

  return (
    <div className="app">
      <h1>Film Axtarışı</h1>
      <SearchBar onSearch={setQuery} />

      {loading && <p>Yüklənir...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && debouncedQuery && movies.length === 0 && (
        <p>Nəticə tapılmadı.</p>
      )}

      <ResultsList movies={movies} />

      {movies.length > 0 && (
        <Pagination
          page={page}
          totalResults={totalResults}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default App;