import React, { useState } from "react";

const fileStructure = {
  name: "root",
  files: [
    { name: "baby_photo.jpg", type: "file", src: "/photos/baby.jpg" },
    {
      name: "school_years",
      type: "folder",
      files: [
        { name: "school1.jpg", type: "file", src: "/photos/school1.jpg" },
        { name: "school2.jpg", type: "file", src: "/photos/school2.jpg" },
      ],
    },
    {
      name: "travel",
      type: "folder",
      files: [
        { name: "paris.jpg", type: "file", src: "/photos/paris.jpg" },
      ],
    },
  ],
};

function FolderView({ folder, onOpenFile }) {
  const [openFolders, setOpenFolders] = useState({});

  function toggleFolder(name) {
    setOpenFolders(prev => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <div style={{ paddingLeft: 10 }}>
      {folder.files.map((item) =>
        item.type === "folder" ? (
          <div key={item.name}>
            <div
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => toggleFolder(item.name)}
            >
              📁 {item.name}
            </div>
            {openFolders[item.name] && (
              <FolderView folder={item} onOpenFile={onOpenFile} />
            )}
          </div>
        ) : (
          <div
            key={item.name}
            style={{ cursor: "pointer", marginLeft: 20 }}
            onClick={() => onOpenFile(item.src)}
          >
            📄 {item.name}
          </div>
        )
      )}
    </div>
  );
}

export default function FileExplorerApp() {
  const [openedFile, setOpenedFile] = useState(null);

  return (
    <div>
      <h2>File Explorer</h2>
      <FolderView folder={fileStructure} onOpenFile={setOpenedFile} />

      {openedFile && (
        <div style={{ marginTop: 20 }}>
          <img src={openedFile} alt="Opened file" width={300} />
          <button onClick={() => setOpenedFile(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
