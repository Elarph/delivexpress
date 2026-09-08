import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../constants/cores';

// Tela de Confirmação (T4). Resumo do pedido e número aleatório (RF16–RF18)
// entram na Aula 4, conforme o cronograma.
export default function ConfirmacaoScreen({ onNovoPedido }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Confirmação</Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.texto}>Resumo do pedido chega na Aula 4.</Text>
        <TouchableOpacity style={styles.botao} onPress={onNovoPedido} activeOpacity={0.7}>
          <Text style={styles.textoBotao}>Fazer novo pedido</Text>
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
    backgroundColor: cores.sucesso,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: { color: cores.branco, fontWeight: 'bold', fontSize: 14 },
});
