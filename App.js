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

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const App = () => {
  return (
    <LeafletView
      mapMarkers = {[
        {
          position: [42.3128542, -71.0383129],
          icon: 'a',  
          size: [32, 32],          
        },
      ]}
      mapCenterPosition={{
        lat: 42.3128542,
        lng: -71.0383129,
      }}
    />
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
  map: {
    flex: 1
  }
});
