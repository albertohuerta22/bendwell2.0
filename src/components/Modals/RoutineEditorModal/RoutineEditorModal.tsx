import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './RoutineEditorModal.scss';

interface Stretch {
  id: string;
  name: string;
  stretchimages: string;
  target: string;
}

interface RoutineEditorModalProps {
  stretches: Stretch[];
  onClose: () => void;
  onSave: (updatedStretches: Stretch[]) => void;
  onAddStretch: () => void;
}

const RoutineEditorModal: React.FC<RoutineEditorModalProps> = ({
  stretches,
  onClose,
  onSave,
  onAddStretch,
}) => {
  const [localStretches, setLocalStretches] = useState(stretches);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="routine-editor-overlay">
      <div className="routine-editor-modal">
        <h2>Edit Routine</h2>
        <div className="routine-editor-carousel">
          {localStretches.map((stretch, index) => (
            <div
              key={`${stretch.id}-${index}`}
              className={`routine-editor__card 
    ${draggedIndex === index ? 'dragging' : ''} 
    ${hoveredIndex === index ? 'hovered' : ''}`}
              draggable
              onDragStart={() => setDraggedIndex(index)}
              onDragEnter={() => setHoveredIndex(index)}
              onDragLeave={() => setHoveredIndex(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (draggedIndex === null || draggedIndex === index) return;

                const updated = [...localStretches];
                const draggedItem = updated[draggedIndex];
                updated.splice(draggedIndex, 1);
                updated.splice(index, 0, draggedItem);
                setLocalStretches(updated);
                setDraggedIndex(null);
                setHoveredIndex(null);
              }}
              onDragEnd={() => {
                setDraggedIndex(null);
                setHoveredIndex(null);
              }}
            >
              <img src={stretch.stretchimages} alt={stretch.name} />
              <p>{stretch.name}</p>
            </div>
          ))}
        </div>
        <div className="routine-editor-actions">
          <button onClick={onAddStretch}>+</button>
          <button className="save" onClick={() => onSave(localStretches)}>
            Save
          </button>
          <button className="close" onClick={onClose}>
            Cancel
          </button>
        </div>
        <div
          className="routine-editor-trash"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (draggedIndex !== null) {
              const updated = [...localStretches];
              updated.splice(draggedIndex, 1); // remove the dragged item
              setLocalStretches(updated);
              setDraggedIndex(null);
              setHoveredIndex(null);
            }
          }}
        >
          🗑️
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default RoutineEditorModal;
