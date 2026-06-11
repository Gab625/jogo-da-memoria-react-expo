import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ICONES = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🥑', '🍍'];

function gerarBaralho() {
  const cartasDuplicadas = [...ICONES, ...ICONES];
  const embaralhado = cartasDuplicadas.sort(() => Math.random() - 0.5);

  return embaralhado.map((icone, indice) => ({
    id: indice,
    icone: icone,
    revelada: false,
    reveladaTemporariamente: false,
  }));
}

export default function App() {
  const [baralho, setBaralho] = useState(gerarBaralho());
  const [primeiraSelecionada, setPrimeiraSelecionada] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [movimentos, setMovimentos] = useState(0);
  const [paresAcertados, setParesAcertados] = useState(0);

  function selecionarCarta(cartaClicada) {
    if (bloqueado || cartaClicada.revelada || cartaClicada.reveladaTemporariamente) {
      return;
    }

    if (primeiraSelecionada === null) {
      cartaClicada.reveladaTemporariamente = true;
      setPrimeiraSelecionada(cartaClicada);
      return;
    }

    const segundaSelecionada = cartaClicada;
    segundaSelecionada.reveladaTemporariamente = true;
    setMovimentos(movimentos + 1);

    if (primeiraSelecionada.icone === segundaSelecionada.icone) {
      primeiraSelecionada.revelada = true;
      segundaSelecionada.revelada = true;
      
      setParesAcertados(paresAcertados + 1);
      setPrimeiraSelecionada(null);
    } else {
      setBloqueado(true);
      setTimeout(() => {
        primeiraSelecionada.reveladaTemporariamente = false;
        segundaSelecionada.reveladaTemporariamente = false;
        setPrimeiraSelecionada(null);
        setBloqueado(false);
      }, 1000);
    }
  }

  function reiniciar() {
    setBaralho(gerarBaralho());
    setPrimeiraSelecionada(null);
    setBloqueado(false);
    setMovimentos(0);
    setParesAcertados(0);
  }

  const ganhou = paresAcertados === ICONES.length;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Memória</Text>
      
      <View style={styles.placarContainer}>
        <Text style={styles.placarTexto}>Movimentos: {movimentos}</Text>
        <Text style={styles.placarTexto}>Pares: {paresAcertados}/8</Text>
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
                <Text style={styles.cartaTexto}>{exibirIcone ? carta.icone : '?'}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.vitoriaContainer}>
          <Text style={styles.vitoriaTexto}>🎉 Parabéns! Você venceu em {movimentos} jogadas!</Text>
          <TouchableOpacity style={[styles.botao, styles.botaoVerde]} onPress={reiniciar}>
            <Text style={styles.botaoTexto}>Jogar de Novo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#034403', padding: 24, alignItems: 'center', justifyValue: 'center', justifyContent: 'center' },
  titulo: { color: '#FFFF00', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  placarContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16, marginBottom: 24 },
  placarTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabuleiro: { width: 320, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  carta: { width: 70, height: 70, margin: 5, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cartaFechada: { backgroundColor: '#FFFF00' },
  cartaAberta: { backgroundColor: '#257aaf' },
  cartaAcertada: { backgroundColor: '#10B981' },
  cartaTexto: { fontSize: 28 },
  vitoriaContainer: { alignItems: 'center' },
  vitoriaTexto: { color: '#F8FAFC', fontSize: 18, textAlign: 'center', marginBottom: 24 },
  botao: { backgroundColor: '#FFFF00', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8 },
  botaoVerde: { backgroundColor: '#10B981' },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});