import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../constants/cores';

// Tela do Carrinho (T2). Nesta etapa (Aula 1) só existe a navegação até
// aqui — listagem de itens, quantidades e cálculos entram na Aula 2
// (RF06–RF09), conforme o cronograma.
export default function CarrinhoScreen({ carrinho, onVoltar }) {
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Carrinho</Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.texto}>
          {totalItens > 0
            ? `Você tem ${totalItens} item(ns) no carrinho.`
            : 'Seu carrinho está vazio.'}
        </Text>
        <Text style={styles.aviso}>
          Cálculo de subtotal, taxa de entrega e total chega na Aula 2 (RF06–RF09).
        </Text>

        <TouchableOpacity style={styles.botao} onPress={onVoltar} activeOpacity={0.7}>
          <Text style={styles.textoBotao}>Voltar ao Cardápio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundoClaro,
  },
  header: {
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.branco,
  },
  conteudo: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  texto: {
    fontSize: 16,
    color: cores.escura,
    textAlign: 'center',
    marginBottom: 8,
  },
  aviso: {
    fontSize: 13,
    color: cores.secundaria,
    textAlign: 'center',
    marginBottom: 24,
  },
  botao: {
    backgroundColor: cores.primaria,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
