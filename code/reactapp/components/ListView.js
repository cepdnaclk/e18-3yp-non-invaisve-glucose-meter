import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";

export default function App({datalist}) {

    const FlatListItemSeparator = () => {
        return <View style={{ height: 1, backgroundColor: "#D8D8D8",marginHorizontal:10}} />;
        };

  return (
    
      <FlatList 
        data={datalist}
        renderItem={({ item }) => <View style={styles.tablerow}>
            <View style={styles.tablecol2}><Text style={styles.item}>{item.value}</Text></View>
            <View style={styles.tablecol1}><Text style={styles.item}>{item.name}</Text></View>
            <View style={styles.tablecol2}><Text style={styles.item}>{item.value}</Text></View>
            </View>}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={FlatListItemSeparator}
        ListHeaderComponent={() => (
            <Text style={{ color: "#000", fontSize: 20, marginTop:20, marginBottom: 20, fontWeight:'bold' }}>
            Recent Records
            </Text>
        )}
      />
    
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 25,
    fontSize: 15,
    marginTop: 5,
    color: "#000",
    
  },
  tablerow:{
    flexDirection: "row",
    flex: 1,
    
  },
  tablecol1:{
    flex: 2,
  },
  tablecol2:{
    flex: 1,
  }
});