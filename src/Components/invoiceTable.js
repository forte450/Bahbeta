import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Badge, Dropdown, Button, Form, Nav, InputGroup } from 'react-bootstrap';
import { FaEllipsisV, FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InvoiceTable = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [filterStatus, setFilterStatus] = useState('All');
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('/api/invoiceListingss'); // Adjust endpoint as needed
        setInvoiceData(response.data.invoiceObj);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const getTableData = () => {
    if (loading) return [];
    
    const data = activeTab === 'invoices' ? invoiceData : []; // Adjust this based on your actual data structure

    if (filterStatus === 'All') {
      return data;
    } else {
      return data.filter(invoice => invoice.status === filterStatus);
    }
  };

  return (
    <div className="invoice-container">
      <div className="top-header">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Nav className="mr-3">
            <Nav.Link
              as={Link}
              to="#"
              className={`sidebar-link position-relative ${activeTab === 'invoices' ? 'active' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              Invoices
              {activeTab === 'invoices' && (
                <img src="../images/highlight.png" className="highlight-image" alt="highlight" />
              )}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="#"
              className={`sidebar-link ${activeTab === 'drafts' ? 'active' : ''}`}
              onClick={() => setActiveTab('drafts')}
            >
              Drafts
              {activeTab === 'drafts' && (
                <img src="../images/highlight.png" className="highlight-image" alt="highlight" />
              )}
            </Nav.Link>
          </Nav>
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <Link to="/create-invoice" className="me-2">
              <Button variant="primary">
                <FaPlus /> New Invoice
              </Button>
            </Link>
            <Link to="/recurring-invoice">
              <Button variant="primary">
                <FaPlus /> New Recurring Invoice
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="table-header mb-3 row">
        <div className="col-md-8 d-flex align-items-center">
          <ul className="invoice-tabs nav">
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${filterStatus === 'All' ? 'active' : ''}`}
                onClick={() => setFilterStatus('All')}
              >
                All
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${filterStatus === 'Awaiting Payment' ? 'active' : ''}`}
                onClick={() => setFilterStatus('Awaiting Payment')}
              >
                Awaiting Payment
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${filterStatus === 'Overdue' ? 'active' : ''}`}
                onClick={() => setFilterStatus('Overdue')}
              >
                Overdue
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${filterStatus === 'Paid' ? 'active' : ''}`}
                onClick={() => setFilterStatus('Paid')}
              >
                Paid
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-4 d-flex justify-content-end align-items-center">
          <InputGroup style={{ width: '100%' }}>
            <InputGroup.Text id="search-icon" style={{ position: 'absolute', left: '10px', top: '12px', background: 'none', border: 'none', padding: '0', zIndex: '1' }}>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search Invoice# or client name"
              style={{ border: 'none', borderRadius: '10px', boxShadow: 'none', paddingLeft: '40px', height: '38px', width: '100%' }}
            />
          </InputGroup>
        </div>
      </div>

      <div className="table-responsive">
        <Table hover className="invoice-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Invoice#</th>
              <th>Invoice Date</th>
              <th>Customer</th>
              <th>Mobile Number</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getTableData().map((invoice, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td><a href="#">{invoice.id}</a></td>
                <td>{invoice.formattedDate}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.phone}</td>
                <td>
                  <Badge
                    pill
                    bg={invoice.status === 'Paid' ? 'success' : invoice.status === 'Overdue' ? 'danger' : 'warning'}
                    className="invoice-status"
                  >
                    {invoice.status}
                  </Badge>
                </td>
                <td>{invoice.amount}</td>
                <td>{invoice.remarks}</td>
                <td>
                  <div className='flex'>
                    <Dropdown.Item href="#">
                      <img
                        src="../images/copy.png"
                        alt="Copy"
                        className="me-2"
                        style={{ width: '16px', height: '16px' }}
                      />
                    </Dropdown.Item>
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="light" id="dropdown-basic" className="action-icon">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">View</Dropdown.Item>
                        <Dropdown.Item href="#">Edit</Dropdown.Item>
                        <Dropdown.Item href="#">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="pagination-container d-flex align-items-center justify-content-between mt-3">
        <div className="pagination-info d-flex align-items-center">
          <span className="me-2">Showing</span>
          <Form.Select size="sm" className="entries-select">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </Form.Select>
          <span className="ms-2">of {invoiceData.length} entries</span>
        </div>
        <ul className="pagination mb-0">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </div>
    </div>
  );
};

export default InvoiceTable;
