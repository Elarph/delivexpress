import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../constants/cores';

// Tela de Checkout / Entrega (T3). Formulário completo (RF11–RF15) entra
// na Aula 3, conforme o cronograma.
export default function CheckoutScreen({ onVoltar }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Checkout</Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.texto}>Formulário de entrega chega na Aula 3.</Text>
        <TouchableOpacity style={styles.botao} onPress={onVoltar} activeOpacity={0.7}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundoClaro },
  header: {
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  titulo: { fontSize: 20, fontWeight: 'bold', color: cores.branco },
  conteudo: { flex: 1, padding: 20, justifyContent: 'center' },
  texto: { fontSize: 16, color: cores.escura, textAlign: 'center', marginBottom: 24 },
  botao: {
    backgroundColor: cores.primaria,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: { color: cores.branco, fontWeight: 'bold', fontSize: 14 },
});
