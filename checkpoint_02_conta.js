import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  

  constructor(props) {

    super(props);
    this.state = {
      debito: 0,
      credito: 0,
      saldo: 0,
      btnState: null,
      
      
    }
  }

  debitar = () => {
      this.state.saldo = (this.state.saldo - parseFloat(this.state.debito)).toFixed(2);
      return this.setState({btnState: 0})
    }

    creditar = () => {
      this.state.saldo = (this.state.saldo - (-parseFloat(this.state.credito))).toFixed(2);
      return this.setState({btnState: 0})
    }  


  render() {
    return (
      <View style={styles.container}>
        {this.state.saldo < 0 &&(
          <Text style={styles.textSaldo, styles.negativo}>Saldo: R${this.state.saldo}</Text>
        )}
        {this.state.saldo >= 0 &&(
          <Text style={styles.positivo}>Saldo: R${this.state.saldo}</Text>
        )}
        <View/>
        <TouchableOpacity title="Crédito" onPress={_ => this.setState({btnState: 1})} style={styles.touch}>
            <Text style={styles.smallText}>Crédito</Text>
          </TouchableOpacity>
           {/* OPERAÇÃO DO TIPO CRÉDITO */}


           {this.state.btnState == 1 &&(
            <View style={styles.container}>
              <Text style={styles.opCredito}>Operação de Crédito</Text>
              <TextInput
                    onChangeText={(credito) => this.setState({credito})}
                    autoFocus = {true}
                    placeholder = {"Valor a ser creditado..."}
                    placeholderTextColor = 'black'
                    style = {styles.inputStyle}
                    keyboardType = 'numeric'
                    
                />
              <View style={styles.separator} />
                <TouchableOpacity onPress={this.creditar} title="Salvar">
                  <Text>Salvar</Text>
                </TouchableOpacity> 
                
                <TouchableOpacity onPress={_ => this.setState({btnState: 0})} title="Cancelar">
                  <Text>Cancelar</Text>
                </TouchableOpacity>
            </View>


        )}
          <View/>
          <TouchableOpacity title="Débito" onPress={_ => this.setState({btnState: 2})}style={styles.touch}>
            <Text style={styles.smallText}>Débito</Text>
          </TouchableOpacity>

         

          {/* OPERAÇÃO DO TIPO DÉBITO */}
          {this.state.btnState == 2 &&(
            <View style={styles.container}>
              <Text style={styles.debito}>Operação de Débito</Text>
              <TextInput
                    onChangeText={(debito) => this.setState({debito})}
                    autoFocus = {true}
                    placeholder = {"Valor a ser debitado..."}
                    placeholderTextColor = 'black'
                    style = {styles.inputStyle}
                    keyboardType = 'numeric'
                    
                />
              <View style={styles.separator} />
                <TouchableOpacity title="Salvar" onPress={this.debitar} style={styles.touch}>
                  <Text>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity title="Cancelar" onPress={a => this.setState({btnState: 0})}>
                <Text>Cancelar</Text>
                </TouchableOpacity>

            </View>
        )}

          


        
      </View>
    );
  }

  
}



const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 40,
  },
  touch:{
   marginTop:20,
   fontSize:20,
   borderBottomWidth : 2,
   textAlign: 'center'
  },
  touchA:{
    marginTop:20,
   fontSize:20,
   borderBottomWidth : 2,
   textAlign: 'center'

  },
  inputStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 5,
  },
  negativo:{
    color: "red",
    fontSize: 30,
  },
  positivo:{
    color: "green",
    fontSize: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 70,
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  inputStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 5,
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  
});