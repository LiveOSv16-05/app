import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Desktop from './components/Desktop';
import EmailApp from './components/EmailApp';
import SendMessageForm from './components/SendMessage';

function AppRouter() {
  const location = useLocation();
  const isAppRoute = location.pathname === '/inbox' || location.pathname === '/send';

  return (
    <>
      {isAppRoute ? (
        <Routes>
          <Route path="/inbox" element={<EmailApp />} />
          <Route path="/send" element={<SendMessageForm />} />
        </Routes>
      ) : (
        <Desktop />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
