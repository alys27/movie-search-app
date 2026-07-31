import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce: query dəyişəndə 500ms gözləyib, sonra axtarış edirik
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // yeni axtarışda səhifəni sıfırlayırıq
    }, 500);

    return () => clearTimeout(timer); // cleanup: köhnə timer-i ləğv edirik
  }, [query]);

  // API çağırışı: debouncedQuery və ya page dəyişəndə işə düşür
  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    const controller = new AbortController();

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${debouncedQuery}&page=${page}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data.Response === 'False') {
          setMovies([]);
          setTotalResults(0);
          setError(data.Error);
        } else {
          setMovies(data.Search);
          setTotalResults(Number(data.totalResults));
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Xəta baş verdi, yenidən cəhd edin.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort(); // cleanup: köhnə sorğunu ləğv edirik
  }, [debouncedQuery, page]);

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