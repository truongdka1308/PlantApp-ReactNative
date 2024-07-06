import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Login = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [userData, setUserData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State cho checkbox

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Lắng nghe sự kiện màn hình focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(); // Gọi lại hàm fetchData mỗi khi màn hình focus
    });

    return unsubscribe; // Hủy lắng nghe khi component unmount
  }, [navigation]); // Dependency là navigation để cập nhật useEffect khi navigation thay đổi

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/user');
      const json = await response.json();
      setUserData(json);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleLogin = async () => {
    try {
      if (!username) {
        throw new Error('Please provide username.');
      }
      if (!password) {
        throw new Error('Please provide password.');
      }
      const user = userData.find(u => u.username === username && u.password === password);
      if (!user) {
        throw new Error('Invalid username or password');
      }
      Alert.alert('Success', 'Logged in successfully!');
      console.log(user);

      navigation.navigate('TabScreen', { user: user });

    } catch (error) {
      if (error.message === 'Please provide username.') {
        setErrorUsername(error.message);
      } else if (error.message === 'Please provide password.') {
        setErrorPassword(error.message);
      } else {
        Alert.alert('Error', error.message || 'Something went wrong!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/plantaImage.png')} style={styles.logo} />
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Chào mừng bạn</Text>
        <Text style={styles.textContent}>Đăng nhập tài khoản</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, errorUsername ? styles.inputError : null]}
          value={username}
          onChangeText={text => {
            setUsername(text);
            setErrorUsername('');
          }}
          placeholder="Username"
          placeholderTextColor={'gray'}
        />
        <Text style={styles.errorText}>{errorUsername}</Text>
        <View style={[styles.input, errorPassword ? styles.inputError : null]}>
          <TextInput
            style={{ color: 'black', flex: 1 }}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrorPassword('');
            }}
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>{errorPassword}</Text>
        <View style={styles.containerchk}>
         <View style={styles.row}>
         <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
            <Icon
              name={rememberMe ? 'check-square' : 'square'}
              size={20}
              color={rememberMe ? 'green' : 'gray'}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10,color:'black' }}>Remember me</Text>
         </View>

         <Text style={{ color:'green',textDecorationLine:'underline' }}>Forgot Password ?</Text>
        </View>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.containerRow}>
          <View style={styles.horizontalLine}></View>
          <Text style={styles.centeredText}>Hoặc</Text>
          <View style={styles.horizontalLine}></View>
        </View>
        <View style={styles.containerRow}>
          <Image source={require('./img/google.png')} style={styles.icongg}></Image>
          <Image source={require('./img/Facebook.png')} style={styles.iconfb}></Image>
        </View>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Bạn không có tài khoản ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  logo: {
    width: '100%',
    height: '30%',
  },
  icongg: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
  },
  iconfb: {
    width: 34,
    height: 34,
    marginHorizontal: 15,
  },
  welcomeText: {
    fontSize: 26,
    marginVertical: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  textContent: {
    color: 'black',
    fontSize: 15,
  },
  form: {
    width: '100%',
    padding: 20,
  },
  input: {
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
  },
  loginText: {
    backgroundColor: 'green',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    color: 'black',
  },
  linkText: {
    color: 'green',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  horizontalLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    marginHorizontal: 10,
  },
  centeredText: {
    color: 'black',
    fontSize: 16,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  containerchk:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  row:{
    flexDirection: 'row',
  }
});
export default Login;
