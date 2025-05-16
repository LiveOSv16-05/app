import React, { useState, useCallback } from "react";
import Window from "./Window";
import TerminalApp from "./TerminalApp";
import GalleryApp from "./GalleryApp";
import EmailApp from "./EmailApp";
import FileExplorerApp from "./FileExplorerApp";
import MusicPlayerApp from "./MusicPlayerApp";
import SettingsApp from "./SettingsApp";

const apps = [
  {
    id: "terminal",
    name: "Terminal",
    icon: "🖥️",
    component: TerminalApp,
    windowSize: { width: "70vw", height: "60vh" }
  },
  {
    id: "gallery",
    name: "Gallery",
    icon: "🖼️",
    component: GalleryApp,
    windowSize: { width: "80vw", height: "70vh" }
  },
  {
    id: "email",
    name: "Mail",
    icon: "✉️",
    component: EmailApp,
    windowSize: { width: "60vw", height: "60vh" }
  },
  {
    id: "fileexplorer",
    name: "File Explorer",
    icon: "📁",
    component: FileExplorerApp,
    windowSize: { width: "75vw", height: "70vh" }
  },
  {
    id: "musicplayer",
    name: "Music Player",
    icon: "🎵",
    component: MusicPlayerApp,
    windowSize: { width: "60vw", height: "50vh" }
  },
  {
    id: "settings",
    name: "Settings",
    icon: "⚙️",
    component: SettingsApp,
    windowSize: { width: "50vw", height: "50vh" }
  },
];

export default function Desktop() {
  const [openApps, setOpenApps] = useState([]);

  const openApp = useCallback(
    (app) => {
      if (openApps.find((a) => a.id === app.id)) return;
      setOpenApps((o) => [...o, app]);
    },
    [openApps]
  );

  const closeApp = useCallback((id) => {
    setOpenApps((o) => o.filter((a) => a.id !== id));
  }, []);

  function openAppFromTerminal(name) {
    const app = apps.find((a) => a.id === name);
    if (app) openApp(app);
  }

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage:
            "linear-gradient(135deg, #0a1931, #001122), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          padding: 20,
          color: "#aaf",
          fontFamily: "'Courier New', Courier, monospace",
          userSelect: "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            maxWidth: 400,
          }}
        >
          {apps.map((app) => (
            <div
              key={app.id}
              onDoubleClick={() => openApp(app)}
              style={{
                cursor: "pointer",
                userSelect: "none",
                textAlign: "center",
                color: "#aaf",
                textShadow: "0 0 10px #66f",
                fontSize: 24,
                width: 70,
                transition: "transform 0.2s, filter 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2)";
                e.currentTarget.style.filter = "drop-shadow(0 0 6px #88f)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "none";
              }}
            >
              <div>{app.icon}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>{app.name}</div>
            </div>
          ))}
        </div>

        {/* Welcome message */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 20,
            fontSize: 20,
            color: "#77a",
            textShadow: "0 0 10px #446",
          }}
        >
          Welcome to LifeOS:v16.05, Suraj 💖
        </div>

        {/* Open apps windows */}
        {openApps.map((app) => {
          const Component = app.component;
          return (
            <Window
              key={app.id}
              title={app.name}
              onClose={() => closeApp(app.id)}
              style={app.windowSize}
            >
              <Component openAppFromTerminal={openAppFromTerminal} />
            </Window>
          );
        })}

        {/* Taskbar */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            boxShadow: "0 -2px 10px #00f",
            fontFamily: "'Courier New', Courier, monospace",
            color: "#0ff",
            fontWeight: "bold",
            userSelect: "none",
            gap: 10,
          }}
        >
          {openApps.length === 0 && <div>No apps running</div>}
          {openApps.map((app) => (
            <div
              key={app.id}
              onClick={() => closeApp(app.id)}
              title={`Click to close ${app.name}`}
              style={{
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: 4,
                backgroundColor: "#0077ff33",
                userSelect: "none",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#00f")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0077ff33")
              }
            >
              {app.icon} {app.name}
            </div>
          ))}

          {/* Clock */}
          <div style={{ marginLeft: "auto", fontSize: 14, color: "#0ff" }}>
            <Clock />
          </div>
        </div>
      </div>
    </>
  );
}

function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return time.toLocaleTimeString();
}
