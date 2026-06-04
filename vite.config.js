import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Raiz
        main: resolve(__dirname, 'index.html'),

        // A Companhia
        visaoGeral:           resolve(__dirname, 'visao-geral.html'),
        estrategiasVantagens: resolve(__dirname, 'estrategias-vantagens.html'),

        // Governança Corporativa
        novoMercado:             resolve(__dirname, 'novo-mercado.html'),
        composicaoAcionaria:     resolve(__dirname, 'composicao-acionaria.html'),
        diretoriaConselho:       resolve(__dirname, 'diretoria-conselho.html'),
        remuneracaoAdministracao: resolve(__dirname, 'remuneracao-administracao.html'),
        atasAssembleias:         resolve(__dirname, 'atas-assembleias.html'),
        codigoConduta:           resolve(__dirname, 'codigo-conduta.html'),
        estatutoPoliticas:       resolve(__dirname, 'estatuto-politicas.html'),
        dividendosRecompra:      resolve(__dirname, 'dividendos-recompra.html'),
        boletimVotoDistancia:    resolve(__dirname, 'boletim-voto-distancia.html'),
        estatutoSocial:          resolve(__dirname, 'estatuto-social.html'),
        informeGovernanca:       resolve(__dirname, 'informe-governanca.html'),

        // Informações aos Investidores
        centralResultados:    resolve(__dirname, 'central-resultados.html'),
        documentosCvm:        resolve(__dirname, 'documentos-cvm.html'),
        fatosRelevantes:      resolve(__dirname, 'fatos-relevantes.html'),
        apresentacoes:        resolve(__dirname, 'apresentacoes.html'),
        sustentabilidade:     resolve(__dirname, 'sustentabilidade.html'),
        ratingsCobertura:     resolve(__dirname, 'ratings-cobertura.html'),
        recompraAcoes:        resolve(__dirname, 'recompra-acoes.html'),
        planilhaResultados:   resolve(__dirname, 'planilha-resultados.html'),
        rating:               resolve(__dirname, 'rating.html'),
        projecoesSafra:       resolve(__dirname, 'projecoes-safra.html'),
        outrosDocumentos:     resolve(__dirname, 'outros-documentos.html'),

        // Outras Informações
        informeRendimentos:   resolve(__dirname, 'informe-rendimentos.html'),
        calendarioEventos:    resolve(__dirname, 'calendario-eventos.html'),
        cotacoesGraficos:     resolve(__dirname, 'cotacoes-graficos.html'),
        perguntasFrequentes:  resolve(__dirname, 'perguntas-frequentes.html'),
        mailing:              resolve(__dirname, 'mailing.html'),
        faleComRi:            resolve(__dirname, 'fale-com-ri.html'),

        // Legal
        politicaPrivacidade:  resolve(__dirname, 'politica-de-privacidade.html'),
        termosCondicoes:      resolve(__dirname, 'termos-e-condicoes.html'),
        definicaoCookies:     resolve(__dirname, 'definicao-de-cookies.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
