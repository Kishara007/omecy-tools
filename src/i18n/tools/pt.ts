import type { ToolDictionary } from '../types';

export const toolsPt: ToolDictionary = {
  'video-to-mp3': {
    name: 'Conversor de Vídeo para MP3',
    shortName: 'Vídeo para MP3',
    cardDesc: 'Extraia áudio MP3 nítido de vídeos MP4, MOV, WebM e MKV localmente em segundos.',
    meta: {
      title: 'Converter Vídeo para MP3 – Extrair Áudio Grátis | OMECY',
      description:
        'Extraia áudio MP3 nítido de vídeos MP4, MOV, WebM e MKV direto no navegador. Escolha de 128 a 320 kbps grátis, na hora e sem enviar arquivos.',
      h1: 'Conversor de Vídeo para MP3',
      subtitle:
        'Extraia faixas de áudio MP3 limpas de vídeos MP4, MOV, WebM e MKV diretamente no navegador, sem enviar seus arquivos.',
    },
    howToTitle: 'Como usar o Conversor de Vídeo para MP3',
    howToSteps: [
      'Arraste um arquivo de vídeo MP4, MOV, WebM ou MKV para a área acima ou clique em Escolher arquivo para selecionar do seu dispositivo.',
      'Escolha a taxa de bits MP3 ideal: 128 kbps para gravações leves de voz, 192 kbps para equilíbrio no dia a dia ou 320 kbps para música com alta fidelidade.',
      'Clique em Extrair áudio MP3 para executar a conversão localmente, ouça a prévia e salve seu arquivo MP3 na hora.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Privacidade total sem envio de arquivos',
        body: 'Aulas gravadas, entrevistas sigilosas e vídeos pessoais ficam restritos à aba do navegador em vez de irem para servidores externos.',
      },
      {
        title: 'Sem esperar uploads demorados',
        body: 'Por que enviar um vídeo de 500 MB em uma conexão lenta só para baixar um MP3 de 5 MB? A extração local lê direto do seu aparelho.',
      },
      {
        title: 'Grátis, sem limites diários nem cadastro',
        body: 'Converta quantos vídeos quiser sem cotas artificiais, sem pedir e-mail e sem precisar instalar programas.',
      },
    ],
    aboutTitle: 'Sobre extrair áudio MP3 de arquivos de vídeo',
    aboutParagraphs: [
      'A maioria dos vídeos guarda faixas separadas de imagem e som dentro de contêineres como MP4, MOV, WebM ou MKV. Ao extrair o áudio para MP3, o OMECY descarta os quadros de vídeo e codifica apenas o fluxo sonoro com o codificador LAME MP3 em WebAssembly, transformando um vídeo de centenas de megabytes em uma faixa leve e portátil.',
      'Definir a taxa de bits certa equilibra clareza e tamanho do arquivo. Falas gravadas, webinários e resumos de reuniões ficam bem definidos em 128 kbps ocupando pouquíssimo espaço. Já videoclipes, apresentações acústicas e shows se beneficiam de 192 kbps ou 320 kbps para preservar detalhes agudos em fones e caixas de som.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Meus vídeos são enviados para algum servidor ao extrair o MP3?',
        answer:
          'Não. O OMECY processa o vídeo estritamente dentro do seu navegador usando um motor WebAssembly local. O arquivo nunca sai do seu dispositivo.',
      },
      {
        question: 'Quais formatos de vídeo posso converter para MP3?',
        answer:
          'Você pode extrair áudio de arquivos MP4, MOV (iPhone e QuickTime), WebM, MKV, AVI e M4V.',
      },
      {
        question: 'Qual taxa de bits MP3 devo escolher?',
        answer:
          'Escolha 128 kbps para podcasts e voz, 192 kbps para músicas e vídeos em geral, ou 320 kbps quando quiser máxima fidelidade sonora.',
      },
      {
        question: 'Por que há um carregamento rápido do motor na primeira conversão?',
        answer:
          'Para manter o site ultrarrápido, o OMECY baixa o motor de áudio e vídeo em WebAssembly apenas quando você inicia o primeiro trabalho. Depois disso, o navegador mantém o motor em cache para conversões seguintes.',
      },
      {
        question: 'Existe um limite de tamanho de arquivo?',
        answer:
          'O OMECY não impõe limites artificiais de servidor. O limite prático depende apenas da memória do seu dispositivo, e navegadores de desktop lidam com folga com vídeos de centenas de megabytes.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'webm-to-mp4': {
    name: 'Conversor de WebM para MP4',
    shortName: 'WebM para MP4',
    cardDesc: 'Converta gravações de tela e vídeos WebM em arquivos MP4 H.264 universais.',
    meta: {
      title: 'Converter WebM para MP4 – Rápido e Sem Envios | OMECY',
      description:
        'Converta gravações de tela WebM e clipes da web em vídeos MP4 H.264 universais no seu navegador. Grátis, rápido e privado, sem enviar nada.',
      h1: 'Conversor de WebM para MP4',
      subtitle:
        'Transforme gravações de tela WebM e vídeos da web em arquivos MP4 H.264 reproduzíveis em qualquer aparelho, direto no navegador.',
    },
    howToTitle: 'Como usar o Conversor de WebM para MP4',
    howToSteps: [
      'Arraste seu vídeo .webm para a área acima ou clique em Escolher arquivo.',
      'Selecione uma predefinição de qualidade: Rápido para compartilhar sem demora, Equilibrado para boa nitidez e peso reduzido, ou Alta qualidade para preservar detalhes finos.',
      'Clique em Converter, confira a prévia do vídeo no player e clique em Baixar.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Mantenha gravações de tela confidenciais',
        body: 'Relatos de bugs, demonstrações de sistemas e capturas do Chrome costumam exibir abas e painéis privados — converter localmente mantém tudo fora da nuvem.',
      },
      {
        title: 'Sem filas em servidores externos',
        body: 'A conversão começa na hora no seu próprio computador, sem disputar fila com outros usuários nem esperar barras de upload.',
      },
      {
        title: 'MP4 padrão sem marcas d’água',
        body: 'Exporte vídeo H.264 com áudio AAC e metadados de início rápido para reprodução imediata em iOS, Windows, macOS e redes sociais.',
      },
    ],
    aboutTitle: 'Compatibilidade entre vídeos WebM e MP4',
    aboutParagraphs: [
      'WebM é um contêiner aberto muito utilizado por gravadores de tela no navegador, extensões do Chrome, ferramentas de videoconferência e aplicativos web, combinando vídeo VP8, VP9 ou AV1 com áudio Opus. Embora navegadores modernos reproduzam WebM sem esforço, vários editores de vídeo, apresentações do PowerPoint, iPhones e apps de mensagem ainda recusam anexos .webm.',
      'O formato MP4 com codificação H.264 (formato de cor yuv420p) e áudio AAC continua sendo o padrão universal mais compatível disponível. O OMECY também grava o índice fast-start no início do arquivo para que o vídeo comece a tocar imediatamente ao ser compartilhado online.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'O MP4 convertido funciona no iPhone, Mac e Windows?',
        answer:
          'Sim. O OMECY codifica em H.264 com padrão de cor yuv420p e áudio AAC, compatíveis nativamente com iOS, QuickTime no macOS, Windows, Android e grandes redes sociais.',
      },
      {
        question: 'Converter WebM para MP4 envia minha gravação de tela para algum lugar?',
        answer:
          'Nunca. Cada quadro é decodificado e recodificado localmente dentro do seu navegador via WebAssembly.',
      },
      {
        question: 'Qual predefinição de qualidade devo escolher?',
        answer:
          'Equilibrado atende muito bem à maioria das gravações. Prefira Rápido para enviar clipes agilmente em conversas, ou Alta qualidade quando precisar preservar textos nítidos em tutoriais.',
      },
      {
        question: 'O áudio original do arquivo WebM é mantido?',
        answer:
          'Sim. Faixas de áudio Opus ou Vorbis dentro do WebM são convertidas automaticamente para áudio estéreo AAC padrão no MP4 final.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'video-compressor': {
    name: 'Compressor de Vídeo',
    shortName: 'Compressor de Vídeo',
    cardDesc: 'Reduza vídeos pesados para WhatsApp, Discord, e-mail e web sem enviar arquivos.',
    meta: {
      title: 'Compressor de Vídeo – Reduzir Tamanho Grátis | OMECY',
      description:
        'Reduza o tamanho de vídeos MP4, MOV e WebM para WhatsApp, Discord ou e-mail no seu navegador. Compressão local grátis, rápida e sem envios.',
      h1: 'Compressor de Vídeo Online',
      subtitle:
        'Diminua o peso de vídeos MP4, MOV e WebM para WhatsApp, Discord, e-mail ou sites — 100% localmente no navegador.',
    },
    howToTitle: 'Como usar o Compressor de Vídeo',
    howToSteps: [
      'Arraste seu vídeo MP4, MOV, WebM ou MKV para a caixa do compressor acima.',
      'Escolha uma predefinição rápida (WhatsApp, Discord, E-mail ou Web) ou ajuste o controle de Qualidade e a Resolução máxima manualmente.',
      'Clique em Comprimir, compare o tamanho original com o reduzido e baixe seu vídeo MP4 mais leve.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Compressão de vídeo sem enviar à nuvem',
        body: 'Vídeos pesados do celular e materiais de trabalho permanecem seguros no seu dispositivo sem passar por servidores terceiros.',
      },
      {
        title: 'Ajustado para limites reais de anexo',
        body: 'Predefinições de um clique combinam resolução e taxa de compressão práticas para os limites do Discord, WhatsApp e e-mail.',
      },
      {
        title: 'Comparação transparente de tamanho',
        body: 'Veja na hora quantos megabytes foram economizados e avalie a nitidez na reprodução antes de salvar o arquivo final.',
      },
    ],
    aboutTitle: 'Como funciona a compressão inteligente de vídeo no navegador',
    aboutParagraphs: [
      'Os celulares atuais gravam em 4K com taxas de bits altas que facilmente ultrapassam 100 MB por minuto. Aplicativos de mensagem como Discord e WhatsApp, além de serviços de e-mail, impõem limites rígidos que bloqueiam gravações brutas da câmera.',
      'Uma boa compressão combina dois ajustes: codificação H.264 com Fator de Taxa Constante (CRF), que economiza dados em cenas paradas enquanto preserva detalhes em movimento, e redução proporcional da resolução (como de 4K para 1080p ou 720p). Juntos, eles costumam reduzir o peso do vídeo em 60% a 85% mantendo imagem limpa em celulares e notebooks.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Quanto menor ficará o meu vídeo?',
        answer:
          'A redução depende da resolução e taxa de bits do vídeo original. Gravações diretas do celular costumam encolher de 50% a 85% com as predefinições de WhatsApp, Discord ou Web.',
      },
      {
        question: 'Meus vídeos são enviados para a nuvem durante a compressão?',
        answer:
          'Não. A compressão acontece inteiramente no seu dispositivo dentro do navegador via WebAssembly, preservando 100% da sua privacidade.',
      },
      {
        question: 'O que significa o número CRF ao lado do controle de qualidade?',
        answer:
          'CRF significa Constant Rate Factor (Fator de Taxa Constante). Valores menores preservam mais nitidez gerando arquivos maiores; valores maiores produzem arquivos bem menores para limites apertados.',
      },
      {
        question: 'Posso reduzir um vídeo 4K para 1080p ou 720p?',
        answer:
          'Sim. Use o menu Resolução máxima para redimensionar para 1080p, 720p ou 480p mantendo a proporção original automaticamente.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'video-trimmer': {
    name: 'Cortador de Vídeo Online',
    shortName: 'Cortador de Vídeo',
    cardDesc: 'Corte trechos de vídeo com prévia instantânea e cópia direta sem perda de qualidade.',
    meta: {
      title: 'Cortador de Vídeo Online – Cortar Sem Envios | OMECY',
      description:
        'Corte vídeos MP4, MOV, WebM e MKV direto no navegador com prévia instantânea e cópia sem perda. Grátis, rápido e privado, sem enviar arquivos.',
      h1: 'Cortador de Vídeo Online',
      subtitle:
        'Remova inícios ou finais indesejados de vídeos MP4, MOV e WebM diretamente no navegador, sem enviar nenhum arquivo.',
    },
    howToTitle: 'Como usar o Cortador de Vídeo Online',
    howToSteps: [
      'Arraste um vídeo para a área acima para carregar uma prévia local instantânea no reprodutor.',
      'Mova os controles de Tempo inicial e Tempo final — ou pause o vídeo e clique em Usar tempo atual — para definir o trecho exato desejado.',
      'Escolha Cópia rápida sem perda para cortar em segundos sem recodificar (ou Recodificação precisa para cortes exatos no quadro) e clique em Cortar e exportar.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Prévia imediata sem esperar upload',
        body: 'O navegador reproduz o vídeo local na mesma hora, permitindo navegar por gravações longas sem aguardar barras de envio.',
      },
      {
        title: 'Opção de cópia sem perda',
        body: 'O modo Cópia rápida sem perda faz o corte direto nos quadros-chave sem recodificar, mantendo 100% da nitidez original em segundos.',
      },
      {
        title: 'Gravações brutas continuam privadas',
        body: 'Apare capturas de tela, vídeos de família ou reuniões gravadas sem mandar o arquivo inteiro para servidores externos.',
      },
    ],
    aboutTitle: 'Cópia sem perda versus recodificação precisa de vídeo',
    aboutParagraphs: [
      'Formatos de vídeo comprimido gravam imagens de referência completas chamadas quadros-chave (keyframes) a cada poucos segundos, enquanto os quadros intermediários registram apenas as mudanças entre eles. O modo Cópia rápida sem perda fatia o vídeo no quadro-chave mais próximo sem recomprimir pixels, entregando velocidade quase instantânea e exatamente a mesma qualidade original.',
      'Quando você precisa de exatidão de frações de segundo entre quadros-chave — como cortar logo antes de uma fala ou troca de cena — ative Recodificação precisa. Esse modo decodifica e recodifica apenas o trecho selecionado em um clipe MP4 fluido e universal.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Cortar um vídeo reduz a qualidade da imagem?',
        answer:
          'No modo Cópia rápida sem perda não há recodificação, portanto o trecho cortado preserva 100% da qualidade original de vídeo e áudio.',
      },
      {
        question: 'Quando devo usar Recodificação precisa em vez de Cópia rápida sem perda?',
        answer:
          'Prefira Recodificação precisa se o ponto inicial cair entre quadros-chave e você notar uma pequena pausa ou leve deslocamento no começo de um corte sem perda.',
      },
      {
        question: 'Meus vídeos sem edição são enviados para algum servidor?',
        answer:
          'Não. Tanto o reprodutor de prévia quanto o motor de corte funcionam integralmente no seu navegador, sem envios pela rede.',
      },
      {
        question: 'Quais formatos de vídeo posso cortar?',
        answer:
          'Você pode cortar arquivos MP4, MOV, WebM e MKV suportados pelo navegador e pelo FFmpeg em WebAssembly.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'audio-joiner': {
    name: 'Juntar Áudios e Mesclar MP3',
    shortName: 'Juntar Áudios',
    cardDesc: 'Combine várias faixas MP3, WAV e M4A reordenando facilmente com crossfade suave.',
    meta: {
      title: 'Juntar Áudios e MP3 Online – Unir Faixas Grátis | OMECY',
      description:
        'Junte vários arquivos MP3, WAV e M4A em uma única faixa contínua com transição suave opcional. Processamento local grátis e sem envios.',
      h1: 'Juntar Áudios e Mesclar MP3',
      subtitle:
        'Combine várias faixas MP3, WAV ou M4A em um único arquivo contínuo com reordenação por arrastar e crossfade opcional, tudo local.',
    },
    howToTitle: 'Como usar a ferramenta Juntar Áudios',
    howToSteps: [
      'Arraste dois ou mais arquivos MP3, WAV, M4A ou OGG para a área acima.',
      'Arraste as faixas para definir a ordem desejada (ou use as setas para cima e para baixo), ajuste um Crossfade suave se quiser e escolha saída em MP3 ou WAV sem perdas.',
      'Clique em Juntar faixas para combinar tudo no navegador, ouça a prévia unificada e baixe o arquivo final.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Mixagem instantânea via Web Audio',
        body: 'Seu navegador decodifica e combina as faixas diretamente na memória, sem precisar subir vários arquivos de podcast ou música.',
      },
      {
        title: 'Crossfade suave de potência constante',
        body: 'Conecte transições entre faixas sem silêncios secos nem quedas de volume usando curvas de crossfade de potência constante.',
      },
      {
        title: 'Áudios confidenciais permanecem privados',
        body: 'Una episódios de podcast, locuções ou entrevistas gravadas sem expor faixas brutas a servidores de terceiros.',
      },
    ],
    aboutTitle: 'Sobre juntar arquivos de áudio de formatos diferentes',
    aboutParagraphs: [
      'Unir clipes de origens variadas costuma falhar quando uma faixa é uma gravação de voz M4A em 48 kHz e outra é uma vinheta MP3 ou WAV em 44,1 kHz. O OMECY normaliza automaticamente a taxa de amostragem e os canais estéreo pelo OfflineAudioContext do navegador antes de emendar as faixas.',
      'Quando o crossfade está ativado, o OMECY sobrepõe o final de cada clipe ao início do próximo usando curvas cosseno/seno de potência constante. Ao contrário de transições lineares que parecem baixar o volume bem no meio, a curva de potência constante mantém a intensidade percebida uniforme durante toda a passagem.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Posso juntar formatos diferentes como MP3, WAV e M4A no mesmo arquivo?',
        answer:
          'Sim. O OMECY decodifica cada faixa em buffers de áudio puros, nivela automaticamente a taxa de amostragem e exporta um único arquivo MP3 ou WAV limpo.',
      },
      {
        question: 'Como altero a ordem das faixas de áudio?',
        answer:
          'Arraste qualquer cartão de faixa para cima ou para baixo na lista, ou clique nos botões Mover faixa para cima e Mover faixa para baixo antes de juntar.',
      },
      {
        question: 'Minhas faixas de áudio são enviadas para algum servidor?',
        answer:
          'Não. Decodificação, crossfade e exportação em MP3 ou WAV acontecem 100% localmente dentro da aba do navegador.',
      },
      {
        question: 'Devo exportar em MP3 ou WAV?',
        answer:
          'Escolha MP3 (192–320 kbps) para podcasts, playlists e compilações leves prontas para compartilhar, ou WAV se pretende abrir o arquivo unido em outro editor de áudio sem compressão extra.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'mp3-cutter': {
    name: 'Cortador de MP3 e Áudio',
    shortName: 'Cortador de MP3',
    cardDesc: 'Corte trechos de MP3 e áudio visualmente na forma de onda com fade-in e fade-out.',
    meta: {
      title: 'Cortador de MP3 e Áudio – Onda Visual Grátis | OMECY',
      description:
        'Corte arquivos MP3, WAV e M4A com precisão em uma onda sonora interativa, com fade-in, fade-out e prévia. Grátis, rápido e sem enviar arquivos.',
      h1: 'Cortador de MP3 e Áudio',
      subtitle:
        'Corte visualmente clipes MP3, WAV e M4A em uma forma de onda nítida com fade-in e fade-out suaves, processado 100% localmente.',
    },
    howToTitle: 'Como usar o Cortador de MP3 e Áudio',
    howToSteps: [
      'Arraste um arquivo MP3, WAV, M4A ou OGG para a caixa acima para exibir sua forma de onda interativa na hora.',
      'Ajuste os controles de Tempo inicial e Tempo final para marcar o trecho, adicione Fade-in ou Fade-out se desejar e clique em Ouvir seleção.',
      'Escolha saída em MP3 ou WAV sem perda, clique em Cortar e exportar e baixe seu clipe finalizado imediatamente.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Forma de onda instantânea na tela',
        body: 'Enxergue pausas, batidas e entradas de fala na hora sem precisar subir seu arquivo de áudio antes.',
      },
      {
        title: 'Fade-in e fade-out integrados',
        body: 'Elimine estalos secos ou cortes bruscos em toques de celular, vinhetas de podcast e efeitos sonoros com rampas suaves de volume.',
      },
      {
        title: 'Privacidade 100% no navegador',
        body: 'Gravações pessoais, demos musicais e áudios de voz nunca saem do seu computador ou celular.',
      },
    ],
    aboutTitle: 'Sobre cortes precisos de áudio e criação de toques',
    aboutParagraphs: [
      'Fazer um corte limpo exige ver onde o volume sobe e cai, em vez de chutar segundos no escuro. Ao desenhar as barras de pico diretamente a partir dos dados PCM decodificados, o OMECY ajuda você a isolar refrões, remover pausas longas no início de uma gravação ou montar toques personalizados em segundos.',
      'Aplicar até mesmo um fade-in e fade-out sutis de 0,5 segundo evita os cliques digitais causados quando uma onda sonora é interrompida longe do ponto zero de amplitude, deixando o corte com acabamento limpo e profissional.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Posso ouvir o trecho cortado antes de baixar?',
        answer:
          'Sim. Clique em Ouvir seleção para escutar o intervalo exato — já com os efeitos de fade-in e fade-out — antes de exportar.',
      },
      {
        question: 'O cortador funciona com arquivos WAV e M4A também?',
        answer:
          'Sim. Você pode cortar arquivos MP3, WAV, M4A, OGG e FLAC aceitos pelo navegador e exportar o resultado em MP3 ou WAV.',
      },
      {
        question: 'Meus arquivos de áudio são enviados para um servidor remoto?',
        answer:
          'Nunca. A leitura da onda, o corte, os fades e a codificação MP3 rodam inteiramente na memória local do seu navegador.',
      },
      {
        question: 'Posso criar um toque para celular com esta ferramenta?',
        answer:
          'Sim. Selecione um destaque de 20 a 30 segundos da sua música, aplique um fade-out suave no final e exporte em MP3 pronto para Android ou apps de toque.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'wav-to-mp3': {
    name: 'Conversor de WAV para MP3',
    shortName: 'WAV para MP3',
    cardDesc: 'Converta arquivos WAV pesados sem compressão em áudio MP3 leve de 128 a 320 kbps.',
    meta: {
      title: 'Converter WAV para MP3 – Áudio Leve e Privado | OMECY',
      description:
        'Converta arquivos WAV pesados sem compressão em MP3 de 128 a 320 kbps direto no navegador. Conversão em lote grátis, rápida e sem envios.',
      h1: 'Conversor de WAV para MP3',
      subtitle:
        'Transforme gravações WAV sem compressão em arquivos MP3 leves e universais em lote — 100% localmente no navegador.',
    },
    howToTitle: 'Como usar o Conversor de WAV para MP3',
    howToSteps: [
      'Arraste um ou vários arquivos .wav para a área superior.',
      'Escolha a taxa de bits MP3 desejada (128, 192, 256 ou 320 kbps) conforme priorize menor tamanho ou máximo detalhamento musical.',
      'Clique em Converter, confira a economia de espaço em cada faixa e baixe os MP3 individualmente ou tudo em um único ZIP.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Evite enviar arquivos WAV gigantes',
        body: 'Um WAV estéreo sem compressão ocupa cerca de 10 MB por minuto. A conversão local termina antes mesmo de um upload comum chegar a 20%.',
      },
      {
        title: 'Proteja faixas inéditas de estúdio',
        body: 'Músicos, dubladores e podcasters podem converter masters em lote sem colocar áudio inédito em servidores de terceiros.',
      },
      {
        title: 'Conversão em lote com ZIP instantâneo',
        body: 'Solte uma pasta inteira de arquivos WAV e baixe todos os MP3 convertidos organizados em um único pacote ZIP.',
      },
    ],
    aboutTitle: 'WAV sem compressão versus áudio MP3 portátil',
    aboutParagraphs: [
      'O formato WAV (Waveform Audio File Format) armazena amostras de áudio PCM puras, sem compressão. Uma gravação estéreo padrão de qualidade CD (44,1 kHz, 16 bits) consome cerca de 1.411 kbps — aproximadamente 50 MB para uma música de cinco minutos. Ele é excelente para edição em DAWs, mas pesado demais para e-mail, streaming web ou bibliotecas portáteis.',
      'O MP3 utiliza compressão psicoacústica para descartar frequências sutis encobertas por sons mais altos que o ouvido humano raramente percebe. Converter WAV para MP3 em 192 kbps ou 320 kbps costuma cortar de 75% a 90% do peso preservando reprodução limpa em praticamente qualquer aparelho.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Quanto menor fica um MP3 em relação a um arquivo WAV?',
        answer:
          'Um MP3 em 192 kbps costuma ser cerca de 85% menor que um WAV estéreo padrão de 16 bits, enquanto um MP3 de 320 kbps reduz o peso em torno de 75%.',
      },
      {
        question: 'Posso converter vários arquivos WAV para MP3 de uma vez?',
        answer:
          'Sim. Arraste múltiplos arquivos WAV juntos, converta todo o lote em um clique e baixe cada faixa ou clique em Baixar tudo (ZIP).',
      },
      {
        question: 'Minhas gravações WAV são enviadas para um servidor?',
        answer:
          'Não. A conversão roda dentro do navegador com decodificação nativa Web Audio e um codificador MP3 local em JavaScript/WebAssembly.',
      },
      {
        question: 'Qual taxa de bits é melhor para música versus voz falada?',
        answer:
          'Use 128 kbps para voz e gravações faladas, 192 kbps para podcasts e uso geral, e 256–320 kbps para lançamentos musicais e prévias de masterização.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'm4a-to-mp3': {
    name: 'Conversor de M4A para MP3',
    shortName: 'M4A para MP3',
    cardDesc: 'Converta áudios do Gravador do iPhone e arquivos M4A da Apple em MP3 universais.',
    meta: {
      title: 'Converter M4A para MP3 – Áudios iPhone Grátis | OMECY',
      description:
        'Converta gravações M4A da Apple e áudios do iPhone para MP3 universal direto no navegador. Grátis, instantâneo, em lote e sem enviar arquivos.',
      h1: 'Conversor de M4A para MP3',
      subtitle:
        'Converta gravações do Gravador do iPhone, áudios do macOS e arquivos Apple M4A em MP3 universais direto no navegador.',
    },
    howToTitle: 'Como usar o Conversor de M4A para MP3',
    howToSteps: [
      'Arraste um ou mais arquivos .m4a ou .aac (como gravações do iPhone) para a área superior.',
      'Escolha a taxa de bits de saída em MP3 — 128 kbps deixa a voz bem nítida, enquanto 192–320 kbps é ideal para faixas musicais.',
      'Clique em Converter para processar tudo localmente, ouça a prévia e baixe cada MP3 ou o lote em ZIP.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Suas gravações de voz ficam privadas',
        body: 'Lembretes pessoais, anotações de reuniões e entrevistas permanecem no seu dispositivo sem passar por sites desconhecidos.',
      },
      {
        title: 'Decodificação nativa super rápida',
        body: 'Navegadores modernos decodificam AAC/M4A nativamente em alta velocidade, convertendo minutos de fala em MP3 em poucos segundos.',
      },
      {
        title: 'Funciona em qualquer lugar sem instalar apps',
        body: 'Dispensa iTunes, programas de desktop ou utilitários pagos — converta direto no Chrome, Safari, Edge ou Firefox.',
      },
    ],
    aboutTitle: 'Sobre arquivos Apple M4A e compatibilidade universal com MP3',
    aboutParagraphs: [
      'Os aparelhos da Apple — como o app Gravador no iPhone e iPad, QuickTime e GarageBand — salvam áudios por padrão no contêiner .m4a (MPEG-4 Audio), geralmente com codificação AAC ou ALAC. Embora o M4A entregue boa eficiência dentro do ecossistema Apple, muitos programas no Windows, sons automotivos, plataformas de transcrição e formulários online exigem arquivos .mp3.',
      'Converter M4A para MP3 garante que sua gravação toque sem alertas de codec em qualquer computador, celular Android, apresentação de slides ou player de áudio, mantendo seus arquivos pessoais totalmente offline e sob seu controle.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Funciona com arquivos do Gravador do iPhone (.m4a)?',
        answer:
          'Sim. Compartilhe ou envie via AirDrop a gravação do iPhone para o seu dispositivo, arraste o arquivo .m4a para o OMECY e converta em MP3 padrão em segundos.',
      },
      {
        question: 'Minhas gravações de voz são enviadas para algum servidor?',
        answer:
          'Não. Toda a decodificação e codificação em MP3 acontece exclusivamente dentro da sua aba local, sem transmissões pela rede.',
      },
      {
        question: 'Posso converter vários arquivos M4A em lote?',
        answer:
          'Sim. Selecione ou arraste vários arquivos M4A juntos e baixe todas as faixas MP3 separadamente ou reunidas em um único arquivo ZIP.',
      },
      {
        question: 'Qual taxa de bits devo escolher para gravações de voz M4A?',
        answer:
          '128 kbps ou 192 kbps mantêm toda a clareza vocal captada pelo microfone do iPhone com arquivos bem leves para compartilhar.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'image-compressor': {
    name: 'Compressor de Imagens',
    shortName: 'Compressor de Imagens',
    cardDesc: 'Comprima fotos JPG, PNG e WebP em lote no navegador com ajuste de qualidade e ZIP.',
    meta: {
      title: 'Compressor de Imagens – JPG, PNG e WebP Grátis | OMECY',
      description:
        'Comprima fotos JPG, PNG e WebP em lote no seu navegador com ajuste de qualidade e download em ZIP. Grátis, instantâneo e sem enviar arquivos.',
      h1: 'Compressor de Imagens Online',
      subtitle:
        'Reduza o tamanho de fotos JPG, PNG e WebP em lote direto no navegador com estatísticas de economia na hora e zero envios.',
    },
    howToTitle: 'Como usar o Compressor de Imagens',
    howToSteps: [
      'Arraste uma ou dezenas de imagens JPG, PNG ou WebP para a caixa acima.',
      'Ajuste o controle de Qualidade (75% a 85% costuma ser o equilíbrio ideal para fotos nítidas com uma fração do peso original).',
      'Clique em Comprimir para otimizar todas localmente, veja a redução exata de tamanho e baixe uma a uma ou em ZIP.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Fotos pessoais nunca saem do aparelho',
        body: 'Arquivos de clientes, fotos de família e documentos digitalizados permanecem restritos à aba do seu navegador.',
      },
      {
        title: 'Milissegundos em vez de filas de upload',
        body: 'A otimização local via Canvas roda na hora no seu equipamento, sem esperas em servidores nem limite de quantidade por lote.',
      },
      {
        title: 'Ideal para sites mais rápidos e Core Web Vitals',
        body: 'Imagens leves aceleram o Largest Contentful Paint (LCP), reduzem anexos de e-mail e economizam internet móvel.',
      },
    ],
    aboutTitle: 'Sobre otimizar imagens JPG, PNG e WebP sem perder nitidez',
    aboutParagraphs: [
      'Fotos tiradas diretamente da câmera e exportações de design costumam pesar de 3 a 10 MB cada, deixando sites lentos e esbarrando nos limites de formulários. A compressão inteligente remove variações redundantes de cor quase imperceptíveis ao olho humano, mantendo bordas, texturas e tipografia bem definidos.',
      'Em fotografias, JPG e WebP com qualidade entre 75% e 85% costumam cortar de 60% a 80% do tamanho com fidelidade visual praticamente idêntica. Em capturas de tela e gráficos de interface em PNG, a recodificação enxuga excessos mantendo linhas bem nítidas.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Quais formatos de imagem posso comprimir?',
        answer:
          'O OMECY comprime imagens JPG/JPEG, PNG e WebP diretamente no navegador, preservando o formato de cada arquivo enquanto reduz seu peso.',
      },
      {
        question: 'Posso comprimir várias fotos ao mesmo tempo?',
        answer:
          'Sim. Arraste várias imagens de uma só vez, confira o total de megabytes economizados e baixe todas juntas em um único arquivo ZIP.',
      },
      {
        question: 'Minhas imagens são enviadas para algum servidor?',
        answer:
          'Não. A compressão roda localmente usando o Canvas do navegador e JavaScript no cliente — nenhum dado sai pela rede.',
      },
      {
        question: 'Qual nível de qualidade dá o melhor equilíbrio entre nitidez e peso?',
        answer:
          'Ajustar a qualidade entre 75% e 82% geralmente proporciona uma queda expressiva no tamanho mantendo fotos nítidas para sites, blogs e e-mail.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'webp-to-jpg': {
    name: 'Conversor de WebP para JPG',
    shortName: 'WebP para JPG',
    cardDesc: 'Converta imagens WebP salvas da web em fotos JPG universais com fundo personalizável.',
    meta: {
      title: 'Converter WebP para JPG – Fotos em Lote Grátis | OMECY',
      description:
        'Converta imagens WebP em fotos JPG universais em lote com preenchimento de fundo e controle de qualidade. Grátis, rápido e sem enviar arquivos.',
      h1: 'Conversor de WebP para JPG',
      subtitle:
        'Converta arquivos WebP salvos da internet em imagens JPG aceitas em qualquer lugar, em lote e com cor de fundo personalizada, 100% local.',
    },
    howToTitle: 'Como usar o Conversor de WebP para JPG',
    howToSteps: [
      'Arraste uma ou várias imagens .webp para a caixa acima.',
      'Defina a qualidade de saída do JPG e escolha a cor de preenchimento (branco puro por padrão) para áreas transparentes dos seus arquivos WebP.',
      'Clique em Converter e salve os arquivos individualmente ou baixe o lote completo em um único arquivo ZIP.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Conversão instantânea via Canvas',
        body: 'Como o navegador já renderiza WebP nativamente, converter dezenas de imagens para JPG leva apenas uma fração de segundo no seu dispositivo.',
      },
      {
        title: 'Tratamento limpo da transparência',
        body: 'Em vez de caixas pretas atrás de figurinhas ou recortes de produtos transparentes, o OMECY preenche o fundo com branco ou a cor escolhida.',
      },
      {
        title: 'Zero envios e exportação em lote ZIP',
        body: 'Converta quantos gráficos ou fotos de catálogo precisar sem enviar nenhuma imagem para servidores externos.',
      },
    ],
    aboutTitle: 'Imagens WebP da web versus compatibilidade universal do JPG',
    aboutParagraphs: [
      'O formato WebP foi desenvolvido pelo Google para entregar imagens mais leves na web moderna, e é por isso que salvar uma foto pelo Chrome, Edge ou Safari resulta cada vez mais em arquivos .webp. Porém, muitos visualizadores de fotos, versões antigas de editores, totens de impressão, marketplaces e pacotes de escritório ainda exigem especificamente arquivos .jpg.',
      'Como o formato JPG não suporta canal alfa de transparência, converter um WebP transparente requer achatá-lo sobre uma cor sólida de fundo. O OMECY permite definir essa cor de preenchimento (branco por padrão) e ajustar a qualidade exata do JPG antes de exportar.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'O que acontece com áreas transparentes ao converter WebP para JPG?',
        answer:
          'Como o JPG não aceita transparência, o OMECY preenche os pixels transparentes com branco puro (#FFFFFF) por padrão — ou qualquer cor hexadecimal que você escolher.',
      },
      {
        question: 'Posso converter um lote de imagens WebP para JPG de uma só vez?',
        answer:
          'Sim. Arraste vários arquivos WebP juntos, converta todos com um clique e baixe individualmente ou em um único pacote ZIP.',
      },
      {
        question: 'Minhas imagens WebP são enviadas para algum servidor?',
        answer:
          'Não. Tudo é processado localmente no navegador usando a API HTML5 Canvas, garantindo que suas imagens nunca saiam do dispositivo.',
      },
      {
        question: 'Converter WebP para JPG muda as dimensões da imagem?',
        answer:
          'Não. O JPG gerado preserva exatamente a largura e a altura originais em pixels do arquivo WebP.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'heic-to-jpg': {
    name: 'Conversor de HEIC para JPG',
    shortName: 'HEIC para JPG',
    cardDesc: 'Converta fotos HEIC do iPhone e iOS em JPG padrão com total privacidade no aparelho.',
    meta: {
      title: 'Converter HEIC para JPG – Fotos iPhone Privadas | OMECY',
      description:
        'Converta fotos HEIC do iPhone e iOS para JPG padrão direto no seu dispositivo, sem enviar fotos pessoais a servidores. Grátis e 100% privado.',
      h1: 'Conversor de HEIC para JPG',
      subtitle:
        'Converta fotos HEIC do iPhone e iPad em imagens JPG universais diretamente no seu aparelho — sem enviar suas fotos.',
    },
    howToTitle: 'Como usar o Conversor de HEIC para JPG',
    howToSteps: [
      'Arraste uma ou mais fotos .heic ou .heif do iPhone para o conversor acima.',
      'Selecione o nível de qualidade JPG desejado (90% preserva a nitidez da câmera mantendo arquivos bem equilibrados).',
      'Clique em Converter para decodificar localmente no navegador e salve cada foto JPG ou clique em Baixar tudo (ZIP).',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Sua galeria continua privada',
        body: 'Fotos de família, álbuns de viagem e imagens de documentos não deveriam passar por sites desconhecidos apenas para trocar de formato.',
      },
      {
        title: 'Sem instalar codecs extras no Windows',
        body: 'Abra e converta arquivos HEIC da Apple direto no Chrome, Edge ou Firefox sem precisar comprar extensões na loja do Windows.',
      },
      {
        title: 'Conversão em lote com download ZIP',
        body: 'Solte um álbum inteiro de fotos do iPhone e baixe todos os JPG convertidos juntos em um único clique.',
      },
    ],
    aboutTitle: 'Fotos HEIC do iPhone e por que o JPG ainda é essencial',
    aboutParagraphs: [
      'Desde o iOS 11, iPhones e iPads fotografam por padrão no formato HEIC (High Efficiency Image Container), baseado no padrão HEVC. O HEIC entrega ótima nitidez ocupando cerca de metade do espaço de um JPEG tradicional, economizando memória preciosa no celular.',
      'Mesmo assim, PCs com Windows, apps no Android, portais de vagas, sistemas governamentais e vários gerenciadores de conteúdo ainda não abrem nem aceitam .heic. O OMECY carrega um decodificador HEIC local apenas na hora da conversão, gerando fotos JPG compatíveis com tudo sem abrir mão da sua privacidade.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Minhas fotos HEIC do iPhone são enviadas para um servidor na conversão?',
        answer:
          'Nunca. O OMECY decodifica imagens HEIC estritamente na memória do navegador, no seu próprio aparelho, sem tráfego de envio pela rede.',
      },
      {
        question: 'Funciona no Windows 10 e Windows 11 sem instalar codecs?',
        answer:
          'Sim. Como a decodificação roda no navegador via JavaScript e WebAssembly, você não precisa de nenhuma extensão paga HEVC ou HEIF do Windows.',
      },
      {
        question: 'Posso converter dezenas de fotos HEIC de uma vez?',
        answer:
          'Sim. Arraste vários arquivos .heic simultaneamente e exporte cada JPG separado ou todos reunidos em um único download ZIP.',
      },
      {
        question: 'Por que cada foto HEIC em alta resolução leva alguns instantes?',
        answer:
          'Fotos modernas de iPhone têm de 12 MP a 48 MP e exigem decodificação HEVC completa no navegador. Rodar tudo localmente protege sua privacidade e conclui em poucos segundos.',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },

  'image-resizer': {
    name: 'Redimensionador de Imagens',
    shortName: 'Redimensionar Imagem',
    cardDesc: 'Redimensione fotos por pixels exatos, porcentagem ou redes sociais com proporção travada.',
    meta: {
      title: 'Redimensionar Imagens – Pixels e Redes Grátis | OMECY',
      description:
        'Redimensione fotos JPG, PNG e WebP por pixels exatos, porcentagem ou predefinições para redes sociais no navegador. Grátis e sem enviar nada.',
      h1: 'Redimensionador de Imagens Online',
      subtitle:
        'Altere o tamanho de imagens JPG, PNG e WebP por pixels exatos, porcentagem ou predefinições de redes sociais — 100% no navegador.',
    },
    howToTitle: 'Como usar o Redimensionador de Imagens',
    howToSteps: [
      'Arraste uma imagem JPG, PNG ou WebP para a caixa acima para visualizar suas dimensões originais em pixels.',
      'Digite Largura e Altura em pixels (com Manter proporção ligado ou desligado), mude para Porcentagem ou escolha uma predefinição pronta para web e redes sociais.',
      'Selecione o formato de saída JPG, PNG ou WebP, clique em Redimensionar imagem, confira o resultado e baixe imediatamente.',
    ],
    whyLocalTitle: 'Por que processar arquivos localmente no OMECY?',
    whyLocalPoints: [
      {
        title: 'Reamostragem local de alta qualidade',
        body: 'Usa redimensionamento suave de alta precisão via Canvas no navegador para manter contornos limpos e nítidos.',
      },
      {
        title: 'Tamanhos prontos para redes sociais',
        body: 'Aplique em um clique medidas para Instagram Quadrado (1080×1080), Retrato (1080×1350), Miniaturas do YouTube (1280×720) ou banners Open Graph (1200×630).',
      },
      {
        title: 'Privado, imediato e sem cadastro',
        body: 'Redimensione fotos de perfil, catálogos de produtos e imagens de blog sem enviar uma única foto para a internet.',
      },
    ],
    aboutTitle: 'Sobre redimensionar imagens para sites e redes sociais',
    aboutParagraphs: [
      'Publicar fotos gigantes de 4000 pixels no topo de um blog ou em um perfil social desperdiça banda e faz as plataformas aplicarem recompressões imprevisíveis no servidor. Ajustar a imagem para as dimensões exatas antes de publicar mantém textos, logotipos e retratos visivelmente mais nítidos.',
      'Manter a opção Manter proporção ativada evita distorções ou achatamentos acidentais sempre que você altera a largura ou a altura. Você também pode trocar o formato na hora — por exemplo, transformando uma captura PNG pesada em um WebP ou JPG leve pronto para publicação rápida.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        question: 'Como redimensionar uma imagem sem distorcer ou esticar?',
        answer:
          'Deixe Manter proporção marcado ao informar Largura ou Altura — ou use o modo Porcentagem — para escalar ambos os lados igualmente.',
      },
      {
        question: 'Posso mudar o formato do arquivo ao redimensionar?',
        answer:
          'Sim. Você pode exportar a imagem redimensionada em JPG, PNG ou WebP e ajustar a qualidade para arquivos JPG e WebP.',
      },
      {
        question: 'Minhas fotos são enviadas para algum servidor ao redimensionar?',
        answer:
          'Não. O redimensionamento roda completamente dentro do navegador via HTML5 Canvas, sem nenhum envio de arquivo.',
      },
      {
        question: 'Quais predefinições para redes sociais estão incluídas?',
        answer:
          'O OMECY oferece atalhos de um clique para Instagram Quadrado (1080×1080), Instagram Retrato (1080×1350), Stories/Reels (1080×1920), Miniatura do YouTube (1280×720), Open Graph (1200×630) e Web Full HD (1920×1080).',
      },
    ],
    relatedTitle: 'Outras ferramentas de mídia no OMECY',
  },
};
