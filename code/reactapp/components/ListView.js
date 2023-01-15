import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';


export default function App({datalist}) {
  const FlatListItemSeparator = () => {
    return (
      <View
        style={{height: 1, backgroundColor: '#D8D8D8', marginHorizontal: 10}}
      />
    );
  };

  return (

    <FlatList
      data={datalist}
      renderItem={({item}) => (
        <View style={styles.tablerow}>
          <View style={styles.tablecol2}>
            <View>
              <Image
                style={styles.image}
                source={require('../assets/drop.png')}
              />
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>

          <View style={styles.tablecol1}>
            <Text style={styles.value}>{item.value}</Text>
          </View>

          <View style={styles.tablecol2}>
            <View style={{
                ...styles.dot,
                backgroundColor: item.value<70? "orange" : item.value>70 && item.value<125 ? "red" : "green"
            }}></View>
          </View>
        </View>
      )}
      keyExtractor={item => {
        return item._id;
      }}
      ItemSeparatorComponent={FlatListItemSeparator}
      ListHeaderComponent={() => (
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            marginTop: 20,
            marginBottom: 20,
            fontWeight: 'bold',
          }}>
          Recent Records
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 15,
    color: '#000',
  },
  tablerow: {
    flexDirection: 'row',
    flex: 1,
    padding: 10
  },
  tablecol1: {
    alignItems: 'center',
    justifyContent: 'center',

    flex: 2,
    flexDirection: 'row',
  },
  tablecol2: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
    flexDirection: 'row',
  },
  image: {
    height: 40,
    width: 40,
  },
  dot: {
    
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  time: {
    fontSize: 15,
    color: '#000',
  },
});
