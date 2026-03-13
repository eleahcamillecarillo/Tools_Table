import { useEffect, useMemo, useState } from 'react';
import './App.css';
import toolsData from './data/tools.json';
import FilterBar from './components/FilterBar/FilterBar';
import ToolsTable from './components/ToolsTable/ToolsTable';
import Pagination from './components/Pagination/Pagination';
import ToolDetailsDrawer from './components/ToolDetailsDrawer/ToolDetailsDrawer';

const pageSizeOptions = [5, 10, 50, 'All'];

function App() {
  const [tools, setTools] = useState(toolsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTool, setSelectedTool] = useState(null);

  const categories = useMemo(
    () => ['All', ...new Set(toolsData.map((tool) => tool.category))],
    []
  );

  const filteredTools = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!normalizedTerm) return true;

      const searchable = `${tool.name} ${tool.category} ${tool.toolNumber} ${tool.price}`.toLowerCase();
      return searchable.includes(normalizedTerm);
    });
  }, [tools, searchTerm, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, pageSize]);

  const normalizedPageSize = pageSize === 'All' ? 'All' : Number(pageSize);
  const totalPages =
    normalizedPageSize === 'All'
      ? 1
      : Math.max(1, Math.ceil(filteredTools.length / normalizedPageSize));

  const paginatedTools =
    normalizedPageSize === 'All'
      ? filteredTools
      : filteredTools.slice(
          (currentPage - 1) * normalizedPageSize,
          currentPage * normalizedPageSize
        );

  const handleReorder = (draggedId, targetId) => {
    const dragged = Number(draggedId);
    const target = Number(targetId);

    setTools((prev) => {
      const fromIndex = prev.findIndex((tool) => tool.id === dragged);
      const toIndex = prev.findIndex((tool) => tool.id === target);

      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        return prev;
      }

      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="hero-tag">My Tools Table</p>
          <h1>Camille's ToolBox</h1>
          <p>
            Browse, filter, and reorder your tools with a smooth, responsive
            interface.
          </p>
        </div>
        <div className="hero-card">
          <div>
            <h3>{filteredTools.length}</h3>
            <span>Tools ready</span>
          </div>
          <div>
            <h3>{categories.length - 1}</h3>
            <span>Categories</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalCount={tools.length}
          filteredCount={filteredTools.length}
        />

        <ToolsTable
          tools={paginatedTools}
          onRowClick={setSelectedTool}
          onReorder={handleReorder}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(value) => setPageSize(value)}
          pageSizeOptions={pageSizeOptions}
        />
      </main>

      <ToolDetailsDrawer
        tool={selectedTool}
        isOpen={Boolean(selectedTool)}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  );
}

export default App;
