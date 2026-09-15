import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CardapioScreen from './src/screens/CardapioScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('cardapio');
  const [carrinho, setCarrinho] = useState([]);

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

  function incrementarQuantidade(produtoId) {
    setCarrinho((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

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

  const totalItensCarrinho = carrinho.reduce((total, item) => total + item.quantidade, 0);

  function limparCarrinhoEVoltar() {
    setCarrinho([]);
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
        <CheckoutScreen onVoltar={() => setTelaAtual('carrinho')} />
      )}

      {telaAtual === 'confirmacao' && (
        <ConfirmacaoScreen onNovoPedido={limparCarrinhoEVoltar} />
      )}
    </>
  );
}
