import { StyleSheet, View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

const Profile = ({ navigation, route }) => {
  const [user, setUser] = useState(route.params.user);
  const [showModal, setShowModal] = useState(false);
  const defaultAvatar = require('../images/defaultAvatar.jpg');
  const handleModalLogout = () => {
    setShowModal(true);
  };
console.log(user);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleInfoScreen=()=>{
navigation.navigate('InfoUser',{user:user})
  };
  const handleQandA=()=>{
    navigation.navigate('QandA')
      };
  
  useEffect(() => {
    // Kiểm tra xem thông tin người dùng đã thay đổi không và cập nhật giao diện tương ứng
    setUser(route.params.user);
  }, [route.params.user]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.userInfo}>
        <Image
          source={user.avatar ? { uri: user.avatar } : defaultAvatar}
          style={styles.avatar}
        />
        <View style={styles.userInfoText}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
      </View>

      {/* Other sections */}
      <View style={styles.containerSection}>
        <Text style={styles.textSection}>Chung</Text>
      </View>
      <TouchableOpacity onPress={handleInfoScreen}>
        <Text style={styles.textSetting}>Chỉnh sửa thông tin</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textSetting}>Cẩm nang trồng cây</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textSetting}>Lịch sử giao dịch</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleQandA}>
        <Text style={styles.textSetting}>Q & A</Text>
      </TouchableOpacity>

      <View style={styles.containerSection}>
        <Text style={styles.textSection}>Bảo mật và Điều khoản</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.textSetting}>Điều khoản và điều kiện</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textSetting}>Chính sách quyền riêng tư</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleModalLogout}>
        <Text style={styles.textLogout}>Đăng xuất</Text>
      </TouchableOpacity>

      {/* Logout confirmation modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Bạn có muốn đăng xuất không?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                <Text style={styles.modalButtonText}>Không</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Có</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '15%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfoText: {
    flex: 1,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    flex: 1,
    textAlign: 'center',
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
  textSetting: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 17,
  },
  textLogout: {
    color: 'red',
    paddingVertical: 10,
    fontSize: 17,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Profile;
