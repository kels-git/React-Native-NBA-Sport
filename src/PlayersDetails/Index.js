import React, {useState, useEffect} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-dynamic-vector-icons';

const IndexPlayerDetailContainer = ({route, navigation}) => {
  const {playerDetails, playerTeamDetails} = route.params;
  return (
    <ScrollView
      style={{backgroundColor: '#F1F1F1', width: '100%', height: '100%'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 20,
          backgroundColor: '#184461',
          padding: 10,
        }}>
        <Image
          source={require('../../assets/nbalogo.png')}
          style={{width: 80, height: 80, marginStart: 20}}
        />
        <View style={{flex: 1, marginEnd: 10, marginStart: 10}}>
          <Text style={{fontSize: 14, fontWeight: '900', color: '#fff'}}>
            NBA SPORT
          </Text>
          <Text style={{fontSize: 14, fontWeight: '900', color: '#fff'}}>
            PLAYER DETAILS
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#184461',
          marginTop: 50,
          marginHorizontal: 20,
          borderRadius: 15,
        }}>
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -50,
            }}>
            <View>
              <View
                style={[
                  {
                    width: 100,
                    height: 100,
                    borderRadius: 60,
                    borderColor: '#184461',
                    backgroundColor: '#C4c4c4',
                    shadowColor: ' rgba(0, 0, 0, 0.25)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Image
                  source={require('../../assets/userpurple.png')}
                  style={{
                    width: 80,
                    height: 80,
                    zIndex: 1,
                    borderRadius: 60,
                    position: 'absolute',
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{padding: 10}}>
          <Text style={{color: '#fff'}}>
            {' '}
            Full Name : {playerDetails.first_name} {playerDetails.last_name}
          </Text>
          <Text style={{color: '#fff'}}>
            {' '}
            Location: {playerTeamDetails.city}
          </Text>
          <Text style={{color: '#fff'}}>
            {' '}
            Conference : {playerTeamDetails.conference}
          </Text>
          <Text style={{color: '#fff'}}>
            {' '}
            division : {playerTeamDetails.division}
          </Text>
          <Text style={{color: '#fff'}}>
            {' '}
            Club full Name : {playerTeamDetails.full_name}
          </Text>
       
            <Text style={{color: '#fff'}}>
              {' '}
              Position : {playerDetails.position ? playerDetails.position : "No record position"}
            </Text>
        
        </View>
      </View>
    </ScrollView>
  );
};

export default IndexPlayerDetailContainer;
