import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { removeFromCart, updateCartItemPrice, updateCartItemQuantity } from '../reducers/cartReducer'; // Import updateCartItemQuantity action

const Cart = ({ navigation,route }) => {
  const { user } = route.params;
  console.log(user);
  
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const toggleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  
//Del item theo chk
const removeSelectedItems = () => {
  selectedItems.forEach(itemId => {
    dispatch(removeFromCart(itemId));
  });
  setSelectedItems([]); // Xóa danh sách các sản phẩm được chọn
};

  const removeItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 ,price:item.price+item.price/item.quantity};
      }
      return item;
    });
    // Dispatch the updateCartItemQuantity action to update quantity
    dispatch(updateCartItemQuantity({ id: itemId, quantity: updatedCartItems.find(item => item.id === itemId).quantity }));
     dispatch(updateCartItemPrice({ id: itemId, price: updatedCartItems.find(item => item.id === itemId).price }));
  };
  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1, price: item.price - item.price / item.quantity };
      }
      return item;
    });
  
    const updatedItem = updatedCartItems.find(item => item.id === itemId);
    if (updatedItem.quantity === 0) {
      removeItem(itemId); // Xóa sản phẩm khi số lượng giảm xuống 0
    } else {
      // Dispatch the updateCartItemQuantity action to update quantity
      dispatch(updateCartItemQuantity({ id: itemId, quantity: updatedItem.quantity }));
      dispatch(updateCartItemPrice({ id: itemId, price: updatedItem.price }));
    }
  };
  

  const calculatePrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price;
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calculatePrice();
  }, [cartItems]);

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.itemcontainer}>
      <TouchableOpacity onPress={() => toggleSelectItem(item.id)}>
        <Icon
          name={selectedItems.includes(item.id) ? "check-square" : "square"}
          size={24}
          color={selectedItems.includes(item.id) ? "green" : "gray"}
        />
      </TouchableOpacity>
      <Image style={styles.imageCart} source={{ uri: item.imageUri1 }}></Image>
      
     <View style={styles.infoProText}>
      <View style={styles.infoProTitle}>
        <Text style={styles.productDetail}>{item.name} |</Text>
        <Text style={styles.productDetail}> {item.property}</Text>
      </View>
      <Text style={styles.greenText}>{item.price}đ</Text>
    
     <View style={styles.calcContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(item.id)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.textCenter}>{item.quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={() => increaseQuantity(item.id)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
  <Text style={styles.textDel}>Xóa</Text>
</TouchableOpacity>
    </View>
     
     </View>
     
    </View>
  );

  return (
    <View style={styles.container}>
    <View style={styles.header}>
  <Icon name="arrow-left" size={24} color="black" onPress={() => navigation.goBack()} />
  <Text style={[styles.productDetail, { flex: 1, textAlign: 'center' }]}>Giỏ hàng</Text>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {cartItems.some(item => item.quantity > 0) && selectedItems.length > 0  && (
      <TouchableOpacity onPress={removeSelectedItems}>
        <Icon name="trash" size={24} color="black" />
      </TouchableOpacity>
    )}
  </View>
</View>


      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {cartItems.length > 0 && ( // Kiểm tra nếu có sản phẩm trong giỏ hàng
        <View style={styles.calcContainer}>
          <Text style={styles.calcText}>Tạm tính</Text>
          <Text style={styles.totalPrice}>{totalPrice}đ</Text>
        </View>
      )}

      {cartItems.length > 0 && ( // Kiểm tra nếu có sản phẩm trong giỏ hàng
     <TouchableOpacity onPress={() => navigation.navigate("Pay", { user: user, totalPrice: totalPrice })}>
     <Text style={styles.btnDeal}>Tiến hành thanh toán</Text>
   </TouchableOpacity>
   
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  itemcontainer:{
flexDirection:'row',
marginVertical:10,
alignItems:'center',
justifyContent:'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productDetail: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  imageCart: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  infoProText:{
    flexDirection:'column'
  },
  infoProTitle:{
    flexDirection:'row'
  },
  greenText:{
    color:'green',
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    width: 25,
    height: 25,
    
    borderWidth: 2,
   
    alignItems: 'center',
  },
  calcContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
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
  selectedQuantity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 25,
  },
  textCenter:{
    fontSize: 15,
    fontWeight: 'bold',
    color:'black',
    paddingHorizontal:'5%'
  },
  textDel:{
textDecorationLine:'underline',
color:'black',
marginRight:'5%'
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    
    textAlign: 'right',
    color:'black'
  },
  calcText:{
    color: 'gray',
    fontSize: 18,
  },
});

export default Cart;
