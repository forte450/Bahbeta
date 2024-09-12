import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Sidebar from './Sidebar';
import InvoiceOverview from './InvoiceOverview';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Dashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../i18n'; // Import i18n setup

const RecurringInvoice = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const validateMobileNumber = (number) => {
    const regex = /^[0-9]{8,10}$/;
    if (!regex.test(number)) {
      setMobileError(t('Mobile number must be between 8 and 10 digits.'));
      return false;
    } else {
      setMobileError('');
      return true;
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError(t('Please enter a valid email address.'));
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validateName = (name) => {
    const regex = /^[A-Za-z]+$/;
    if (!regex.test(name)) {
      setNameError(t('Please enter a valid Name.'));
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  const handleMobileChange = (e) => {
    const number = e.target.value;
    setMobileNumber(number);
    validateMobileNumber(number);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    validateEmail(emailValue);
  };

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    validateName(nameValue);
  };

  useEffect(() => {
    if (validateMobileNumber(mobileNumber) && validateEmail(email) && validateName(name)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [mobileNumber, email, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateMobileNumber(mobileNumber) && validateEmail(email) && validateName(name)) {
      toast.success(t('Form submitted successfully!'), {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      toast.error(t('Please fix the errors before submitting.'), {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Header />
        <Container fluid>
          <InvoiceOverview />
          <Row>
            <Col>
              <div className="container mt-5">
                <div className="card bg-sh">
                  <div className="card-header bg-white">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <h4>{t('Create Recurring Invoice')}</h4>
                      </div>
                      <div className="col-md-7 d-flex justify-content-end align-items-center">
                        <h6 className="mx-3">{t('Choose Language')}:</h6>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            id="english"
                            name="language"
                            className="form-check-input"
                            checked={language === 'en'}
                            onChange={() => handleLanguageChange('en')}
                          />
                          <label htmlFor="english" className="form-check-label">
                            {t('English')}
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            id="arabic"
                            name="language"
                            className="form-check-input"
                            checked={language === 'ar'}
                            onChange={() => handleLanguageChange('ar')}
                          />
                          <label htmlFor="arabic" className="form-check-label">
                            {t('Arabic')}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-5">
                    <form onSubmit={handleSubmit}>
                      <div className="invoice-form p-4">
                        <div className="mb-3 row">
                          <div className="col-md-4">
                            <label className="form-label">
                              {t('Invoice Start Date')} <span className="text-danger">*</span>
                            </label>
                            <input type="date" className="form-control" required />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">
                              {t('Repeat Every')} <span className="text-danger">*</span>
                            </label>
                            <div className="d-flex">
                              <input
                                type="number"
                                className="form-control me-2 width-number"
                                placeholder="1"
                                required
                              />
                              <select className="form-select">
                                <option>{t('Select Frequency')}</option>
                                <option>{t('Day')}</option>
                                <option>{t('Week')}</option>
                                <option>{t('Month')}</option>
                                <option>{t('Year')}</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">
                              {t('Ending')} <span className="text-danger">*</span>
                            </label>
                            <select className="form-select" required>
                              <option>{t('Never')}</option>
                              <option>{t('After X Occurrences')}</option>
                              <option>{t('On a Specific Date')}</option>
                            </select>
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <div className="col-md-6">
                            <label className="form-label">
                              {t('Currency')} <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <span className="input-group-text">BHD</span>
                              <input
                                type="number"
                                className="form-control form-input ammount"
                                placeholder={t('Enter Amount')}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">
                              {t('Mobile Number')} <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <select className="input-group-text">
                                <option>+973</option>
                              </select>
                              <input
                                type="text"
                                className="form-control form-input ammount"
                                placeholder={t('Enter Mobile Number')}
                                value={mobileNumber}
                                onChange={handleMobileChange}
                                required
                              />
                            </div>
                            {mobileError && <div className="text-danger">{mobileError}</div>}
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <div className="col-md-6">
                            <label className="form-label">
                              {t('Customer Name')} <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t('Enter Customer Name')}
                              value={name}
                              onChange={handleNameChange}
                              required
                            />
                            {nameError && <div className="text-danger">{nameError}</div>}
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">
                              {t('Email Address')} <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder={t('Enter Customer Email')}
                              value={email}
                              onChange={handleEmailChange}
                              required
                            />
                            {emailError && <div className="text-danger">{emailError}</div>}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            {t('Remarks')} <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder={t('Write Purpose, Notes')}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-6 d-flex align-items-center">
                          <label className="form-label mr-2">{t('Send Invoice Via')}:</label>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="sms" />
                            <label className="form-check-label" htmlFor="sms">
                              {t('SMS')}
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="email" />
                            <label className="form-check-label" htmlFor="email">
                              {t('Email')}
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="whatsapp" />
                            <label className="form-check-label" htmlFor="whatsapp">
                              {t('WhatsApp')}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 text-end">
                          <button type="button" className="btn btn-light me-2">
                            {t('Save Draft')}
                          </button>
                          <button type="submit" className="btn btn-light clr-blu" disabled={!isFormValid}>
                            {t('Send Invoice')}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RecurringInvoice;
