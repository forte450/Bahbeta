import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import CreateInvoice from './Components/CreateInvoice';
import RecurringInvoice from './Components/RecurringInvoice';
import './css/Dashboard.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';  // Import the i18n configuration

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>  {/* Wrap the app with I18nextProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="create-invoice" element={<CreateInvoice />} />
          <Route path="recurring-invoice" element={<RecurringInvoice />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App;
