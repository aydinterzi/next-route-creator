"use client";

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

interface FolderFormProps {
  folder: Folder;
  onChange: (updatedFolder: Folder) => void;
  onDelete?: () => void;
}
const FolderForm: React.FC<FolderFormProps> = ({
  folder,
  onChange,
  onDelete,
}) => {
  const handleFolderNameChange = (newFolderName: string) => {
    onChange({ ...folder, folderName: newFolderName });
  };

  const handleFileTypesChange = (name: keyof FileTypes, value: boolean) => {
    onChange({ ...folder, files: { ...folder.files, [name]: value } });
  };

  const handleSubFolderDelete = (index: number) => {
    const newSubFolders = [...folder.subFolders];
    newSubFolders.splice(index, 1);
    onChange({ ...folder, subFolders: newSubFolders });
  };

  const handleAddSubFolder = () => {
    const newSubFolders = [
      ...folder.subFolders,
      {
        folderName: "",
        files: { page: true, layout: false, loading: false, error: false },
        subFolders: [],
      },
    ];
    onChange({ ...folder, subFolders: newSubFolders });
  };

  const handleSubFolderChange = (index: number, updatedSubFolder: Folder) => {
    const newSubFolders = [...folder.subFolders];
    newSubFolders[index] = updatedSubFolder;
    onChange({ ...folder, subFolders: newSubFolders });
  };

  return (
    <div className="border p-4 mb-4">
      <label>
        Folder Name:
        <input
          type="text"
          value={folder.folderName}
          onChange={(e) => handleFolderNameChange(e.target.value)}
          className="border ml-2"
        />
      </label>
      <br />
      File Types:
      <label>
        <input type="checkbox" name="page" checked readOnly className="ml-2" />{" "}
        page.tsx
      </label>
      <label>
        <input
          type="checkbox"
          name="layout"
          checked={folder.files.layout}
          onChange={(e) => handleFileTypesChange("layout", e.target.checked)}
          className="ml-2"
        />{" "}
        layout.tsx
      </label>
      <label>
        <input
          type="checkbox"
          name="loading"
          checked={folder.files.loading}
          onChange={(e) => handleFileTypesChange("loading", e.target.checked)}
          className="ml-2"
        />{" "}
        loading.tsx
      </label>
      <label>
        <input
          type="checkbox"
          name="error"
          checked={folder.files.error}
          onChange={(e) => handleFileTypesChange("error", e.target.checked)}
          className="ml-2"
        />{" "}
        error.tsx
      </label>
      <button
        type="button"
        onClick={handleAddSubFolder}
        className="mt-2 bg-blue-500 text-white px-2 py-1"
      >
        Add Sub Folder
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="mt-2 bg-red-500 text-white px-2 py-1 ml-2"
        >
          Delete Folder
        </button>
      )}
      {folder.subFolders.map((subFolder, index) => (
        <div key={index} className="ml-4 mt-4">
          <FolderForm
            folder={subFolder}
            onChange={(updatedFolder) =>
              handleSubFolderChange(index, updatedFolder)
            }
            onDelete={() => handleSubFolderDelete(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default FolderForm;
