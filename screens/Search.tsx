import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput,Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Search = () => {
  const [data, setData] = useState([]); // State lưu trữ dữ liệu sản phẩm
  const [searchQuery, setSearchQuery] = useState(''); // State lưu trữ nội dung tìm kiếm
  const [filteredData, setFilteredData] = useState([]); // State lưu trữ dữ liệu sau khi lọc

  useEffect(() => {
    // Fetch dữ liệu từ file JSON hoặc từ API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.7:3000/product'); // Đổi địa chỉ và cổng tương ứng với máy chủ JSON của bạn
      const jsonData = await response.json();
      setData(jsonData); // Lưu dữ liệu vào state
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text); // Cập nhật nội dung tìm kiếm
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()) // Lọc dữ liệu theo tên sản phẩm
    );
    setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{uri:item.imageUri1}}></Image>
    <View style={styles.textContainer}>
      <View style={styles.titleContainer}>
    <Text style={styles.textItem}>{item.name} | </Text>
    <Text style={styles.textItem}>{item.property}</Text>
    </View>
    <Text style={styles.textItem}>{item.price}đ</Text>
      <Text style={styles.textItem}>Còn {item.quantity} sản phẩm</Text>
      
    
    </View>
    
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="arrow-left" size={24} color={"black"} onPress={() => navigation.goBack()} />
          <Text style={styles.productDetail}>Search</Text>
         
        </View>
        <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={'gray'}
        onChangeText={handleSearch}
        value={searchQuery}
      />
       <Icon name={'search'} size={20} color="gray" />
       </View>
      <FlatList
        data={filteredData.length > 0 ? filteredData : data} // Sử dụng dữ liệu đã được lọc hoặc dữ liệu ban đầu nếu không có tìm kiếm
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
flex:1
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection:'row',

  },
  textItem:{
    color:'black',
    paddingVertical:3
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  textContainer:{
    justifyContent:'center',
    paddingHorizontal:20,
  },
  titleContainer:{
    flexDirection:'row'
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
  inputContainer:{
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color:'black'
  }
});

export default Search;
