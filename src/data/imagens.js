// Mapa de imagens LOCAIS dos produtos.
// O React Native exige que o require() de uma imagem seja "estático"
// (ou seja, o caminho tem que estar escrito literalmente aqui, não pode
// vir de uma variável ou de um JSON). Por isso centralizamos tudo aqui:
// cada produto local tem uma "chave", e essa chave aponta pro arquivo real.
//
// Pra adicionar uma imagem nova:
// 1. Coloque o arquivo em assets/img/produtos/
// 2. Adicione uma linha abaixo com uma chave nova apontando pro arquivo
// 3. Em data/produtos.js, use essa chave no campo `imagem`

export const imagensLocais = {
  cheeseDuplo: require('../assets/img/produtos/cheese-duplo.jpg'),
  xSalada: require('../assets/img/produtos/xsalada.jpg'),
  xBacon: require('../assets/img/produtos/xbacon.jpg'),
  xBurger: require('../assets/img/produtos/xburger.jpg'),
  Batata: require('../assets/img/produtos/batata.jpg'),
  Juca: require('../assets/img/produtos/juca.jpg'),
  
  // batataFrita: require('../assets/img/produtos/batata-frita.jpg'),
  // refrigerante: require('../assets/img/produtos/refrigerante.jpg'),
};
