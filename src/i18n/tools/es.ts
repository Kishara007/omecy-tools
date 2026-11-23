import type { ToolDictionary } from '../types';

export const toolsEs: ToolDictionary = {
  'video-to-mp3': {
    name: 'Convertidor de Video a MP3',
    shortName: 'Video a MP3',
    cardDesc: 'Extrae audio MP3 nítido de videos MP4, MOV, WebM y MKV localmente en segundos.',
    meta: {
      title: 'Convertir Video a MP3 Online – Audio Privado | OMECY',
      description:
        'Extrae audio MP3 nítido de videos MP4, MOV, WebM y MKV en tu navegador. Elige entre 128 y 320 kbps gratis, al instante y sin subir archivos.',
      h1: 'Convertidor de Video a MP3',
      subtitle:
        'Extrae pistas de audio MP3 limpias desde videos MP4, MOV, WebM y MKV directamente en tu navegador sin subir tus archivos.',
    },
    howToTitle: 'Cómo usar el Convertidor de Video a MP3',
    howToSteps: [
      'Arrastra un video MP4, MOV, WebM o MKV al recuadro superior, o haz clic en Elegir archivo para seleccionarlo desde tu dispositivo.',
      'Elige la tasa de bits de audio MP3 que prefieras: 128 kbps para clips ligeros de voz, 192 kbps para un equilibrio diario o 320 kbps para música con máxima fidelidad.',
      'Haz clic en Extraer audio MP3 para ejecutar la conversión en local, escucha la vista previa y descarga tu archivo MP3 al instante.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Privacidad total sin subir archivos',
        body: 'Clases grabadas, entrevistas confidenciales y videos personales permanecen exclusivamente en tu pestaña del navegador, lejos de servidores externos.',
      },
      {
        title: 'Evita largas subidas de video',
        body: '¿Para qué subir un video de 500 MB por una conexión lenta solo para obtener un MP3 de 5 MB? La extracción local lee directamente desde tu equipo.',
      },
      {
        title: 'Gratis, sin límites diarios ni registro',
        body: 'Convierte todos los videos que necesites sin topes artificiales, sin entregar tu correo y sin instalar programas.',
      },
    ],
    aboutTitle: 'Acerca de extraer audio MP3 desde archivos de video',
    aboutParagraphs: [
      'La mayoría de los archivos de video encapsulan pistas separadas de imagen y sonido dentro de contenedores como MP4, MOV, WebM o MKV. Al extraer el audio a MP3, OMECY descarta los fotogramas de video y codifica únicamente el flujo sonoro con el codificador LAME MP3 en WebAssembly, reduciendo un video de cientos de megabytes a una pista de audio ligera y portátil.',
      'Elegir bien la tasa de bits permite equilibrar claridad y peso. Las grabaciones habladas, seminarios y resúmenes de reuniones suenan nítidos a 128 kbps con un tamaño mínimo. En cambio, videoclips musicales, sesiones acústicas o conciertos agradecen 192 kbps o 320 kbps para conservar los detalles agudos en audífonos y altavoces.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Se suben mis videos a algún servidor al extraer el audio MP3?',
        answer:
          'No. OMECY procesa el video exclusivamente dentro de tu navegador mediante un motor WebAssembly local. Tu archivo jamás sale de tu dispositivo.',
      },
      {
        question: '¿Qué formatos de video puedo convertir a MP3?',
        answer:
          'Puedes extraer el audio de archivos MP4, MOV (iPhone y QuickTime), WebM, MKV, AVI y M4V.',
      },
      {
        question: '¿Qué tasa de bits MP3 me conviene elegir?',
        answer:
          'Usa 128 kbps para pódcasts y grabaciones de voz, 192 kbps para música general y clips cotidianos, o 320 kbps cuando busques la máxima calidad sonora.',
      },
      {
        question: '¿Por qué tarda unos segundos en cargar el motor la primera vez?',
        answer:
          'Para mantener las páginas ligeras, OMECY descarga el motor de audio y video en WebAssembly únicamente cuando inicias tu primera conversión. Después queda en la caché del navegador para las siguientes veces.',
      },
      {
        question: '¿Existe un límite de tamaño de archivo?',
        answer:
          'OMECY no impone topes de servidor. El límite práctico solo depende de la memoria de tu dispositivo; los navegadores de escritorio suelen manejar con soltura videos de varios cientos de megabytes.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'webm-to-mp4': {
    name: 'Convertidor de WebM a MP4',
    shortName: 'WebM a MP4',
    cardDesc: 'Convierte videos WebM de pantalla y navegador en archivos MP4 H.264 universales.',
    meta: {
      title: 'Convertidor de WebM a MP4 – Rápido y Privado | OMECY',
      description:
        'Convierte grabaciones de pantalla WebM y clips web a MP4 H.264 universal directo en tu navegador. Gratis, rápido y privado sin subir nada.',
      h1: 'Convertidor de WebM a MP4',
      subtitle:
        'Transforma grabaciones de pantalla WebM y descargas web en videos MP4 H.264 compatibles con cualquier dispositivo, en local.',
    },
    howToTitle: 'Cómo usar el Convertidor de WebM a MP4',
    howToSteps: [
      'Arrastra tu archivo de video .webm al área superior o pulsa Elegir archivo.',
      'Selecciona el ajuste de calidad: Rápido para compartir al momento, Equilibrado para buena nitidez y peso moderado, o Alta calidad para conservar cada detalle.',
      'Pulsa Convertir, comprueba el resultado en el reproductor integrado y haz clic en Descargar.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Protege tus grabaciones de pantalla',
        body: 'Los reportes de errores, demostraciones internas y capturas del navegador suelen mostrar pestañas privadas; convertir en local las mantiene fuera de servidores externos.',
      },
      {
        title: 'Sin colas en la nube',
        body: 'La conversión arranca de inmediato usando tu propia computadora, sin esperar turno detrás de otros usuarios ni subir archivos pesados.',
      },
      {
        title: 'MP4 limpio y sin marcas de agua',
        body: 'Exporta video H.264 estándar con audio AAC y metadatos de inicio rápido para que el clip se reproduzca al instante en iOS, Windows, macOS y redes sociales.',
      },
    ],
    aboutTitle: 'Compatibilidad entre videos WebM y MP4',
    aboutParagraphs: [
      'WebM es un contenedor abierto muy común en grabadores de pantalla del navegador, extensiones de Chrome, plataformas de videollamadas y aplicaciones web, combinando video VP8, VP9 o AV1 con audio Opus. Aunque los navegadores modernos lo reproducen sin problema, muchos editores de video, presentaciones de PowerPoint, iPhone y aplicaciones de mensajería aún rechazan archivos .webm.',
      'El formato MP4 codificado en H.264 (perfil de color yuv420p) con audio AAC sigue siendo el estándar universal más compatible del mundo. Además, OMECY coloca el bloque de inicio rápido (fast-start) al principio del archivo para que la reproducción por internet comience sin retrasos.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿El MP4 convertido se reproducirá en iPhone, Mac y Windows?',
        answer:
          'Sí. OMECY codifica en H.264 con formato de color yuv420p y audio AAC, compatibles de forma nativa con iOS, QuickTime en macOS, Windows, Android y las principales redes sociales.',
      },
      {
        question: '¿Se sube mi grabación de pantalla al convertir WebM a MP4?',
        answer:
          'Nunca. Cada fotograma se decodifica y recodifica localmente dentro de tu navegador gracias a WebAssembly.',
      },
      {
        question: '¿Qué ajuste de calidad debería elegir?',
        answer:
          'Equilibrado funciona muy bien para la mayoría de las grabaciones. Elige Rápido si priorizas velocidad para enviar un clip por chat, o Alta calidad cuando necesites texto de interfaz muy nítido en tutoriales.',
      },
      {
        question: '¿Se conserva el audio original de mi archivo WebM?',
        answer:
          'Sí. Las pistas de audio Opus o Vorbis contenidas en el archivo WebM se convierten automáticamente a audio estéreo AAC estándar dentro del MP4.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'video-compressor': {
    name: 'Compresor de Video',
    shortName: 'Compresor de Video',
    cardDesc: 'Reduce el peso de videos pesados para WhatsApp, Discord, correo y web sin subirlos.',
    meta: {
      title: 'Compresor de Video – Reducir Tamaño Sin Subir | OMECY',
      description:
        'Reduce el peso de videos MP4, MOV y WebM para WhatsApp, Discord o correo en tu navegador. Compresión local gratis, rápida y sin subir nada.',
      h1: 'Compresor de Video Online',
      subtitle:
        'Reduce el tamaño de videos MP4, MOV y WebM para enviarlos por WhatsApp, Discord, correo electrónico o web — 100 % en tu navegador.',
    },
    howToTitle: 'Cómo usar el Compresor de Video',
    howToSteps: [
      'Arrastra tu video MP4, MOV, WebM o MKV al recuadro del compresor.',
      'Elige un ajuste rápido (WhatsApp, Discord, Correo o Web) o ajusta manualmente el control de Calidad y la Resolución máxima.',
      'Haz clic en Comprimir, compara el peso original con el resultado y descarga tu video MP4 más ligero.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Comprime videos sin enviarlos a internet',
        body: 'Grabaciones pesadas del teléfono y entregables de trabajo permanecen seguros en tu equipo en lugar de subirse a servidores desconocidos.',
      },
      {
        title: 'Pensado para límites reales de envío',
        body: 'Los ajustes de un clic configuran la resolución y la compresión adecuadas para los topes de Discord, WhatsApp y correo electrónico.',
      },
      {
        title: 'Comparativa clara de antes y después',
        body: 'Comprueba al instante los megabytes ahorrados y revisa la nitidez en el reproductor antes de guardar el archivo final.',
      },
    ],
    aboutTitle: 'Cómo funciona la compresión inteligente de video en el navegador',
    aboutParagraphs: [
      'Las cámaras de los teléfonos actuales graban en 4K con tasas de bits elevadas que superan con facilidad los 100 MB por minuto. Sin embargo, servicios como Discord, WhatsApp y los proveedores de correo imponen límites estrictos de tamaño que bloquean los clips sin procesar.',
      'Una compresión eficaz combina dos factores: la codificación H.264 mediante factor de tasa constante (CRF), que ahorra datos en escenas estáticas mientras conserva nitidez en el movimiento, y la reducción proporcional de resolución (por ejemplo, de 4K a 1080p o 720p). Juntos suelen recortar el peso entre un 60 % y un 85 % manteniendo una imagen clara en pantallas de celular y portátil.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Cuánto se reducirá el tamaño de mi video?',
        answer:
          'El ahorro depende de la resolución y la tasa de bits de origen. Los clips grabados con el teléfono suelen reducirse entre un 50 % y un 85 % al usar los ajustes de WhatsApp, Discord o Web.',
      },
      {
        question: '¿Se envían mis videos a la nube durante la compresión?',
        answer:
          'No. Toda la compresión se realiza localmente en tu navegador mediante WebAssembly, de modo que tus videos siguen siendo 100 % privados.',
      },
      {
        question: '¿Qué significa el valor CRF junto al control de calidad?',
        answer:
          'CRF corresponde a Constant Rate Factor (Factor de Tasa Constante). Un valor CRF más bajo mantiene mayor nitidez con un archivo más grande, mientras que un valor más alto genera archivos más compactos para límites estrictos.',
      },
      {
        question: '¿Puedo bajar un video 4K a 1080p o 720p?',
        answer:
          'Sí. Utiliza el selector de Resolución máxima para escalar a 1080p, 720p o 480p conservando automáticamente la relación de aspecto original.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'video-trimmer': {
    name: 'Recortador de Video Online',
    shortName: 'Recortador de Video',
    cardDesc: 'Recorta fragmentos de video con vista previa al instante y copia directa sin pérdida.',
    meta: {
      title: 'Recortador de Video Online – Cortar Sin Subir | OMECY',
      description:
        'Recorta videos MP4, MOV, WebM y MKV directo en tu navegador con vista previa al instante y copia sin pérdida. Gratis y sin subir archivos.',
      h1: 'Recortador de Video Online',
      subtitle:
        'Elimina inicios o finales sobrantes de videos MP4, MOV y WebM directamente en tu navegador sin subir archivos.',
    },
    howToTitle: 'Cómo usar el Recortador de Video Online',
    howToSteps: [
      'Arrastra un video al recortador para cargar una vista previa local instantánea en el reproductor.',
      'Desliza los controles de Tiempo inicial y Tiempo final —o pausa el video y pulsa Usar tiempo actual— para marcar el fragmento exacto que deseas conservar.',
      'Elige Copia rápida sin pérdida para recortar al instante sin recodificar (o Recodificación precisa para cortes exactos al fotograma) y pulsa Recortar y exportar.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Reproducción inmediata sin esperar subidas',
        body: 'Tu navegador abre el archivo local al instante para que puedas desplazarte por grabaciones largas sin esperar barras de carga.',
      },
      {
        title: 'Opción de copia directa sin pérdida',
        body: 'El modo Copia rápida sin pérdida corta sobre los fotogramas clave sin recodificar, conservando el 100 % de la calidad original en cuestión de segundos.',
      },
      {
        title: 'Tus grabaciones sin editar siguen privadas',
        body: 'Recorta capturas de pantalla, recuerdos familiares o reuniones grabadas sin enviar el material completo a servidores externos.',
      },
    ],
    aboutTitle: 'Copia rápida sin pérdida frente a recodificación precisa',
    aboutParagraphs: [
      'Los formatos de video comprimido guardan imágenes completas de referencia llamadas fotogramas clave (keyframes) cada pocos segundos, mientras que los fotogramas intermedios solo registran diferencias. El modo Copia rápida sin pérdida corta directamente en el fotograma clave más cercano sin recomprimir píxeles, lo que ofrece una exportación casi instantánea con idéntica nitidez y tasa de bits.',
      'Cuando necesitas precisión de décimas de segundo entre fotogramas clave —por ejemplo, cortar justo antes de una palabra o un cambio de plano—, activa Recodificación precisa. Este modo decodifica y vuelve a codificar únicamente el rango elegido en un clip MP4 fluido y universal.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Recortar un video reduce su calidad visual?',
        answer:
          'Con el modo Copia rápida sin pérdida no se recodifica nada, por lo que tu clip recortado conserva el 100 % de la calidad original de video y audio.',
      },
      {
        question: '¿Cuándo conviene usar Recodificación precisa en vez de Copia rápida sin pérdida?',
        answer:
          'Utiliza Recodificación precisa si tu punto de inicio cae entre dos fotogramas clave y notas una pequeña pausa o desfase al comienzo de un corte sin pérdida.',
      },
      {
        question: '¿Se sube mi video completo a algún servidor?',
        answer:
          'No. Tanto el reproductor de vista previa como el motor de recorte funcionan por completo dentro de tu navegador sin tráfico de subida.',
      },
      {
        question: '¿Qué formatos de video puedo recortar?',
        answer:
          'Puedes recortar archivos MP4, MOV, WebM y MKV compatibles con tu navegador y FFmpeg WebAssembly.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'audio-joiner': {
    name: 'Unir Audios y Mezclador MP3',
    shortName: 'Unir Audios',
    cardDesc: 'Combina varias pistas MP3, WAV y M4A reordenándolas con fundido cruzado suave.',
    meta: {
      title: 'Unir Audios y MP3 Online – Fundido Suave Gratis | OMECY',
      description:
        'Une varios archivos MP3, WAV y M4A en una sola pista continua con fundido cruzado opcional. Procesamiento local gratis, rápido y sin subidas.',
      h1: 'Unir Audios y Mezclador MP3',
      subtitle:
        'Combina múltiples pistas MP3, WAV o M4A en un solo archivo continuo reordenándolas al arrastrar y añadiendo fundido cruzado en local.',
    },
    howToTitle: 'Cómo usar el Unificador de Audios',
    howToSteps: [
      'Arrastra dos o más archivos MP3, WAV, M4A u OGG a la zona superior.',
      'Arrastra las pistas para establecer el orden deseado (o usa las flechas de subir y bajar), ajusta un Fundido cruzado opcional y elige salida MP3 o WAV sin pérdida.',
      'Pulsa Unir pistas para mezclarlas en tu navegador, escucha la vista previa unificada y descarga tu archivo de audio.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Mezcla instantánea con Web Audio',
        body: 'Tu navegador decodifica y combina las pistas directamente en memoria, sin perder tiempo subiendo varios archivos de pódcast o música.',
      },
      {
        title: 'Fundido cruzado de potencia constante',
        body: 'Enlaza una pista con la siguiente sin cortes bruscos ni caídas de volumen gracias a curvas de fundido cruzado suaves.',
      },
      {
        title: 'Grabaciones confidenciales siempre bajo tu control',
        body: 'Une episodios de pódcast, locuciones o entrevistas grabadas sin enviar audio sin editar a servidores ajenos.',
      },
    ],
    aboutTitle: 'Acerca de unir archivos de audio de distintos formatos',
    aboutParagraphs: [
      'Unir grabaciones de distintas fuentes suele dar problemas cuando una pista es una nota de voz M4A a 48 kHz y otra es una sintonía de entrada en MP3 o WAV a 44,1 kHz. OMECY normaliza automáticamente la frecuencia de muestreo y los canales estéreo mediante el OfflineAudioContext del navegador antes de enlazar las pistas.',
      'Cuando activas el fundido cruzado, OMECY superpone el final de un clip con el inicio del siguiente usando curvas trigonométricas de potencia constante (seno/coseno). A diferencia de un fundido lineal que suele perder volumen justo en el centro, la potencia constante mantiene una sonoridad uniforme durante toda la transición.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Puedo unir distintos formatos como MP3, WAV y M4A a la vez?',
        answer:
          'Sí. OMECY decodifica cada pista a búferes de audio puro, iguala la frecuencia de muestreo automáticamente y exporta un único archivo MP3 o WAV limpio.',
      },
      {
        question: '¿Cómo cambio el orden de las pistas de audio?',
        answer:
          'Arrastra cualquier tarjeta de pista hacia arriba o abajo en la lista, o utiliza los botones de flecha Subir pista y Bajar pista antes de unir.',
      },
      {
        question: '¿Se suben mis archivos de audio a algún servidor?',
        answer:
          'No. La decodificación, el fundido cruzado y la exportación a MP3 o WAV se ejecutan al 100 % dentro de la pestaña de tu navegador.',
      },
      {
        question: '¿Conviene exportar en MP3 o en WAV?',
        answer:
          'Elige MP3 (192–320 kbps) para pódcasts, listas y compilaciones compactas listas para compartir, o WAV si vas a seguir editando el archivo unido en otro programa sin compresión adicional.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'mp3-cutter': {
    name: 'Cortador de MP3 y Audio',
    shortName: 'Cortador de MP3',
    cardDesc: 'Corta clips de MP3 y audio sobre una onda visual con fundido de entrada y salida.',
    meta: {
      title: 'Cortador de MP3 y Audio – Onda Visual Gratis | OMECY',
      description:
        'Corta archivos MP3, WAV y M4A con precisión sobre una onda interactiva, con fundido de entrada y salida. Gratis, rápido y sin subir archivos.',
      h1: 'Cortador de MP3 y Audio',
      subtitle:
        'Recorta visualmente clips MP3, WAV y M4A sobre una forma de onda clara con fundido de entrada y salida, 100 % en local.',
    },
    howToTitle: 'Cómo usar el Cortador de MP3 y Audio',
    howToSteps: [
      'Arrastra un archivo MP3, WAV, M4A u OGG al recuadro superior para generar su forma de onda interactiva al instante.',
      'Ajusta los controles de Tiempo inicial y Tiempo final para seleccionar el fragmento, añade un Fundido de entrada o Fundido de salida opcional y pulsa Escuchar selección.',
      'Elige salida en MP3 o WAV sin pérdida, haz clic en Recortar y exportar y descarga tu clip de audio al momento.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Forma de onda visual al instante',
        body: 'Ubica silencios, compases y entradas de voz de inmediato sin tener que subir el archivo primero.',
      },
      {
        title: 'Fundidos integrados de entrada y salida',
        body: 'Elimina chasquidos y cortes abruptos en tonos de llamada, intros de pódcast o efectos sonoros con rampas de volumen suaves.',
      },
      {
        title: 'Privacidad 100 % en tu navegador',
        body: 'Tus grabaciones personales, maquetas musicales y notas de voz jamás abandonan tu equipo o teléfono.',
      },
    ],
    aboutTitle: 'Recorte preciso de audio y creación de tonos personalizados',
    aboutParagraphs: [
      'Cortar audio con limpieza exige ver dónde sube y baja el volumen en lugar de calcular segundos a ciegas. Al dibujar las barras de amplitud directamente desde los datos PCM decodificados, OMECY te permite aislar un estribillo, quitar pausas incómodas al inicio de una grabación o preparar un tono personalizado en cuestión de segundos.',
      'Aplicar incluso un ligero fundido de entrada y salida de 0,5 segundos evita los clics digitales que aparecen cuando la onda sonora se corta fuera del cruce por cero, logrando un acabado profesional listo para publicar o reproducir.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Puedo escuchar el fragmento recortado antes de descargarlo?',
        answer:
          'Sí. Pulsa Escuchar selección para reproducir el rango exacto —incluidos los fundidos de entrada y salida— antes de exportar.',
      },
      {
        question: '¿El cortador funciona también con archivos WAV y M4A?',
        answer:
          'Sí. Puedes recortar archivos MP3, WAV, M4A, OGG y FLAC compatibles con tu navegador y exportar el resultado en MP3 o WAV.',
      },
      {
        question: '¿Se envían mis archivos de audio a un servidor remoto?',
        answer:
          'Nunca. El análisis de la onda, el recorte, los fundidos y la codificación MP3 se ejecutan localmente en la memoria de tu navegador.',
      },
      {
        question: '¿Sirve para crear un tono de llamada para el teléfono?',
        answer:
          'Sí. Selecciona un tramo de 20 a 30 segundos de tu canción, aplica un fundido de salida suave y expórtalo como MP3 listo para Android o aplicaciones de tonos.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'wav-to-mp3': {
    name: 'Convertidor de WAV a MP3',
    shortName: 'WAV a MP3',
    cardDesc: 'Convierte archivos WAV pesados sin compresión en audio MP3 compacto de 128 a 320 kbps.',
    meta: {
      title: 'Convertir WAV a MP3 – Rápido, Local y Privado | OMECY',
      description:
        'Convierte archivos WAV pesados sin compresión a MP3 de 128 a 320 kbps en tu navegador. Conversión por lotes gratis, rápida y sin subidas.',
      h1: 'Convertidor de WAV a MP3',
      subtitle:
        'Transforma grabaciones WAV sin compresión en archivos MP3 compactos y universales por lotes, 100 % localmente en tu navegador.',
    },
    howToTitle: 'Cómo usar el Convertidor de WAV a MP3',
    howToSteps: [
      'Arrastra uno o varios archivos .wav a la zona superior.',
      'Selecciona la tasa de bits MP3 deseada (128, 192, 256 o 320 kbps) según prefieras el menor peso o la máxima riqueza musical.',
      'Haz clic en Convertir, revisa el porcentaje de espacio ahorrado en cada pista y descarga cada MP3 o todos juntos en un archivo ZIP.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Evita subir archivos WAV enormes',
        body: 'Un WAV estéreo sin compresión ocupa cerca de 10 MB por minuto. La conversión local termina antes de que una subida habitual llegue al 20 %.',
      },
      {
        title: 'Cuida tus pistas de estudio inéditas',
        body: 'Músicos, locutores y podcasters pueden convertir mezclas maestras por lotes sin exponer material inédito en servidores de terceros.',
      },
      {
        title: 'Conversión por lotes y descarga en ZIP',
        body: 'Arrastra una carpeta entera de pistas WAV y guarda todos los MP3 convertidos ordenados dentro de un solo archivo ZIP.',
      },
    ],
    aboutTitle: 'WAV sin compresión frente a audio MP3 portátil',
    aboutParagraphs: [
      'El formato WAV (Waveform Audio File Format) almacena muestras de audio PCM en bruto sin compresión. Una grabación estéreo estándar de calidad CD (44,1 kHz y 16 bits) consume unos 1.411 kbps, cerca de 50 MB por una canción de cinco minutos. Es perfecto para editar en un estudio digital (DAW), pero demasiado pesado para correo, streaming web o reproductores portátiles.',
      'MP3 emplea compresión psicoacústica para eliminar frecuencias sutiles enmascaradas por sonidos más fuertes que el oído humano apenas distingue. Pasar de WAV a MP3 de 192 kbps o 320 kbps suele reducir el peso entre un 75 % y un 90 % manteniendo un sonido limpio en prácticamente cualquier dispositivo.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Cuánto más pequeño es un MP3 en comparación con un WAV?',
        answer:
          'Un MP3 a 192 kbps pesa alrededor de un 85 % menos que un WAV estéreo estándar de 16 bits, mientras que a 320 kbps reduce el tamaño cerca de un 75 %.',
      },
      {
        question: '¿Puedo convertir varios archivos WAV a MP3 al mismo tiempo?',
        answer:
          'Sí. Arrastra múltiples archivos WAV juntos, convierte todo el lote con un clic y descárgalos uno a uno o pulsa Descargar todo (ZIP).',
      },
      {
        question: '¿Se suben mis grabaciones WAV a algún servidor?',
        answer:
          'No. La conversión corre dentro de tu navegador usando decodificación nativa Web Audio y un codificador MP3 local en JavaScript/WebAssembly.',
      },
      {
        question: '¿Qué tasa de bits conviene para música frente a voz hablada?',
        answer:
          'Usa 128 kbps para notas de voz y locuciones, 192 kbps para pódcasts y escucha cotidiana, y 256–320 kbps para lanzamientos musicales y revisiones de mezcla.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'm4a-to-mp3': {
    name: 'Convertidor de M4A a MP3',
    shortName: 'M4A a MP3',
    cardDesc: 'Convierte Notas de Voz de iPhone y archivos Apple M4A en pistas MP3 universales.',
    meta: {
      title: 'Convertir M4A a MP3 Gratis – Notas de iPhone | OMECY',
      description:
        'Convierte audios Apple M4A y notas de voz de iPhone a MP3 universal en tu navegador. Gratis, al instante, por lotes y sin subir archivos.',
      h1: 'Convertidor de M4A a MP3',
      subtitle:
        'Convierte Notas de Voz de iPhone, grabaciones de macOS y audios Apple M4A en archivos MP3 compatibles con todo, en tu navegador.',
    },
    howToTitle: 'Cómo usar el Convertidor de M4A a MP3',
    howToSteps: [
      'Arrastra uno o más archivos .m4a o .aac (como Notas de Voz del iPhone) al recuadro superior.',
      'Elige la tasa de bits de salida en MP3: 128 kbps ofrece gran claridad para notas de voz, mientras que 192–320 kbps resulta ideal para música.',
      'Pulsa Convertir para procesar cada archivo localmente, escucha la vista previa y descarga cada MP3 o un paquete ZIP completo.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Tus notas de voz siempre privadas',
        body: 'Recordatorios personales, entrevistas y apuntes de reuniones permanecen en tu dispositivo sin pasar por convertidores desconocidos.',
      },
      {
        title: 'Decodificación nativa ultrarrápida',
        body: 'Los navegadores actuales decodifican AAC/M4A de forma nativa a gran velocidad, pasando minutos de grabación a MP3 en segundos.',
      },
      {
        title: 'Sin instalar programas ni iTunes',
        body: 'No hace falta instalar software de escritorio ni utilidades de pago: convierte directamente desde Chrome, Safari, Edge o Firefox.',
      },
    ],
    aboutTitle: 'Archivos Apple M4A y compatibilidad universal con MP3',
    aboutParagraphs: [
      'Los dispositivos Apple —como Notas de Voz en iPhone, iPad, QuickTime y GarageBand— guardan el audio por defecto en el contenedor .m4a (MPEG-4 Audio), normalmente codificado en AAC o ALAC. Aunque M4A funciona muy bien dentro del ecosistema Apple, muchas aplicaciones de Windows, estéreos de auto, servicios de transcripción y formularios web exigen estrictamente archivos .mp3.',
      'Convertir M4A a MP3 garantiza que tu grabación suene sin avisos de códec en cualquier computadora, teléfono Android, diapositiva o reproductor de audio, manteniendo tus grabaciones personales por completo en local y bajo tu control.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Funciona con las Notas de Voz grabadas en iPhone (.m4a)?',
        answer:
          'Sí. Comparte o envía por AirDrop tu Nota de Voz desde el iPhone, arrastra el archivo .m4a a OMECY y conviértelo a MP3 estándar en segundos.',
      },
      {
        question: '¿Mis grabaciones de voz se suben a algún lugar?',
        answer:
          'No. Tanto la decodificación como la codificación a MP3 ocurren estrictamente dentro de tu pestaña local sin transmisiones a servidores.',
      },
      {
        question: '¿Puedo convertir varios archivos M4A por lotes?',
        answer:
          'Sí. Selecciona o arrastra varios archivos M4A juntos y descarga todos los MP3 por separado o reunidos en un único archivo ZIP.',
      },
      {
        question: '¿Qué tasa de bits recomiendo para notas de voz M4A?',
        answer:
          'Con 128 kbps o 192 kbps conservarás toda la nitidez vocal del micrófono del iPhone con un peso muy ligero para compartir fácilmente.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'image-compressor': {
    name: 'Compresor de Imágenes',
    shortName: 'Compresor de Imágenes',
    cardDesc: 'Comprime fotos JPG, PNG y WebP por lotes en local con control de calidad y descarga ZIP.',
    meta: {
      title: 'Compresor de Imágenes – JPG, PNG y WebP Local | OMECY',
      description:
        'Comprime fotos JPG, PNG y WebP por lotes en tu navegador con control de calidad y descarga en ZIP. Gratis, instantáneo y sin subir archivos.',
      h1: 'Compresor de Imágenes Online',
      subtitle:
        'Reduce el peso de fotos JPG, PNG y WebP por lotes en tu navegador con estadísticas de ahorro al instante y cero subidas.',
    },
    howToTitle: 'Cómo usar el Compresor de Imágenes',
    howToSteps: [
      'Arrastra una o decenas de imágenes JPG, PNG o WebP a la zona superior.',
      'Ajusta el deslizador de Calidad (entre 75 % y 85 % suele ser el punto óptimo para fotos nítidas con una fracción del peso original).',
      'Pulsa Comprimir para optimizar cada foto en local, revisa el ahorro exacto y descarga los archivos uno por uno o en un paquete ZIP.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Tus fotos privadas nunca salen del equipo',
        body: 'Material de clientes, retratos familiares y documentos escaneados permanecen estrictamente dentro de la pestaña de tu navegador.',
      },
      {
        title: 'Milisegundos en vez de barras de subida',
        body: 'La optimización local con Canvas actúa al instante en tu computadora, sin colas de espera ni límites de cantidad por lote.',
      },
      {
        title: 'Ideal para sitios web rápidos y Core Web Vitals',
        body: 'Las imágenes ligeras aceleran el Largest Contentful Paint (LCP), reducen adjuntos de correo y ahorran datos móviles.',
      },
    ],
    aboutTitle: 'Cómo optimizar imágenes JPG, PNG y WebP sin perder nitidez',
    aboutParagraphs: [
      'Las fotografías recién salidas de la cámara y las exportaciones de diseño suelen pesar entre 3 y 10 MB cada una, ralentizando páginas web y topándose con límites de formularios. La compresión inteligente elimina variaciones redundantes de color imperceptibles para el ojo humano mientras mantiene definidos bordes, texturas y textos.',
      'En fotografías, los formatos JPG y WebP entre el 75 % y el 85 % de calidad reducen con facilidad el peso entre un 60 % y un 80 % con una apariencia prácticamente idéntica. En capturas de pantalla y gráficos PNG, una recodificación cuidada recorta peso innecesario preservando líneas nítidas.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Qué formatos de imagen puedo comprimir?',
        answer:
          'OMECY comprime imágenes JPG/JPEG, PNG y WebP directamente en tu navegador, manteniendo el formato de cada archivo mientras reduce su tamaño.',
      },
      {
        question: '¿Puedo comprimir varias fotos a la vez?',
        answer:
          'Sí. Arrastra decenas de fotos juntas, consulta el total de megabytes ahorrados y descarga todas las imágenes comprimidas en un solo archivo ZIP.',
      },
      {
        question: '¿Se suben mis imágenes a algún servidor?',
        answer:
          'No. La compresión se ejecuta en local con la API Canvas del navegador y JavaScript del lado cliente; nada viaja por la red.',
      },
      {
        question: '¿Qué nivel de calidad ofrece el mejor equilibrio entre nitidez y peso?',
        answer:
          'Un valor de calidad entre el 75 % y el 82 % suele lograr reducciones muy notables conservando una excelente nitidez para sitios web, blogs y correo.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'webp-to-jpg': {
    name: 'Convertidor de WebP a JPG',
    shortName: 'WebP a JPG',
    cardDesc: 'Convierte imágenes WebP descargadas de la web en fotos JPG universales con relleno de fondo.',
    meta: {
      title: 'Convertir WebP a JPG – Fotos por Lotes Gratis | OMECY',
      description:
        'Convierte imágenes WebP en archivos JPG universales por lotes con relleno de transparencia y calidad ajustable. Gratis y sin subir archivos.',
      h1: 'Convertidor de WebP a JPG',
      subtitle:
        'Convierte archivos WebP guardados de internet en imágenes JPG universales por lotes con relleno de transparencia, 100 % en local.',
    },
    howToTitle: 'Cómo usar el Convertidor de WebP a JPG',
    howToSteps: [
      'Arrastra una o varias imágenes .webp al recuadro superior.',
      'Define la calidad de salida en JPG y elige un color de fondo (blanco puro por defecto) para las zonas transparentes de tus imágenes WebP.',
      'Pulsa Convertir y guarda los JPG de forma individual o descarga el lote entero en un único archivo ZIP.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Conversión instantánea con Canvas',
        body: 'Como tu navegador renderiza WebP de forma nativa, transformar decenas de imágenes a JPG toma apenas una fracción de segundo en local.',
      },
      {
        title: 'Tratamiento limpio de la transparencia',
        body: 'En lugar de fondos negros molestos detrás de recortes o stickers transparentes, OMECY rellena el fondo con blanco o el color que elijas.',
      },
      {
        title: 'Cero subidas y descarga en ZIP',
        body: 'Convierte todos los gráficos o fotos de producto que necesites sin enviar archivos a servidores externos.',
      },
    ],
    aboutTitle: 'Imágenes WebP de la web frente a la compatibilidad universal de JPG',
    aboutParagraphs: [
      'Google creó WebP para servir imágenes más livianas en sitios web modernos, por lo que al guardar una foto desde Chrome, Edge o Safari es cada vez más frecuente obtener un archivo .webp. Sin embargo, muchos visores de escritorio, versiones antiguas de editores, kioscos de impresión, tiendas en línea y programas de oficina siguen pidiendo archivos .jpg.',
      'Dado que el formato JPG no admite canal alfa de transparencia, convertir un WebP transparente implica acoplarlo sobre un fondo sólido. OMECY te deja elegir ese color de relleno (blanco por defecto) y ajustar la calidad exacta del JPG antes de exportar.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Qué ocurre con las zonas transparentes al pasar de WebP a JPG?',
        answer:
          'Como JPG no admite transparencia, OMECY rellena los píxeles transparentes con blanco puro (#FFFFFF) de forma predeterminada, o con cualquier color hexadecimal que elijas.',
      },
      {
        question: '¿Puedo convertir un lote completo de imágenes WebP a JPG?',
        answer:
          'Sí. Arrastra múltiples archivos WebP a la vez, conviértelos todos con un clic y descárgalos por separado o dentro de un archivo ZIP.',
      },
      {
        question: '¿Mis imágenes WebP se suben a algún servidor?',
        answer:
          'No. Todo ocurre localmente dentro de tu navegador mediante HTML5 Canvas, así que tus imágenes nunca abandonan tu dispositivo.',
      },
      {
        question: '¿Convertir WebP a JPG modifica las dimensiones de la imagen?',
        answer:
          'No. El archivo JPG resultante conserva exactamente el mismo ancho y alto en píxeles que el WebP original.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'heic-to-jpg': {
    name: 'Convertidor de HEIC a JPG',
    shortName: 'HEIC a JPG',
    cardDesc: 'Convierte fotos HEIC de iPhone e iOS a JPG estándar de forma privada en tu dispositivo.',
    meta: {
      title: 'Convertir HEIC a JPG – Fotos iPhone Privadas | OMECY',
      description:
        'Convierte fotos HEIC de iPhone e iOS a JPG estándar directo en tu dispositivo sin subir tus fotos personales. Gratis, rápido y 100 % privado.',
      h1: 'Convertidor de HEIC a JPG',
      subtitle:
        'Convierte fotos HEIC de iPhone y iPad en imágenes JPG universales directamente en tu dispositivo, sin subir tus fotografías.',
    },
    howToTitle: 'Cómo usar el Convertidor de HEIC a JPG',
    howToSteps: [
      'Arrastra una o varias fotos .heic o .heif de iPhone al convertidor superior.',
      'Elige el nivel de calidad JPG deseado (un 90 % conserva la nitidez de la cámara con un tamaño de archivo equilibrado).',
      'Haz clic en Convertir para decodificarlas localmente en tu navegador y guarda cada JPG o pulsa Descargar todo (ZIP).',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Tu galería personal sigue siendo privada',
        body: 'Fotos familiares, álbumes de viaje y fotografías de documentos nunca tendrían que subirse a sitios desconocidos solo para cambiar de formato.',
      },
      {
        title: 'Sin instalar códecs adicionales en Windows',
        body: 'Abre y convierte archivos HEIC de Apple directamente en Chrome, Edge o Firefox sin comprar extensiones en la tienda de Windows.',
      },
      {
        title: 'Conversión por lotes con exportación ZIP',
        body: 'Arrastra un lote completo de fotos del iPhone y descarga todos los JPG resultantes juntos con un solo clic.',
      },
    ],
    aboutTitle: 'Fotos HEIC de iPhone y por qué sigue haciendo falta JPG',
    aboutParagraphs: [
      'Desde iOS 11, los iPhone y iPad guardan las fotografías por defecto en HEIC (High Efficiency Image Container), basado en el estándar HEVC. HEIC ofrece gran claridad visual ocupando cerca de la mitad de espacio que un JPEG tradicional, lo que ayuda a ahorrar almacenamiento en el teléfono.',
      'No obstante, muchas PC con Windows, aplicaciones en Android, portales de empleo, trámites en línea y gestores de contenido todavía no abren ni aceptan archivos .heic. OMECY carga un decodificador HEIC local únicamente cuando vas a convertir, entregándote fotos JPG universales sin comprometer tu privacidad.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Se suben mis fotos HEIC de iPhone a un servidor durante la conversión?',
        answer:
          'Nunca. OMECY decodifica las imágenes HEIC estrictamente en la memoria de tu navegador, en tu propio dispositivo, sin enviar nada por internet.',
      },
      {
        question: '¿Funciona en Windows 10 y Windows 11 sin instalar códecs?',
        answer:
          'Sí. Como la decodificación se realiza dentro del navegador mediante JavaScript y WebAssembly, no necesitas ninguna extensión de pago HEVC o HEIF en Windows.',
      },
      {
        question: '¿Puedo convertir decenas de fotos HEIC al mismo tiempo?',
        answer:
          'Sí. Arrastra varios archivos .heic juntos y descarga cada JPG por separado o todos reunidos en un único archivo ZIP.',
      },
      {
        question: '¿Por qué tarda unos instantes cada foto HEIC de alta resolución?',
        answer:
          'Las fotos actuales de iPhone tienen entre 12 MP y 48 MP y requieren una decodificación HEVC completa en el navegador. Procesarlas en local protege tu privacidad por completo y termina en pocos segundos.',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },

  'image-resizer': {
    name: 'Redimensionador de Imágenes',
    shortName: 'Redimensionar Imagen',
    cardDesc: 'Cambia el tamaño de fotos por píxeles exactos, porcentaje o formatos de redes con proporción bloqueada.',
    meta: {
      title: 'Redimensionar Imágenes – Píxeles y Redes Gratis | OMECY',
      description:
        'Cambia el tamaño de fotos JPG, PNG y WebP por píxeles exactos, porcentaje o ajustes para redes sociales en tu navegador. Gratis y sin subidas.',
      h1: 'Redimensionador de Imágenes Online',
      subtitle:
        'Cambia las dimensiones de imágenes JPG, PNG y WebP por píxeles exactos, porcentaje o medidas para redes sociales, 100 % en local.',
    },
    howToTitle: 'Cómo usar el Redimensionador de Imágenes',
    howToSteps: [
      'Arrastra una imagen JPG, PNG o WebP al recuadro superior para ver sus dimensiones originales en píxeles.',
      'Escribe un Ancho y Alto personalizados en píxeles (con Mantener proporción activado o desactivado), cambia al modo Porcentaje o elige un ajuste rápido para web y redes.',
      'Selecciona formato de salida JPG, PNG o WebP, pulsa Redimensionar imagen, comprueba el resultado y descárgalo al instante.',
    ],
    whyLocalTitle: '¿Por qué procesar archivos en local con OMECY?',
    whyLocalPoints: [
      {
        title: 'Remuestreo local de alta calidad',
        body: 'Emplea escalado suave de alta precisión mediante Canvas en tu navegador para obtener bordes limpios al reducir el tamaño.',
      },
      {
        title: 'Medidas de redes sociales en un clic',
        body: 'Aplica al instante tamaños para Instagram Cuadrado (1080×1080), Vertical (1080×1350), miniaturas de YouTube (1280×720) o banners Open Graph (1200×630).',
      },
      {
        title: 'Privado, instantáneo y sin registro',
        body: 'Ajusta fotos de perfil, catálogos de productos y cabeceras de blog sin subir ni una sola imagen a internet.',
      },
    ],
    aboutTitle: 'Cómo redimensionar imágenes para web y redes sociales',
    aboutParagraphs: [
      'Subir fotos gigantes de 4000 píxeles a la portada de un blog o a un perfil social desperdicia ancho de banda y obliga a las plataformas a recomprimirlas de forma impredecible. Redimensionar la imagen a los píxeles exactos necesarios antes de publicarla mantiene textos, logotipos y retratos visiblemente más nítidos.',
      'Dejar activada la opción Mantener proporción evita deformaciones o estiramientos accidentales al escribir un nuevo ancho o alto. Además, puedes cambiar el formato de salida sobre la marcha, por ejemplo pasando una captura PNG pesada a un WebP o JPG ligero listo para publicar.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Cómo redimensiono una imagen sin deformarla ni estirarla?',
        answer:
          'Deja marcada la casilla Mantener proporción al introducir el Ancho o el Alto —o utiliza el modo Porcentaje— para que ambos lados escalen de forma proporcional.',
      },
      {
        question: '¿Puedo cambiar el formato del archivo mientras redimensiono?',
        answer:
          'Sí. Puedes exportar la imagen redimensionada en JPG, PNG o WebP y ajustar el nivel de calidad para salidas JPG y WebP.',
      },
      {
        question: '¿Mis fotos se suben a algún servidor al cambiar su tamaño?',
        answer:
          'No. El cambio de tamaño se realiza íntegramente en tu navegador mediante la API HTML5 Canvas sin subir archivos.',
      },
      {
        question: '¿Qué ajustes predefinidos para redes sociales incluye?',
        answer:
          'OMECY incluye accesos directos para Instagram Cuadrado (1080×1080), Instagram Vertical (1080×1350), Stories/Reels (1080×1920), Miniatura de YouTube (1280×720), Open Graph (1200×630) y Web Full HD (1920×1080).',
      },
    ],
    relatedTitle: 'Otras herramientas multimedia en OMECY',
  },
};
