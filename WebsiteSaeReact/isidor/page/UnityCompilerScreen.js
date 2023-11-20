import React from 'react';
import { View, StyleSheet} from 'react-native';


const UnityCompile = () => {
  return (
    <View style={styles.ContainerGame}>
      <iframe src='http://localhost:3000' style={styles.gameSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerGame : {
      flex : 1,
      justifyContent : "center",
      alignItems : "center"
  },

  gameSize : {
    height : '100%',
    width : '100%'
  }

});

export default UnityCompile;