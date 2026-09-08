import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { cores } from '../constants/cores';
import { produtos } from '../data/produtos';

// Formata número no padrão R$ 00,00 (RF01)
function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Card de um produto: imagem, nome, descrição curta, preço e botão Adicionar
// (RF01, RF02, RF04)
function ProdutoCard({ produto, onAdicionar }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: produto.imagem }}
        style={styles.imagem} // imagem remota exige width/height (RF04)
      />
      <View style={styles.infoProduto}>
        <Text style={styles.nomeProduto}>{produto.nome}</Text>
        <Text style={styles.descricaoProduto} numberOfLines={2}>
          {produto.descricao}
        </Text>
        <Text style={styles.precoProduto}>{formatarPreco(produto.preco)}</Text>
      </View>
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => onAdicionar(produto)}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotaoAdicionar}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela do Cardápio / Home (T1)
export default function CardapioScreen({
  totalItensCarrinho,
  onAdicionarProduto,
  onVerCarrinho,
}) {
  const [busca, setBusca] = useState('');

  // Filtro por nome (RF05 — desejável, ponto extra)
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com contador do carrinho em tempo real (RF03) */}
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>DelivExpress</Text>
        <TouchableOpacity
          style={styles.badgeCarrinho}
          onPress={onVerCarrinho}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBadge}>🛒 {totalItensCarrinho}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buscaContainer}>
        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar produto..."
          placeholderTextColor={cores.secundaria}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <ScrollView contentContainerStyle={styles.listaProdutos}>
        {produtosFiltrados.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onAdicionar={onAdicionarProduto}
          />
        ))}

        {produtosFiltrados.length === 0 && (
          <Text style={styles.textoVazio}>Nenhum produto encontrado.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundoClaro,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tituloHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.branco,
  },
  badgeCarrinho: {
    backgroundColor: cores.sucesso,
    minWidth: 44,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  textoBadge: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buscaContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  inputBusca: {
    backgroundColor: cores.branco,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 14,
    color: cores.escura,
    borderWidth: 1,
    borderColor: '#E1E5EC',
  },
  listaProdutos: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  imagem: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: cores.fundoClaro,
  },
  infoProduto: {
    flex: 1,
    marginLeft: 12,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escura,
  },
  descricaoProduto: {
    fontSize: 14,
    color: cores.secundaria,
    marginTop: 2,
  },
  precoProduto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.escura,
    marginTop: 4,
  },
  botaoAdicionar: {
    backgroundColor: cores.sucesso,
    paddingHorizontal: 12,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoAdicionar: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 13,
  },
  textoVazio: {
    textAlign: 'center',
    color: cores.secundaria,
    marginTop: 24,
  },
});
