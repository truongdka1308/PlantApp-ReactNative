import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import Icon từ thư viện
import { useNavigation } from '@react-navigation/native';
const Home = ({route}) => {
  const navigation = useNavigation();
  const [plantData, setPlantData] = useState([]);
  const [user, setUser] = useState(route.params.user);
  console.log(user);
  
  useEffect(() => {
    fetch('http://10.0.2.2:3000/product') // Đổi địa chỉ và cổng tương ứng với máy chủ JSON của bạn
      .then(response => response.json())
      .then(data => setPlantData(data))
      .catch(error => console.error(error));
  }, []);
  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetail', { productId,user });
  };
  // Hàm render mỗi mục trong FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item.id)}>
    <View style={styles.product}>
      <Image source={{ uri: item.imageUri1 }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>Giá: {item.price}đ</Text>
    </View>
    </TouchableOpacity>
  );
 
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
         
          <Text style={styles.headerTitle}>Planta - tỏa sáng {'\n'}không gian nhà bạn</Text>
          
          <Text style={styles.headerNewPro}>Xem hàng mới về  <Icon name={'arrow-right'} size={12} color="green" /></Text>
        </View>
        {/* Icon giỏ hàng */}
        <TouchableOpacity onPress={()=>navigation.navigate('Cart',{user:user})}>
        <Icon name={'shopping-cart'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image style={styles.imgSlide} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3lbhCGRiTlcg6gauhpH-EdpHTfJNp8TydNSqQNj18EcshTndggH1ilbSKWMZPFfVP1U&usqp=CAU'}}></Image>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cây Trồng</Text>
      </View>
      <FlatList
        horizontal
        data={plantData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.productList}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cây Cảnh</Text>
      </View>
      <FlatList
        horizontal
        data={plantData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.productList}
      />
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cây khác</Text>
      </View>
      <FlatList
        horizontal
        data={plantData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.productList}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 35
  },
  headerNewPro: {
    color: "green",
    fontWeight: 'bold',
    lineHeight: 40
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  productList: {
    marginBottom: 20,
  },
  product: {
    marginRight: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 16,
    marginTop: 5,
    color: 'black',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black',
  },
  imgSlide:{
width:'100%',
height:150,
marginBottom: 10,
  },
});

export default Home;
