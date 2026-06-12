import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import StatsCard from './StatsCard';
import LeadCard from './LeadCard';
import './Dashboard.css';

export default function Dashboard({ leads, onViewLead }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('id'); // 'id', 'price', 'score'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Pagination State - Defaulting to Page 2 & Page Size 7 to match user screenshot example
  const [currentPage, setCurrentPage] = useState(2);
  const [pageSize, setPageSize] = useState(7);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, locationFilter, pageSize]);

  // Dynamic statistics calculated from active state
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter(l => l.status === 'New').length;
    
    const approved = leads.filter(l => 
      ['Accepted', 'Disbursed', 'Settled', 'Purchased'].includes(l.status)
    ).length;

    const pending = leads.filter(l => 
      ['In Discussion', 'Ready to close', 'No response', 'Re-engaging'].includes(l.status)
    ).length;

    return { total, approved, pending, newCount };
  }, [leads]);

  // Unique lists for filter options
  const locations = useMemo(() => {
    const locs = leads.map(l => l.location.split(',')[0]); // Take state name or country code
    return ['All', ...new Set(locs)];
  }, [leads]);

  // Handle Filtering & Sorting
  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(l => 
        l.id.toLowerCase().includes(term) ||
        l.contactName.toLowerCase().includes(term) ||
        l.location.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(l => l.status === statusFilter);
    }

    // Lead Type filter
    if (typeFilter !== 'All') {
      result = result.filter(l => l.leadType === typeFilter);
    }

    // Location filter
    if (locationFilter !== 'All') {
      result = result.filter(l => l.location.startsWith(locationFilter));
    }

    // Sorting
    result.sort((a, b) => {
      let compareA, compareB;
      if (sortBy === 'price') {
        compareA = a.price;
        compareB = b.price;
      } else if (sortBy === 'score') {
        compareA = a.eligibilityScore;
        compareB = b.eligibilityScore;
      } else {
        // Default sort by ID (e.g. Lead#122, extracting the digits)
        compareA = parseInt(a.id.replace(/\D/g, '')) || 0;
        compareB = parseInt(b.id.replace(/\D/g, '')) || 0;
      }

      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [leads, searchTerm, statusFilter, typeFilter, locationFilter, sortBy, sortOrder]);

  // Pagination variables
  const totalPages = Math.ceil(filteredAndSortedLeads.length / pageSize) || 1;

  // Safe page range boundary check
  const activePage = Math.min(currentPage, totalPages);

  // Paginated leads slice
  const paginatedLeads = useMemo(() => {
    const start = (activePage - 1) * pageSize;
    return filteredAndSortedLeads.slice(start, start + pageSize);
  }, [filteredAndSortedLeads, activePage, pageSize]);

  // Generate pagination items matching: << < 1 2 3 4 5 ... 16 > >>
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (activePage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (activePage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', activePage - 1, activePage, activePage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="dashboard-container">
      {/* Title Section */}
      <div className="dashboard-title-section">
        <h2>Business Loan</h2>
        <p>Browse and evaluate high-quality leads</p>
      </div>

      {/* Stats Cards Section */}
      <div className="dashboard-stats-grid">
        <StatsCard type="total" count={stats.total} label="Total Leads" />
        <StatsCard type="approved" count={stats.approved} label="Approved Leads" />
        <StatsCard type="pending" count={stats.pending} label="Pending Leads" />
        <StatsCard type="new" count={stats.newCount} label="New Leads" />
      </div>

      {/* Filter and Control Bar */}
      <div className="dashboard-filter-bar">
        {/* Search */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-bar-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters Group */}
        <div className="filters-group">
          {/* Status Select */}
          <div className="filter-select-wrapper">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Lead status filter"
            >
              <option value="All">Lead status</option>
              <option value="New">New</option>
              <option value="In Discussion">In Discussion</option>
              <option value="Purchased">Purchased</option>
              <option value="Ready to close">Ready to close</option>
              <option value="No response">No response</option>
              <option value="Re-engaging">Re-engaging</option>
              <option value="Accepted">Accepted</option>
              <option value="Disbursed">Disbursed</option>
              <option value="Settled">Settled</option>
            </select>
          </div>

          {/* Type Select */}
          <div className="filter-select-wrapper">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Lead type filter"
            >
              <option value="All">Lead type</option>
              <option value="Flat">Flat</option>
              <option value="Percentage">Percentage</option>
            </select>
          </div>

          {/* Location Select */}
          <div className="filter-select-wrapper">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              aria-label="Location filter"
            >
              <option value="All">Location</option>
              {locations.filter(loc => loc !== 'All').map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Sort Selection */}
          <div className="sort-controls">
            <div className="filter-select-wrapper sort-select">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort leads by field"
              >
                <option value="id">Sort by ID</option>
                <option value="price">Sort by Price</option>
                <option value="score">Sort by Score</option>
              </select>
            </div>
            <button 
              className="sort-order-btn" 
              onClick={toggleSortOrder}
              title={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
            >
              <ArrowUpDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      {paginatedLeads.length > 0 ? (
        <div className="leads-cards-grid">
          {paginatedLeads.map(lead => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onViewLead={onViewLead}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state-container animate-fade-in">
          <div className="empty-state-icon">
            <SlidersHorizontal size={48} className="empty-icon" />
          </div>
          <h3>No leads match your filters</h3>
          <p>Try clearing your search query or adjusting status / type selectors.</p>
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setTypeFilter('All');
              setLocationFilter('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination Footer - Matches attached screenshot */}
      {filteredAndSortedLeads.length > 0 && (
        <div className="pagination-bar animate-fade-in">
          <div className="pagination-left">
            <span>Page {activePage} of {totalPages}</span>
          </div>

          <div className="pagination-center">
            {/* First Page Button */}
            <button 
              className="pagination-arrow-btn" 
              onClick={() => setCurrentPage(1)} 
              disabled={activePage === 1}
              aria-label="First page"
            >
              <ChevronsLeft size={16} />
            </button>

            {/* Prev Page Button */}
            <button 
              className="pagination-arrow-btn" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
              disabled={activePage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Number/Ellipsis Sequence */}
            {getPageNumbers().map((pageNum, idx) => {
              if (pageNum === '...') {
                return (
                  <span key={`ell-${idx}`} className="pagination-ellipsis">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={`page-${pageNum}`}
                  className={`pagination-number-btn ${activePage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page Button */}
            <button 
              className="pagination-arrow-btn" 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
              disabled={activePage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>

            {/* Last Page Button */}
            <button 
              className="pagination-arrow-btn" 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={activePage === totalPages}
              aria-label="Last page"
            >
              <ChevronsRight size={16} />
            </button>
          </div>

          <div className="pagination-right">
            <div className="page-size-selector-wrapper">
              <select 
                value={pageSize} 
                onChange={(e) => setPageSize(Number(e.target.value))}
                aria-label="Items per page"
              >
                <option value={5}>5 / page</option>
                <option value={7}>7 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  leads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      leadCode: PropTypes.string.isRequired,
      contactName: PropTypes.string.isRequired,
      appliedAmount: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      eligibilityScore: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      readiness: PropTypes.string.isRequired,
      leadType: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired
    })
  ).isRequired,
  onViewLead: PropTypes.func.isRequired
};

