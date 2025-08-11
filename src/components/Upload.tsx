import React from 'react';

interface Props {
  onUpload: (files: FileList) => void;
}

/**
 * Componente simples de upload de arquivos. Recebe uma função de callback
 * que será chamada com os arquivos selecionados pelo usuário.
 */
const Upload: React.FC<Props> = ({ onUpload }) => {
  return (
    <input
      type="file"
      multiple
      onChange={(e) => {
        if (e.target.files) {
          onUpload(e.target.files);
        }
      }}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  );
};

export default Upload;