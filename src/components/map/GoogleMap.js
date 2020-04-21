import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Circle,
} from "react-google-maps";
import { Cacher } from "../../Services/Cacher";

const MapComponent = (props) => {
  const { coordinates,isError,isLocationLoaded } = props;
  // console.log(coordinates)
  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: 36.7949999, lng: 10.073237 }}
      center={coordinates}
      options={{disableDefaultUI : isError ?true:false}}
    >
      {isLocationLoaded && !isError && <Circle center={coordinates} radius={500} />}
      {isLocationLoaded && isError &&<InfoWindow position={coordinates} options={{maxWidth:300}}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          iure iste quibusdam dolorem optio earum ducimus dolore ex eligendi
          esse dolor explicabo numquam alias rerum officiis dicta dolores
          necessitatibus.
        </div>
      </InfoWindow>}
    </GoogleMap>
  );
};

function WithGeoCode(WrappedComponnent) {
  return class extends React.Component {
    constructor() {
      super();
      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0,
        },
        isError:false,
        isLocationLoaded:false
      };
    }
    componentWillMount() {
      this.getGeoCodeLocation();
    }

    geoCodeLocation(location) {
      const geoCoder = new window.google.maps.Geocoder();
      return new Promise((resolve, reject) => {
        geoCoder.geocode({ adress: location }, (result, status) => {
          // console.log(status)
          if (status === "ok") {
            const geometry = result[0].geometry.location;
            // console.log(result)
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
            this.cacher.cacheValue(location, coordinates);
            resolve(coordinates);
          } else {
            reject('Error!!!!!')
          }
        });
      });
    }
    getGeoCodeLocation = () => {
      const location = this.props.location;

      if (this.cacher.isValidCached(location)) {
        this.setState({
          coordinates: this.cacher.getCachedValue(location),
          isLocationLoaded:true
        });
      } else {
        this.geoCodeLocation(location).then(
          (coordinates) => {
            this.setState({
              coordinates,
              isLocationLoaded:true
            });
          },
          (error) => {
            this.setState({
              isError:true,
              isLocationLoaded:true
            })
          }
        );
      }
    };
    render() {
      return <WrappedComponnent {...this.state} />;
    }
  };
}

export const MapWithGeoCode = withScriptjs(
  withGoogleMap(WithGeoCode(MapComponent))
);
