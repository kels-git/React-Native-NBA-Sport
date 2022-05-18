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

const IndexTeamContainer = ({navigation}) => {
  const [isloading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(false);

  const [dataTeams, setDataTeams] = useState([]);
  const [searchTeam, setSearchTeam] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [allTeamListed, setAllTeamListed] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
      'X-RapidAPI-Key': 'cb56812643msh705137bf1a38558p13d9a8jsnd1017a604963',
    },
  };

  const displayAllTeams = () => {
    fetch('https://free-nba.p.rapidapi.com/teams?page=0', options)
      .then(res => res.json())
      .then(json => {
        setIsLoading(false);
        setAllTeamListed(json.data);
        setDataTeams(json.data);
      });
  };

  useEffect(() => {
    displayAllTeams();
  }, []);

  const resetSearchTeam = () => {
    setDataTeams(allTeamListed);
  };

  // search reg
  useEffect(() => {
    if (searchTeam.length < 1) {
      resetSearchTeam();
    }
    if (searchTeam.length > 0) {
      handleSearchTeam();
    }
  }, [searchTeam]);

  const handleSearchTeam = () => {
    if (searchTeam.length > 0) {
      const _filter_teamList = allTeamListed.filter(c => {
        if (
          c.full_name
            .toLocaleLowerCase()
            .includes(searchTeam.toLocaleLowerCase())
        ) {
          return true;
        }

        return false;
      });
      setDataTeams(_filter_teamList);
    } else {
      setDataTeams(allTeamListed);
    }
  };

  const goToPlayerScreen =(item)=>{
    navigation.navigate('PlayerScreen', {
      teamID: item.id,
      teamName: item.name,
    })

  }

  return (
    <ScrollView
      style={{backgroundColor: '#F1F1F1', width: '100%', height: '100%'}}>
      <View>
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
              NBA SPORT TEAMS
            </Text>

            {!openSearch ? (
              <View style={{width: '100%', marginTop: 6}}>
                <TouchableOpacity
                  activeOpacity={1.2}
                  onPress={() => setOpenSearch(true)}>
                  <DropShadow
                    style={{
                      shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      shadowOffset: {
                        width: 1,
                        height: 2,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 2,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        height: 35,
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: '#184461',
                        shadowColor: '#000',
                        shadowRadius: 10,
                        shadowOpacity: 0.6,
                        elevation: 8,
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <DropShadow
                        style={{
                          shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 1,
                          shadowRadius: 2,
                        }}>
                        <Icon
                          type="Feathers"
                          name="search"
                          color="#184461"
                          size={20}
                        />
                      </DropShadow>

                      <Text
                        style={{
                          color: '#184461',
                          fontWeight: '700',
                          fontSize: 12,
                        }}>
                        Search
                      </Text>
                    </View>
                  </DropShadow>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{width: '100%', marginTop: 6}}>
                <TouchableOpacity activeOpacity={1.2}>
                  <DropShadow
                    style={{
                      shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      shadowOffset: {
                        width: 1,
                        height: 2,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 2,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        height: 35,
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: '#184461',
                        shadowColor: '#000',
                        shadowRadius: 10,
                        shadowOpacity: 0.6,
                        elevation: 8,
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        placeholder={'Search Team'}
                        returnKeyType={'search'}
                        keyboardType={'web-search'}
                        placeholderTextColor={'#666666'}
                        value={searchTeam}
                        onChangeText={text => setSearchTeam(text)}
                        autoFocus={true}
                        style={{
                          width: '90%',
                          fontSize: 12,
                          padding: 5,
                          marginStart: 5,
                        }}
                      />

                      <TouchableOpacity
                        onPress={() => {
                          setOpenSearch(false);
                        }}>
                        <Icon
                          type="Feather"
                          name="x-circle"
                          size={25}
                          color="#184461"
                          style={{marginEnd: 10}}
                        />
                      </TouchableOpacity>
                    </View>
                  </DropShadow>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{padding: 10, margin: 10}}>
          <View>
            {isloading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  height: 500,
                }}>
                <ActivityIndicator
                  size={50}
                  color={'#184461'}
                  style={{
                    alignSelf: 'center',
                    marginTop: 150,
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: 16,
                    marginTop: 10,
                  }}>
                  Please wait...
                </Text>
              </View>
            ) : (
              dataTeams.map(item => (
                <View key={item.id}>
               
                  
                <TouchableOpacity
                activeOpacity={1.0}
                style={{marginBottom: 10}}
                onPress={()=> goToPlayerScreen(item)}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    elevation: 10,
                    marginTop: 5,
                    shadowColor: '#000',
                    shadowRadius: 10,
                    shadowOpacity: 0.6,
                    elevation: 8,

                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginStart: 20,
                      marginEnd: 20,
                      marginVertical: 14,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <View style={{width: '20%'}}>
                        <Image
                          source={require('../../assets/nba.png')}
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                          }}
                          resizeMode={'cover'}
                        />
                      </View>

                      <View style={{marginStart: 10, width: '70%'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: '#184461',
                            flexWrap: 'wrap',
                          }}
                          numberOfLines={2}>
                          {item.full_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '500',
                            color: '#184461',
                            marginTop: 3,
                          }}>
                          <Text>Team - </Text>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentIndex(
                          item.id === currentIndex ? null : item.id,
                        );
                      }}>
                      <View style={{flex: 1, padding: 8}}>
                        <Icon
                          name={'ellipsis-v'}
                          type={'FontAwesome'}
                          size={30}
                          color={'#184461'}
                          style={{alignSelf: 'flex-end'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                {item.id === currentIndex ? (
                  <DropShadow
                    style={{
                      shadowColor: '#F0F0F0',
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 2,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 1,
                      }}>
                      <View
                        style={{
                          width: '95%',

                          backgroundColor: '#fff',
                          elevation: 10,
                          marginBottom: 10,
                          shadowColor: '#000',
                          shadowOpacity: 0.6,
                          elevation: 8,
                          shadowOffset: {
                            width: 2,
                            height: 4,
                          },
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginStart: 20,
                            marginEnd: 8,
                            marginTop: 10,
                            marginBottom: 10,
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                              <View style={{width: 80}}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '400',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  City
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '400',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  conference
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '400',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  Division
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '400',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  Club Name
                                </Text>
                              </View>

                              <View style={{marginHorizontal: 5}}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  :
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  :
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  :
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  :
                                </Text>
                              </View>

                              <View style={{marginHorizontal: 5}}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '700',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  {item.city}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '700',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  {item.conference}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '700',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  {item.division}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '700',
                                    color: '#184461',
                                    marginVertical: 1,
                                  }}>
                                  {item.name}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </DropShadow>
                ) : null}
              </TouchableOpacity>

                </View>
              ))
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default IndexTeamContainer;
