import React, { useState } from 'react';
import ReactJson from 'react-json-view';

interface JSONEditorProps {
  schema: object;
  onChange: (newSchema: object) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (e: any) => {
    try {
      onChange(e.updated_src);
      setError(null);
    } catch (err) {
      setError('Invalid JSON structure');
    }
  };

  return (
    <div className="p-4">
      <ReactJson
        src={schema}
        onEdit={handleEdit}
        onAdd={handleEdit}
        onDelete={handleEdit}
        theme="monokai"
        enableClipboard={false}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default JSONEditor;
