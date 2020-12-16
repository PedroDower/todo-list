/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableOpacityBase,
} from 'react-native';
import {format} from 'date-fns';

interface ListaTarefasInterface {
  title: string,
  date: Date
}

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Item = ({ title, datetime }) => (
  <View style={styles.tarefa}>
    <Text>{title}</Text>
    <Text 
      style={{
        position: 'absolute',
        right: 0,
        fontSize: 12,
      }}
      >
        {format(datetime, 'dd/MM/yyyy HH:mm')}
    </Text>
  </View>
);

const App: () => React$Node = () => {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState<
    Array<ListaTarefasInterface>
  >([]);

  const insereTarefa = () => {
    if(novaTarefa == '') {
      return false;
    }

    Keyboard.dismiss();
    setNovaTarefa('');
    const novaLista = [...listaTarefas];
    novaLista.unshift({
      title: novaTarefa,
      date: new Date(),
    });
    setListaTarefas(novaLista);
  };

  const renderItem = ({ item, datetime }) => (
    <Item title={item.title} datetime={item.date}/>
  );

  return (
    <>
      <StatusBar/>
      <View className={'app'} style={{padding: 18}}>      
        <View className={'header'} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
          <Image
            style={styles.logoFigure}
            source={require('./assets/images/todo-list.png')}
            resizeMode="contain"
          />
          <View className={'text'} style={{paddingLeft: 10}}>
            <Text style={{
              color: '#1ABC9C',
              fontSize: 20,
              fontWeight: '700'
            }}>Lista de tarefas do Pedro</Text>
            <Text className={'subText'} style={{
              color: '#707070',
              fontWeight: '700',
              letterSpacing: 1,
            }}>Tarefas do dia a dia</Text>
          </View>
        </View>
        <View className={'menu'}>
          <View className={'inserir'} style={{flexDirection: 'row', marginBottom: 15}}>
            <TextInput
              value={novaTarefa}
              onChangeText={(valor) => {
                setNovaTarefa(valor);
              }}
              style={{ 
                height: 40,
                borderBottomColor: '#707070',
                borderBottomWidth: 1,
                flexGrow: 1,
              }}
              placeholder="Adicionar tarefa"
            />
            <TouchableOpacity
              title="+"
              accessibilityLabel="Adicionar tarefa"
              onPress={() => {
                insereTarefa();
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 32,
                height: 32,
                backgroundColor: "#FFAA00",
                borderRadius: 16,
                marginLeft: 5
              }}
            >
              <Text style={{color: 'white', fontSize: 25}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className={'main'}>
          <FlatList
            data={listaTarefas}
            renderItem={renderItem}
            key={item => item.id}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoFigure: {
    
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',

  },
  tarefa: {
    fontSize: 18,
    padding: 8,
    paddingTop: 16,
    paddingBottom: 6,
    backgroundColor: '#F5F8F9',
    borderLeftWidth: 3,
    borderLeftColor: '#1ABC9C',
    marginBottom: 10,
  },
});
export default App;