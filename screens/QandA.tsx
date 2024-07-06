import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 from Expo

const QandA = ({navigation}) => {
  // Danh sách các câu hỏi và câu trả lời
  const [data, setData] = useState([
    { id: '1', question: 'Tôi trộn các chất dinh dưỡng theo thứ tự nào ?', answer: 'A,B,C,D,F rồi line E Root Igniter.Nên pha vào xô và cho máy sục oxi vào thì khơi pha dd sẽ tan đều.' },
    { id: '2', question: 'Tôi có thể giữ dung dịch hỗn hợp trong bao lâu', answer: 'Dung dịch hỗn hợp có thể giữ trong 1 tuần' },
    { id: '3', question: 'Khi nào tôi thêm bộ điều chỉnh pH', answer: 'Tự đi mà tìm' },
    { id: '4', question: 'Các chất điều chỉnh tăng trưởng có được sử dụng trong các sản phẩm Planta không ?', answer: 'Có' },
    { id: '5', question: 'Các sản phẩm planta có phải hữu cơ không ?', answer: 'Không' },
    // Thêm các câu hỏi và câu trả lời khác tại đây
  ]);

  // Hàm để xử lý việc mở và đóng câu trả lời
  const toggleAnswer = (id) => {
    setData(data.map(item =>
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  // Component hiển thị mỗi câu hỏi và câu trả lời
  const RenderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleAnswer(item.id)}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{item.question}</Text>
          <Icon name={item.isOpen ? 'angle-up' : 'angle-down'} size={24} color="black" />
        </View>
      </TouchableOpacity>
      {item.isOpen && <Text style={styles.answerText}>{item.answer}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
         <View style={styles.header}>
          <Icon name="arrow-left" size={24} color={"black"} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Q & A</Text>
         
        </View>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 16,
    
    color: 'black',
    flex:1,
    textAlign:'center'
  },
  itemContainer: {
    marginVertical:'5%'
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  answerText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
});

export default QandA;
