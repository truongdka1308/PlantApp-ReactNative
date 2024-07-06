import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const InfoUser = ({ navigation,route }) => {
  const { user } = route.params;
  const [id, setId] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone,setPhone]=useState(user.phone);
  const [address, setAddress] = useState(user.address);

  const defaultAvatar = require('../images/defaultAvatar.jpg');

  async function editUser(data) {
    let options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
    await fetch(`http://10.0.2.2:3000/user/${data.id}`, options);
  }
  const handleSave = async () => {
    try{
    let data = {
      id: id,
      username:user.username,
      password:user.password,
      name: name,
      email: email, 
      address: address,
      phone: phone,
    };
    await editUser(data);
    navigation.navigate('TabScreen', { screen: 'Profile', params: { user: data } });
  }catch(error){
console.log(error);
  }
  };

  return (
    <View style={styles.container}>
  <View style={styles.header}>
          <Icon name="arrow-left" size={24} color={"black"} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Chỉnh sửa thông tin</Text>
         
        </View>

      <View style={styles.userInfo}>
        <Image
          source={user.avatar ? { uri: user.avatar } : defaultAvatar}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.description}>Thông tin sẽ được lưu cho lần mua kế tiếp {'\n'}Bấm vào thông tin chi tiêt để chỉnh sửa</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <TouchableOpacity onPress={handleSave}>
          <Text style={styles.btnSave}>Lưu thông tin</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: '5%',
  },
  userInfo: {
    
    alignItems: 'center',
    
  },
  avatar: {
    marginVertical:'10%',
    width: Dimensions.get('window').width *0.4,
    height: Dimensions.get('window').height *0.2,
    borderRadius: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  headerTitle: {
    fontSize: 16,
    
    color: 'black',
    flex:1,
    textAlign:'center'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  info: {
    fontSize: 16,
    color: 'gray',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    marginBottom: 15,
    paddingBottom: 5,
    color:'black'
  },
  description:{
color:'black',
paddingVertical:Dimensions.get('window').height *0.03,
fontSize:16
  },
  btnSave:{
    backgroundColor:'green',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop:Dimensions.get('window').height *0.13,
    lineHeight:25,
    fontWeight:'bold',
  },
});

export default InfoUser;
