import { useEffect } from 'react';
import './ToolDetailsDrawer.css';

function ToolDetailsDrawer({ tool, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <aside
        className={`drawer ${isOpen ? 'open' : ''}`}
        onClick={(event) => event.stopPropagation()}
        aria-hidden={!isOpen}
      >
        <div className="drawer-header">
          <div>
            <p className="drawer-eyebrow">Tool Details</p>
            <h3>{tool?.name ?? 'Select a tool'}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close details">
            ?
          </button>
        </div>
        {tool && (
          <div className="drawer-body">
            <img src={tool.image} alt={tool.name} />
            <div className="drawer-meta">
              <span className="chip">{tool.category}</span>
              <span className="chip">{tool.toolNumber}</span>
              <span className="chip">${tool.price.toFixed(2)}</span>
            </div>
            <p>{tool.description}</p>
          </div>
        )}
      </aside>
    </div>
  );
}

export default ToolDetailsDrawer;
