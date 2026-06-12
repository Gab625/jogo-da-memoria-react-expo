import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const FOTOS = [
  { id: 1, imagem: require('./assets/foto1.jpeg'), mensagem: "Uma das fotos do nosso ano novo, eu amo muito ela porque percebo o quão feliz sou ao seu lado " },
  { id: 2, imagem: require('./assets/foto2.jpeg'), mensagem: "A gente se divertindo muito na nossa hamburgueria favorita pra comer nossa comida favorita " },
  { id: 3, imagem: require('./assets/foto3.jpeg'), mensagem: "Você me cheirando bem gostoso " },
  { id: 4, imagem: require('./assets/foto4.jpeg'), mensagem: "Uma das nossas viagens e você perto do Leão! " },
  { id: 5, imagem: require('./assets/foto5.jpeg'), mensagem: "Nosso dia dos namorados passado, você é minha vida " },
  { id: 6, imagem: require('./assets/foto6.jpeg'), mensagem: "Me sentindo muito feliz por passarmos mais um final de ano juntos, você é meu tudo " },
];

function gerarBaralho() {
  const cartasDuplicadas = [...FOTOS, ...FOTOS];
  const embaralhado = cartasDuplicadas.sort(() => Math.random() - 0.5);

  return embaralhado.map((foto, indice) => ({
    id: indice,
    icone: foto.imagem, 
    mensagem: foto.mensagem, 
    revelada: false,
    reveladaTemporariamente: false,
  }));
}

