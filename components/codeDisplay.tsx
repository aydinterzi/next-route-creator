"use client";

import { useRef } from "react";

const CodeDisplay: React.FC<{ code: string }> = ({ code }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-md shadow-md text-white">
      <h2 className="mb-2 font-bold">Generated Code:</h2>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={code}
          readOnly
          className="w-full h-64 p-2 bg-gray-800 rounded text-sm focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 px-4 py-1 bg-blue-500 rounded text-white focus:outline-none"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default CodeDisplay;
