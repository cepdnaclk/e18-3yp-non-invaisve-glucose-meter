// import React, {useEffect, useState} from 'react';

// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   Alert,
//   FlatList,
// } from 'react-native';
// import {useIsFocused} from '@react-navigation/native';

// import CircularProgress from '../components/ProgressIndicator';
// import ListView from '../components/ListView';
// import AppBar from '../components/ProfileBar';
// import client from '../API/client2';

// export default function App({navigation}) {
//   const {user, setUser, setIsLoggedIn, setRole} = useLogin();

//   async function deleteToken(key) {
//     await SecureStore.deleteItemAsync(key);
//   }

//   const logout = async () => {
//     const res = await client2.post('/auth/logout', {}).catch(error => {
//       console.log('error: ' + error.message);
//     });
//     // console.log(res.data.message);
//     deleteToken('access');
//     deleteToken('refresh');
//     setIsLoggedIn(false);
//     setRole(0);
//     setUser({});
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={datalist}
//         renderItem={({item}) => (
//           <View style={styles.tablerow}>
//             <View style={styles.tablecol2}>
//               <Text style={styles.item}>{item.time}</Text>
//             </View>
//           </View>
//         )}
//         keyExtractor={item => {
//           return item._id;
//         }}
//         ItemSeparatorComponent={FlatListItemSeparator}
//         ListHeaderComponent={() => (
//           <Text
//             style={{
//               color: '#000',
//               fontSize: 20,
//               marginTop: 20,
//               marginBottom: 20,
//               fontWeight: 'bold',
//             }}>
//             Recent Records
//           </Text>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#8fa5e3',
//   },
// });
