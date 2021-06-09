import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';

import { StyleSheet, Text, View, FlatList, TouchableOpacity,  Alert, Modal,Pressable, ImageBackground, Image } from 'react-native';

const json = [
    { id: 1, nome: "IBIS Styles São Paulo Anhembi", preco: 45.00, rating: 2, img: 'https://lh3.googleusercontent.com/p/AF1QipNGNgjuN9HuKimRqRPuC8KLpTAK0j7znJZ7G5Jz=w296-h202-n-k-no-v1-rj', descricao:'Ao lado de uma estação de metrô, este hotel moderno com tema de aviação fica a 3 km da Pinacoteca do Estado de São Paulo e a 4,4 km do Theatro Municipal de São Paulo.', endereco: 'Av. Cruzeiro do Sul - 02031-000 - Santana - São Paulo - SP - 1709'},
    { id: 2, nome: "Confort Ibirapuera", preco: 65.00, rating: 5, img:'https://lh3.googleusercontent.com/p/AF1QipNxX-RXO_8Q6g59saGfNFVa65_vlj-AE2W62gH1=w296-h202-n-k-no-v1-rj', descricao:'Situado em frente à Praça Nossa Senhora Aparecida, uma praça pública com uma basílica ornamentada, este hotel moderno e informal fica a 4 km da Estação Ferroviária de Vila Olímpia e do Aeroporto de Congonhas em São Paulo.', endereco: 'Av. Sabiá - 04515-001 - Indianópolis - São Paulo - SP - 825'},
    { id: 3, nome: "Blue Tree Premium Morumbi", preco: 450.00 , rating: 4, img:'https://lh6.googleusercontent.com/proxy/Q72vKoR_pawoIx4xZ5qNVKhTEXXQQEtvwWrOheAWYgamxqfXn5uXH-5VIPrSafiKn4JPMEToPC50iTzRA6WZP2xqXMYIVOzhhYSzxDNAXvpA0Io_Mx5Lkslh1nVScogmgSr9IrDFWqFbjJzXjoBA_B427ZMPlA=w325-h386-k-no', descricao:'Localizado a 2 minutos de caminhada do Morumbi Shopping, este hotel refinado em um arranha-céu grandioso também está a 6 km do Aeroporto de Congonhas e a 8 km do Parque Ibirapuera.', endereco: 'Av. Roque Petroni Júnior - 04707-000 - Vila Gertrudes - São Paulo - SP - 1000'},
    { id: 4, nome: "Mercure São Paulo Pamplona", preco: 455.00 , rating: 5, img:'https://lh3.googleusercontent.com/proxy/_p-SOy4pS8ZpJ5QyXnwD2SPI1WEfHQjofIZ37bK-1FVJxfM2ePcjPPF03XhpxzO4rs6zxPghhRTbSPQ3zKmzOSnwPw85CBtY16VA_m9_Qz-8rAHr1W9zdymXUNpzVFzVpRQ6eSzKlEJ0KCx61PaJHuRlck5z8xc=w325-h428-k-no', descricao:'Hotel refinado em um arranha-céu que fica localizado a 12 minutos de caminhada de uma estação de metrô, a 1 km do Museu de Arte de São Paulo e a 3,7 km do Parque Ibirapuera.', endereco: 'R. Pamplona - 01405-002 - Jardim Paulista - São Paulo - SP - 1315'},
    { id: 5, nome: "Sheraton São Paulo WTC Hotel", preco: 135.00 , rating: 5, img:'https://lh5.googleusercontent.com/p/AF1QipMsy8EBHIZFboOZcDGG0HW8yZlV9p1ks9QrY-v-=w325-h216-k-no', descricao:'Situado a 2 minutos de caminhada do WTC – World Trade Center São Paulo – este hotel de luxo está a 9 minutos a pé da estação do metrô e a 9 km do Parque Ibirapuera.', endereco: 'Av. das Nações Unidas - 04578-903 - Brooklin Novo - São Paulo - SP - 12559'},
    { id: 6, nome: "Bourbon Convention Ibirapuera", preco: 345.00 , rating: 5, img:'https://lh3.googleusercontent.com/proxy/lQUBfApbG4ZjCjL6F6wgcxO35AneuZyKprfOGzhyamBfnf-GT7N026v1cMhvohW6s7dknRsSHZmBz0aFS2-WfQwrL07fKHb1iqXAXwFHI8lVyJzn6lNtRRUJ2km0Yxi1ku6gb1-LiGlZxsdGWDfHbtPlUDx4Q1M=w296-h202-n-k-no-v1-rj', descricao:'Este hotel de convenções moderno, dividido entre duas torres, fica a três quilômetros do Parque Ibirapuera e a sete quilômetros do Museu de Arte de São Paulo.', endereco: 'Av. Ibirapuera - 04029-200 - Ibirapuera - São Paulo - SP - 2927'},
    { id: 7, nome: "Blue Tree Preimum Paulista", preco: 455.00 , rating: 3, img:'https://lh5.googleusercontent.com/proxy/XKQo6qBVliyRslJZRFFsaYiTK9Dm1_3hGcA9xiYQzdajykmEcJovVHUlSOjEfFdZR7Ej31h0h5rTdLMaHBneceVlownYulno2JWnNWIAsIgvsOA7zgY1xL-Oa_UEzc7AGpI90SqGqzvw5CObMm572YbSF8KzgQ=w325-h272-k-no', descricao:'Este hotel moderno com fachada de vidro fica a cinco minutos a pé do Museu de Arte de São Paulo e a quatro quilômetros do Parque Ibirapuera.', endereco: 'Rua Peixoto Gomide - 01409-001 - Bela Vista - São Paulo - SP - 707 '},
    { id: 8, nome: "Golden Tulip Paulista Plaza", preco: 133.00 , rating: 3, img:'https://lh5.googleusercontent.com/p/AF1QipMSDLsf7bYw1fY7L1MO2fWUll9Sc3DxGr5a753f=w325-h433-k-no', descricao:'Este hotel moderno e sofisticado está a uma caminhada de 6 minutos de uma estação de metrô, a 500 metros da agitada Avenida Paulista e a 3,1 km do Parque Ibirapuera.', endereco: 'Alameda Santos - 01419-000 - Jardins - São Paulo - SP - 85'},
    { id: 9, nome: "Renaissance São Paulo Hotel", preco: 675.00 , rating: 4, img:'https://lh5.googleusercontent.com/p/AF1QipOsPveZltS4hfnIFeRPykwx2wBBZQuGDg6hjvOM=w325-h487-k-no', descricao:'Hotel sofisticado situado em uma rua comercial. Fica a 3 minutos a pé de uma estação de metrô e a 4 minutos a pé das lojas de luxo da movimentada Avenida Paulista.', endereco: 'Alameda Santos - 01419-002 - Jardim Paulista - São Paulo - SP - 2233'}
]

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 0,
            modalVisible: false,
            btnState: 1,
            mensagem: false,
            nomeHotel: '',
            precoHotel: 0,
            nrId: 0,
            rating: 0,
            imagemHotel: '',
            descricao: '',
            endereco: ''

        }
    }
    render() {
        const { text, modalVisible, btnState } = this.props;
        return (
            <View>                
                {this.state.btnState == 1 &&(
                    <View>
                    <View style={styles.container}>
                        <Text style={styles.text} > NewGen - Hotels </Text>
                        <StatusBar style="auto"/>
                    </View>
    
                    <FlatList
                        data={json}
                        renderItem={({ item }) => (
                            <View style={styles.container1}>
                                <TouchableOpacity style={{ backgroundColor: 'white', padding: 9, flex: 1 }}
                                    onPress={ _ => this.setState({ 
                                        btnState : null,
                                        nomeHotel: item.nome,
                                        nrId: item.id, 
                                        precoHotel: item.preco,
                                        mensagem: true,
                                        rating: item.rating,
                                        imagemHotel: item.img,
                                        descricao: item.descricao, 
                                        endereco: item.endereco


                                    })}
                                >
                                    <Text>{item.nome}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{ marginRight: 10, fontWeight: 'bold', marginTop: 5 }}>R${item.preco}</Text>
                            </View>
    
                        )}
                        keyExtracto={item => item.id.toString()}
                    />
                    <StatusBar style="auto" />
                </View>
                )}

                {this.state.mensagem == true &&(
                    <View>
                        <View style={styles.container}>
                        <Text style={styles.text} > NewGen - Hotels </Text>
                        <Text style={{color:'white'}}>Estrelas {this.state.rating}</Text>
                        <StatusBar style="auto"/>
                        </View>

                        <Image
                        source={this.state.imagemHotel}
                        style={{ alignSelf: "center", width: '100%' , height: 200, resizeMode: 'center' }}
                        />
                        <View style={styles.infosHotel}>
                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <Text style={styles.infoHotel1}>Id do Hotel:</Text>
                                <Text>{this.state.nrId}</Text>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <Text style={styles.infoHotel1}>Endereco:</Text>
                                <Text style={{marginLeft: 50}}>{this.state.endereco}</Text>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <Text style={styles.infoHotel1}>Nome do Hotel:</Text>
                                <Text>{this.state.nomeHotel}</Text>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <Text style={styles.infoHotel1}>Link do website:</Text>
                                <Text style={{marginLeft: 65}}>{this.state.descricao}</Text>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <Text style={styles.infoHotel1}>Dicas úteis:</Text>
                                <Text>Algumas dicas do hotel</Text>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <Text style={styles.infoHotel1}>Preço da diária:</Text>
                                <Text>$ {this.state.precoHotel}</Text>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <Text style={styles.infoHotel1}>Descrição:</Text>
                                <Text style={{marginLeft: 55    }}>{this.state.descricao}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.botaoStyle}
                            onPress={ _ => this.setState({ mensagem: null, btnState: 1} )}>
                                VOLTAR
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    hoteis:{
        marginTop: 10
    },
    /* CSS DO CABEÇALHO */
    container: {
        flexDirection: 'column',
        backgroundColor: 'steelblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    /* CSS DO FLAT LIST */
    container1: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        marginTop:5
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    },

    container0: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        paddingHorizontal: 15,
        color: 'white',
    },
    infosHotel: {
        flex: 1, 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        margin: 10
    },

    infoHotel1:{
        width: 120,
        height:45,
        fontWeight: 'bold',

    },
    botaoStyle: {
    backgroundColor: "steelblue",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlign: 'center',
    marginTop: 100,
    marginHorizontal:140,
    fontWeight: 'bold',
    color: 'white',
    }
});