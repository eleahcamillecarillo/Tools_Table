import { useState } from 'react';
import './ToolsTable.css';

const columns = [
  { key: 'name', label: 'Tool Name' },
  { key: 'category', label: 'Category' },
  { key: 'toolNumber', label: 'Tool Number' },
  { key: 'price', label: 'Price' },
];

function ToolsTable({ tools, onRowClick, onReorder }) {
  const [dragOverId, setDragOverId] = useState(null);

  const handleDragStart = (event, toolId) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', toolId);
  };

  const handleDragOver = (event, toolId) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverId(toolId);
  };

  const handleDrop = (event, toolId) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    if (draggedId && draggedId !== toolId) {
      onReorder(draggedId, toolId);
    }
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDragOverId(null);
  };

  return (
    <div className="table-card">
      <div className="table-caption">
        <span>Drag rows to rearrange the order.</span>
      </div>
      <div className="table-wrapper">
        <table className="tools-table">
          <thead>
            <tr>
              <th aria-label="Reorder" className="drag-col">Reorder</th>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr
                key={tool.id}
                className={dragOverId === tool.id ? 'drag-over' : ''}
                onClick={() => onRowClick(tool)}
                onDragOver={(event) => handleDragOver(event, tool.id)}
                onDrop={(event) => handleDrop(event, tool.id)}
              >
                <td data-label="Reorder" className="drag-col">
                  <button
                    type="button"
                    className="drag-handle"
                    draggable
                    onDragStart={(event) => handleDragStart(event, tool.id)}
                    onDragEnd={handleDragEnd}
                    aria-label={`Drag to reorder ${tool.name}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    ??
                  </button>
                </td>
                <td data-label="Tool Name">
                  <div className="tool-cell">
                    <img src={tool.image} alt={tool.name} />
                    <span>{tool.name}</span>
                  </div>
                </td>
                <td data-label="Category">{tool.category}</td>
                <td data-label="Tool Number">{tool.toolNumber}</td>
                <td data-label="Price">${tool.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ToolsTable;
