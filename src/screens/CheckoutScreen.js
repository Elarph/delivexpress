import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { cores } from '../constants/cores';

// Mantém só dígitos — usado nos campos que não podem receber letras (RNF08)
function apenasNumeros(texto) {
  return texto.replace(/[^0-9]/g, '');
}

// Tela de Checkout / Entrega (T3)
export default function CheckoutScreen({ totalItensCarrinho, onVoltar, onFinalizar }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [precisaTroco, setPrecisaTroco] = useState(false);
  const [trocoPara, setTrocoPara] = useState('');

  const [erro, setErro] = useState('');
  const [campoInvalido, setCampoInvalido] = useState(null);

  // Validações na ordem da especificação (seção 4.1). Roda ao tocar em
  // "Finalizar pedido" (RF15). Enquanto houver erro, não avança de tela.
  function validarPedido() {
    if (totalItensCarrinho === 0) {
      setCampoInvalido(null);
      return setErro('Seu carrinho está vazio.');
    }
    if (nome.trim() === '') {
      setCampoInvalido('nome');
      return setErro('Informe seu nome.');
    }
    if (telefone.length < 10) {
      setCampoInvalido('telefone');
      return setErro('Telefone inválido.');
    }
    if (cep.length !== 8) {
      setCampoInvalido('cep');
      return setErro('CEP deve ter 8 dígitos.');
    }
    if (endereco.trim() === '') {
      setCampoInvalido('endereco');
      return setErro('Informe o endereço.');
    }
    if (!/^[0-9]+$/.test(numero)) {
      setCampoInvalido('numero');
      return setErro('Número inválido.');
    }
    if (pagamento === '') {
      setCampoInvalido('pagamento');
      return setErro('Escolha a forma de pagamento.');
    }

    setErro('');
    setCampoInvalido(null);

    onFinalizar({
      nome,
      telefone,
      cep,
      endereco,
      numero,
      complemento,
      referencia,
      pagamento,
      precisaTroco,
      trocoPara,
    });
  }

  // Borda vermelha (#EB5757) no campo com problema (seção 4.2)
  function estiloCampo(nomeCampo) {
    return campoInvalido === nomeCampo ? [styles.input, styles.inputInvalido] : styles.input;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar} activeOpacity={0.7}>
          <Text style={styles.botaoVoltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Dados de Entrega</Text>
        <View style={styles.espacoHeader} />
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.campo}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={estiloCampo('nome')}
            placeholder="Seu nome completo"
            placeholderTextColor={cores.secundaria}
            value={nome}
            onChangeText={setNome}
            keyboardType="default"
          />
          {campoInvalido === 'nome' && <Text style={styles.textoErro}>{erro}</Text>}
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={estiloCampo('telefone')}
            placeholder="(19) 99999-0000"
            placeholderTextColor={cores.secundaria}
            value={telefone}
            onChangeText={(texto) => setTelefone(apenasNumeros(texto))}
            keyboardType="phone-pad"
            maxLength={11}
          />
          {campoInvalido === 'telefone' && <Text style={styles.textoErro}>{erro}</Text>}
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={estiloCampo('cep')}
            placeholder="00000000"
            placeholderTextColor={cores.secundaria}
            value={cep}
            onChangeText={(texto) => setCep(apenasNumeros(texto))}
            keyboardType="numeric"
            maxLength={8}
          />
          {campoInvalido === 'cep' && <Text style={styles.textoErro}>{erro}</Text>}
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={estiloCampo('endereco')}
            placeholder="Rua, bairro"
            placeholderTextColor={cores.secundaria}
            value={endereco}
            onChangeText={setEndereco}
            keyboardType="default"
          />
          {campoInvalido === 'endereco' && <Text style={styles.textoErro}>{erro}</Text>}
        </View>

        <View style={styles.linhaDupla}>
          <View style={[styles.campo, styles.campoMetade]}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              style={estiloCampo('numero')}
              placeholder="123"
              placeholderTextColor={cores.secundaria}
              value={numero}
              onChangeText={(texto) => setNumero(apenasNumeros(texto))}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.campo, styles.campoMetade]}>
            <Text style={styles.label}>Complemento</Text>
            <TextInput
              style={styles.input}
              placeholder="Opcional"
              placeholderTextColor={cores.secundaria}
              value={complemento}
              onChangeText={setComplemento}
              keyboardType="default"
            />
          </View>
        </View>
        {campoInvalido === 'numero' && <Text style={styles.textoErro}>{erro}</Text>}

        <View style={styles.campo}>
          <Text style={styles.label}>Referência</Text>
          <TextInput
            style={styles.input}
            placeholder="Ponto de referência (opcional)"
            placeholderTextColor={cores.secundaria}
            value={referencia}
            onChangeText={setReferencia}
            keyboardType="default"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Forma de pagamento</Text>
          <View
            style={[
              styles.pickerContainer,
              campoInvalido === 'pagamento' && styles.inputInvalido,
            ]}
          >
            <Picker
              selectedValue={pagamento}
              onValueChange={(valor) => setPagamento(valor)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" color={cores.secundaria} />
              <Picker.Item label="Cartão" value="Cartão" />
              <Picker.Item label="Pix" value="Pix" />
              <Picker.Item label="Dinheiro" value="Dinheiro" />
            </Picker>
          </View>
          {campoInvalido === 'pagamento' && <Text style={styles.textoErro}>{erro}</Text>}
        </View>

        {/* RF13 (bônus): só aparece quando a forma de pagamento é Dinheiro */}
        {pagamento === 'Dinheiro' && (
          <View style={styles.blocoTroco}>
            <View style={styles.linhaSwitch}>
              <Text style={styles.label}>Preciso de troco</Text>
              <Switch
                value={precisaTroco}
                onValueChange={setPrecisaTroco}
                trackColor={{ false: '#CCD2DE', true: cores.primaria }}
                thumbColor={cores.branco}
              />
            </View>

            {precisaTroco && (
              <View style={styles.campo}>
                <Text style={styles.label}>Troco para</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex.: 50"
                  placeholderTextColor={cores.secundaria}
                  value={trocoPara}
                  onChangeText={(texto) => setTrocoPara(apenasNumeros(texto))}
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>
        )}

        {/* Erro geral (carrinho vazio) — sem campo específico nesta tela */}
        {campoInvalido === null && erro !== '' && (
          <Text style={styles.textoErroGeral}>{erro}</Text>
        )}

        <TouchableOpacity style={styles.botaoFinalizar} onPress={validarPedido} activeOpacity={0.7}>
          <Text style={styles.textoBotaoFinalizar}>Finalizar pedido</Text>
        </TouchableOpacity>
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
  conteudo: {
    padding: 16,
  },
  campo: {
    marginBottom: 14,
  },
  campoMetade: {
    flex: 1,
  },
  linhaDupla: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.escura,
    marginBottom: 6,
  },
  input: {
    backgroundColor: cores.branco,
    borderRadius: 8,
    paddingHorizontal: 14,
    minHeight: 44,
    fontSize: 14,
    color: cores.escura,
    borderWidth: 1,
    borderColor: '#E1E5EC',
  },
  inputInvalido: {
    borderColor: cores.erro,
    borderWidth: 1.5,
  },
  pickerContainer: {
    backgroundColor: cores.branco,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E5EC',
    justifyContent: 'center',
  },
  picker: {
    color: cores.escura,
  },
  blocoTroco: {
    backgroundColor: cores.branco,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textoErro: {
    fontSize: 13,
    color: cores.erro,
    marginTop: 4,
  },
  textoErroGeral: {
    fontSize: 14,
    color: cores.erro,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  botaoFinalizar: {
    backgroundColor: cores.primaria,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  textoBotaoFinalizar: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
