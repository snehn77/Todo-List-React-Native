
import React , {useState} from 'react';
import { StyleSheet, Text, View , StatusBar , FlatList ,Alert , TouchableWithoutFeedback , Keyboard, TouchableWithoutFeedbackBase} from 'react-native';
import AddTodo from './components/addTodo';
import Header from './components/header'
import TodoItem from './components/todoItem';

export default function App() {

  const [todos , setTodos] = useState([
    {text: 'Buy coffee' , key: '1'},
    {text: 'Create app' , key: '2'},
    {text: 'Buy clothes' , key: '3'},
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todos => todos.key != key)
    })
  }

  const submitHandler = (text) => {

    if(text.length > 3){
      setTodos((prevTodos) => {
        return [
          {text:text , key:Math.random().toString()},
          ...prevTodos
        ];
      })
    }
    else{
      Alert.alert('Oops!' , 'Todos must be over 3 chars long' , [
        {text:'Understood' , onPress:() => console.log('alert closed')}
      ])
    }

  } 
  return (
    <TouchableWithoutFeedback onPress = {()=> {Keyboard.dismiss();}}>
    <View style={styles.container}>
     <Header />
     <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} /> 
        <View style={styles.list}>
          <FlatList data={todos}
                renderItem={({item}) => (
                <TodoItem item = {item} pressHandler={pressHandler}/>
                )}
          />
         </View>
      </View>     
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:StatusBar.currentHeight
  },
  content:{
    padding:40,
    flex:1
  },
  list:{
    marginTop:20,
    flex:1
  }
});

