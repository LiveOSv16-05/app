// EmailApp.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // import Firestore instance
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

export default function EmailApp() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    // Reference to collection 'messages' (or whatever name you choose)
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));

    // Subscribe to realtime updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const emailsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        emailsData.push({
          id: doc.id,
          subject: data.subject,
          sender: data.sender,
          content: data.content,
          date: new Date(data.timestamp?.seconds * 1000).toLocaleString()
        });
      });
      setEmails(emailsData);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

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
