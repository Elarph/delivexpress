import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CardapioScreen from './src/screens/CardapioScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('cardapio');
  const [carrinho, setCarrinho] = useState([]);
  const [dadosEntrega, setDadosEntrega] = useState(null);

  function adicionarProduto(produto) {
    setCarrinho((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.produto.id === produto.id);

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...itensAtuais, { produto, quantidade: 1 }];
    });
  }

  // Aumenta a quantidade de um item já existente no carrinho (RF07)
  function incrementarQuantidade(produtoId) {
    setCarrinho((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  // Diminui a quantidade de um item; ao chegar em 0, o item é removido (RF07)
  function decrementarQuantidade(produtoId) {
    setCarrinho((itensAtuais) =>
      itensAtuais
        .map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  // Total de itens para o contador do cardápio, em tempo real (RF03)
  const totalItensCarrinho = carrinho.reduce((total, item) => total + item.quantidade, 0);

  // Chamado pelo Checkout quando a validação passa (RF15). Guarda os dados
  // de entrega para a tela de Confirmação usar na Aula 4 (RF16).
  function finalizarPedido(dados) {
    setDadosEntrega(dados);
    setTelaAtual('confirmacao');
  }

  function limparCarrinhoEVoltar() {
    setCarrinho([]);
    setDadosEntrega(null);
    setTelaAtual('cardapio');
  }

  return (
    <>
      <StatusBar style="light" />

      {telaAtual === 'cardapio' && (
        <CardapioScreen
          totalItensCarrinho={totalItensCarrinho}
          onAdicionarProduto={adicionarProduto}
          onVerCarrinho={() => setTelaAtual('carrinho')}
        />
      )}

      {telaAtual === 'carrinho' && (
        <CarrinhoScreen
          carrinho={carrinho}
          onIncrementar={incrementarQuantidade}
          onDecrementar={decrementarQuantidade}
          onVoltar={() => setTelaAtual('cardapio')}
          onContinuar={() => setTelaAtual('checkout')}
        />
      )}

      {telaAtual === 'checkout' && (
        <CheckoutScreen
          totalItensCarrinho={totalItensCarrinho}
          onVoltar={() => setTelaAtual('carrinho')}
          onFinalizar={finalizarPedido}
        />
      )}

      {telaAtual === 'confirmacao' && (
        <ConfirmacaoScreen carrinho={carrinho} dadosEntrega={dadosEntrega} onNovoPedido={limparCarrinhoEVoltar} />
      )}
    </>
  );
}
