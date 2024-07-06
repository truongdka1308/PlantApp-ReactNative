import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addtoHistory } from '../reducers/historyReducer';
import {clearCart} from '../reducers/cartReducer'
const Pay = ({navigation, route}) => {
    const { user, totalPrice } = route.params;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
    const [selectedPayMethod, setSelectedPayMethod] = useState(null);
    const [shippingFee, setShippingFee] = useState(0);
    const cartItems = useSelector(state => state.cart.items);

    const dispatch = useDispatch();
    const historyItems = useSelector(state => state.history.items);
   
    const handleDealHistory = () => {
      if (!selectedShippingMethod ) {
        Alert.alert('Thông báo', 'Chưa chọn phương thức vận chuyển');
        return;
      }
      else if(!selectedPayMethod ) {
        Alert.alert('Thông báo', 'Chưa chọn phương thức thanh toán');
        return;
      }
    
      const formattedDeliveryTime = deliveryDate.toISOString(); 
        dispatch(addtoHistory({ products: cartItems, formattedDeliveryTime,totalAmount:totalAmount }));
        dispatch(clearCart());
        navigation.navigate('Notifications');
    
       
      
      Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng!');
    };

    console.log(cartItems);
    
    const updateCurrentDate = () => {
        setCurrentDate(new Date());
    };

    // Tự động cập nhật ngày mỗi giây
    useEffect(() => {
        const intervalId = setInterval(updateCurrentDate, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const newDeliveryDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000); // Thêm 2 ngày (2 * 24 giờ * 60 phút * 60 giây * 1000 milliseconds)
        setDeliveryDate(newDeliveryDate);
    }, [currentDate]);

    const handleSelectShippingMethod = (method) => {
        setSelectedShippingMethod(method);
        // Logic tính phí vận chuyển dựa trên phương thức vận chuyển được chọn
        if (method === "fast") {
            setShippingFee(15000);
        } else if (method === "cod") {
            setShippingFee(20000);
        } else {
            setShippingFee(0);
        }
    };

    const handleSelectPayMethod = (method) => {
        setSelectedPayMethod(method);
    };

    const totalAmount = totalPrice + shippingFee;



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-left" size={24} color={"black"} onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Thanh toán</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.containerSection}>
                    <Text style={styles.textSection}>Thông tin khách hàng</Text>
                </View>
                <View style={styles.contentcontainerSection}>
                    <Text style={styles.contenttextSection}>{user.name}</Text>
                </View>
                <View style={styles.contentcontainerSection}>
                    <Text style={styles.contenttextSection}>{user.email}</Text>
                </View>
                <View style={styles.contentcontainerSection}>
                    <Text style={styles.contenttextSection}>Địa chỉ: {user.address}</Text>
                </View>
                <View style={styles.contentcontainerSection}>
                    <Text style={styles.contenttextSection}>Số điện thoại: {user.phone}</Text>
                </View>
                <View style={styles.containerSection}>
                    <Text style={styles.textSection}>Phương thức vận chuyển</Text>
                </View>

                <TouchableOpacity onPress={() => handleSelectShippingMethod("fast")}>
                    <View style={styles.contentcontainerSection}>
                        <View style={styles.col}>
                            <Text style={[styles.contenttextSection, selectedShippingMethod === "fast" && styles.selectedShippingMethod]}>Giao hàng nhanh - 15.000đ</Text>
                            <Text style={styles.contenttextSection}>Dự kiến giao hàng {currentDate.toLocaleDateString()} - {deliveryDate.toLocaleDateString()}</Text>
                        </View>
                        {selectedShippingMethod === "fast" && <Icon name="check-circle" size={20} color="green" />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSelectShippingMethod("cod")}>
                    <View style={styles.contentcontainerSection}>
                        <View style={styles.col}>
                            <Text style={[styles.contenttextSection, selectedShippingMethod === "cod" && styles.selectedShippingMethod]}>Giao hàng COD - 20.000đ</Text>
                            <Text style={styles.contenttextSection}>Dự kiến giao hàng {currentDate.toLocaleDateString()} - {deliveryDate.toLocaleDateString()}</Text>
                        </View>
                        {selectedShippingMethod === "cod" && <Icon name="check-circle" size={20} color="green" />}
                    </View>
                </TouchableOpacity>

                <View style={styles.containerSection}>
                    <Text style={styles.textSection}>Hình thức thanh toán</Text>
                </View>

                <TouchableOpacity onPress={() => handleSelectPayMethod("card")}>
                    <View style={styles.contentcontainerSection}>
                        <View style={styles.col}>
                            <Text style={[styles.contenttextSection, selectedPayMethod === "card" && styles.selectedShippingMethod]}>Thẻ VISA/MASTERCARD</Text>
                        </View>
                        {selectedPayMethod === "card" && <Icon name="check-circle" size={20} color="green" />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSelectPayMethod("atm")}>
                    <View style={styles.contentcontainerSection}>
                        <View style={styles.col}>
                            <Text style={[styles.contenttextSection, selectedPayMethod === "atm" && styles.selectedShippingMethod]}>Thẻ ATM</Text>
                        </View>
                        {selectedPayMethod === "atm" && <Icon name="check-circle" size={20} color="green" />}
                    </View>
                </TouchableOpacity>

                <View style={styles.containerSection}>
                    <Text style={styles.textSection}>Tổng cộng</Text>
                </View>
                <View style={styles.calcContainer}>
                    <Text style={styles.calcText}>Tạm tính</Text>
                    <Text style={styles.totalPrice}>{totalPrice}đ</Text>
                </View>
                <View style={styles.calcContainer}>
                    <Text style={styles.calcText}>Phí vận chuyển</Text>
                    <Text style={styles.totalPrice}>{shippingFee}đ</Text>
                </View>
                <View style={styles.calcContainer}>
                    <Text style={styles.calcText}>Tổng cộng</Text>
                    <Text style={styles.totalPrice}>{totalAmount}đ</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleDealHistory}>
                <Text style={styles.btnDeal}>Thanh toán</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Pay

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
        marginBottom: 15,
    },
    headerText: {
        fontSize: 16,
        color: 'black',
        flex: 1,
        textAlign: 'center'
    },
    textSection: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
    },
    containerSection: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    contentcontainerSection: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contenttextSection: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 15,
    },
    selectedShippingMethod: {
        color: 'green', // Màu xanh
    },
    col: {
        flexDirection: 'column'
    },
    content: {
        paddingHorizontal: 15
    },
    calcContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',

        textAlign: 'right',
        color: 'black'
    },
    calcText: {
        color: 'gray',
        fontSize: 16,
    },
    containerPrice: {
        marginTop: '10%',
        marginBottom: '5%'
    },
    btnDeal: {
        backgroundColor: 'green',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: '5%',
        lineHeight: 25,
        fontWeight: 'bold',
    },
})
