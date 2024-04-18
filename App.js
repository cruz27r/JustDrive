
import React, { useState } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const App = () => {
  const [mapCenter, setMapCenter] = useState({
    lat: 42.328542,
    lng: -71.0383129,
  });

  const moveToPosition = () => {
    setMapCenter({
      lat: 42.3128542,
      lng: -72.0383129,
    });
  };

  /* main app component */ 
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
      <View style = {styles.lowButtonContainer}>
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
  lowButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  map: {
    flex: 1
  }
});

