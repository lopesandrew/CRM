import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Editor de Markdown simples com pré-visualização. Usa react-markdown
 * para renderizar a prévia ao lado do textarea.
 */
const MarkdownEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded h-64 w-full resize-none"
      />
      <div className="prose dark:prose-invert border p-2 h-64 overflow-y-auto">
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;