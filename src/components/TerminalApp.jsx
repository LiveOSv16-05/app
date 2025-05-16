import React, { useState, useRef, useEffect } from 'react';

const birthdayJokes = [
  "Why did the computer get glasses? To improve its web sight! 🤓",
  "I would tell you a UDP joke... but you might not get it. 😅",
  "Why do Java developers wear glasses? Because they don't see sharp! 👓",
  "You know you're getting old when your code has more comments than logic. 🎉",
  "Why did the function break up with the loop? Too many iterations! 💔",
];

const motivationalQuotes = [
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  "Our future is invented, not discovered. – Jensen Huang",
  "Greatness comes from character and courage. – Jensen Huang",
  "Do what others don’t. It’s your advantage. – Jensen Huang",
  "Every great journey begins with a single GPU. – Probably Jensen Huang 🧠💻",
];

const processList = [
  { pid: 1, name: "liveos", status: "running" },
  { pid: 42, name: "you", status: "running" },
  { pid: 1337, name: "me", status: "sleeping" },
];

export default function TerminalApp({ openAppFromTerminal }) {
  const [history, setHistory] = useState([
    "LiveOS v16.05 booting...",
    "[0.001s] Initializing birthday kernel... 🎂",
    "[3.000s] First memory block loaded: cake.gif 🍰",
    "Type 'help' to see available commands.",
  ]);
  const [input, setInput] = useState('');
  const terminalEnd = useRef(null);

  useEffect(() => {
    terminalEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  function addHistory(line) {
    setHistory((h) => [...h, line]);
  }

  function showHelp() {
    const helpText = `
Available Commands:

help         - Show this help message with command descriptions.
birthday     - Show a fun birthday fact or message.
sing         - Sing a birthday tune!
echo [text]  - Repeat your message.
date         - Show the current date and time.
reboot       - Reboot the LiveOS simulator (reload page).
clear        - Clear the terminal screen.
ps           - List running 'processes' in LiveOS.
calendar     - Display the calendar for the current month.
open [app]   - Open an app by name (e.g. open gallery, open email).
joke         - Hear a funny birthday or geek joke.
quote        - Show an inspiring birthday quote.
fortune      - Get a motivational fortune cookie message.
word         - Show the Word of the Day link.


    `.trim();
    addHistory(helpText);
  }

  function showCalendar() {
    const today = new Date();
    const calendar = [];
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    calendar.push(days.join(" ") + "\n");

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    let week = Array(7).fill("  ");
    for (let i = 0; i < firstDay; i++) week[i] = "  ";

    for (let date = 1, i = firstDay; date <= lastDate; date++, i++) {
      week[i % 7] = (date < 10 ? " " : "") + date;
      if (i % 7 === 6 || date === lastDate) {
        calendar.push(week.join(" ") + "\n");
        week = Array(7).fill("  ");
      }
    }
    addHistory(calendar.join(""));
  }

  function showPs() {
    addHistory(
      "PID   NAME     STATUS\n" +
      processList.map(p => `${p.pid.toString().padEnd(5)} ${p.name.padEnd(8)} ${p.status}`).join("\n")
    );
  }

  function openApp(name) {
    if (!openAppFromTerminal) {
      addHistory("Open command not supported here.");
      return;
    }
    const lower = name.toLowerCase();
    const validApps = ["terminal", "gallery", "email"];
    if (validApps.includes(lower)) {
      openAppFromTerminal(lower);
      addHistory(`Opening ${name}...`);
    } else {
      addHistory(`App '${name}' not found.`);
    }
  }

  function tellJoke() {
    addHistory(birthdayJokes[Math.floor(Math.random() * birthdayJokes.length)]);
  }

  function echoText(args) {
    addHistory(args.join(" "));
  }

  function singSong() {
    const song = `🎶 Happy birthday to you!\nHappy birthday to you!\nHappy birthday dear Suraj,\nLiveOS celebrates you! 🎂`;
    addHistory(song);
  }

  function birthdayMessage() {
    addHistory("🎉 Today, the system clock marks another wonderful uptime cycle of YOU. Enjoy your special day! 🎈");
  }

  function quoteMessage() {
    addHistory("\"Count your age by friends, not years. Count your life by smiles, not tears.\" – John Lennon");
  }

  function fortuneMessage() {
    addHistory("🥠 " + motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }

  function onCommand(cmd) {
    const parts = cmd.trim().split(" ");
    const mainCmd = parts[0].toLowerCase();

    switch (mainCmd) {
      case "help":
        showHelp();
        break;
      case "birthday":
        birthdayMessage();
        break;
      case "sing":
        singSong();
        break;
      case "echo":
        echoText(parts.slice(1));
        break;
      case "date":
        addHistory(new Date().toLocaleString());
        break;
      case "reboot":
        addHistory("Rebooting LiveOS... 🎈");
        setTimeout(() => window.location.reload(), 1500);
        break;
      case "clear":
        setHistory([]);
        break;
      case "ps":
        showPs();
        break;
      case "calendar":
        showCalendar();
        break;
      case "open":
        if (parts.length > 1) openApp(parts[1]);
        else addHistory("Usage: open [app]");
        break;
      case "joke":
        tellJoke();
        break;
      case "quote":
        quoteMessage();
        break;
      case "fortune":
        fortuneMessage();
        break;
      case "word":
          addHistory("📘 Click the link below to see the Word of the Day:");
          addHistory("🔗 https://comet-samba-067.notion.site/Vocabulary-Book-1b6a96604ed3805db65cc50b6b4e9b52");
          break;
        
      default:
        addHistory(`Command not found: ${cmd}`);
    }
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && input.trim() !== "") {
      addHistory(`> ${input}`);
      onCommand(input);
    }
  }

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "#000",
        color: "#0f0",
        padding: 10,
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 14,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", whiteSpace: "pre-wrap" }}>
      {history.map((line, i) => (
        <div key={i}>
          {line.startsWith("🔗 ") ? (
            <a
              href={line.replace("🔗 ", "")}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0ff", textDecoration: "underline" }}
            >
              {line.replace("🔗 ", "")}
            </a>
          ) : (
            line
          )}
        </div>
      ))}
      
        <div ref={terminalEnd} />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          backgroundColor: "#000",
          border: "none",
          borderTop: "1px solid #0f0",
          color: "#0f0",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 14,
          outline: "none",
          padding: "5px",
        }}
        autoFocus
        placeholder="Enter command..."
      />
    </div>
  );
}
