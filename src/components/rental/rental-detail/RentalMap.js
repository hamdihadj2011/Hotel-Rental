import React from 'react'
import {MapWithGeoCode} from '../../map/GoogleMap'
export class RentalMap extends React.Component{
    render(){
        const location=this.props.location
        return (
            <MapWithGeoCode
            location={location}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `360px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
        )
    }
}