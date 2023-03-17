import React, { createContext, useState } from "react";
import jwt_decode from 'jwt-decode';

import { DadosUserType } from "../models/DadosUserType"

//Criando o Contexto
export const DataContext = createContext({});

//Criando o provedor do Contexto

export const DataProvider = ({children}) => {
    const [dadosUser, setDadosUser] = useState<DadosUserType>();
    
    const armazenaDadosUser = (jwt:any) =>{
        var tokenDecodificado:any = jwt_decode(jwt);

//Armazenando apenas a chave usuario

        var usuario = tokenDecodificado.usuario;

//Transformando a String json contida dentro da variavel usuario 
        usuario = JSON.parse(usuario)
        

        setDadosUser({
            id: usuario?.id,
            userLogin: usuario?.userLogin,
            token: jwt
        });
    };

    return(
        <DataContext.Provider value={{
            dadosUser,
            armazenaDadosUser
        }}>
            {children}
            </DataContext.Provider>
    );
}