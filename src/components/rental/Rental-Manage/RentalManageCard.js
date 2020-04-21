import React from "react";
import { Link } from "react-router-dom";
import { toUpperCase, prtifyDate } from "../../../helpers";
import RentalManageModal from "./RentalManageModal";
export class RentalManageCard extends  React.Component {
    state={
        wantDelete:false
    }

    showDeleteMenu=()=>{
        this.setState({
            wantDelete:true
        })
    }

    closeDeleteMenu=()=>{
        this.setState({
            wantDelete:false
        })
    }
    render(){
        const {rental,rentalIndex,deleteRental}=this.props
        const {wantDelete}=this.state
       const deleteClass=wantDelete ? 'toBeDeleted' :''
  return (

    <div className='col-md-4'>
      <div className={`card text-center ${deleteClass}`}>
        <div className='card-block'>
          <h4 className='card-title'>
            {rental.title} - {toUpperCase(rental.city)}
          </h4>
          <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>
            Go to Rental
          </Link>
          {rental.bookings && rental.bookings.length > 0 && (
            <RentalManageModal rental={rental} bookings={rental.bookings} />
          )}
        </div>
        <div className='card-footer text-muted'>
          Created at {prtifyDate(rental.createdAt)} 
          {!wantDelete && <><button className='btn btn-danger' onClick={this.showDeleteMenu}>Delete</button>
          <Link className='btn btn-warning'style={{marginLeft:'2px',fontSize:'13px'}} to={{
            pathname:`/rentals/${rental._id}`,
            state:{isUpdate:true}
          }}>Update</Link></>
          }
          
          <br></br>
          <br></br>
          {
              wantDelete && <div className='delete_menu'>
            Do You Confirm ?
              <button className='btn btn-success' onClick={()=>deleteRental(rental._id,rentalIndex)}>Yes</button>
              <button className='btn btn-danger' onClick={this.closeDeleteMenu}>No</button>
              </div>
          }
        </div>
      </div>
    </div>
  );
}
}
