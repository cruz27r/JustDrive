// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text> text </Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const App = () => {
  const [mapCenter, setMapCenter] = useState({
    lat: 42.328542,
    lng: -71.0383129,
  });

  const moveToPosition = () => {
    // mapRef.current.animateToRegion({
    //   latitude: 42.3128542,
    //   longitude: -71.0383129,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // }, 1000); // duration in milliseconds
    setMapCenter({
      lat: 42.3128542,
      lng: -72.0383129,
    });
  };

  return (
    <View style={{ flex: 1}}>
      <LeafletView
        mapMarkers = {[
          {
            position: [42.3128542, -71.0383129],
            icon: 'a',  
            size: [32, 32],          
          },
        ]}
        mapCenterPosition={mapCenter}
        
      />
      <View style = {styles.buttonContainer}>
        <Button title="Move Map" onPress={moveToPosition} />
      </View>
    </View>
  );
}

export default App;



const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  map: {
    flex: 1
  }
});

