import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Alert, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItemQuantity,updateCartItemPrice } from '../reducers/cartReducer';

const ProductDetail = ({ route, navigation }) => {
  const { productId,user } = route.params;
  const [product, setProduct] = useState(null);
  const [productPrice, setProductPrice] = useState(0); 
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
 
  const handleAddToCart = () => {
    if (selectedQuantity === 0) {
      Alert.alert('Thông báo', 'Số lượng không hợp lệ');
      return;
    }
  
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      const updatedQuantity = existingItem.quantity + selectedQuantity;
      const updatedPrice=existingItem.price+productPrice;
      dispatch(updateCartItemQuantity({ id: productId, quantity: updatedQuantity }));
      dispatch(updateCartItemPrice({ id: productId, price: updatedPrice }))
    } else {
      dispatch(addToCart({ id: productId, name: product.name, quantity: selectedQuantity,imageUri1:product.imageUri1,price:productPrice,property:product.property}));
    }
    Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng!');
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.7:3000/product/${productId}`);
        const data = await response.json();
        setProduct(data);
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId]);
  
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const increaseQuantity = () => {
    if (selectedQuantity < parseInt(product.quantity)) {
      setSelectedQuantity(selectedQuantity + 1);
      // Cập nhật giá mới khi tăng số lượng
      setProductPrice(product.price * (selectedQuantity + 1));
    } else {
      Alert.alert('Số lượng đã đạt giới hạn');
    }
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
      // Cập nhật giá mới khi giảm số lượng
      setProductPrice(product.price * (selectedQuantity - 1));
    }
  };

  // const navigateToCart = () => {
  //   navigation.navigate('Cart', { selectedProduct: product, quantity: selectedQuantity });
  // };
  

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Icon name="arrow-left" size={24} color={"black"} onPress={() => navigation.goBack()} />
          <Text style={styles.productDetail}> {product.name}</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Cart",{user:user})}>
          <Icon name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
        <Swiper style={styles.wrapper} autoplay height={Dimensions.get('window').height * 0.4}>
          <Image source={{ uri: product.imageUri1 }} style={styles.productImage} resizeMode="cover" />
          <Image source={{ uri: product.imageUri2 }} style={styles.productImage} resizeMode="cover" />
          <Image source={{ uri: product.imageUri3 }} style={styles.productImage} resizeMode="cover" />
        </Swiper>
        
        <View style={styles.row}>
          <Text style={styles.btnGreen}>{product.type}</Text>
          <Text style={styles.btnGreen}>{product.property}</Text>
        </View>
        
        <View style={styles.textDetailContainer}>
          <Text style={styles.productPriceTitle}>{product.price}</Text>
          
          <Text style={styles.productDetail}>Chi tiết sản phẩm</Text>
          <View style={styles.horizontalLine} />
          <View style={styles.spaceBettween}>
            <Text style={styles.productDetail}>Kích cỡ: </Text>
            <Text style={styles.productDetail}>{product.size}</Text>
          </View>
          <View style={styles.horizontaldetailLine} />
          <View style={styles.spaceBettween}>
            <Text style={styles.productDetail}>Xuất xứ:</Text>
            <Text style={styles.productDetail}>{product.origin}</Text>
          </View>
          <View style={styles.horizontaldetailLine} />
          <View style={styles.spaceBettween}>
            <Text style={styles.productDetail}>Tình trạng:</Text>
            <Text style={styles.quantityProText}>Con {product.quantity} sp</Text>
          </View>
          <View style={styles.horizontaldetailLine} />
        </View>
        
        <View style={styles.calcContainer}>
          <Text style={styles.calcText}>Đã chọn {selectedQuantity} sản phẩm</Text>
          <Text style={styles.calcText}>Tạm tính</Text>
        </View>
        
        {product && (
  <View style={styles.calcContainer}>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.selectedQuantity}>{selectedQuantity}</Text>
      <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.productPriceCalc}>{productPrice} đ</Text>
  </View>
)}

        <TouchableOpacity onPress={()=>handleAddToCart()}>
          <Text style={styles.btnDeal}>Chọn mua</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  wrapper: {
    height: "95%",
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  spaceBettween:{
    justifyContent:'space-between',
    flexDirection:'row'
  },
  productPriceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  productPriceCalc:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  productDetail: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  horizontaldetailLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 35,
    height: 35,
    marginRight: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGreen:{
    backgroundColor:'green',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    width:'21%',
    lineHeight:15,
    fontWeight:'bold',
    marginRight:10
  },
  btnDeal:{
    backgroundColor:'green',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop:'5%',
    lineHeight:25,
    fontWeight:'bold',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  selectedQuantity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 25,
  },
  calcText:{
    color: 'gray',
    fontSize: 15,
  },
  calcContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textDetailContainer:{
    marginHorizontal: 20,
    marginVertical: 10,
  },
  row:{
    flexDirection: 'row',
  },
  quantityProText:{
    color: 'green',
    fontSize: 16,
    marginBottom: 5,
  }
});

export default ProductDetail;
