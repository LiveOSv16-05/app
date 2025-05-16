import React, { useState } from "react";

export default function SettingsApp({ theme, setTheme }) {
  const [wallpaper, setWallpaper] = useState(null);
  const [soundOn, setSoundOn] = useState(true);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function onWallpaperChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setWallpaper(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <h2>Settings</h2>
     

      <div style={{ marginTop: 20 }}>
        <label>
          Upload Wallpaper: <input type="file" onChange={onWallpaperChange} />
        </label>
        {wallpaper && (
          <div>
            <img src={wallpaper} alt="Wallpaper preview" width={200} />
            <button onClick={() => setWallpaper(null)}>Remove</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <label>
          <input
            type="checkbox"
            checked={soundOn}
            onChange={() => setSoundOn(!soundOn)}
          />
          Enable Sounds
        </label>
      </div>
    </div>
  );
}
