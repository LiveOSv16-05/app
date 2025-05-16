// EmailApp.jsx
import React, { useState } from 'react';
import { emails } from '/Users/sparshasrinath/Documents/Suraj_Birthday/loveos/src/data/emails.js';

export default function EmailApp() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100%', color: '#eee', fontFamily: 'monospace' }}>
      <div style={{ width: 200, borderRight: '1px solid #555', overflowY: 'auto' }}>
        {emails.map(email => (
          <div
            key={email.id}
            style={{
              padding: 10,
              cursor: 'pointer',
              backgroundColor: selectedEmail?.id === email.id ? '#004488' : 'transparent',
            }}
            onClick={() => setSelectedEmail(email)}
          >
            <div><strong>{email.subject}</strong></div>
            <div style={{ fontSize: 12 }}>{email.date}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: 10, overflowY: 'auto' }}>
        {selectedEmail ? (
          <>
            <h3>{selectedEmail.subject}</h3>
            <p><em>From: {selectedEmail.sender}</em></p>
            <p>{selectedEmail.content}</p>
          </>
        ) : (
          <p>Select an email to read</p>
        )}
      </div>
    </div>
  );
}
