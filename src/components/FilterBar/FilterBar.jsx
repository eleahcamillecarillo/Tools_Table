import './FilterBar.css';

function FilterBar({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  totalCount,
  filteredCount,
}) {
  return (
    <section className="filter-bar">
      <div className="filter-title">
        <h2>Tools Inventory</h2>
        <p>Search by name, category, tool number, or price.</p>
      </div>
      <div className="filter-controls">
        <label className="filter-field">
          <span>Search</span>
          <input
            type="search"
            placeholder="Search tools, categories, numbers, prices..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <label className="filter-field">
          <span>Category</span>
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <div className="filter-meta">
          <span>{filteredCount} of {totalCount} tools</span>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
