
import React, { useLayoutEffect, useState } from 'react'
import { Switch, View, Text } from 'react-native'
import Advanced from '../components/Advanced'
import Simple from '../components/Simple'
import { useNavigation } from '@react-navigation/native'

const styles = {
    container: {
      minHeight: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 20
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -100,
    },
    instructionText: {
      marginRight: 10,
    }
  }
   

const Cards = () => {
    const navigation = useNavigation();
    useLayoutEffect(() =>{
        navigation.setOptions({
          headerShown:false,
        })
      },[])
    const [showAdvanced, setShowAdvanced] = useState(true)
    return (
        <View style={styles.container}>
          {showAdvanced ? <Advanced /> : <Simple />}
          <View style={styles.row}>
            <Text style={styles.instructionText}>Hidden gems along with it's history</Text>
            <Switch value={showAdvanced} onValueChange={setShowAdvanced} />
          </View>
        </View>
      )
}

export default Cards