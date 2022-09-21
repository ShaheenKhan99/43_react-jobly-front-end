import React, { useState } from "react";


/** Search widget.
 * 
 * Appears on CompanyList and JobList so that these can be filtered down.
 * 
 * This component does not do the searching but it renders the search form and calls the `searchForm` function prop that runs in a parent to do the searching.
 * 
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", 
                "searchFor=", 
                typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");


  /** Tell parent to filter  */

  function handleSubmit(evt) {
    evt.preventDefault();

     // take care of accidentally trying to search for just spaces
    searchFor(searchTerm.trim() || undefined);

    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields  */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm mb-4 mt-5">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-sm-10">
          <input className="form-control form-control-lg"
                  name="searchTerm"
                  placeholder="Enter search term"
                  value={searchTerm}
                  onChange={handleChange}
          />
        </div>
        <div className="col-sm-2">
          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
    
  );
}

export default SearchForm;