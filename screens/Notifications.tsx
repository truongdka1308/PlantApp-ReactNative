// Notifications.js
import { useSelector } from 'react-redux';
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
const Notifications = ({ route }) => {
    const { user, selectedProducts } = route.params;
    const historyItems = useSelector(state => state.history.items);
    const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    return (
        <View style={styles.container}>
          
          <View style={styles.header}>
         
          <Text style={styles.productDetail}>Lịch sử giao dịch</Text>
         
        </View>

            <FlatList
                data={historyItems}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.containerSection}>
        <Text style={styles.textSection}> {daysOfWeek[new Date(item.formattedDeliveryTime).getDay()]}, {item.formattedDeliveryTime ? new Date(item.formattedDeliveryTime).toLocaleDateString() : 'Not specified'}</Text>
      </View>
                        <FlatList
                            data={item.products}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                   <Image source={{ uri: item.imageUri1 }} style={styles.image} />
                                   <View style={styles.textContainer}>
                                   <Text style={styles.textSuc}>Đặt hàng thành công</Text>
                                   <View style={styles.titleContainer}>
                                  
                                    <Text style={styles.textName}>{item.name} | </Text>
                                    <Text style={styles.textProperty}>{item.property}</Text>
                                    </View>
                                    <Text style={styles.textItem}>{item.quantity} sản phẩm</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};
export default Notifications;

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  productDetail: {
    fontSize: 16,
    
    color: 'black',
    flex:1,
    textAlign:'center'
  },
  textSection: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 17,
  },
  containerSection: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection:'row',

  },
  textContainer:{
    justifyContent:'center',
    paddingHorizontal:20,
  },
  titleContainer:{
    flexDirection:'row'
  },
  textItem:{
    color:'black',
    paddingVertical:3
  },
  textName:{
    color:'black',
    paddingVertical:3,
    fontWeight:'bold',
  },
  textProperty:{
    color:'gray',
    paddingVertical:3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  textSuc:{
    color:'green',
    paddingVertical:3,
  }
})

