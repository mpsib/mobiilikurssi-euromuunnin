import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {

  const [currencies, setCurrencies] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState(0);

  let accessKey = '0b9df88f8d064969dc9d900838d49f68';
  
  
  useEffect( () => {
    
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${accessKey}`)
      .then( request => request.json())
      .then( data => setCurrencies(data.rates))
      .catch( error => Alert.alert('Error', error));
    
  }, []);
  

  const convert = () => {
    setConvertedValue(Number(inputValue) / currencies[selectedCurrency]);
  }
  
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, marginBottom:20}}>Convert currency to €</Text>
      <Text style={{fontSize:20}}>{convertedValue} €</Text>
        <View style={styles.horizontal}>
          <TextInput style={styles.input} 
            placeholder='Amount'
            keyboardType={'decimal-pad'}
            value={inputValue}
            onChangeText={ text => setInputValue(text) }
            />
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedCurrency}
              onValueChange={(itemValue, itemIndex) => setSelectedCurrency(itemValue)}
            >
              {
                Object.keys(currencies).map( (currency, index) => {
                  
                  return (<Picker.Item label={currency} value={currency} key={index} />);
                })
              }
            </Picker>
          </View>
        </View>
      <Button title='Convert' onPress={convert}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'space-evenly',
  },
  input:{
    fontSize: 18,
    width: 100
  },
  picker: {
    width: 100
  },
});
