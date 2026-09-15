import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { cores } from '../constants/cores';

const TAXA_ENTREGA = 6.0;

function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function ItemCarrinho({ item, onIncrementar, onDecrementar }) {
  const subtotalItem = item.produto.preco * item.quantidade;

  return (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemNome}>{item.produto.nome}</Text>
        <Text style={styles.itemPrecoUnitario}>
          {formatarPreco(item.produto.preco)} un.
        </Text>
      </View>

      <View style={styles.controleQuantidade}>
        <TouchableOpacity
          style={styles.botaoQuantidade}
          onPress={() => onDecrementar(item.produto.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotaoQuantidade}>−</Text>
        </TouchableOpacity>

        <Text style={styles.textoQuantidade}>{item.quantidade}</Text>

        <TouchableOpacity
          style={styles.botaoQuantidade}
          onPress={() => onIncrementar(item.produto.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotaoQuantidade}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.itemSubtotal}>{formatarPreco(subtotalItem)}</Text>
    </View>
  );
}

export default function CarrinhoScreen({
  carrinho,
  onIncrementar,
  onDecrementar,
  onVoltar,
  onContinuar,
}) {
  const carrinhoVazio = carrinho.length === 0;

  const subtotal = carrinho.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  );
  const taxaEntrega = carrinhoVazio ? 0 : TAXA_ENTREGA;
  const total = subtotal + taxaEntrega;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar} activeOpacity={0.7}>
          <Text style={styles.botaoVoltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Meu Carrinho</Text>
        <View style={styles.espacoHeader} />
      </View>

      <ScrollView contentContainerStyle={styles.listaItens}>
        {carrinhoVazio ? (
          <Text style={styles.textoVazio}>Seu carrinho está vazio.</Text>
        ) : (
          carrinho.map((item) => (
            <ItemCarrinho
              key={item.produto.id}
              item={item}
              onIncrementar={onIncrementar}
              onDecrementar={onDecrementar}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.resumo}>
        <View style={styles.linhaResumo}>
          <Text style={styles.labelResumo}>Subtotal</Text>
          <Text style={styles.valorResumo}>{formatarPreco(subtotal)}</Text>
        </View>
        <View style={styles.linhaResumo}>
          <Text style={styles.labelResumo}>Entrega</Text>
          <Text style={styles.valorResumo}>{formatarPreco(taxaEntrega)}</Text>
        </View>
        <View style={[styles.linhaResumo, styles.linhaTotal]}>
          <Text style={styles.labelTotal}>TOTAL</Text>
          <Text style={styles.valorTotal}>{formatarPreco(total)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.botaoContinuar, carrinhoVazio && styles.botaoContinuarDesabilitado]}
          onPress={onContinuar}
          activeOpacity={0.7}
          disabled={carrinhoVazio}
        >
          <Text style={styles.textoBotaoContinuar}>Continuar</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  botaoVoltar: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 44,
    minHeight: 44,
    textAlignVertical: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.branco,
  },
  espacoHeader: {
    minWidth: 44,
  },
  textoVazio: {
    fontSize: 16,
    color: cores.secundaria,
    textAlign: 'center',
    marginTop: 24,
  },
  listaItens: {
    padding: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemInfo: {
    flex: 1.4,
  },
  itemNome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.escura,
  },
  itemPrecoUnitario: {
    fontSize: 13,
    color: cores.secundaria,
    marginTop: 2,
  },
  controleQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  botaoQuantidade: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: cores.fundoClaro,
    borderWidth: 1,
    borderColor: cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoQuantidade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.primaria,
    lineHeight: 20,
  },
  textoQuantidade: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.escura,
    marginHorizontal: 10,
    minWidth: 18,
    textAlign: 'center',
  },
  itemSubtotal: {
    flex: 0.8,
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.escura,
    textAlign: 'right',
  },
  resumo: {
    backgroundColor: cores.branco,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E1E5EC',
  },
  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  labelResumo: {
    fontSize: 14,
    color: cores.secundaria,
  },
  valorResumo: {
    fontSize: 14,
    color: cores.escura,
  },
  linhaTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E1E5EC',
    marginTop: 6,
    paddingTop: 10,
    marginBottom: 16,
  },
  labelTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escura,
  },
  valorTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  botaoContinuar: {
    backgroundColor: cores.primaria,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoContinuarDesabilitado: {
    backgroundColor: '#A9B3C9',
  },
  textoBotaoContinuar: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
