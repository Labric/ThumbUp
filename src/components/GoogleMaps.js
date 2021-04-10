import React, { Component, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export const GoogleMaps = () => {
  const { width, height } = Dimensions.get("window");
  const GOOGLE_MAPS_APIKEY = "AIzaSyB0m5-0-AEGq43BlbW5abIHtSjkBF6pEvY";
  //const [origin, setOrigin] = useState("")
  //const [destination, setDestination] = useState("")
  //const [waypoint, setWaypoint] = useState([])

  const waypoint = [];
  const coordinates = ["Versailles", "Strasbourg"];
  // const mapRef = React.createRef();
  // const setMapReady = () => {
  //   if (map.current) {
  //     map.current.fitToCoordinates([
  //       coordinates,
  //       {
  //         edgePadding: { top: 50, right: 10, bottom: 10, left: 10 },
  //         animated: false,
  //       },
  //     ]); // you can pass `animated` here and more props
  //   }
  // };

  return (
    <MapView
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
      style={{ height: 300 }}
      // ref={mapRef}
      //camera={{pitch: 10}}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      <MapViewDirections
        language="fr"
        origin={coordinates[0]}
        waypoints={waypoint}
        destination={coordinates[1]}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
        onStart={(params) => {
          console.log(
            `Started routing between "${params.origin}" and "${params.destination}"`
          );
        }}
        onReady={(result) => {
          return (
            <>
            <View style={{height: 100, width: width, backgroundColor: "pink"}}>`Distance: ${result.distance} km`</View>
            <View style={{height: 100, width: width, backgroundColor: "saumon"}}>`Duration: ${result.duration} min`</View>
            </>
          )
        }}
        // onMapReady={setMapReady}
        onError={(errorMessage) => {
          // console.log('GOT AN ERROR');
        }}
      />
    </MapView>
  );
};
export default GoogleMaps;

// import React, { Component } from "react";
// import { Dimensions, StyleSheet } from "react-native";
// import MapView from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";

// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.771707;
// const LONGITUDE = -122.4053769;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const GOOGLE_MAPS_APIKEY = "AIzaSyB0m5-0-AEGq43BlbW5abIHtSjkBF6pEvY";

// class Example extends Component {
//   constructor(props) {
//     super(props);

//     // AirBnB's Office, and Apple Park
//     this.state = {
//       coordinates: [
//         {
//           latitude: 37.3317876,
//           longitude: -122.0054812,
//         },
//         {
//           latitude: 37.771707,
//           longitude: -122.4053769,
//         },
//       ],
//     };

//     this.mapView = null;
//   }

//   onMapPress = (e) => {
//     this.setState({
//       coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
//     });
//   };

//   render() {
//     return (
//       <MapView
//         initialRegion={{
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         }}
//         style={StyleSheet.absoluteFill}
//         ref={(c) => (this.mapView = c)}
//         onPress={this.onMapPress}
//       >
//         {this.state.coordinates.map((coordinate, index) => (
//           <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
//         ))}
//         {this.state.coordinates.length >= 2 && (
//           <MapViewDirections
//             origin={this.state.coordinates[0]}

//             destination={
//               this.state.coordinates[this.state.coordinates.length - 1]
//             }
//             apikey={GOOGLE_MAPS_APIKEY}
//             strokeWidth={6}
//             strokeColor="blue"
//             onStart={(params) => {
//               console.log(
//                 `Started routing between "${params.origin}" and "${params.destination}"`
//               );
//             }}
//             onReady={(result) => {
//               console.log(`Distance: ${result.distance} km`);
//               console.log(`Duration: ${result.duration} min.`);

//               this.mapView.fitToCoordinates(result.coordinates, {
//                 edgePadding: {
//                   right: width / 20,
//                   bottom: height / 20,
//                   left: width / 20,
//                   top: height / 20,
//                 },
//               });
//             }}
//             onError={(errorMessage) => {
//               // console.log('GOT AN ERROR');
//             }}
//           />
//         )}
//       </MapView>
//     );
//   }
// }

// export default Example;
