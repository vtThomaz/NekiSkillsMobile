import React, { useEffect, useState, useContext } from 'react';

import { Api } from '../../services/api/api';
import { NavigationHelpersContext } from '@react-navigation/native';

import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from './styles';
import { Alert } from 'react-native';

import { Ionicons } from "@expo/vector-icons";

export const Register = ({ navigation }) => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);

//Função para Registrar o Usuário

  const handleRegister = async () => {
    if (password == confirmPassword) {
      await Api.post(
        '/auth/registro',
        {
          userLogin: name,
          userPassword: password
        }

      ).then(response => {
        if (response.status === 200) {

          Alert.alert("Parabéns", "Você foi cadastrado com sucesso!")

          setTimeout(() => {
            navigation.navigate("Login");
          }, 2000);

        }
      }).catch((Error) => {
        Alert.alert("Algo deu errado!", "Tente novamente.")
      })
    } else {
      Alert.alert("Oops!", "Parece que suas senhas não são iguais")
    }
  };

  return (
    <>
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <Text style={styles.cadastro}>Cadastre-se</Text>
        </View>

        <View style={styles.conteudo}>

          <TextInput style={styles.input}
            placeholder='Digite aqui seu usuário'
            onChangeText={(value) => {
              setName(value);
            }}
          />
          <TextInput style={styles.input}
            placeholder='Digite aqui sua senha'
            secureTextEntry={showPassword}
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
          <TextInput style={styles.input}
            placeholder='Confirme sua senha'
            secureTextEntry={showPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
            }}
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

          <TouchableOpacity
            style={styles.Login}
            onPress={() => handleRegister()}
          >
            <Text style={styles.LogText} >Cadastrar</Text>
          </TouchableOpacity>

        </View>

      </View>

    </>
  );
}