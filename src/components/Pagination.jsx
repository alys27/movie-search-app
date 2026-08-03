function Pagination({ page, totalResults, onPageChange }) {
  const totalPages = Math.ceil(totalResults / 10); 

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>
        ← Əvvəlki
      </button>
      <span> Səhifə {page} / {totalPages} </span>
      <button onClick={handleNext} disabled={page >= totalPages}>
        Növbəti →
      </button>
    </div>
  );
}

export default Pagination;