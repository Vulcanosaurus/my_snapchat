import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Button,
    Alert,
    // ViewStyle,
    // TextStyle,
    // TextInputProps,
  } from 'react-native';

const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', ma_valeur)
    } catch (e) {
      // lance une erreur
    }
  }



    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('email')
          if(value !== null) {
            // value previously stored
            return value;
          }
        } catch(e) {
          // error reading value
        }
      }


export default getData;
