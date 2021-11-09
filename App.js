// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, A } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Avatar } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import { Button } from 'react-native-paper';


function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [storeItems] = useState([]);
  const [itmClr, setItmClr] = useState('red');


  const renderItem = ({ item }) => {
    //   const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const backgroundColor = 'white';
    const selBackgroundColor = 'green';
    const color = 'black';


    if (selectedId != undefined) {

      if (item.id === selectedId) {
        if (storeItems.length > 0) {
          if (storeItems.includes(selectedId)) {

            storeItems.splice(storeItems.indexOf(selectedId), 1);
            for (var i = 0; i < storeItemClns.length; i++) {
              if (storeItemClns[i].id == selectedId) {
                Snackbar.show({
                  text: "'" + storeItemClns[i].title + "' movie is removed sucessfully!",
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: 'red'
                });
                storeItemClns.splice(storeItemClns[i], 1);
              }
            }

            return (
              <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
              />
            );
          } else {
            storeItems.push(selectedId);
            storeItemClns.push(item);
            Snackbar.show({
              text: "'" + storeItemClns[storeItemClns.length - 1].title + "' movie is added sucessfully!",
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'green'
            });
            return (
              <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
              />
            );

          }
        } else {
          storeItems.push(selectedId);
          storeItemClns.push(item);
          Snackbar.show({
            text: "'" + storeItemClns[storeItemClns.length - 1].title + "' movie is added sucessfully!",
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'green'
          });
          return (
            <Item
              item={item}
              onPress={() => setSelectedId(item.id)}
            />
          );


        }

      } else {
        if (storeItems.includes(item.id)) {

          return (
            <Item
              item={item}
              onPress={() => setSelectedId(item.id)}
            />
          );

        } else {

          return (
            <Item
              item={item}
              onPress={() => setSelectedId(item.id)}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
            />
          );
        }
      }
    } else {

      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    }


  };

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7e6ff' }}>

      <View style={{ flex: 4, padding: 24 }}>
        {isLoading ? <ActivityIndicator /> : (
          <SafeAreaView style={styles.container}>
            <Card style={styles.cardHmRltStyl}>
              <Card.Content>
                <Paragraph><FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id}
                  renderItem={renderItem}
                  extraData={selectedId}
                /></Paragraph>
              </Card.Content>
            </Card>
          </SafeAreaView>
        )}
      </View>
      <View style={{ flex: 1, padding: 24 }}>
        <Button
          type="outlined" color="purple" style={styles.btnStyle}
          onPress={() => storeItemClns.length > 0 ? navigation.navigate('Details') :
            Snackbar.show({
              text: "Select atleast one movie!",
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'red'
            })}
        >Next</Button></View>
    </View>
  );
}
function DetailsScreen({ navigation }) {
  const [selectedDtlId, setDtlSelectedId] = useState(null);
  const [selectedValue] = useState(storeItemClns[0]);
  const [selDtlVal, setSelDtlVal] = useState(storeItemClns[0].title);
  const renderDtlItem = ({ item }) => {
    if (selectedDtlId != null) {
      if (selectedDtlId == item.id) {
        setSelDtlVal(item.title);
      }

    }

    const backgroundColor = item.id === selectedDtlId ? "purple" : "white";
    const color = 'black';
    return (
      <ItemDtl style={styles.item}
        item={item}
        onPress={() => setDtlSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7e6ff' }}>
      <View style={{ flex: 4, padding: 24 }}>
        <SafeAreaView style={styles.container}>

          <Card style={styles.cardHmRltStyl}>
            <Card.Content>
              <Paragraph><FlatList
                data={storeItemClns}
                keyExtractor={({ id }, index) => id}
                renderItem={renderDtlItem}
                extraData={selectedDtlId}
              /></Paragraph>
            </Card.Content>
          </Card>
        </SafeAreaView></View>
      <View style={{ flex: 1, padding: 10 }}>
        <Card.Title style={styles.cardHmRltStyl}
          title={selDtlVal}
        /></View>
      <View style={{ flex: 1, padding: 10 }}>
        <Button
          type="outlined" color="purple" style={styles.btnStyle}
          onPress={() => navigation.navigate('Home')}
        >Back</Button></View>

    </View>
  );
}

const Item = ({ item, onPress, backgroundColor, textColor }) => (

  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
    <Text style={[styles.subTitle, "black"]}>{"Year: " + item.releaseYear}</Text>
  </TouchableOpacity>
);
const ItemDtl = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);
const storeItemClns = [];

const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 280,
    borderRadius: 12,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: "#000"
  },
  title: {
    fontSize: 32,
  },
  subTitle: {
    fontSize: 12,
  },
  avatarStyl: {
    fontSize: 20,
  },
  cardDtlRltStyl: {
    backgroundColor: 'purple',
    elevation: 10,
    width: 350
  },
  cardHmRltStyl: {
    backgroundColor: 'purple',
    borderRadius: 20,
    elevation: 10,
    width: 350,
    justifyContent: 'center'
  },
  btnStyle: {
    fontSize: 60

  }
});

function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            title: 'Movie Catalog',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          style={backgroundColor = 'purple'} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{
          title: 'Movie Sub-Catalog',
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
          style={backgroundColor = 'purple'} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
