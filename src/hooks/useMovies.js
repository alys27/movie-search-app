import { useState, useEffect } from 'react';

function useMovies(query, page) {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
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
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`,
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

    return () => controller.abort();
  }, [query, page]);

  return { movies, totalResults, loading, error };
}

export default useMovies;