export default function App() {
  const [baralho, setBaralho] = useState(gerarBaralho());
  const [modalVisualizacao, setModalVisualizacao] = useState({ visivel: false, imagem: null, mensagem: '' });
  const [primeiraSelecionada, setPrimeiraSelecionada] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [movimentos, setMovimentos] = useState(0);
  const [paresAcertados, setParesAcertados] = useState(0);

  function selecionarCarta(cartaClicada) {
    // Trava cliques inválidos
    if (bloqueado || cartaClicada.revelada || cartaClicada.reveladaTemporariamente) {
      return;
    }

    // 💡 PASSO 1: Virar a carta clicada na tela de forma correta (Imutável)
    const baralhoAtualizado = baralho.map(carta => 
      carta.id === cartaClicada.id ? { ...carta, reveladaTemporariamente: true } : carta
    );
    setBaralho(baralhoAtualizado);

    // Pega a referência da carta atualizada dentro do novo estado
    const segundaSelecionada = baralhoAtualizado.find(carta => carta.id === cartaClicada.id);

    // Se for a primeira carta da rodada
    if (primeiraSelecionada === null) {
      setPrimeiraSelecionada(segundaSelecionada);
      return;
    }

    // Se chegou aqui, é a segunda carta da rodada
    setMovimentos(movimentos + 1);

    // CASO DE ACERTO (MATCH):
    if (primeiraSelecionada.icone === segundaSelecionada.icone) {
      // Atualiza o baralho marcando as duas como reveladas permanentemente
      setBaralho(prev => prev.map(carta => 
        carta.icone === segundaSelecionada.icone ? { ...carta, revelada: true } : carta
      ));
      
      setParesAcertados(paresAcertados + 1);
      
      // Guarda em variáveis locais para o Modal abrir com segurança
      const imagemAcerto = primeiraSelecionada.icone;
      const mensagemAcerto = primeiraSelecionada.mensagem;
      
      setBloqueado(true); // Bloqueia a tela enquanto o modal não abre
      setTimeout(() => {
        setModalVisualizacao({
          visivel: true,
          imagem: imagemAcerto,
          mensagem: mensagemAcerto
        });
        setBloqueado(false);
      }, 500);

      setPrimeiraSelecionada(null); 
    } else {
      // CASO DE ERRO (ERROU O PAR):
      setBloqueado(true);
      setTimeout(() => {
        setBaralho(prev => prev.map(carta => 
          carta.id === primeiraSelecionada.id || carta.id === segundaSelecionada.id 
            ? { ...carta, reveladaTemporariamente: false } 
            : carta
        ));
        setPrimeiraSelecionada(null);
        setBloqueado(false);
      }, 1000);
    }
  }

  function reiniciar() {
    setBaralho(gerarBaralho());
    setPrimeiraSelecionada(null);
    setModalVisualizacao({ visivel: false, imagem: null, mensagem: '' });
    setBloqueado(false);
    setMovimentos(0);
    setParesAcertados(0);
  }

  const ganhou = paresAcertados === FOTOS.length;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Memória</Text>
      
      <View style={styles.placarContainer}>
        <Text style={styles.placarTexto}>Movimentos: {movimentos}</Text>
        <Text style={styles.placarTexto}>Pares: {paresAcertados}/6</Text>
      </View>

      {!ganhou ? (
        <View style={styles.tabuleiro}>
          {baralho.map((carta) => {
            const exibirIcone = carta.revelada || carta.reveladaTemporariamente;

            return (
              <TouchableOpacity
                key={carta.id}
                style={[
                  styles.carta,
                  exibirIcone ? styles.cartaAberta : styles.cartaFechada,
                  carta.revelada && styles.cartaAcertada
                ]}
                onPress={() => selecionarCarta(carta)}
                activeOpacity={0.8}
              >
                {exibirIcone ? (
                  <Image source={carta.icone} style={styles.fotoCarta} />
                ) : (
                  <Text style={styles.cartaTexto}>❤️</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.vitoriaContainer}>
          <Text style={styles.vitoriaTexto}>🎉 Parabéns! Você venceu em {movimentos} jogadas!</Text>
          <Text style={styles.vitoriaTexto}>EU TE AMO MUITO E QUERO PASSAR MINHA VIDA COM VOCÊ! ❤️</Text>
          <TouchableOpacity style={[styles.botao, styles.botaoVerde]} onPress={reiniciar}>
            <Text style={styles.botaoTexto}>Jogar de Novo</Text>
          </TouchableOpacity>
        </View>
      )}

      {modalVisualizacao.visivel && (
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <Image source={modalVisualizacao.imagem} style={styles.modalFoto} />
            <Text style={styles.modalMensagem}>{modalVisualizacao.mensagem}</Text>
            
            <TouchableOpacity 
              style={styles.modalBotao} 
              onPress={() => setModalVisualizacao({ visivel: false, imagem: null, mensagem: '' })}
            >
              <Text style={styles.modalBotaoTexto}>Continuar Jogando ❤️</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', padding: 24, alignItems: 'center', justifyContent: 'center' },
  titulo: { color: '#FF1493', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  placarContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16, marginBottom: 24 },
  placarTexto: { color: '#C71585', fontSize: 16, fontWeight: 'bold' },
  tabuleiro: { width: 240, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  fotoCarta: { width: '100%', height: '100%', resizeMode: 'cover' },
  carta: { width: 70, height: 70, margin: 5, borderRadius: 8, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  cartaFechada: { backgroundColor: '#FF69B4' },
  cartaAberta: { backgroundColor: '#FFF' },
  cartaAcertada: { backgroundColor: '#FF1493', borderWidth: 2, borderColor: '#FFF' },
  cartaTexto: { fontSize: 24 },
  vitoriaContainer: { alignItems: 'center' },
  vitoriaTexto: { color: '#C71585', fontSize: 18, textAlign: 'center', marginBottom: 24 },
  botao: { backgroundColor: '#FF1493', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8 },
  botaoVerde: { backgroundColor: '#FF69B4' },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalFundo: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  modalConteudo: { width: '85%', backgroundColor: '#FFF', borderRadius: 16, padding: 20, alignItems: 'center' },
  modalFoto: { width: 220, height: 220, borderRadius: 12, marginBottom: 16, resizeMode: 'cover' },
  modalMensagem: { color: '#2B0B14', fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 20, paddingHorizontal: 10, lineHeight: 22 },
  modalBotao: { backgroundColor: '#FF1493', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  modalBotaoTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});