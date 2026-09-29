import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { cores } from '../constants/cores';
import { formatarPreco, calcularTotais } from '../utils/calculos';

// Número de pedido aleatório de 4 dígitos, ex.: 4821 (RF17)
function gerarNumeroPedido() {
  return Math.floor(1000 + Math.random() * 9000);
}

// 19999990000 -> (19) 99999-0000
function formatarTelefone(tel) {
  if (tel.length === 11) return `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7)}`;
  if (tel.length === 10) return `(${tel.slice(0, 2)}) ${tel.slice(2, 6)}-${tel.slice(6)}`;
  return tel;
}

// 13010000 -> 13010-000
function formatarCep(cep) {
  return cep.length === 8 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;
}

// Linha "rótulo ........ valor" reutilizada nos blocos do resumo
function LinhaResumo({ rotulo, valor, destaque }) {
  return (
    <View style={styles.linha}>
      <Text style={[styles.rotulo, destaque && styles.rotuloDestaque]}>{rotulo}</Text>
      <Text style={[styles.valor, destaque && styles.valorDestaque]}>{valor}</Text>
    </View>
  );
}

// Tela de Confirmação (T4): resumo do pedido, número e mensagem de sucesso
// (RF16–RF18).
export default function ConfirmacaoScreen({ carrinho = [], dadosEntrega, onNovoPedido }) {
  // useState com função: o número é sorteado uma única vez, não a cada render
  const [numeroPedido] = useState(gerarNumeroPedido);

  // RNF09: se chegar aqui sem pedido válido, não quebra — mostra aviso
  const pedidoValido = Boolean(dadosEntrega) && carrinho.length > 0;
  const { subtotal, taxaEntrega, total } = calcularTotais(carrinho);

  // Alert só para a confirmação final de sucesso (seção 4.2)
  useEffect(() => {
    if (pedidoValido) {
      Alert.alert('Pedido confirmado!', `Seu pedido #${numeroPedido} foi realizado com sucesso.`);
    }
  }, []);

  if (!pedidoValido) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Confirmação</Text>
        </View>
        <View style={styles.vazio}>
          <Text style={styles.textoVazio}>Nenhum pedido para exibir.</Text>
          <TouchableOpacity style={styles.botao} onPress={onNovoPedido} activeOpacity={0.7}>
            <Text style={styles.textoBotao}>Fazer novo pedido</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const d = dadosEntrega;
  const enderecoCompleto = `${d.endereco}, ${d.numero}${d.complemento ? ` - ${d.complemento}` : ''}`;
  const pagaEmDinheiroComTroco = d.pagamento === 'Dinheiro' && d.precisaTroco && d.trocoPara !== '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Confirmação</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.sucesso}>
          <View style={styles.selo}>
            <Text style={styles.seloTexto}>✓</Text>
          </View>
          <Text style={styles.tituloSucesso}>Pedido realizado com sucesso!</Text>
          <Text style={styles.numeroPedido}>Pedido #{numeroPedido}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.tituloCard}>Itens do pedido</Text>
          {carrinho.map((item) => (
            <LinhaResumo
              key={item.produto.id}
              rotulo={`${item.quantidade}x ${item.produto.nome}`}
              valor={formatarPreco(item.produto.preco * item.quantidade)}
            />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.tituloCard}>Valores</Text>
          <LinhaResumo rotulo="Subtotal" valor={formatarPreco(subtotal)} />
          <LinhaResumo rotulo="Entrega" valor={formatarPreco(taxaEntrega)} />
          <View style={styles.divisor} />
          <LinhaResumo rotulo="Total pago" valor={formatarPreco(total)} destaque />
        </View>

        <View style={styles.card}>
          <Text style={styles.tituloCard}>Entrega</Text>
          <Text style={styles.textoDado}>{d.nome}</Text>
          <Text style={styles.textoDado}>{formatarTelefone(d.telefone)}</Text>
          <Text style={styles.textoDado}>{enderecoCompleto}</Text>
          <Text style={styles.textoDado}>CEP {formatarCep(d.cep)}</Text>
          {d.referencia !== '' && (
            <Text style={styles.textoDadoSecundario}>Ref.: {d.referencia}</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.tituloCard}>Pagamento</Text>
          <Text style={styles.textoDado}>{d.pagamento}</Text>
          {pagaEmDinheiroComTroco && (
            <Text style={styles.textoDadoSecundario}>
              Troco para {formatarPreco(Number(d.trocoPara))}
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.botao} onPress={onNovoPedido} activeOpacity={0.7}>
          <Text style={styles.textoBotao}>Fazer novo pedido</Text>
        </TouchableOpacity>
      </ScrollView>
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
  conteudo: { padding: 16 },
  vazio: { flex: 1, padding: 20, justifyContent: 'center' },
  textoVazio: {
    fontSize: 16,
    color: cores.escura,
    textAlign: 'center',
    marginBottom: 24,
  },
  sucesso: { alignItems: 'center', marginBottom: 20 },
  selo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: cores.sucesso,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  seloTexto: { fontSize: 32, color: cores.branco, fontWeight: 'bold' },
  tituloSucesso: { fontSize: 20, fontWeight: 'bold', color: cores.escura, textAlign: 'center' },
  numeroPedido: { fontSize: 16, color: cores.secundaria, marginTop: 4 },
  card: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  tituloCard: { fontSize: 16, fontWeight: 'bold', color: cores.primaria, marginBottom: 8 },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rotulo: { fontSize: 14, color: cores.secundaria, flex: 1, paddingRight: 8 },
  valor: { fontSize: 14, color: cores.escura },
  rotuloDestaque: { fontSize: 16, fontWeight: 'bold', color: cores.escura },
  valorDestaque: { fontSize: 18, fontWeight: 'bold', color: cores.primaria },
  divisor: { height: 1, backgroundColor: '#E1E5EC', marginVertical: 6 },
  textoDado: { fontSize: 14, color: cores.escura, marginBottom: 4 },
  textoDadoSecundario: { fontSize: 14, color: cores.secundaria, marginBottom: 4 },
  botao: {
    backgroundColor: cores.sucesso,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  textoBotao: { color: cores.branco, fontWeight: 'bold', fontSize: 15 },
});