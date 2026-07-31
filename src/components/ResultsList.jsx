import Card from './Card';

function ResultsList({ movies }) {
  return (
    <div className="results-list">
      {movies.map((movie) => (
        <Card key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default ResultsList;