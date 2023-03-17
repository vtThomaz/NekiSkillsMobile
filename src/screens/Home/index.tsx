import React, { useEffect, useState, useContext } from 'react';

import { Api } from '../../services/api/api';
import { DataContext } from '../../context/DataContext';
import { DadosSkillsType } from '../../models/DadosSkillsType'
import { clearStorage } from '../../services/LocalStorage';

import { Text, TouchableOpacity, View, ImageBackground, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './style';

import { Button, Overlay, Icon } from '@rneui/themed';
import { Ionicons } from "@expo/vector-icons";


export const Home = ({navigation}) => {

    const { dadosUser }: any = useContext(DataContext);

    const [modalSkills, setModalSkills] = useState<DadosSkillsType[]>([]);
    const [skills, setSkills] = useState();
    const [skillConfirmed, setSkillConfirmed] = useState();
    const [skillUpdatedConfirmed, setSkillUpdatedConfirmed] = useState();
    const [levelConfirmed, setLevelConfirmed] = useState();
    const [skillUpdated, setSkillUpdated] = useState();
    
    const [reload, setReload] = useState(false);
    
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [expanded, setExpanded] = React.useState(true);
    

    // Funções handle
    
    const handlePress = () => setExpanded(!expanded);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    
    const toggleOverlayUpdate = (id, skillUpdated) => {
        setVisibleUpdate(!visibleUpdate);
        setSkillUpdatedConfirmed(id)
        setSkillUpdated(skillUpdated)

    };

    const handleChange = (skillValue) => {
        setSkillConfirmed(skillValue);
    };
    const handleChangeLevel = (levelValue) => {
        setLevelConfirmed(levelValue);
    };

    //Pegar a Data Atual

    const getCurrentDate = () => {
        const date = new Date()
        return date;
      };
    
    //Requisições na API
    
    const getSkillsByUser = async () => {

        await Api.get(`/user/${dadosUser?.id}`, {
            headers: { Authorization: `Bearer ${dadosUser?.token}` },
        })
            .then((resultado) => {
                const sortedSkills = resultado.data.userSkills.sort((a, b) => b.level - a.level); // Ordenação por level
            setSkills(sortedSkills);

            })
            .catch((error) => {
            });
    };

    const getSkills = async () => {

        Api.get(`/skills`, {
            headers: { "Authorization": `Bearer ${dadosUser?.token}` }
        }).then((response) => {
            setModalSkills(response.data)
        }).catch((erro) => {
        })
    };

    const DeleteUserSkill = async (id: number) => {

        Api.delete(`/user-skills/${id}`, {
            headers: { "Authorization": `Bearer ${dadosUser?.token}` }

        }).then((resp) => {
            setReload(true)
        }).catch((error) => {
        })
    };

    const PostUserSkills = async () => {

        await Api.post('/user-skills',
            {
                user: {
                    id: dadosUser?.id
                },
                skills: {
                    id: skillConfirmed
                },
                level: levelConfirmed,  
                created: getCurrentDate()

            },
            { headers: { "Authorization": `Bearer ${dadosUser?.token}` } }
        ).then((response) => {
            setReload(true)
        })
    };

    const UpdateUserSkill = async () => {

        Api.put(`/user-skills/${skillUpdatedConfirmed}`,
            {
                user: {
                    id: dadosUser?.id
                },
                skills: {
                    id: skillUpdated
                },
                level: levelConfirmed,
                updated: getCurrentDate()    
            },
            { headers: { "Authorization": `Bearer ${dadosUser?.token}` } }
        ).then((response) => {
            setReload(true)
        }).catch((error) => {
        })
    };

    //Logout

    const EndSession = () => {
        clearStorage();
        navigation.navigate("Login");
      };

    
    //UseEffect monitorando a FlatList 
    
    useEffect(() => {
        getSkillsByUser();
        getSkills();
        setReload(false);
    }, [reload])

    //Renderizando a FlatList

    const Item = ({ item }) => (
        <View style={styles.skillsBackground}>
            <Text style={styles.infos}>{item?.skills?.skillName}</Text>
            <Text style={styles.infos}>Nível: {item?.level}</Text>
            <Text style={styles.description}>{item?.skills?.descripition}</Text>
            <ImageBackground
                source={{ uri: item?.skills?.image }}
                style={styles.imgSkills}
                imageStyle={{ borderRadius: 18 }}
            >
            </ImageBackground>
            <View style={styles.skillsButton}>
                <TouchableOpacity onPress={() => toggleOverlayUpdate(item?.id, item?.skills?.id)}>
                    <Ionicons name="ellipsis-horizontal-circle" size={26} color="#252525" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => DeleteUserSkill(item?.id)}>
                    <Ionicons name="close-circle-outline" size={26} color="#252525" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
            />
        );
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.userContainer}>
                        <Text style={styles.user}>Seja bem vindo, {dadosUser?.userLogin}</Text>
                        <TouchableOpacity
                                onPress={() => EndSession()}
                            >
                                <Ionicons name="exit-outline" size={26} color="#ebe9e9" />
                            </TouchableOpacity>
                    </View>
                    <View style={styles.addSkillContainer}>
                        <View style={styles.addskillSubContainer}>
                            <Text style={styles.addSkill}>Está aprendendo algo novo?</Text>
                            <TouchableOpacity
                                onPress={toggleOverlay}
                            >
                                <Ionicons name="add-circle-outline" size={26} color="#ebe9e9" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>Essas são suas Skills</Text>
                </View>
                <View style={styles.flatlist}>
                    <FlatList
                        data={skills}
                        renderItem={renderItem}
                        keyExtractor={(item) => item?.skills?.id}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                    />
                </View>
                <View>
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <Text style={styles.textPrimary}>Selecione a skill e o nível:</Text>
                        <Picker
                            selectedValue={skillConfirmed}
                            onValueChange={handleChange}
                        >
                            <Picker.Item
                                label='Skill'
                            />
                            {modalSkills.map(selectedSkill => (
                                <Picker.Item
                                    key={selectedSkill.id}
                                    label={selectedSkill.skillName}
                                    value={selectedSkill.id}
                                />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={levelConfirmed}
                            onValueChange={handleChangeLevel}
                        >
                            <Picker.Item
                                label='Nível'
                            />
                            <Picker.Item label='Nível 1' value={1} />
                            <Picker.Item label='Nível 2' value={2} />
                            <Picker.Item label='Nível 3' value={3} />
                            <Picker.Item label='Nível 4' value={4} />
                            <Picker.Item label='Nível 5' value={5} />
                            <Picker.Item label='Nível 6' value={6} />
                            <Picker.Item label='Nível 7' value={7} />
                            <Picker.Item label='Nível 8' value={8} />
                            <Picker.Item label='Nível 9' value={9} />
                            <Picker.Item label='Nível 10' value={10} />

                        </Picker>

                        <Button
                            title="Salvar"
                            onPress={() => { toggleOverlay(); PostUserSkills() }}
                            color='#2a8894'
                        />
                    </Overlay>
                    
                    <Overlay isVisible={visibleUpdate} onBackdropPress={() => toggleOverlayUpdate(skillUpdated, skillUpdatedConfirmed)}>
                        <Text style={styles.textPrimary}>Selecione o nível:</Text>
                        <Picker
                            selectedValue={levelConfirmed}
                            onValueChange={handleChangeLevel}
                        >
                            <Picker.Item
                                label='Nível'
                            />
                            <Picker.Item label='Nível 1' value={1} />
                            <Picker.Item label='Nível 2' value={2} />
                            <Picker.Item label='Nível 3' value={3} />
                            <Picker.Item label='Nível 4' value={4} />
                            <Picker.Item label='Nível 5' value={5} />
                            <Picker.Item label='Nível 6' value={6} />
                            <Picker.Item label='Nível 7' value={7} />
                            <Picker.Item label='Nível 8' value={8} />
                            <Picker.Item label='Nível 9' value={9} />
                            <Picker.Item label='Nível 10' value={10} />

                        </Picker>

                        <Button
                            title="Salvar"
                            onPress={() =>{ UpdateUserSkill(), toggleOverlayUpdate(skillUpdated, skillUpdatedConfirmed)} }
                            color='#2a8894'
                        />
                    </Overlay>
                </View>
            </View>
        </>
    );
}