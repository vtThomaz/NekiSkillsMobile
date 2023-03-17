import React, { useEffect, useState, useContext } from 'react';

import { Api } from '../../services/api/api';
import { NavigationHelpersContext } from '@react-navigation/native';
import { DataContext } from '../../context/DataContext';
import { retrieveLocalData, storeLocalData } from '../../services/LocalStorage';

import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from './styles';
import { Alert } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from 'react-native-paper';
import Neki from '../../assets/Image/logoneki.png'


export const Login = ({ navigation }) => {

  const { armazenaDadosUser }: any = useContext(DataContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [SessionLogged, setSessionLogged] = useState(false);

  const [showPassword, setShowPassword] = useState(true);

  //Realizando Login
  
  const handleLogin = async () => {
    var tokenJwt: any = null;

    try {
      const retorno = await Api.post("/auth/login", {
        userLogin: name,
        userPassword: password,
      });

      if (retorno.status === 200) {
        tokenJwt = retorno.data;

        armazenaDadosUser(tokenJwt["jwt-token"]);

        navigation.navigate('Home');

        if (SessionLogged == true) {
          storeLocalData("user", tokenJwt);
        }
      }
    } catch (error) {
      Alert.alert("Oops!", "Login ou senha errados");
    }
  };

  //Redirecionando para página de cadastro

  const Register = () => {
    navigation.navigate('Register')
  }

  //Verificar se o Usuário está logado

  const UserLogged = async () => {
    try {
      const resp = JSON.parse(await retrieveLocalData("user"))

      if (resp == null) {

      }

      armazenaDadosUser(resp["jwt-token"]);

      navigation.navigate("Home");
    } catch (error) {

    }
  };

  useEffect(() => {
    UserLogged()
  }, [])


  return (
    <>
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <Image source={Neki} style={styles.neki} />
          <Text style={styles.BV}>Bem-Vindo</Text>
        </View>

        <View style={styles.conteudo}>

          <TextInput style={styles.input}
            placeholder='Login'
            onChangeText={setName}
          />
          <TextInput style={styles.input}
            placeholder='Senha'
            secureTextEntry={showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyevisible}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <>
                <Ionicons name="eye-off-outline" size={24} color="#2D939C" />
              </>
            ) : (
              <>
                <Ionicons name="eye-outline" size={24} color="#2D939C" />
              </>
            )}
          </TouchableOpacity>

        </View>


        <View style={styles.rodape}>
          <Checkbox.Item
            label="Permanecer na sessão?"
            color='#2D939C'
            status={SessionLogged ? 'checked' : 'unchecked'}
            onPress={() => {
              setSessionLogged(!SessionLogged);
            }}
          />
          <TouchableOpacity style={styles.Login} onPress={() => handleLogin()}>
            <Text style={styles.LogText} >Login</Text>
          </TouchableOpacity>
          <Text style={styles.Register}> Não tem cadastro?</Text>
          <TouchableOpacity
            onPress={() => Register()}
          >
            <Text style={styles.signUp}>Entre já!</Text>
          </TouchableOpacity>

        </View>

      </View>

    </>
  );
};