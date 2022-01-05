//import liraries
import React, { useState } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Searchbar, Card, Avatar, Button, Title, Paragraph, Subheading, Chip, Surface, Caption, Headline, IconButton } from 'react-native-paper';
import { useLoginContext } from '../../context/LoginContext';

// create a component
function HomePage() {

    const { logout } = useLoginContext();

    const HomeRouteComponent = () => (
        <ScrollView>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Surface style={{ elevation: 4, borderRadius: 50 }}>
                    <Avatar.Icon style={{ alignSelf: 'center' }} size={45} icon="account" />
                </Surface>
                <Button style={{ padding: 0, margin: 0, alignSelf: 'center' }} compact={true} icon="chevron-down" mode="text">
                    Rua. Domingos Murara
                </Button>
            </View>
            <ScrollView horizontal={true} fadingEdgeLength={10} style={styles.bodyChipScrollView}>
                <Chip style={styles.chipComponent}> Informatica </Chip>
                <Chip style={styles.chipComponent}> Limpeza </Chip>
                <Chip style={styles.chipComponent}> Programação </Chip>
                <Chip style={styles.chipComponent}> Mecanica </Chip>
                <Chip style={styles.chipComponent}> Escola </Chip>
            </ScrollView>

            {/* Criar componente de listagem de Cards */}
            <Card style={{ marginBottom: 8, elevation: 4 }}>
                <Card.Title
                    title="Formatação basica de computador!"
                    subtitle="Formatação basica para garantir o melhor funcionamento do seu dispositivo."
                    left={(props) => <Avatar.Icon {...props} icon="desktop-classic" />}
                />
            </Card>

            <Card style={{ marginBottom: 8, elevation: 4 }}>
                <Card.Title
                    title="Limpeza"
                    subtitle="Limpeza em casa ou apartamento, com 1 dia de antecedencia."
                    left={(props) => <Avatar.Icon {...props} icon="spray-bottle" />}
                />
            </Card>

            <Card style={{ marginBottom: 8, elevation: 4 }}>
                <Card.Title
                    title="Manutenção de automoveis particular."
                    subtitle="Sem tempo pra ir na mecanica? Vem pra manutenção particular, satisfação garantida!!!"
                    left={(props) => <Avatar.Icon {...props} icon="car-multiple" />}
                />
            </Card>

        </ScrollView>
    );

    const AlbumsRoute = () => (
        <ScrollView>
            <Searchbar style={styles.searchBar} placeholder="Pesquise nossos serviços!" />
            <Button mode='flat' onPress={logout}> Logout </Button>
        </ScrollView>
    );

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Inicio', icon: 'home' },
        { key: 'search', title: 'Busca', icon: 'magnify' },
        { key: 'services', title: 'Serviços', icon: 'format-list-bulleted' }
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRouteComponent,
        search: AlbumsRoute,
        services: () => <Text>Hello</Text>,
    });

    return (
        <View style={{ height: '100%' }}>
            <BottomNavigation
                style={{ padding: 8 }}
                barStyle={styles.bottomBar}
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                shifting={true}
                sceneAnimationEnabled={true}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    },
    searchBar: {
        // marginBottom: 8,
    },
    bodyComponent: {
        marginTop: 8,
        marginBottom: 8,
    },
    bodyChipScrollView: {
        marginTop: 10,
        marginBottom: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    chipComponent: {
        marginLeft: 2,
        backgroundColor: '#e1e1e1'
    },
    bottomBar: {
        overflow: 'hidden',
        borderRadius: 5
    }
});

//make this component available to the app
export default HomePage;
