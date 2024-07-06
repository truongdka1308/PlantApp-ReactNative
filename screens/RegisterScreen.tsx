import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button, Alert, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repass, setRepass] = useState('');

    const handleRegister = async () => {
        try {
            if (!username || !email || !password || !repass) {
                throw new Error('Please fill in all fields.');
            }
            if (password !== repass) {
                throw new Error('Password does not match.');
            }
    
            const response = await fetch('http://10.0.2.2:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                Alert.alert('Success', 'Registered successfully!');
                navigation.navigate('Login');
            } else {
                throw new Error(data.message || 'Something went wrong!');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong!');
        }
    };

    return (
        <View style={styles.container}>
             <Image source={require('../images/plantaImage.png')} style={styles.logo} />
            <View style={styles.header}>
              
                <Text style={styles.welcomeText}>Đăng ký</Text>
                <Text style={styles.textContent}>Tạo tài khoản</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder="Username"
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.input}
                    value={repass}
                    onChangeText={text => setRepass(text)}
                    placeholder="Re-type Password"
                    secureTextEntry={true}
                    placeholderTextColor={'gray'}
                />
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.loginText}>Register</Text>
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
                    <Text style={styles.bottomText}>You have an account? Click <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>Sign in</Text></Text>
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
      
    },
    logo: {
        width: '100%',
        height: '20%',
      },
    welcomeText: {
        fontSize: 24,
        marginVertical: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    textContent: {
        color: 'black',
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
        color: 'black',
marginVertical:10
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
    },
    bottomText: {
        marginBottom: '5%',
        color:'black',
    },
    linkText: {
        color: 'green',
        fontWeight: 'bold',
    },
    inputError: {
        borderColor: 'red', // Đổi màu viền thành đỏ khi có lỗi
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'center',
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
});

export default RegisterScreen;
