import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-dynamic-vector-icons';

const IndexPlayerContainer = ({route, navigation}) => {
  const {teamID, teamName} = route.params;

  const [searchTeam, setSearchTeam] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [dataPlayer, setDataPlayers] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
      'X-RapidAPI-Key': 'cb56812643msh705137bf1a38558p13d9a8jsnd1017a604963',
    },
  };

  const displayAllPlayers = () => {
    setIsLoading(true);
    fetch(
      `https://free-nba.p.rapidapi.com/players?page=${pageNum}&per_page=50`,
      options,
    )
      .then(res => res.json())
      .then(response => {
        console.log(response.data);
        const newPlayerTeamList = [...dataPlayer, ...response.data].filter(
          c => c.team.id === teamID,
        );

        setDataPlayers(newPlayerTeamList);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        // api call failed
      });
  };

  const renderItem = ({item}) => {
    console.log('data item is =>', item);

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

  const renderLoader = () => {
    return (
      <View>
        {isloading ? (
          <View
            style={{
              alignSelf: 'center',
              marginVertical: 16,
              paddingVertical: 20,
            }}>
            <ActivityIndicator size="large" color={'#184461'} />
          </View>
        ) : (
          <View
            style={{
              alignSelf: 'center',
              marginVertical: 6,
              paddingVertical: 7,
            }}>
            <Text style={{color: '#184461', fontSize: 14}}>End of List</Text>
          </View>
        )}
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 6,
          paddingVertical: 7,
        }}>
        <Text style={{color: '#184461', fontSize: 14}}>
          No Data At the Moment
        </Text>
      </View>
    );
  };

  const loadMoreItem = () => {
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      fetch(
        `https://free-nba.p.rapidapi.com/players?page=${pageNum}&per_page=50`,
        options,
      )
        .then(res => res.json())
        .then(response => {
          console.log(response.data);
          const newPlayerTeamList = [...dataPlayer, ...response.data].filter(
            c => c.team.id === teamID,
          );

          setDataPlayers(newPlayerTeamList);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          // api call failed
          setIsLoading(false);
        });
    }
    fetchData();
  }, [pageNum]);

  return (
    <View style={{flex: 1}}>
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
      <>
        {isloading ? (
          <View
            style={{
              alignSelf: 'center',
              marginVertical: 16,
              paddingVertical: 20,
            }}>
            <ActivityIndicator size="large" color={'#184461'} />
          </View>
        ) : (
          <FlatList
            data={dataPlayer}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={renderLoader}
            ListEmptyComponent={renderEmpty}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
          />
        )}
      </>
    </View>
  );
};

export default IndexPlayerContainer;
