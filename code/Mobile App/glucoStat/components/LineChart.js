import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
    LineChart,
  } from "react-native-chart-kit";
  import color from "../config/colors"

export default function App({x_datalist, y_datalist, x_unit, y_unit}) {

  return (

  
  <LineChart
    data={{
      labels: x_datalist,
      datasets: [
        {
          data: y_datalist
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    //yAxisLabel={x_unit}
    yAxisSuffix={x_unit}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      //backgroundColor: "#87BEF5",
      backgroundGradientFrom: color.primary,
      backgroundGradientTo: color.primary,
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#87BEF5"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
    
  );
}

const styles = StyleSheet.create({

});