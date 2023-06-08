"use client";

import { FormEvent, useState } from "react";
import FolderForm from "./folderform";

interface FileTypes {
  page: boolean;
  layout: boolean;
  loading: boolean;
  error: boolean;
}

interface Folder {
  folderName: string;
  files: FileTypes;
  subFolders: Folder[];
}

function Form() {
  const [folders, setFolders] = useState<Folder[]>([
    {
      folderName: "",
      files: { page: true, layout: false, loading: false, error: false },
      subFolders: [],
    },
  ]);

  function generateCommands(folders: Folder[], root: string = "app"): string[] {
    let commands: string[] = [];

    for (let folder of folders) {
      let folderPath = `${root}/${folder.folderName}`;
      commands.push(`mkdir -p ${folderPath}`);

      if (folder.files.page) {
        commands.push(`touch ${folderPath}/page.tsx`);
      }
      if (folder.files.layout) {
        commands.push(`touch ${folderPath}/layout.tsx`);
      }
      if (folder.files.loading) {
        commands.push(`touch ${folderPath}/loading.tsx`);
      }
      if (folder.files.error) {
        commands.push(`touch ${folderPath}/error.tsx`);
      }

      if (folder.subFolders.length > 0) {
        commands = [
          ...commands,
          ...generateCommands(folder.subFolders, folderPath),
        ];
      }
    }

    return commands;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(folders);
    const commands = generateCommands(folders);
    console.log(commands.join("\n"));
  };

  const handleFolderChange = (index: number, updatedFolder: Folder) => {
    const newFolders = [...folders];
    newFolders[index] = updatedFolder;
    setFolders(newFolders);
  };

  const handleAddFolder = () => {
    setFolders([
      ...folders,
      {
        folderName: "",
        files: { page: true, layout: false, loading: false, error: false },
        subFolders: [],
      },
    ]);
  };

  const handleDeleteFolder = (index: number) => {
    const newFolders = [...folders];
    newFolders.splice(index, 1);
    setFolders(newFolders);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {folders.map((folder, index) => (
        <FolderForm
          key={index}
          folder={folder}
          onChange={(updatedFolder) => handleFolderChange(index, updatedFolder)}
          onDelete={() => handleDeleteFolder(index)}
        />
      ))}
      <button
        type="button"
        onClick={handleAddFolder}
        className="mt-2 bg-blue-500 text-white px-2 py-1"
      >
        Klasör Ekle
      </button>
      <button
        type="submit"
        className="mt-2 bg-red-500 text-white px-2 py-1 ml-2"
      >
        Oluştur
      </button>
    </form>
  );
}

export default Form;
