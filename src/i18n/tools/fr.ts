import type { ToolDictionary } from '../types';

export const toolsFr: ToolDictionary = {
  'video-to-mp3': {
    name: 'Convertisseur vidéo en MP3',
    shortName: 'Vidéo en MP3',
    cardDesc: 'Extrayez un audio MP3 clair depuis vos vidéos MP4, MOV, WebM et MKV en quelques secondes.',
    meta: {
      title: 'Convertisseur vidéo en MP3 – Extraction privée | OMECY',
      description:
        'Extrayez un audio MP3 clair depuis vos vidéos MP4, MOV, WebM et MKV dans votre navigateur. Débit 128 à 320 kbps, gratuit, rapide et sans aucun envoi.',
      h1: 'Convertisseur vidéo en MP3',
      subtitle:
        'Extrayez des pistes audio MP3 propres depuis vos vidéos MP4, MOV, WebM et MKV directement dans votre navigateur sans envoyer vos fichiers.',
    },
    howToTitle: 'Comment utiliser le convertisseur vidéo en MP3',
    howToSteps: [
      'Déposez une vidéo MP4, MOV, WebM ou MKV dans la zone ci-dessus, ou cliquez sur « Choisir un fichier » pour la sélectionner depuis votre appareil.',
      'Choisissez votre débit audio MP3 : 128 kbps pour des enregistrements vocaux légers, 192 kbps pour un bon équilibre quotidien ou 320 kbps pour une écoute musicale détaillée.',
      'Cliquez sur « Extraire l\'audio MP3 » pour lancer la conversion localement, écoutez l\'aperçu et enregistrez instantanément votre fichier MP3.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Confidentialité zéro envoi',
        body: 'Cours filmés, entretiens confidentiels et vidéos personnelles restent strictement dans votre onglet au lieu d\'être transférés vers des serveurs distants.',
      },
      {
        title: 'Évitez les envois vidéo interminables',
        body: 'Pourquoi téléverser une vidéo de 500 Mo sur un Wi-Fi lent juste pour récupérer un MP3 de 5 Mo ? L\'extraction locale lit directement votre disque.',
      },
      {
        title: 'Gratuit, illimité et sans inscription',
        body: 'Convertissez autant de clips que vous le souhaitez, sans quota quotidien, sans compte à créer ni logiciel à installer.',
      },
    ],
    aboutTitle: 'À propos de l\'extraction audio MP3 depuis une vidéo',
    aboutParagraphs: [
      'La plupart des fichiers vidéo réunissent des flux image et son distincts dans des conteneurs tels que MP4, MOV, WebM ou MKV. Lors de l\'extraction en MP3, OMECY écarte les images vidéo et encode uniquement la piste sonore via l\'encodeur LAME MP3 exécuté en WebAssembly, réduisant une vidéo de plusieurs centaines de mégaoctets à une piste audio légère.',
      'Le choix du débit équilibre fidélité sonore et taille de fichier. Les conférences, webinaires et comptes rendus de réunion restent très nets à 128 kbps pour un poids minimal. Les clips musicaux, reprises acoustiques et concerts tirent parti de 192 ou 320 kbps afin de préserver les aigus sur casque ou autoradio.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Mes vidéos sont-elles envoyées sur un serveur lors de l\'extraction MP3 ?',
        answer:
          'Non. OMECY traite votre vidéo strictement dans votre navigateur à l\'aide d\'un moteur WebAssembly côté client. Votre fichier vidéo ne quitte jamais votre appareil.',
      },
      {
        question: 'Quels formats vidéo puis-je convertir en MP3 ?',
        answer:
          'Vous pouvez extraire l\'audio depuis des fichiers vidéo MP4, MOV (iPhone et QuickTime), WebM, MKV, AVI et M4V.',
      },
      {
        question: 'Quel débit MP3 dois-je choisir ?',
        answer:
          'Optez pour 128 kbps pour les podcasts et la voix, 192 kbps pour la musique courante et les clips vidéo, ou 320 kbps pour une fidélité audio maximale.',
      },
      {
        question: 'Pourquoi y a-t-il un bref téléchargement du moteur la première fois ?',
        answer:
          'Pour que les pages chargent instantanément, OMECY charge le moteur audio/vidéo WebAssembly uniquement au démarrage de votre première conversion. Votre navigateur le met ensuite en cache pour accélérer les utilisations suivantes.',
      },
      {
        question: 'Existe-t-il une limite de taille de fichier ?',
        answer:
          'OMECY n\'impose aucun plafond serveur artificiel. Les limites pratiques dépendent uniquement de la mémoire disponible sur votre appareil ; la plupart des navigateurs de bureau gèrent aisément des vidéos de plusieurs centaines de mégaoctets.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'webm-to-mp4': {
    name: 'Convertisseur WebM en MP4',
    shortName: 'WebM en MP4',
    cardDesc: 'Convertissez vos captures d\'écran et vidéos WebM en fichiers MP4 H.264 universels.',
    meta: {
      title: 'Convertisseur WebM en MP4 – Rapide et 100 % local | OMECY',
      description:
        'Convertissez vos captures d\'écran WebM et clips web en vidéos MP4 H.264 universelles dans votre navigateur. Gratuit, rapide et 100 % privé sans envoi.',
      h1: 'Convertisseur WebM en MP4',
      subtitle:
        'Transformez vos captures d\'écran WebM et téléchargements web en vidéos MP4 H.264 lisibles partout, directement dans votre navigateur.',
    },
    howToTitle: 'Comment utiliser le convertisseur WebM en MP4',
    howToSteps: [
      'Déposez votre fichier vidéo .webm dans l\'outil ci-dessus ou cliquez sur « Choisir un fichier ».',
      'Sélectionnez un profil de qualité : « Rapide » pour partager vite, « Équilibré » pour un bon compromis poids/netteté ou « Haute qualité » pour des détails nets.',
      'Cliquez sur « Convertir », vérifiez l\'aperçu dans le lecteur vidéo et cliquez sur « Télécharger » pour récupérer votre MP4.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Protégez vos captures d\'écran sensibles',
        body: 'Rapports de bugs, démonstrations produit et enregistrements Chrome affichent souvent des onglets ou tableaux de bord privés : la conversion locale les garde loin des serveurs tiers.',
      },
      {
        title: 'Aucune file d\'attente dans le cloud',
        body: 'L\'encodage démarre aussitôt sur votre propre machine, sans attendre derrière d\'autres utilisateurs ni subir de longues barres d\'envoi.',
      },
      {
        title: 'Sortie MP4 propre et sans filigrane',
        body: 'Exportez une vidéo H.264 standard avec audio AAC et métadonnées fast-start afin que vos clips démarrent immédiatement sur iOS, Windows, macOS et les messageries.',
      },
    ],
    aboutTitle: 'À propos de WebM et de la compatibilité MP4',
    aboutParagraphs: [
      'WebM est un conteneur vidéo ouvert très utilisé par les enregistreurs d\'écran de navigateur, les extensions Chrome, les outils de visioconférence et les applications web, avec des codecs VP8, VP9 ou AV1 accompagnés d\'audio Opus. Si les navigateurs récents lisent WebM sans difficulté, de nombreux logiciels de montage, présentations PowerPoint, iPhone et messageries refusent encore les fichiers .webm.',
      'Le format MP4 encodé en H.264 (format de pixels yuv420p) avec piste audio AAC demeure le standard vidéo le plus largement accepté au monde. OMECY place en outre l\'atome fast-start en tête du fichier MP4 pour lancer la lecture en ligne sans latence.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Mon MP4 converti sera-t-il lisible sur iPhone, Mac et Windows ?',
        answer:
          'Oui. OMECY encode en H.264 au format colorimétrique yuv420p avec audio AAC, pris en charge nativement par iOS, QuickTime sur macOS, Lecteur Windows Media, Android et tous les grands réseaux sociaux.',
      },
      {
        question: 'La conversion WebM en MP4 envoie-t-elle ma capture d\'écran sur internet ?',
        answer:
          'Jamais. Chaque image est décodée puis réencodée localement dans votre navigateur grâce à WebAssembly.',
      },
      {
        question: 'Quel profil de qualité choisir ?',
        answer:
          'Le profil « Équilibré » convient à la majorité des vidéos. Choisissez « Rapide » pour un partage express par messagerie, ou « Haute qualité » pour conserver des textes d\'interface parfaitement nets dans un tutoriel.',
      },
      {
        question: 'La piste audio de mon fichier WebM est-elle conservée ?',
        answer:
          'Oui. Les pistes audio Opus ou Vorbis contenues dans le fichier WebM sont proprement converties en audio stéréo AAC standard dans le MP4.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'video-compressor': {
    name: 'Compresseur vidéo',
    shortName: 'Compresseur vidéo',
    cardDesc: 'Allégez vos vidéos lourdes pour WhatsApp, Discord, e-mail et web sans aucun envoi.',
    meta: {
      title: 'Compresseur vidéo – Réduire vos clips sans envoi | OMECY',
      description:
        'Réduisez la taille de vos vidéos MP4, MOV et WebM pour WhatsApp, Discord, e-mail et web dans votre navigateur. Gratuit, local et sans envoi serveur.',
      h1: 'Compresseur vidéo en ligne',
      subtitle:
        'Allégez vos grosses vidéos MP4, MOV et WebM pour WhatsApp, Discord, les e-mails ou le web — 100 % localement dans votre navigateur.',
    },
    howToTitle: 'Comment utiliser le compresseur vidéo',
    howToSteps: [
      'Déposez votre vidéo MP4, MOV, WebM ou MKV dans la zone de compression ci-dessus.',
      'Sélectionnez un réglage rapide (WhatsApp, Discord, E-mail, Web) ou ajustez librement le curseur « Qualité » et la « Résolution max. ».',
      'Cliquez sur « Compresser », comparez la taille initiale à la taille réduite et téléchargez votre vidéo MP4 allégée.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Compression vidéo sans téléversement',
        body: 'Vos vidéos de smartphone et livrables clients restent en sécurité sur votre appareil plutôt que de transiter par des serveurs externes.',
      },
      {
        title: 'Calibré pour les vraies limites de pièces jointes',
        body: 'Les préréglages en un clic ajustent résolution et débit pour répondre aux contraintes pratiques de Discord, WhatsApp et des messageries.',
      },
      {
        title: 'Comparaison transparente avant et après',
        body: 'Visualisez aussitôt les mégaoctets économisés et contrôlez la netteté dans le lecteur avant d\'enregistrer le fichier final.',
      },
    ],
    aboutTitle: 'À propos de la compression vidéo intelligente dans le navigateur',
    aboutParagraphs: [
      'Les smartphones récents filment en 4K à des débits élevés qui dépassent vite les 100 Mo pour une seule minute de vidéo. Des services comme Discord, WhatsApp ou les fournisseurs d\'e-mails imposent des plafonds stricts qui bloquent fréquemment ces fichiers bruts.',
      'Une bonne compression combine deux leviers : l\'encodage H.264 à facteur de débit constant (CRF), qui alloue moins de données aux scènes fixes tout en préservant la fluidité des mouvements, et une réduction raisonnée de la définition (de la 4K vers le 1080p ou le 720p). Ensemble, ils divisent couramment le poids par trois à cinq tout en gardant une image nette sur mobile et ordinateur.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Dans quelle proportion ma vidéo va-t-elle rétrécir ?',
        answer:
          'Le gain dépend du débit et de la résolution d\'origine. Les vidéos brutes filmées au téléphone perdent souvent entre 50 % et 85 % de leur poids avec les profils WhatsApp, Discord ou Web.',
      },
      {
        question: 'Mes vidéos sont-elles envoyées dans le cloud pendant la compression ?',
        answer:
          'Non. Toute la compression s\'effectue localement sur votre appareil via WebAssembly dans le navigateur, garantissant une confidentialité totale.',
      },
      {
        question: 'Que signifie la valeur CRF affichée près du curseur de qualité ?',
        answer:
          'CRF signifie Constant Rate Factor. Un nombre CRF bas conserve une netteté supérieure pour un fichier plus lourd, tandis qu\'un CRF plus élevé génère un fichier plus compact pour les limites d\'envoi serrées.',
      },
      {
        question: 'Puis-je réduire une vidéo 4K en 1080p ou 720p ?',
        answer:
          'Oui. Utilisez le menu « Résolution max. » pour passer en 1080p, 720p ou 480p tout en conservant automatiquement les proportions d\'origine.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'video-trimmer': {
    name: 'Découpeur vidéo en ligne',
    shortName: 'Découper une vidéo',
    cardDesc: 'Découpez vos vidéos avec aperçu instantané et mode de copie rapide sans perte.',
    meta: {
      title: 'Découper une vidéo en ligne – Rapide et sans perte | OMECY',
      description:
        'Découpez vos vidéos MP4, MOV, WebM et MKV dans le navigateur avec aperçu instantané et copie sans perte. Gratuit, rapide et privé sans aucun envoi.',
      h1: 'Découpeur vidéo en ligne',
      subtitle:
        'Supprimez les débuts ou fins inutiles de vos vidéos MP4, MOV et WebM directement dans votre navigateur, sans aucun envoi de fichier.',
    },
    howToTitle: 'Comment utiliser le découpeur vidéo en ligne',
    howToSteps: [
      'Déposez une vidéo dans l\'outil ci-dessus pour afficher immédiatement un aperçu local dans le lecteur.',
      'Déplacez les curseurs « Début » et « Fin » — ou mettez la lecture en pause et cliquez sur « Utiliser le temps actuel » — pour délimiter précisément le passage à conserver.',
      'Sélectionnez « Copie rapide sans perte » pour une découpe quasi instantanée sans perte de qualité (ou « Réencodage précis » pour une coupe à l\'image près), puis cliquez sur « Découper et exporter ».',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Lecture immédiate sans téléversement',
        body: 'Votre navigateur lit la vidéo locale sur-le-champ, vous permettant de parcourir de longs enregistrements sans attendre de barre de chargement.',
      },
      {
        title: 'Option de copie sans perte de flux',
        body: 'La copie rapide sans perte coupe directement sur les images clés sans réencoder, préservant 100 % de la qualité initiale en quelques secondes.',
      },
      {
        title: 'Vos rushs restent strictement locaux',
        body: 'Raccourcissez des captures d\'écran brutes, vidéos de mariage ou appels d\'équipe en privé sans jamais envoyer vos séquences non montées en ligne.',
      },
    ],
    aboutTitle: 'Copie rapide sans perte ou réencodage vidéo précis',
    aboutParagraphs: [
      'Les formats vidéo compressés enregistrent toutes les quelques secondes une image complète appelée image clé (keyframe), les images intermédiaires ne décrivant que les différences. Le mode « Copie rapide sans perte » coupe proprement sur l\'image clé la plus proche sans recalculer les pixels : l\'export est quasi instantané et conserve à l\'identique le débit et la netteté d\'origine.',
      'Lorsque vous avez besoin d\'une coupe au dixième de seconde entre deux images clés — par exemple juste avant un mot ou une transition —, passez au mode « Réencodage précis ». Il décode puis réencode exactement la plage retenue en un clip MP4 fluide et universellement lisible.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Découper une vidéo réduit-il sa qualité visuelle ?',
        answer:
          'En mode « Copie rapide sans perte », aucun réencodage n\'a lieu : votre extrait conserve 100 % de la qualité vidéo et audio d\'origine.',
      },
      {
        question: 'Quand faut-il utiliser « Réencodage précis » plutôt que la copie rapide ?',
        answer:
          'Utilisez le réencodage précis si votre point de départ tombe entre deux images clés et que vous remarquez un bref gel d\'image ou un léger décalage au tout début d\'une coupe sans perte.',
      },
      {
        question: 'Mes vidéos brutes sont-elles envoyées quelque part ?',
        answer:
          'Non. Le lecteur d\'aperçu comme le moteur de découpe s\'exécutent intégralement dans votre navigateur sans transfert réseau.',
      },
      {
        question: 'Quels formats vidéo puis-je découper ?',
        answer:
          'Vous pouvez découper les fichiers MP4, MOV, WebM et MKV pris en charge par votre navigateur et FFmpeg WebAssembly.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'audio-joiner': {
    name: 'Assembleur audio et fusion MP3',
    shortName: 'Fusionner des audios',
    cardDesc: 'Assemblez plusieurs pistes MP3, WAV et M4A avec réorganisation et fondu enchaîné.',
    meta: {
      title: 'Fusionner des audios MP3 – Combiner vos pistes | OMECY',
      description:
        'Combinez plusieurs fichiers MP3, WAV et M4A en une piste fluide avec fondu enchaîné optionnel dans votre navigateur. Gratuit, instantané et sans envoi.',
      h1: 'Assembleur audio et fusion MP3',
      subtitle:
        'Réunissez plusieurs pistes MP3, WAV ou M4A en un seul fichier continu avec réorganisation par glisser-déposer et fondu enchaîné local.',
    },
    howToTitle: 'Comment utiliser l\'assembleur audio et fusion MP3',
    howToSteps: [
      'Déposez au moins deux fichiers MP3, WAV, M4A ou OGG dans la zone ci-dessus.',
      'Réorganisez les pistes par glisser-déposer (ou à l\'aide des flèches haut/bas), réglez si besoin un fondu enchaîné et choisissez un export MP3 ou WAV sans perte.',
      'Cliquez sur « Fusionner les pistes » pour les assembler dans votre navigateur, écoutez l\'aperçu combiné et téléchargez votre fichier audio unique.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Mixage Web Audio instantané',
        body: 'Votre navigateur décode et mixe vos pistes nativement en mémoire — fini l\'attente pour téléverser des épisodes de podcast ou des pistes musicales.',
      },
      {
        title: 'Fondus enchaînés fluides à puissance égale',
        body: 'Enchaînez vos transitions sans blanc brutal ni baisse de volume grâce à des courbes de fondu enchaîné à puissance constante.',
      },
      {
        title: 'Vos pistes confidentielles restent privées',
        body: 'Assemblez épisodes de podcast, voix off ou interviews enregistrées sans jamais confier vos enregistrements bruts à un serveur distant.',
      },
    ],
    aboutTitle: 'À propos de la fusion audio multi-formats sans couture',
    aboutParagraphs: [
      'Réunir des extraits audio de provenances variées échoue souvent lorsqu\'une piste vocale M4A est échantillonnée à 48 kHz tandis qu\'un jingle d\'introduction MP3 ou WAV est à 44,1 kHz. OMECY normalise automatiquement les fréquences d\'échantillonnage et les canaux stéréo via l\'OfflineAudioContext du navigateur avant d\'enchaîner les pistes.',
      'Lorsque le fondu enchaîné est activé, OMECY superpose la fin de chaque piste au début de la suivante selon des courbes cosinus/sinus à puissance égale. Contrairement à un fondu linéaire qui crée parfois un creux sonore au milieu, le fondu à puissance égale maintient un volume perçu homogène.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Puis-je fusionner ensemble différents formats comme MP3, WAV et M4A ?',
        answer:
          'Oui. OMECY décode chaque piste en mémoire audio brute, harmonise automatiquement les fréquences d\'échantillonnage et exporte un seul fichier MP3 ou WAV propre.',
      },
      {
        question: 'Comment modifier l\'ordre de mes clips audio ?',
        answer:
          'Faites glisser chaque piste vers le haut ou le bas dans la liste, ou cliquez sur les boutons fléchés accessibles sur chaque ligne avant de fusionner.',
      },
      {
        question: 'Mes pistes audio sont-elles envoyées sur un serveur ?',
        answer:
          'Non. Le décodage, les fondus enchaînés et l\'encodage MP3 ou WAV s\'exécutent à 100 % localement dans votre onglet.',
      },
      {
        question: 'Vaut-il mieux exporter en MP3 ou en WAV ?',
        answer:
          'Choisissez le MP3 (192 à 320 kbps) pour des podcasts, playlists et montages compacts prêts à partager, ou le WAV si vous comptez importer la piste assemblée dans un autre éditeur audio sans compression supplémentaire.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'mp3-cutter': {
    name: 'Découpeur MP3 et éditeur audio',
    shortName: 'Couper un MP3',
    cardDesc: 'Découpez vos MP3 et clips audio sur une forme d\'onde avec fondu d\'entrée et de sortie.',
    meta: {
      title: 'Couper un MP3 en ligne – Découpe sur forme d\'onde | OMECY',
      description:
        'Découpez vos fichiers MP3 et audio avec précision sur une forme d\'onde interactive, avec fondus et aperçu instantané. Gratuit, privé et sans envoi.',
      h1: 'Découpeur MP3 et éditeur audio',
      subtitle:
        'Découpez visuellement vos extraits MP3, WAV et M4A sur une forme d\'onde nette avec fondus d\'entrée et de sortie — 100 % en local.',
    },
    howToTitle: 'Comment utiliser le découpeur MP3',
    howToSteps: [
      'Déposez un fichier MP3, WAV, M4A ou OGG dans la zone ci-dessus pour afficher instantanément sa forme d\'onde interactive.',
      'Réglez les curseurs « Début » et « Fin » sur l\'extrait souhaité, ajoutez si besoin un « Fondu d\'entrée » ou « Fondu de sortie » et cliquez sur « Écouter la sélection ».',
      'Choisissez une sortie MP3 ou WAV sans perte, cliquez sur « Découper et exporter » et téléchargez immédiatement votre extrait audio.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Affichage instantané de la forme d\'onde',
        body: 'Repérez aussitôt les silences, temps forts et débuts de phrase sans devoir téléverser votre piste au préalable.',
      },
      {
        title: 'Fondus d\'entrée et de sortie intégrés',
        body: 'Éliminez les clics secs et coupures brusques sur vos sonneries, intros de podcast et bruitages grâce à des transitions progressives.',
      },
      {
        title: 'Confidentialité totale dans le navigateur',
        body: 'Vos enregistrements personnels, maquettes musicales et notes vocales ne quittent jamais votre ordinateur ou votre smartphone.',
      },
    ],
    aboutTitle: 'À propos de la découpe audio précise et des sonneries',
    aboutParagraphs: [
      'Couper proprement un extrait audio demande de voir où le volume monte et retombe plutôt que de deviner des repères temporels à l\'aveugle. En traçant directement les pics d\'amplitude à partir des données PCM décodées, OMECY vous permet d\'isoler un refrain, de supprimer un blanc gênant au début d\'une prise ou de préparer une sonnerie sur mesure en quelques secondes.',
      'Ajouter ne serait-ce qu\'un léger fondu d\'entrée et de sortie de 0,5 seconde évite les claquements numériques produits lorsqu\'une onde sonore est tranchée hors de son point zéro, offrant ainsi une finition propre et agréable à l\'écoute.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Puis-je écouter l\'extrait découpé avant de le télécharger ?',
        answer:
          'Oui. Cliquez sur « Écouter la sélection » pour entendre exactement la plage choisie — y compris les fondus d\'entrée et de sortie — avant d\'exporter.',
      },
      {
        question: 'Le découpeur MP3 fonctionne-t-il aussi avec les fichiers WAV et M4A ?',
        answer:
          'Oui. Vous pouvez découper les fichiers MP3, WAV, M4A, OGG et FLAC pris en charge par votre navigateur et exporter le résultat en MP3 ou en WAV.',
      },
      {
        question: 'Mes fichiers audio sont-ils envoyés vers un serveur distant ?',
        answer:
          'Jamais. L\'analyse de la forme d\'onde, la découpe, les fondus et l\'encodage MP3 tournent intégralement dans la mémoire locale de votre navigateur.',
      },
      {
        question: 'Puis-je créer une sonnerie de téléphone avec cet outil ?',
        answer:
          'Oui. Isolez un passage marquant de 20 à 30 secondes dans votre morceau, appliquez un léger fondu de sortie et exportez le fichier en MP3 pour Android ou votre outil de sonnerie.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'wav-to-mp3': {
    name: 'Convertisseur WAV en MP3',
    shortName: 'WAV en MP3',
    cardDesc: 'Convertissez vos lourds fichiers WAV non compressés en MP3 compacts de 128 à 320 kbps.',
    meta: {
      title: 'Convertisseur WAV en MP3 – Audio léger et rapide | OMECY',
      description:
        'Transformez vos lourds fichiers WAV non compressés en MP3 128 à 320 kbps directement dans le navigateur. Traitement par lot, gratuit et sans envoi.',
      h1: 'Convertisseur WAV en MP3',
      subtitle:
        'Transformez vos lourds enregistrements WAV non compressés en fichiers MP3 compacts et universels par lot — 100 % dans votre navigateur.',
    },
    howToTitle: 'Comment utiliser le convertisseur WAV en MP3',
    howToSteps: [
      'Déposez un ou plusieurs fichiers .wav dans la zone ci-dessus.',
      'Sélectionnez le débit MP3 souhaité (128, 192, 256 ou 320 kbps) selon que vous privilégiez un poids minimal ou une restitution musicale maximale.',
      'Cliquez sur « Convertir », consultez le gain de taille affiché pour chaque piste et téléchargez vos MP3 à l\'unité ou dans une archive ZIP.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Plus besoin de téléverser d\'énormes fichiers WAV',
        body: 'Un fichier WAV stéréo non compressé pèse environ 10 Mo par minute. La conversion locale est souvent terminée avant qu\'un envoi classique n\'atteigne 20 %.',
      },
      {
        title: 'Protégez vos pistes studio inédites',
        body: 'Musiciens, comédiens voix et podcasteurs convertissent leurs masters par lot sans jamais exposer des prises inédites sur des serveurs tiers.',
      },
      {
        title: 'Conversion par lot et export ZIP immédiat',
        body: 'Déposez tout un dossier de pistes WAV et récupérez chaque MP3 converti soigneusement réuni dans un unique téléchargement ZIP.',
      },
    ],
    aboutTitle: 'WAV non compressé ou MP3 léger : ce qu\'il faut savoir',
    aboutParagraphs: [
      'Le format WAV (Waveform Audio File Format) enregistre des échantillons audio PCM bruts sans compression. Un morceau stéréo qualité CD (44,1 kHz, 16 bits) atteint 1 411 kbps, soit près de 50 Mo pour cinq minutes d\'audio. C\'est parfait pour le mixage dans une station audio numérique (DAW), mais beaucoup trop lourd pour les e-mails, le streaming web ou un smartphone.',
      'Le format MP3 repose sur une compression psychoacoustique qui retire les fréquences subtiles masquées par des sons plus forts et à peine perceptibles à l\'oreille humaine. Passer de WAV à un MP3 à 192 ou 320 kbps allège généralement le fichier de 75 % à 90 % tout en offrant une écoute propre sur presque tous les appareils.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'De combien un fichier MP3 est-il plus léger qu\'un WAV ?',
        answer:
          'Un MP3 encodé à 192 kbps est généralement environ 85 % plus léger qu\'un WAV stéréo 16 bits standard, tandis qu\'un MP3 à 320 kbps réduit le poids d\'environ 75 %.',
      },
      {
        question: 'Puis-je convertir plusieurs fichiers WAV en MP3 en même temps ?',
        answer:
          'Oui. Déposez plusieurs fichiers WAV simultanément, lancez la conversion de tout le lot en un clic, puis téléchargez chaque piste ou cliquez sur « Tout télécharger (ZIP) ».',
      },
      {
        question: 'Mes enregistrements WAV sont-ils envoyés sur un serveur ?',
        answer:
          'Non. La conversion s\'exécute dans votre navigateur via le décodage natif Web Audio et un encodeur MP3 local en JavaScript/WebAssembly.',
      },
      {
        question: 'Quel débit choisir pour de la musique ou pour de la voix ?',
        answer:
          'Utilisez 128 kbps pour la voix parlée et les notes, 192 kbps pour les podcasts et l\'écoute courante, et 256 à 320 kbps pour vos sorties musicales et écoutes de mastering.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'm4a-to-mp3': {
    name: 'Convertisseur M4A en MP3',
    shortName: 'M4A en MP3',
    cardDesc: 'Convertissez vos Mémos vocaux iPhone et fichiers Apple M4A en pistes MP3 universelles.',
    meta: {
      title: 'Convertisseur M4A en MP3 – Mémos vocaux en privé | OMECY',
      description:
        'Convertissez vos enregistrements M4A Apple et Mémos vocaux iPhone en fichiers MP3 universels dans votre navigateur. Gratuit, par lot et sans envoi.',
      h1: 'Convertisseur M4A en MP3',
      subtitle:
        'Convertissez vos Mémos vocaux iPhone, enregistrements macOS et fichiers M4A Apple en MP3 universels directement dans votre navigateur.',
    },
    howToTitle: 'Comment utiliser le convertisseur M4A en MP3',
    howToSteps: [
      'Déposez un ou plusieurs fichiers audio .m4a ou .aac (par exemple vos Mémos vocaux iPhone) dans la zone ci-dessus.',
      'Choisissez le débit MP3 désiré : 128 kbps suffisent amplement pour des mémos vocaux nets, et 192 à 320 kbps conviennent aux morceaux de musique.',
      'Cliquez sur « Convertir » pour traiter chaque fichier en local, écoutez le rendu et téléchargez vos MP3 individuellement ou dans un fichier ZIP.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Vos mémos vocaux restent strictement privés',
        body: 'Notes vocales, comptes rendus de réunion et rappels personnels demeurent sur votre appareil au lieu de passer par des convertisseurs inconnus.',
      },
      {
        title: 'Décodage natif rapide du navigateur',
        body: 'Les navigateurs modernes décodent nativement les flux AAC/M4A à grande vitesse, convertissant plusieurs minutes de voix en MP3 en quelques secondes.',
      },
      {
        title: 'Utilisable partout sans installer d\'application',
        body: 'Inutile d\'installer iTunes, un logiciel payant ou un utilitaire de bureau : convertissez directement depuis Chrome, Safari, Edge ou Firefox.',
      },
    ],
    aboutTitle: 'À propos des fichiers M4A Apple et de la compatibilité MP3',
    aboutParagraphs: [
      'Les appareils Apple — Mémos vocaux sur iPhone, iPad, QuickTime et GarageBand — enregistrent par défaut l\'audio dans le conteneur .m4a (MPEG-4 Audio), généralement encodé en AAC ou ALAC. Bien que le format M4A soit efficace au sein de l\'écosystème Apple, de nombreux outils Windows, autoradios, plateformes de transcription et formulaires en ligne exigent encore impérativement du .mp3.',
      'Convertir un fichier M4A en MP3 garantit une lecture sans accroc sur n\'importe quel ordinateur, téléphone Android, diapositive de présentation ou lecteur audio, tout en gardant vos enregistrements vocaux totalement hors ligne.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Cet outil est-il compatible avec les Mémos vocaux iPhone (.m4a) ?',
        answer:
          'Oui. Transférez votre Mémo vocal depuis l\'iPhone (via AirDrop ou partage), déposez le fichier .m4a sur OMECY et obtenez un MP3 standard en quelques secondes.',
      },
      {
        question: 'Mes enregistrements vocaux sont-ils téléversés quelque part ?',
        answer:
          'Non. Le décodage comme l\'encodage MP3 se déroulent strictement dans votre onglet local, sans aucune transmission vers un serveur.',
      },
      {
        question: 'Puis-je convertir plusieurs fichiers M4A par lot ?',
        answer:
          'Oui. Sélectionnez ou déposez plusieurs fichiers M4A ensemble et téléchargez toutes les pistes MP3 obtenues séparément ou réunies dans un seul fichier ZIP.',
      },
      {
        question: 'Quel débit recommandez-vous pour des mémos vocaux M4A ?',
        answer:
          'Un débit de 128 ou 192 kbps conserve toute la clarté vocale enregistrée par les microphones de l\'iPhone tout en gardant des fichiers légers et faciles à partager.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'image-compressor': {
    name: 'Compresseur d\'images',
    shortName: 'Compresseur d\'images',
    cardDesc: 'Compressez vos photos JPG, PNG et WebP par lot en local avec contrôle de qualité et ZIP.',
    meta: {
      title: 'Compresseur d\'images – Alléger JPG, PNG et WebP | OMECY',
      description:
        'Compressez vos images JPG, PNG et WebP par lot dans votre navigateur avec contrôle de qualité et export ZIP. Gratuit, instantané et 100 % sans envoi.',
      h1: 'Compresseur d\'images en ligne',
      subtitle:
        'Allégez vos lots de photos JPG, PNG et WebP directement dans votre navigateur avec mesure du gain en direct et zéro envoi.',
    },
    howToTitle: 'Comment utiliser le compresseur d\'images',
    howToSteps: [
      'Déposez une ou plusieurs dizaines d\'images JPG, PNG ou WebP dans la zone ci-dessus.',
      'Ajustez le curseur « Qualité » (entre 75 % et 85 %, le meilleur compromis pour des photos web nettes et beaucoup plus légères).',
      'Cliquez sur « Compresser » pour optimiser chaque image localement, vérifiez le poids économisé et téléchargez les fichiers à l\'unité ou en archive ZIP.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Vos photos privées ne quittent pas votre appareil',
        body: 'Visuels clients, souvenirs personnels et documents numérisés restent confinés à votre onglet de navigateur.',
      },
      {
        title: 'Des millisecondes au lieu de barres d\'envoi',
        body: 'L\'optimisation locale via Canvas s\'exécute instantanément sur votre machine, sans file d\'attente serveur ni limite de lot.',
      },
      {
        title: 'Pensé pour la vitesse web et les Core Web Vitals',
        body: 'Des images plus légères accélèrent le Largest Contentful Paint (LCP), allègent les pièces jointes et préservent la data mobile.',
      },
    ],
    aboutTitle: 'À propos de l\'optimisation des images JPG, PNG et WebP',
    aboutParagraphs: [
      'Les photos issues d\'appareils modernes et les exports graphiques dépassent couramment 3 à 10 Mo chacun, ralentissant l\'affichage des sites web et bloquant les formulaires en ligne. Une compression avec perte bien dosée élimine les redondances de couleur imperceptibles à l\'œil nu tout en préservant contours, textures et textes.',
      'Pour les photographies, les formats JPG et WebP réglés entre 75 % et 85 % réduisent souvent le poids de 60 % à 80 % avec une différence visuelle presque indétectable. Pour les captures d\'écran et graphismes PNG, un réencodage ciblé supprime le superflu tout en conservant la netteté des traits.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Quels formats d\'image puis-je compresser ?',
        answer:
          'OMECY compresse directement dans le navigateur les images JPG/JPEG, PNG et WebP, en conservant le format d\'origine de chaque fichier tout en allégeant son poids.',
      },
      {
        question: 'Puis-je compresser plusieurs photos en même temps ?',
        answer:
          'Oui. Déposez plusieurs images à la fois, consultez le total de mégaoctets économisés et téléchargez toutes vos photos compressées dans une seule archive ZIP.',
      },
      {
        question: 'Mes images sont-elles envoyées sur un serveur ?',
        answer:
          'Non. La compression fonctionne localement via l\'API Canvas du navigateur et du JavaScript côté client — aucune donnée n\'est envoyée sur le réseau.',
      },
      {
        question: 'Quel réglage de qualité offre le meilleur équilibre entre netteté et poids ?',
        answer:
          'Une qualité comprise entre 75 % et 82 % offre généralement une forte baisse de poids tout en gardant des photos nettes pour les sites web, blogs et e-mails.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'webp-to-jpg': {
    name: 'Convertisseur WebP en JPG',
    shortName: 'WebP en JPG',
    cardDesc: 'Convertissez vos images WebP en photos JPG universelles avec gestion du fond transparent.',
    meta: {
      title: 'Convertisseur WebP en JPG – Rapide et par lot | OMECY',
      description:
        'Convertissez vos images WebP en photos JPG universelles par lot dans votre navigateur avec fond pour transparence. Gratuit, instantané et sans envoi.',
      h1: 'Convertisseur WebP en JPG',
      subtitle:
        'Convertissez vos fichiers WebP enregistrés depuis le web en images JPG acceptées partout, par lot et avec couleur de fond personnalisable — 100 % en local.',
    },
    howToTitle: 'Comment utiliser le convertisseur WebP en JPG',
    howToSteps: [
      'Déposez une ou plusieurs images .webp dans la zone ci-dessus.',
      'Réglez la qualité JPG et choisissez une couleur de fond pour la transparence (blanc pur par défaut) si vos fichiers WebP comportent des zones transparentes.',
      'Cliquez sur « Convertir » puis enregistrez vos fichiers JPG individuellement ou téléchargez l\'ensemble en une seule archive ZIP.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Conversion Canvas instantanée',
        body: 'Votre navigateur affichant déjà le WebP nativement, convertir des dizaines d\'images en JPG en local ne prend qu\'une fraction de seconde.',
      },
      {
        title: 'Gestion propre de la transparence',
        body: 'Au lieu d\'un cadre noir disgracieux derrière des stickers ou visuels détourés, OMECY remplit proprement les zones transparentes en blanc ou dans la teinte choisie.',
      },
      {
        title: 'Zéro envoi et export ZIP par lot',
        body: 'Convertissez autant de visuels téléchargés ou fiches produit que nécessaire sans jamais envoyer d\'image vers un serveur externe.',
      },
    ],
    aboutTitle: 'Téléchargements WebP et compatibilité universelle du JPG',
    aboutParagraphs: [
      'Développé par Google pour alléger les pages web modernes, le format WebP est de plus en plus souvent enregistré par défaut lorsque vous sauvegardez une image depuis Chrome, Edge ou Safari. Pourtant, de nombreuses visionneuses de bureau, anciennes versions de Photoshop, bornes photo, places de marché et suites bureautiques réclament encore expressément des fichiers .jpg.',
      'Comme le JPG ne gère pas la transparence (canal alpha), convertir un WebP transparent nécessite de l\'aplatir sur un fond uni. OMECY vous permet de choisir librement cette couleur de fond (blanc par défaut) ainsi que la qualité JPG avant d\'exporter.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Que deviennent les zones transparentes lors de la conversion WebP en JPG ?',
        answer:
          'Le format JPG ne prenant pas en charge la transparence, OMECY remplit proprement les pixels transparents en blanc pur (#FFFFFF) par défaut, ou avec la couleur de votre choix.',
      },
      {
        question: 'Puis-je convertir tout un lot d\'images WebP en JPG en une fois ?',
        answer:
          'Oui. Déposez plusieurs fichiers WebP ensemble, convertissez-les tous en un clic et récupérez-les un par un ou dans une seule archive ZIP.',
      },
      {
        question: 'Mes images WebP sont-elles téléversées sur un serveur ?',
        answer:
          'Non. Tout s\'exécute localement dans votre navigateur à l\'aide de l\'API HTML5 Canvas : vos images ne quittent jamais votre appareil.',
      },
      {
        question: 'La conversion WebP en JPG modifie-t-elle les dimensions de l\'image ?',
        answer:
          'Non. Le fichier JPG généré conserve exactement la largeur et la hauteur en pixels du fichier WebP d\'origine.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'heic-to-jpg': {
    name: 'Convertisseur HEIC en JPG',
    shortName: 'HEIC en JPG',
    cardDesc: 'Convertissez vos photos HEIC iPhone et iOS en JPG standard en privé sur votre appareil.',
    meta: {
      title: 'Convertisseur HEIC en JPG – Photos iPhone en privé | OMECY',
      description:
        'Convertissez vos photos HEIC iPhone et iOS en images JPG standard directement sur votre appareil, sans envoyer vos clichés en ligne. Gratuit et rapide.',
      h1: 'Convertisseur HEIC en JPG',
      subtitle:
        'Convertissez vos photos HEIC d\'iPhone et d\'iPad en images JPG universelles directement sur votre appareil — sans envoyer une seule photo.',
    },
    howToTitle: 'Comment utiliser le convertisseur HEIC en JPG',
    howToSteps: [
      'Déposez une ou plusieurs photos .heic ou .heif provenant de votre iPhone dans l\'outil ci-dessus.',
      'Choisissez le niveau de qualité JPG souhaité (90 % préserve la finesse des clichés tout en gardant un poids raisonnable).',
      'Cliquez sur « Convertir » pour décoder les photos localement dans votre navigateur, puis enregistrez chaque JPG ou cliquez sur « Tout télécharger (ZIP) ».',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Votre pellicule photo reste privée',
        body: 'Photos de famille, albums de voyage et justificatifs photographiés n\'ont jamais besoin d\'être confiés à des sites inconnus juste pour changer de format.',
      },
      {
        title: 'Aucune extension à installer sous Windows',
        body: 'Ouvrez et convertissez les fichiers HEIC d\'Apple directement dans Chrome, Edge ou Firefox sans acheter de codecs supplémentaires sur le Microsoft Store.',
      },
      {
        title: 'Conversion par lot avec export ZIP',
        body: 'Déposez toute une série de clichés iPhone et récupérez l\'ensemble des JPG convertis en un seul clic.',
      },
    ],
    aboutTitle: 'Photos HEIC sur iPhone et intérêt du format JPG',
    aboutParagraphs: [
      'Depuis iOS 11, les iPhone et iPad capturent par défaut les clichés au format HEIC (High Efficiency Image Container), fondé sur la norme HEVC. Le HEIC préserve un haut niveau de détail pour environ la moitié du poids d\'un JPEG classique, libérant ainsi un espace précieux sur le téléphone.',
      'En revanche, de nombreux PC Windows, applications Android, portails de recrutement, démarches administratives et CMS peinent encore à ouvrir ou accepter les fichiers .heic. OMECY charge à la demande un décodeur HEIC côté client uniquement lorsque vous convertissez, pour produire des JPG reconnus partout sans compromis sur votre vie privée.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Mes photos HEIC iPhone sont-elles envoyées sur un serveur pendant la conversion ?',
        answer:
          'Jamais. OMECY décode les images HEIC strictement dans la mémoire locale de votre navigateur sur votre propre appareil ; vos photos ne transitent pas par le réseau.',
      },
      {
        question: 'Cela fonctionne-t-il sous Windows 10 et Windows 11 sans installer de codecs ?',
        answer:
          'Oui. Comme le décodage s\'effectue dans le navigateur en JavaScript/WebAssembly, vous n\'avez besoin d\'aucune extension HEVC ou HEIF payante pour Windows.',
      },
      {
        question: 'Puis-je convertir des dizaines de photos HEIC en même temps ?',
        answer:
          'Oui. Déposez plusieurs fichiers .heic simultanément et exportez tous les JPG convertis à l\'unité ou regroupés dans un unique fichier ZIP.',
      },
      {
        question: 'Pourquoi la conversion HEIC prend-elle quelques instants pour une photo haute résolution ?',
        answer:
          'Les clichés d\'iPhone récents atteignent 12 à 48 mégapixels et nécessitent un décodage HEVC complet dans le navigateur. Ce traitement local garantit une confidentialité totale tout en s\'achevant en quelques secondes.',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },

  'image-resizer': {
    name: 'Redimensionneur d\'images',
    shortName: 'Redimensionner',
    cardDesc: 'Redimensionnez vos photos en pixels, pourcentage ou formats réseaux sociaux avec proportions.',
    meta: {
      title: 'Redimensionner une image – Pixels et réseaux | OMECY',
      description:
        'Redimensionnez vos photos JPG, PNG et WebP en pixels, pourcentage ou formats réseaux sociaux dans votre navigateur. Gratuit, rapide et sans envoi.',
      h1: 'Redimensionneur d\'images en ligne',
      subtitle:
        'Redimensionnez vos images JPG, PNG et WebP en pixels exacts, en pourcentage ou aux dimensions des réseaux sociaux — 100 % localement.',
    },
    howToTitle: 'Comment utiliser le redimensionneur d\'images',
    howToSteps: [
      'Déposez une image JPG, PNG ou WebP dans la zone ci-dessus pour afficher ses dimensions d\'origine en pixels.',
      'Saisissez une « Largeur » et une « Hauteur » personnalisées en pixels (en gardant ou non « Verrouiller les proportions »), passez en « Pourcentage » ou choisissez un format rapide réseaux sociaux et web.',
      'Sélectionnez le format de sortie JPG, PNG ou WebP, cliquez sur « Redimensionner l\'image », vérifiez la netteté de l\'aperçu et téléchargez aussitôt.',
    ],
    whyLocalTitle: 'Pourquoi traiter vos fichiers localement avec OMECY ?',
    whyLocalPoints: [
      {
        title: 'Rééchantillonnage local de haute qualité',
        body: 'Utilise un rééchantillonnage Canvas haute qualité directement dans votre navigateur pour des bords nets et des réductions propres.',
      },
      {
        title: 'Dimensions réseaux sociaux en un clic',
        body: 'Ciblez instantanément Instagram Carré (1080×1080), Portrait (1080×1350), miniatures YouTube (1280×720) ou bannières Open Graph (1200×630).',
      },
      {
        title: 'Privé, immédiat et sans inscription',
        body: 'Adaptez photos de profil, catalogues produit et illustrations d\'articles sans téléverser la moindre image en ligne.',
      },
    ],
    aboutTitle: 'À propos du redimensionnement d\'images pour le web et les réseaux',
    aboutParagraphs: [
      'Publier une photo surdimensionnée de 4000 pixels dans un en-tête de blog ou un profil social gaspille la bande passante et pousse les plateformes à appliquer une recompression serveur imprévisible. Redimensionner vos visuels aux dimensions exactes attendues avant publication garde textes, logos et portraits nettement plus précis.',
      'Garder l\'option « Verrouiller les proportions » cochée évite tout étirement ou écrasement accidentel lorsque vous saisissez une nouvelle largeur ou hauteur. Vous pouvez aussi changer de format à la volée — par exemple réduire une lourde capture PNG en un fichier WebP ou JPG léger prêt pour le web.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Comment redimensionner une image sans la déformer ni l\'étirer ?',
        answer:
          'Laissez « Verrouiller les proportions » coché lorsque vous modifiez la largeur ou la hauteur — ou passez en mode Pourcentage — afin de conserver le ratio d\'origine.',
      },
      {
        question: 'Puis-je changer le format de fichier pendant le redimensionnement ?',
        answer:
          'Oui. Vous pouvez exporter votre image redimensionnée en JPG, PNG ou WebP et ajuster la qualité pour les sorties JPG et WebP.',
      },
      {
        question: 'Mes photos sont-elles envoyées sur un serveur lors du redimensionnement ?',
        answer:
          'Non. Le redimensionnement s\'exécute entièrement dans votre navigateur via l\'API HTML5 Canvas, sans aucun envoi de fichier.',
      },
      {
        question: 'Quels formats réseaux sociaux sont inclus ?',
        answer:
          'OMECY propose des préréglages en un clic pour Instagram Carré (1080×1080), Instagram Portrait (1080×1350), Story/Reels (1080×1920), miniatures YouTube (1280×720), Open Graph (1200×630) et Web Full HD (1920×1080).',
      },
    ],
    relatedTitle: 'Autres outils multimédias sur OMECY',
  },
};
