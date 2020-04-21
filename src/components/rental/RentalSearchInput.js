import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
class RentalSearchInput extends Component {
    constructor(){
        super();
    this.searchInput=React.createRef()
    }
handleSearch=(e)=>{
    // e.preventDefault();
    const {history}=this.props
    const city=this.searchInput.current.value
    city ? history.push(`/rentals/${city}/homes`):history.push('/rentals')
}
handleKeyPress=(e)=>{
    
    if(e.key==='Enter'){
        
        this.handleSearch()
    }
}
  render() {
    return (
      <form className='form-inline my-2 my-lg-0' onSubmit={this.handleSearch}>
        <input
        onKeyPress={this.handleKeyPress}
          className='form-control mr-sm-2 bwm-search'
          type='search'
          placeholder='Try New York'
          aria-label='Search'
          ref={this.searchInput}
        />
        <button
          className='btn btn-outline-success my-2 my-sm-0 btn-bwm-search'
          type='submit'
          onClick={this.handleSearch}
        >
          Search
        </button>
      </form>
    );
  }
}

export default withRouter(RentalSearchInput);
