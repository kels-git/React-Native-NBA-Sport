import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';

const IndexPlayerContainer = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);
  const [ended, setended] = useState(false);

  const [searchPlayer, setSearchPlayer] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [allPlayerListed, setAllPlayerListed] = useState([]);
  const {teamID, teamName} = route.params;

  useEffect(() => {
    if (searchPlayer.length < 1) {
      resetSearchPlayer();
    }
    if (searchPlayer.length > 0) {
      handleSearchPlayer();
    }
  }, [searchPlayer]);

  const resetSearchPlayer = () => {
    setData(allPlayerListed);
  };

  const handleSearchPlayer = () => {
    if (searchPlayer.length > 0) {
      const _filter_playerList = allPlayerListed.filter(c => {
        if (
          c.first_name
            .toLocaleLowerCase()
            .includes(searchPlayer.toLocaleLowerCase())
        ) {
          return true;
        }

        return false;
      });
      setData(_filter_playerList);
    } else {
      setData(allPlayerListed);
    }
  };

  const Member = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={{marginBottom: 10}}
        onPress={() =>
          navigation.navigate('PlayerDetails', {
            playerDetails: item,
            playerTeamDetails: item.team,
          })
        }>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F1F1F1',
            paddingHorizontal: 10,
            flex: 1,
          }}>
          <View
            style={{
              width: '95%',
              height: 110,
              backgroundColor: '#fff',
              borderRadius: 15,
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
              marginBottom: 18,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginStart: 22,
                marginEnd: 8,
                marginTop: 14,
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#184461',
                    marginBottom: 7,
                  }}>
                  {item.team.full_name}
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <View style={{width: 100}}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '400',
                        color: '#184461',
                      }}>
                      Player First Name
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '400',
                        color: '#184461',
                        marginVertical: 1,
                      }}>
                      Player Last Name
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '400',
                        color: '#184461',
                        marginVertical: 1,
                      }}>
                      City
                    </Text>
                  </View>

                  <View style={{marginHorizontal: 10}}>
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
                      {item.first_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '700',
                        color: '#184461',
                        marginVertical: 1,
                      }}>
                      {item.last_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '700',
                        color: '#184461',
                        marginVertical: 1,
                      }}>
                      {item.team.city}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={require('../../assets/nbaplayer.jpg')}
                  style={{
                    width: 80,
                    height: 48,
                    alignSelf: 'flex-end',
                    marginTop: 20,
                  }}
                  resizeMode={'contain'}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchMoreData = () => {
    if (!ended) {
      setDataLoading(true);
      makeRequest();
    }
  };

  const renderFooter = () => (
    <View>
      {dataLoading ? (
        <ActivityIndicator
          style={{marginVertical: 20}}
          size={30}
          color="#000"
        />
      ) : (
        <></>
      )}
      {ended ? (
        <Text style={{color: '#000', fontSize: 16}}>No more data</Text>
      ) : (
        <></>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View
      style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
      <Text
        style={{
          fontSize: 20,
          color: '#000',
          fontWeight: '700',
        }}>
        No Data at the moment
      </Text>
    </View>
  );

  const makeRequest = async () => {
    try {
      const response = await axios.get(
        'https://free-nba.p.rapidapi.com/players',
        {
          params: {page, per_page: '50'},
          headers: {
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
            'X-RapidAPI-Key':
              '59373a4ed5msh8b3f359f852c603p160825jsn7c6a5cd7a035',
          },
        },
      );
      console.log(response);
      const newData = [...data, ...response.data.data];
      const finalDataDisplayed = newData.filter(c => c.team.id === teamID);

      setData(finalDataDisplayed);
      setAllPlayerListed(finalDataDisplayed);
      if (response.data.meta.next_page) {
        setPage(page + 1);
        setDataLoading(false);
      } else {
        setended(true);
        setDataLoading(false);
      }
    } catch (err) {
      console.log(err);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
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
                      placeholder={'Search Player'}
                      returnKeyType={'search'}
                      keyboardType={'web-search'}
                      placeholderTextColor={'#666666'}
                      value={searchPlayer}
                      onChangeText={text => setSearchPlayer(text)}
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
      <FlatList
        data={data}
        keyExtractor={(item, key) => key}
        renderItem={Member}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
      />
    </View>
  );
};

export default IndexPlayerContainer;
