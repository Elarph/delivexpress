export const TAXA_ENTREGA = 6.0;

// 18.9 -> "R$ 18,90"
export function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Subtotal, taxa de entrega fixa (R$ 6,00) e total geral (RF08).
// Carrinho vazio não paga taxa de entrega.
export function calcularTotais(carrinho) {
  const subtotal = carrinho.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  );
  const taxaEntrega = carrinho.length === 0 ? 0 : TAXA_ENTREGA;
  return { subtotal, taxaEntrega, total: subtotal + taxaEntrega };
}