import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SendMessage() {
  const [subject, setSubject] = useState('');
  const [sender, setSender] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!subject || !sender || !content) {
      setStatus('Please fill in all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        subject,
        sender,
        content,
        timestamp: serverTimestamp(),
      });
      setStatus('Message sent!');
      setSubject('');
      setSender('');
      setContent('');
    } catch (error) {
      setStatus('Error sending message: ' + error.message);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212', // dark page background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#eee',
      }}
    >
      <div
        style={{
          width: '600px', // wider container
          padding: 30,
          backgroundColor: '#222',
          borderRadius: 12,
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#61dafb' }}>
          Send a Message
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={sender}
            onChange={e => setSender(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: 18,
              borderRadius: 6,
              border: '1px solid #555',
              backgroundColor: '#333',
              color: '#eee',
              fontSize: 16,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = '#61dafb')}
            onBlur={e => (e.target.style.borderColor = '#555')}
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: 18,
              borderRadius: 6,
              border: '1px solid #555',
              backgroundColor: '#333',
              color: '#eee',
              fontSize: 16,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = '#61dafb')}
            onBlur={e => (e.target.style.borderColor = '#555')}
          />
          <textarea
            placeholder="Message"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: 18,
              borderRadius: 6,
              border: '1px solid #555',
              backgroundColor: '#333',
              color: '#eee',
              fontSize: 16,
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = '#61dafb')}
            onBlur={e => (e.target.style.borderColor = '#555')}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#61dafb',
              color: '#222',
              fontWeight: 'bold',
              fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(97,218,251,0.6)',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = '#4db8e6')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#61dafb')}
          >
            Send
          </button>
        </form>
        {status && (
          <p
            style={{
              marginTop: 20,
              textAlign: 'center',
              color: status.startsWith('Error') ? '#f66' : '#6f6',
              fontWeight: '600',
            }}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
