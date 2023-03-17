import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { DataProvider } from "../context/DataContext";

function TabStack() {

        const Stack = createStackNavigator();

        return (
            <>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </>
        );
    
}

export function Route() {
    return (
      <>
        <DataProvider>
          <NavigationContainer>
            <TabStack />
          </NavigationContainer>
        </DataProvider>
      </>
    );
  }