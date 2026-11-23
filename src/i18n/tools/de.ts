import type { ToolDictionary } from '../types';

export const toolsDe: ToolDictionary = {
  'video-to-mp3': {
    name: 'Video zu MP3 Konverter',
    shortName: 'Video zu MP3',
    cardDesc: 'Extrahieren Sie klares MP3-Audio in Sekunden lokal aus MP4-, MOV-, WebM- und MKV-Videos.',
    meta: {
      title: 'Video zu MP3 Konverter – Audio privat extrahieren | OMECY',
      description:
        'Extrahieren Sie klares MP3-Audio aus MP4-, MOV-, WebM- und MKV-Videos direkt im Browser. 128–320 kbit/s, kostenlos, sofort und privat ohne Upload.',
      h1: 'Video zu MP3 Konverter',
      subtitle:
        'Extrahieren Sie saubere MP3-Audiospuren aus MP4-, MOV-, WebM- und MKV-Videos direkt im Browser – ganz ohne Hochladen Ihrer Dateien.',
    },
    howToTitle: 'So nutzen Sie den Video zu MP3 Konverter',
    howToSteps: [
      'Ziehen Sie eine MP4-, MOV-, WebM- oder MKV-Videodatei in das Feld oben oder klicken Sie auf „Datei auswählen“, um ein Video von Ihrem Gerät zu laden.',
      'Wählen Sie Ihre gewünschte MP3-Bitrate: 128 kbit/s für schlanke Sprachaufnahmen, 192 kbit/s für ausgewogenen Alltagsklang oder 320 kbit/s für maximale Musikdetails.',
      'Klicken Sie auf „MP3-Audio extrahieren“, um die Umwandlung lokal zu starten, hören Sie die Spur probe und speichern Sie Ihre MP3-Datei sofort.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Privatsphäre ohne Datei-Upload',
        body: 'Vorlesungen, vertrauliche Interviews und private Aufnahmen bleiben strikt in Ihrem Browser-Tab statt auf fremden Konvertierungsservern.',
      },
      {
        title: 'Lange Video-Uploads überspringen',
        body: 'Warum ein 500-MB-Video über langsames WLAN hochladen, nur um eine 5-MB-MP3 herunterzuladen? Die lokale Extraktion liest direkt von Ihrem Laufwerk.',
      },
      {
        title: 'Kostenlos ohne Limits oder Anmeldung',
        body: 'Extrahieren Sie beliebig viele Audiospuren ohne Tagesgrenzen, E-Mail-Zwang oder zusätzliche Desktop-Software.',
      },
    ],
    aboutTitle: 'Über das Extrahieren von MP3-Audio aus Videodateien',
    aboutParagraphs: [
      'Die meisten Videodateien bündeln getrennte Bild- und Tonspuren in Containern wie MP4, MOV, WebM oder MKV. Beim Extrahieren nach MP3 verwirft OMECY die Videobilder und kodiert ausschließlich die Tonspur mithilfe des LAME-MP3-Encoders innerhalb von WebAssembly – so schrumpft ein mehrere hundert Megabyte großes Video zu einer handlichen Audiodatei.',
      'Die richtige Bitrate bestimmt das Verhältnis von Klangtreue und Dateigröße. Gesprochene Inhalte, Webinare und Meeting-Mitschnitte klingen bereits bei 128 kbit/s klar und bleiben extrem kompakt. Musikvideos, Akustik-Cover und Konzertmitschnitte profitieren von 192 oder 320 kbit/s, um feine Höhen über Kopfhörer und Autoradios sauber abzubilden.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Werden meine Videos beim Extrahieren von MP3 auf einen Server hochgeladen?',
        answer:
          'Nein. OMECY verarbeitet Ihr Video ausschließlich in Ihrem Browser mithilfe einer clientseitigen WebAssembly-Engine. Ihre Videodatei verlässt Ihr Gerät zu keinem Zeitpunkt.',
      },
      {
        question: 'Welche Videoformate kann ich in MP3 umwandeln?',
        answer:
          'Sie können Audiospuren aus MP4-, MOV- (iPhone und QuickTime), WebM-, MKV-, AVI- und M4V-Videodateien extrahieren.',
      },
      {
        question: 'Welche MP3-Bitrate sollte ich wählen?',
        answer:
          'Wählen Sie 128 kbit/s für Podcasts und Sprache, 192 kbit/s für Musik und gewöhnliche Videoclips sowie 320 kbit/s für höchste Klangqualität.',
      },
      {
        question: 'Warum erfolgt bei der ersten Konvertierung ein kurzer Engine-Download?',
        answer:
          'Damit alle Seiten blitzschnell laden, ruft OMECY die WebAssembly-Audio/Video-Engine erst beim Start Ihres ersten Auftrags ab. Danach speichert Ihr Browser sie im Cache für deutlich schnellere Folgekonvertierungen.',
      },
      {
        question: 'Gibt es eine Beschränkung der Dateigröße?',
        answer:
          'OMECY setzt keine künstlichen Server-Limits. Die praktische Grenze hängt allein vom Arbeitsspeicher Ihres Geräts ab; moderne Desktop-Browser bewältigen problemlos Videos von mehreren hundert Megabyte.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'webm-to-mp4': {
    name: 'WebM zu MP4 Konverter',
    shortName: 'WebM zu MP4',
    cardDesc: 'Wandeln Sie Browser- und Bildschirmaufnahmen im WebM-Format in universelles H.264-MP4 um.',
    meta: {
      title: 'WebM zu MP4 Konverter – Schnell lokal im Browser | OMECY',
      description:
        'Wandeln Sie WebM-Bildschirmaufnahmen und Web-Clips direkt im Browser in universelles H.264-MP4 um. Kostenlos, schnell und 100 % privat ohne Upload.',
      h1: 'WebM zu MP4 Konverter',
      subtitle:
        'Verwandeln Sie WebM-Bildschirmaufnahmen und Web-Downloads lokal im Browser in überall abspielbare H.264-MP4-Videos.',
    },
    howToTitle: 'So nutzen Sie den WebM zu MP4 Konverter',
    howToSteps: [
      'Ziehen Sie Ihre .webm-Videodatei in den Konverter oben oder klicken Sie auf „Datei auswählen“.',
      'Wählen Sie ein Qualitätsprofil: „Schnell“ zum zügigen Teilen, „Ausgewogen“ für den Alltag oder „Hohe Qualität“ für gestochen scharfe Details.',
      'Klicken Sie auf „Konvertieren“, prüfen Sie das Ergebnis im Vorschau-Player und speichern Sie Ihre fertige MP4-Datei.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Bildschirmaufnahmen vertraulich halten',
        body: 'Fehlerberichte, Produktdemos und Chrome-Mitschnitte zeigen oft private Tabs oder Dashboards – durch die lokale Umwandlung gelangen sie nie auf fremde Server.',
      },
      {
        title: 'Kein Warten in Cloud-Warteschlangen',
        body: 'Die Kodierung startet ohne Umweg direkt auf Ihrem Computer, ohne hinter anderen Nutzern oder langsamen Upload-Balken zu warten.',
      },
      {
        title: 'Saubere MP4-Ausgabe ohne Wasserzeichen',
        body: 'Exportieren Sie standardkonformes H.264-Video mit AAC-Audio und Fast-Start-Metadaten für sofortige Wiedergabe auf iOS, Windows, macOS und in Apps.',
      },
    ],
    aboutTitle: 'Über WebM und universelle MP4-Kompatibilität',
    aboutParagraphs: [
      'WebM ist ein offenes Web-Videocontainerformat, das häufig von Browser-Screenrecordern, Chrome-Erweiterungen, Videokonferenz-Tools und Web-Apps erzeugt wird – meist mit VP8-, VP9- oder AV1-Video und Opus-Audio. Während moderne Browser WebM mühelos wiedergeben, lehnen viele ältere Schnittprogramme, PowerPoint-Präsentationen, iPhones und Messenger .webm-Anhänge nach wie vor ab.',
      'MP4 mit H.264-Video (Pixelformat yuv420p) und AAC-Ton bleibt der weltweit zuverlässigste Videostandard. OMECY schreibt zudem den MP4-Fast-Start-Header an den Dateianfang, damit Ihr konvertierter Clip beim Online-Teilen sofort ohne Verzögerung anläuft.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Lässt sich meine konvertierte MP4-Datei auf iPhone, Mac und Windows abspielen?',
        answer:
          'Ja. OMECY kodiert mit H.264 im Farbformat yuv420p und AAC-Audio – das wird von iOS, macOS QuickTime, Windows Media Player, Android und allen großen Plattformen nativ unterstützt.',
      },
      {
        question: 'Wird meine Bildschirmaufnahme beim Konvertieren von WebM zu MP4 irgendwo hochgeladen?',
        answer:
          'Niemals. Jedes einzelne Bild wird lokal in Ihrem Browser über Single-Thread-WebAssembly dekodiert und neu kodiert.',
      },
      {
        question: 'Welches Qualitätsprofil sollte ich auswählen?',
        answer:
          '„Ausgewogen“ passt für die meisten Aufnahmen optimal. Wählen Sie „Schnell“ für raschen Chat-Versand oder „Hohe Qualität“, wenn feiner Bildschirmtext in Tutorials scharf bleiben soll.',
      },
      {
        question: 'Bleibt die Tonspur meiner WebM-Datei erhalten?',
        answer:
          'Ja. Opus- oder Vorbis-Tonspuren im WebM-Container werden sauber in standardmäßiges AAC-Stereo-Audio in der MP4-Datei umgewandelt.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'video-compressor': {
    name: 'Video-Kompressor',
    shortName: 'Video-Kompressor',
    cardDesc: 'Verkleinern Sie große Videos für WhatsApp, Discord, E-Mail und Web ganz ohne Upload.',
    meta: {
      title: 'Video-Kompressor – Videos lokal stark verkleinern | OMECY',
      description:
        'Verkleinern Sie große MP4-, MOV- und WebM-Videos für WhatsApp, Discord, E-Mail und Web lokal im Browser. Kostenlos, schnell und privat ohne Upload.',
      h1: 'Online-Video-Kompressor',
      subtitle:
        'Verkleinern Sie große MP4-, MOV- und WebM-Videos für WhatsApp, Discord, E-Mail oder Websites – 100 % lokal in Ihrem Browser.',
    },
    howToTitle: 'So nutzen Sie den Video-Kompressor',
    howToSteps: [
      'Ziehen Sie Ihr MP4-, MOV-, WebM- oder MKV-Video in das Kompressor-Feld oben.',
      'Wählen Sie eine Schnellvorlage (WhatsApp, Discord, E-Mail, Web) oder passen Sie den Regler für „Qualität“ und die „Max. Auflösung“ individuell an.',
      'Klicken Sie auf „Komprimieren“, vergleichen Sie Original- und Ausgabegröße und laden Sie Ihr schlankeres MP4-Video herunter.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Videogröße ohne Upload reduzieren',
        body: 'Große Smartphone-Clips und Kundenprojekte bleiben sicher auf Ihrem eigenen Gerät, statt über Drittanbieter-Server zu laufen.',
      },
      {
        title: 'Auf reale Dateigrößen-Limits abgestimmt',
        body: 'Ein-Klick-Vorlagen setzen praxistaugliche Auflösungs- und Bitratenwerte speziell für Discord, WhatsApp und E-Mail-Anhänge.',
      },
      {
        title: 'Klare Vorher-Nachher-Ersparnis',
        body: 'Sehen Sie sofort, wie viele Megabyte eingespart wurden, und prüfen Sie die Bildschärfe vor dem Herunterladen direkt im Player.',
      },
    ],
    aboutTitle: 'Über intelligente Videokomprimierung im Browser',
    aboutParagraphs: [
      'Moderne Smartphone-Kameras filmen standardmäßig in 4K mit hohen Datenraten, sodass bereits eine Minute Material über 100 MB belegt. Messenger wie Discord und WhatsApp sowie E-Mail-Anbieter setzen strenge Anhangsgrenzen, an denen unkomprimierte Kameraaufnahmen regelmäßig scheitern.',
      'Wirksame Videokomprimierung verbindet zwei Stellschrauben: Constant-Rate-Factor-Kodierung (CRF) mit H.264, die ruhigen Bildbereichen weniger Datenrate zuweist und Bewegungen scharf hält, sowie eine sinnvolle Skalierung (etwa von 4K auf 1080p oder 720p). Zusammen reduzieren beide oft die Dateigröße um 60 bis 85 %, während das Bild auf Handy und Laptop klar bleibt.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Um wie viel kleiner wird mein Video?',
        answer:
          'Die Einsparung hängt von Ausgangsbitrate und Auflösung ab. Unkomprimierte Handyvideos schrumpfen mit den Vorlagen für WhatsApp, Discord oder Web häufig um 50 % bis 85 %.',
      },
      {
        question: 'Werden meine Videos beim Komprimieren in die Cloud geladen?',
        answer:
          'Nein. Die Komprimierung erfolgt vollständig lokal auf Ihrem Gerät per WebAssembly im Browser – Ihre Videos bleiben zu 100 % privat.',
      },
      {
        question: 'Was bedeutet der CRF-Wert neben dem Qualitätsregler?',
        answer:
          'CRF steht für Constant Rate Factor. Niedrigere CRF-Werte bewahren höhere Bildschärfe bei größerer Datei, während höhere CRF-Werte kleinere Dateien für enge Versandlimits erzeugen.',
      },
      {
        question: 'Kann ich ein 4K-Video auf 1080p oder 720p herunterskalieren?',
        answer:
          'Ja. Wählen Sie über „Max. Auflösung“ einfach 1080p, 720p oder 480p aus – das ursprüngliche Seitenverhältnis bleibt dabei automatisch erhalten.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'video-trimmer': {
    name: 'Online-Video-Trimmer',
    shortName: 'Video schneiden',
    cardDesc: 'Schneiden Sie Videoclips mit sofortiger Vorschau und verlustfreier Stream-Kopie.',
    meta: {
      title: 'Online Video schneiden – Schnell & lokal kürzen | OMECY',
      description:
        'Schneiden Sie MP4-, MOV-, WebM- und MKV-Videos direkt im Browser mit sofortiger Vorschau und verlustfreier Kopie. Kostenlos, privat und ohne Upload.',
      h1: 'Online-Video-Trimmer',
      subtitle:
        'Entfernen Sie unerwünschte Anfänge oder Enden aus MP4-, MOV- und WebM-Videos direkt im Browser – ganz ohne Datei-Upload.',
    },
    howToTitle: 'So nutzen Sie den Online-Video-Trimmer',
    howToSteps: [
      'Ziehen Sie eine Videodatei in das Feld oben, um sofort eine lokale Vorschau im Videoplayer zu öffnen.',
      'Bewegen Sie die Regler für „Startzeit“ und „Endzeit“ – oder pausieren Sie das Video und klicken Sie auf „Aktuelle Zeit nutzen“ – um Ihren gewünschten Ausschnitt genau festzulegen.',
      'Wählen Sie „Schnelle verlustfreie Kopie“ für blitzschnelles Schneiden ohne Qualitätsverlust (oder „Präzise Neukodierung“ für bildgenaue Schnitte) und klicken Sie auf „Schneiden & Exportieren“.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Sofortige Wiedergabe ohne Upload',
        body: 'Ihr Browser spielt das lokale Video ohne Wartezeit ab, sodass Sie auch lange Aufnahmen sofort flüssig durchsuchen können.',
      },
      {
        title: 'Verlustfreie Stream-Kopie als Option',
        body: 'Die schnelle verlustfreie Kopie schneidet direkt an Schlüsselbildern ohne Neukodierung und bewahrt in Sekunden 100 % der Originalqualität.',
      },
      {
        title: 'Rohmaterial bleibt vollständig lokal',
        body: 'Kürzen Sie ungeschnittene Bildschirmaufnahmen, Hochzeitsvideos oder Team-Meetings privat, ohne Rohmaterial ins Internet zu laden.',
      },
    ],
    aboutTitle: 'Über verlustfreie Stream-Kopie vs. präzises Videoschneiden',
    aboutParagraphs: [
      'Komprimierte Videoformate speichern alle paar Sekunden ein vollständiges Referenzbild – ein sogenanntes Schlüsselbild (Keyframe) –, während die Bilder dazwischen nur Veränderungen festhalten. Im Modus „Schnelle verlustfreie Kopie“ wird sauber am nächstgelegenen Keyframe getrennt, ohne Pixel neu zu berechnen: Das geht nahezu augenblicklich und erhält Bitrate und Bildschärfe unverändert.',
      'Wenn Sie auf den Bruchteil einer Sekunde genau zwischen zwei Keyframes schneiden möchten – etwa unmittelbar vor einem gesprochenen Satz oder einem Szenenwechsel –, wechseln Sie zu „Präzise Neukodierung“. Dabei wird exakt der gewählte Zeitbereich dekodiert und als flüssiger, überall kompatibler MP4-Clip neu erstellt.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Verliert mein Video durch das Schneiden an Bildqualität?',
        answer:
          'Im Modus „Schnelle verlustfreie Kopie“ findet keine Neukodierung statt – Ihr gekürzter Clip behält 100 % der ursprünglichen Bild- und Tonqualität.',
      },
      {
        question: 'Wann sollte ich „Präzise Neukodierung“ statt der schnellen Kopie wählen?',
        answer:
          'Nutzen Sie die präzise Neukodierung, wenn Ihr Startpunkt zwischen zwei Schlüsselbildern liegt und Sie am Anfang eines verlustfreien Schnitts eine kurze Pause oder einen leichten Zeitversatz bemerken.',
      },
      {
        question: 'Werden meine ungeschnittenen Videos irgendwo hochgeladen?',
        answer:
          'Nein. Sowohl die Vorschau als auch die eigentliche Schnitt-Engine arbeiten komplett in Ihrem Browser ohne Netzwerkübertragung.',
      },
      {
        question: 'Welche Videoformate lassen sich schneiden?',
        answer:
          'Sie können MP4-, MOV-, WebM- und MKV-Dateien schneiden, die von Ihrem Browser und FFmpeg WebAssembly unterstützt werden.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'audio-joiner': {
    name: 'Audio-Joiner & MP3-Merger',
    shortName: 'Audio zusammenfügen',
    cardDesc: 'Verbinden Sie mehrere MP3-, WAV- und M4A-Spuren per Drag-and-Drop mit weicher Überblendung.',
    meta: {
      title: 'Audio zusammenfügen – MP3-Spuren lokal verbinden | OMECY',
      description:
        'Verbinden Sie mehrere MP3-, WAV- und M4A-Audiodateien im Browser mit optionaler Überblendung zu einer Spur. Kostenlos, sofort und privat ohne Upload.',
      h1: 'Audio-Joiner & MP3-Merger',
      subtitle:
        'Kombinieren Sie mehrere MP3-, WAV- oder M4A-Audiodateien lokal zu einer nahtlosen Spur – mit frei sortierbarer Reihenfolge und optionaler Überblendung.',
    },
    howToTitle: 'So nutzen Sie den Audio-Joiner & MP3-Merger',
    howToSteps: [
      'Ziehen Sie zwei oder mehr MP3-, WAV-, M4A- oder OGG-Dateien in das Feld oben.',
      'Ordnen Sie die Spuren per Drag-and-Drop (oder über die Pfeiltasten) in der gewünschten Reihenfolge an, stellen Sie bei Bedarf eine Überblendung ein und wählen Sie MP3 oder verlustfreies WAV.',
      'Klicken Sie auf „Spuren verbinden“, hören Sie die zusammengefügte Vorschau im Browser an und laden Sie Ihre kombinierte Audiodatei herunter.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Sofortiges Mischen per Web Audio',
        body: 'Ihr Browser dekodiert und mischt Audiospuren nativ im Arbeitsspeicher – ganz ohne Warten auf Uploads großer Podcast- oder Musikspuren.',
      },
      {
        title: 'Sanfte Equal-Power-Überblendungen',
        body: 'Verbinden Sie Übergänge ohne harte Pausen oder Lautstärke-Einbrüche mithilfe gleichmäßiger Equal-Power-Überblendungskurven.',
      },
      {
        title: 'Vertrauliches Audio bleibt privat',
        body: 'Fügen Sie Podcast-Folgen, Sprachaufnahmen oder Interviews zusammen, ohne unveröffentlichtes Tonmaterial an fremde Server zu senden.',
      },
    ],
    aboutTitle: 'Über nahtloses Zusammenfügen verschiedener Audioformate',
    aboutParagraphs: [
      'Das Verbinden von Audioclips aus unterschiedlichen Quellen scheitert oft daran, dass eine Spur als 48-kHz-Sprachaufnahme im M4A-Format vorliegt, während das Intro als 44,1-kHz-MP3 oder WAV vorliegt. OMECY gleicht Abtastraten und Stereokanäle automatisch über den OfflineAudioContext des Browsers an, bevor die Spuren nahtlos aneinandergefügt werden.',
      'Wenn eine Überblendung aktiv ist, überlappt OMECY das Ende jedes Clips mit dem Beginn des nächsten anhand von Kosinus-/Sinus-Kurven gleicher wahrgenommener Leistung (Equal Power). Im Gegensatz zu linearen Blenden, die in der Mitte kurz leiser wirken können, bleibt die subjektive Lautstärke über den gesamten Übergang stabil.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Kann ich unterschiedliche Formate wie MP3, WAV und M4A miteinander verbinden?',
        answer:
          'Ja. OMECY dekodiert jede Spur in rohe Audiopuffer, normalisiert die Abtastrate automatisch und exportiert eine einzige saubere MP3- oder WAV-Datei.',
      },
      {
        question: 'Wie ändere ich die Reihenfolge meiner Audioclips?',
        answer:
          'Ziehen Sie eine Spur einfach per Maus in der Liste nach oben oder unten – oder nutzen Sie die barrierefreien Pfeilschaltflächen an jeder Zeile.',
      },
      {
        question: 'Werden meine Audiospuren auf einen Server hochgeladen?',
        answer:
          'Nein. Dekodierung, Überblendung sowie MP3- oder WAV-Kodierung laufen zu 100 % lokal in Ihrem Browser-Tab.',
      },
      {
        question: 'Sollte ich als MP3 oder als WAV exportieren?',
        answer:
          'Wählen Sie MP3 (192–320 kbit/s) für kompakte, teilfertige Podcasts, Playlists und Mitschnitte – oder WAV, wenn Sie die verbundene Datei ohne weitere Komprimierung in einem Audio-Editor weiterbearbeiten möchten.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'mp3-cutter': {
    name: 'MP3-Cutter & Audio-Trimmer',
    shortName: 'MP3 schneiden',
    cardDesc: 'Schneiden Sie MP3- und Audioclips visuell an der Wellenform mit Ein- und Ausblenden.',
    meta: {
      title: 'MP3 schneiden – Audio präzise an der Wellenform | OMECY',
      description:
        'Schneiden Sie MP3- und Audiodateien präzise an der interaktiven Wellenform mit Ein- und Ausblenden direkt im Browser. Kostenlos, privat, ohne Upload.',
      h1: 'MP3-Cutter & Audio-Trimmer',
      subtitle:
        'Schneiden Sie MP3-, WAV- und M4A-Clips visuell an einer klaren Wellenform mit weichem Ein- und Ausblenden – 100 % lokal verarbeitet.',
    },
    howToTitle: 'So nutzen Sie den MP3-Cutter & Audio-Trimmer',
    howToSteps: [
      'Ziehen Sie eine MP3-, WAV-, M4A- oder OGG-Datei in das Feld oben, um sofort die interaktive Audio-Wellenform darzustellen.',
      'Markieren Sie Ihren Ausschnitt über die Regler „Startzeit“ und „Endzeit“, fügen Sie optional „Einblenden“ oder „Ausblenden“ hinzu und prüfen Sie das Timing mit „Auswahl anhören“.',
      'Wählen Sie MP3 oder verlustfreies WAV als Ausgabeformat, klicken Sie auf „Schneiden & Exportieren“ und laden Sie Ihren fertigen Audioclip direkt herunter.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Sofortige visuelle Wellenform',
        body: 'Erkennen Sie Pausen, Beats und Spracheinsätze unmittelbar auf dem Bildschirm, ohne Ihre Datei erst irgendwohin hochzuladen.',
      },
      {
        title: 'Integriertes Ein- und Ausblenden',
        body: 'Vermeiden Sie harte Knackser und abrupte Abbrüche bei Klingeltönen, Podcast-Intros und Soundeffekten durch weiche Lautstärkekurven.',
      },
      {
        title: '100 % Datenschutz im Browser',
        body: 'Persönliche Aufnahmen, Song-Demos und Sprachnotizen bleiben jederzeit sicher auf Ihrem Computer oder Smartphone.',
      },
    ],
    aboutTitle: 'Über präzises Audioschneiden und Klingeltöne',
    aboutParagraphs: [
      'Sauberes Schneiden von Audio erfordert, Pegelspitzen und leise Passagen direkt zu sehen, statt Zeitstempel blind zu schätzen. Weil OMECY die Amplitudenbalken unmittelbar aus den dekodierten PCM-Daten zeichnet, isolieren Sie Refrains, entfernen störende Pausen am Aufnahmebeginn oder erstellen eigene Klingeltöne in wenigen Sekunden.',
      'Schon eine dezente Ein- und Ausblendung von 0,5 Sekunden verhindert digitale Klickgeräusche, die entstehen, wenn eine Schallwelle abseits des Nulldurchgangs hart abgeschnitten wird – so klingt Ihr Ausschnitt sofort rund und professionell.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Kann ich den geschnittenen Ausschnitt vor dem Herunterladen anhören?',
        answer:
          'Ja. Klicken Sie auf „Auswahl anhören“, um exakt Ihren markierten Bereich inklusive eingestellter Ein- und Ausblendungen vorab zu prüfen.',
      },
      {
        question: 'Funktioniert der MP3-Cutter auch mit WAV- und M4A-Dateien?',
        answer:
          'Ja. Sie können MP3-, WAV-, M4A-, OGG- und FLAC-Dateien schneiden, die Ihr Browser unterstützt, und das Ergebnis als MP3 oder WAV speichern.',
      },
      {
        question: 'Werden meine Audiodateien an einen externen Server geschickt?',
        answer:
          'Niemals. Wellenform-Analyse, Zuschnitt, Blenden und MP3-Kodierung laufen vollständig lokal im Arbeitsspeicher Ihres Browsers.',
      },
      {
        question: 'Kann ich damit einen eigenen Klingelton erstellen?',
        answer:
          'Ja. Schneiden Sie ein 20 bis 30 Sekunden langes Highlight aus Ihrem Titel heraus, aktivieren Sie ein sanftes Ausblenden am Ende und exportieren Sie die Datei als MP3 für Android oder Klingelton-Tools.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'wav-to-mp3': {
    name: 'WAV zu MP3 Konverter',
    shortName: 'WAV zu MP3',
    cardDesc: 'Wandeln Sie große unkomprimierte WAV-Dateien lokal in schlanke MP3s mit 128–320 kbit/s um.',
    meta: {
      title: 'WAV zu MP3 Konverter – Audio schnell verkleinern | OMECY',
      description:
        'Wandeln Sie große unkomprimierte WAV-Dateien direkt im Browser in handliche MP3s mit 128–320 kbit/s um. Stapelverarbeitung, kostenlos und ohne Upload.',
      h1: 'WAV zu MP3 Konverter',
      subtitle:
        'Verwandeln Sie große unkomprimierte WAV-Aufnahmen im Stapel in kompakte, universelle MP3-Dateien – 100 % lokal in Ihrem Browser.',
    },
    howToTitle: 'So nutzen Sie den WAV zu MP3 Konverter',
    howToSteps: [
      'Ziehen Sie eine oder mehrere .wav-Dateien in das Feld oben.',
      'Wählen Sie Ihre gewünschte MP3-Bitrate (128, 192, 256 oder 320 kbit/s) je nachdem, ob minimale Dateigröße oder maximale Musikdetails Vorrang haben.',
      'Klicken Sie auf „Konvertieren“, prüfen Sie die angezeigte Dateigrößen-Ersparnis pro Spur und laden Sie die MP3s einzeln oder als ZIP-Archiv herunter.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Kein Hochladen riesiger WAV-Dateien',
        body: 'Unkomprimiertes Stereo-WAV benötigt rund 10 MB pro Minute. Die lokale Umwandlung ist oft fertig, bevor ein klassischer Upload überhaupt 20 % erreicht.',
      },
      {
        title: 'Unveröffentlichte Studio-Spuren schützen',
        body: 'Musiker, Sprecher und Podcaster konvertieren Master-Mixes im Stapel, ohne unveröffentlichtes Audiomaterial fremden Servern anzuvertrauen.',
      },
      {
        title: 'Stapelverarbeitung & sofortiger ZIP-Export',
        body: 'Ziehen Sie einen ganzen Ordner voller WAV-Spuren hinein und laden Sie alle konvertierten MP3s gebündelt in einem einzigen ZIP herunter.',
      },
    ],
    aboutTitle: 'Über unkomprimiertes WAV und kompaktes MP3-Audio',
    aboutParagraphs: [
      'WAV (Waveform Audio File Format) speichert rohe, unkomprimierte PCM-Audiodaten. Eine Stereoaufnahme in CD-Qualität (44,1 kHz, 16 Bit) verbraucht etwa 1.411 kbit/s – das entspricht rund 50 MB für einen fünfminütigen Song. Für die Bearbeitung in einer DAW ist WAV ideal, für E-Mail, Web-Streaming und mobile Bibliotheken jedoch viel zu schwer.',
      'MP3 nutzt psychoakustische Komprimierung, um feine Frequenzanteile zu entfernen, die vom menschlichen Gehör neben lauteren Signalen kaum wahrgenommen werden. Die Umwandlung von WAV zu MP3 mit 192 oder 320 kbit/s verringert die Dateigröße typischerweise um 75 bis 90 % bei sauberer Wiedergabe auf praktisch jedem Gerät.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Wie viel kleiner ist eine MP3-Datei im Vergleich zu WAV?',
        answer:
          'Eine MP3-Datei mit 192 kbit/s ist in der Regel etwa 85 % kleiner als eine herkömmliche 16-Bit-Stereo-WAV-Datei; bei 320 kbit/s sinkt die Dateigröße um rund 75 %.',
      },
      {
        question: 'Kann ich mehrere WAV-Dateien gleichzeitig in MP3 umwandeln?',
        answer:
          'Ja. Ziehen Sie mehrere WAV-Dateien auf einmal hinein, wandeln Sie den gesamten Stapel mit einem Klick um und laden Sie die Dateien einzeln oder über „Alle als ZIP laden“ herunter.',
      },
      {
        question: 'Werden meine WAV-Aufnahmen auf einen Server hochgeladen?',
        answer:
          'Nein. Die Umwandlung läuft vollständig lokal in Ihrem Browser über natives Web-Audio-Decoding und einen lokalen JavaScript-/WebAssembly-MP3-Encoder.',
      },
      {
        question: 'Welche Bitrate eignet sich für Musik und welche für Sprache?',
        answer:
          'Nutzen Sie 128 kbit/s für Sprache und Notizen, 192 kbit/s für Podcasts und den Alltag sowie 256–320 kbit/s für Musikveröffentlichungen und Hörproben.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'm4a-to-mp3': {
    name: 'M4A zu MP3 Konverter',
    shortName: 'M4A zu MP3',
    cardDesc: 'Wandeln Sie iPhone-Sprachmemos und Apple-M4A-Dateien lokal in universelle MP3-Spuren um.',
    meta: {
      title: 'M4A zu MP3 Konverter – Sprachmemos privat wandeln | OMECY',
      description:
        'Konvertieren Sie Apple-M4A-Aufnahmen und iPhone-Sprachmemos privat direkt im Browser in universelle MP3-Dateien. Kostenlos, sofort und ohne Upload.',
      h1: 'M4A zu MP3 Konverter',
      subtitle:
        'Konvertieren Sie iPhone-Sprachmemos, macOS-Aufnahmen und Apple-M4A-Audio direkt in Ihrem Browser in universelle MP3-Dateien.',
    },
    howToTitle: 'So nutzen Sie den M4A zu MP3 Konverter',
    howToSteps: [
      'Ziehen Sie eine oder mehrere .m4a- oder .aac-Audiodateien (z. B. iPhone-Sprachmemos) in den Konverter oben.',
      'Wählen Sie die gewünschte MP3-Bitrate – 128 kbit/s klingen für Sprachmemos kristallklar, während 192–320 kbit/s optimal für Musik sind.',
      'Klicken Sie auf „Konvertieren“, um alle Dateien lokal umzuwandeln, hören Sie das Ergebnis probe und laden Sie einzelne MP3s oder das ZIP-Paket herunter.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Persönliche Sprachmemos bleiben vertraulich',
        body: 'Sprachnotizen, Gesprächsmitschnitte und private Erinnerungen bleiben vollständig auf Ihrem Gerät statt über unbekannte Web-Konverter zu laufen.',
      },
      {
        title: 'Schnelle native Browser-Dekodierung',
        body: 'Moderne Browser dekodieren AAC/M4A nativ in hohem Tempo, sodass Minuten gesprochener Aufnahme in wenigen Sekunden als MP3 bereitstehen.',
      },
      {
        title: 'Überall nutzbar ohne App-Installation',
        body: 'Kein iTunes, keine Desktop-Programme und keine kostenpflichtigen Tools nötig – konvertieren Sie direkt in Chrome, Safari, Edge oder Firefox.',
      },
    ],
    aboutTitle: 'Über Apple-M4A-Dateien und universelle MP3-Kompatibilität',
    aboutParagraphs: [
      'Apple-Geräte – darunter iPhone-Sprachmemos, iPad, QuickTime und GarageBand – speichern Aufnahmen standardmäßig im .m4a-Container (MPEG-4 Audio), meist kodiert mit AAC oder ALAC. Innerhalb der Apple-Welt arbeitet M4A sehr effizient, doch viele Windows-Programme, Autoradios, Transkriptionsdienste und Upload-Formulare verlangen weiterhin ausdrücklich .mp3-Dateien.',
      'Die Umwandlung von M4A in MP3 sorgt dafür, dass Ihre Aufnahme auf jedem PC, Android-Smartphone, in Präsentationen und auf älteren Playern ohne Codec-Fehlermeldung läuft – während Ihre privaten Aufnahmen komplett lokal unter Ihrer Kontrolle bleiben.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Funktioniert das Tool mit iPhone-Sprachmemos (.m4a)?',
        answer:
          'Ja. Senden Sie Ihr Sprachmemo per AirDrop oder Teilen-Menü auf Ihr Gerät, ziehen Sie die .m4a-Datei in OMECY und wandeln Sie sie in Sekunden in eine Standard-MP3 um.',
      },
      {
        question: 'Werden meine Sprachaufnahmen irgendwo hochgeladen?',
        answer:
          'Nein. Sowohl die Dekodierung als auch die MP3-Kodierung geschehen strikt lokal in Ihrem Browser-Tab ohne jegliche Serverübertragung.',
      },
      {
        question: 'Kann ich mehrere M4A-Dateien gleichzeitig konvertieren?',
        answer:
          'Ja. Wählen oder ziehen Sie mehrere M4A-Dateien gemeinsam hinein und laden Sie anschließend alle fertigen MP3s einzeln oder gebündelt als ZIP herunter.',
      },
      {
        question: 'Welche Bitrate empfiehlt sich für M4A-Sprachaufnahmen?',
        answer:
          '128 kbit/s oder 192 kbit/s bewahren die volle Stimmklarheit von iPhone-Mikrofonen und halten die Dateigröße angenehm klein zum Teilen.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'image-compressor': {
    name: 'Bild-Kompressor',
    shortName: 'Bilder komprimieren',
    cardDesc: 'Komprimieren Sie JPG-, PNG- und WebP-Fotos im Stapel lokal mit Qualitätsregler und ZIP.',
    meta: {
      title: 'Bilder komprimieren – JPG, PNG & WebP verkleinern | OMECY',
      description:
        'Komprimieren Sie JPG-, PNG- und WebP-Bilder im Stapel direkt im Browser mit Qualitätsregler und ZIP-Download. Kostenlos, sofort und ohne Datei-Upload.',
      h1: 'Online-Bild-Kompressor',
      subtitle:
        'Verkleinern Sie JPG-, PNG- und WebP-Fotos im Stapel direkt in Ihrem Browser – mit sofortiger Ersparnis-Anzeige und ohne Upload.',
    },
    howToTitle: 'So nutzen Sie den Bild-Kompressor',
    howToSteps: [
      'Ziehen Sie ein einzelnes oder Dutzende JPG-, PNG- oder WebP-Bilder in das Feld oben.',
      'Stellen Sie den Regler für „Qualität“ ein (75–85 % bieten meist das beste Gleichgewicht aus scharfen Web-Fotos und deutlich geringerer Dateigröße).',
      'Klicken Sie auf „Komprimieren“, um alle Bilder lokal zu optimieren, prüfen Sie die eingesparte Größe und laden Sie die Dateien einzeln oder als ZIP herunter.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Private Fotos verlassen niemals Ihr Gerät',
        body: 'Kundenmotive, persönliche Schnappschüsse und eingescannte Dokumente bleiben strikt in Ihrem aktiven Browser-Tab.',
      },
      {
        title: 'Millisekunden statt Upload-Balken',
        body: 'Die Canvas-basierte lokale Optimierung arbeitet direkt auf Ihrem Rechner – ohne Server-Warteschlangen oder Stückzahl-Beschränkungen.',
      },
      {
        title: 'Gebaut für schnelle Websites & Core Web Vitals',
        body: 'Schlankere Bilder beschleunigen den Largest Contentful Paint (LCP), reduzieren E-Mail-Anhänge und sparen mobiles Datenvolumen.',
      },
    ],
    aboutTitle: 'Über das Optimieren von JPG-, PNG- und WebP-Bildern',
    aboutParagraphs: [
      'Unoptimierte Kamerafotos und Design-Exporte bringen leicht 3 bis 10 MB pro Bild auf die Waage, bremsen Websites aus und sprengen Upload-Grenzen in Online-Formularen. Kluge verlustbehaftete Komprimierung entfernt feine Farbnuancen, die das menschliche Auge kaum unterscheidet, während Kanten, Strukturen und Schriftzüge sauber bleiben.',
      'Bei Fotos senken JPG und WebP mit 75 bis 85 % Qualität die Dateigröße oft um 60 bis 80 % bei nahezu identischem Bildeindruck. Bei Screenshots und Oberflächengrafiken im PNG-Format entfernt eine gezielte Neuoptimierung unnötigen Ballast und hält klare Linien scharf.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Welche Bildformate kann ich komprimieren?',
        answer:
          'OMECY komprimiert JPG/JPEG-, PNG- und WebP-Bilder direkt im Browser und behält das jeweilige Dateiformat bei reduzierter Dateigröße bei.',
      },
      {
        question: 'Kann ich mehrere Fotos gleichzeitig komprimieren?',
        answer:
          'Ja. Ziehen Sie beliebig viele Bilder gleichzeitig hinein, sehen Sie die gesamte Megabyte-Ersparnis und laden Sie alle optimierten Fotos als ein ZIP-Archiv herunter.',
      },
      {
        question: 'Werden meine Bilder an einen Server gesendet?',
        answer:
          'Nein. Die Komprimierung läuft vollständig lokal über die Canvas-API Ihres Browsers und clientseitiges JavaScript – es werden keine Bilder über das Netzwerk übertragen.',
      },
      {
        question: 'Welche Qualitätsstufe bietet die beste Balance aus Schärfe und Dateigröße?',
        answer:
          'Ein Wert zwischen 75 % und 82 % liefert meist eine deutliche Verkleinerung bei hoher Bildschärfe für Websites, Blogs und E-Mails.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'webp-to-jpg': {
    name: 'WebP zu JPG Konverter',
    shortName: 'WebP zu JPG',
    cardDesc: 'Wandeln Sie WebP-Bilder aus dem Web im Stapel in universelle JPGs mit Hintergrundfarbe um.',
    meta: {
      title: 'WebP zu JPG Konverter – Fotos im Stapel umwandeln | OMECY',
      description:
        'Wandeln Sie WebP-Bilder aus dem Web im Stapel in universelle JPG-Fotos um – mit Hintergrundfarbe für Transparenz. Kostenlos, sofort und ohne Upload.',
      h1: 'WebP zu JPG Konverter',
      subtitle:
        'Konvertieren Sie gespeicherte WebP-Dateien im Stapel in universell lesbare JPG-Bilder mit wählbarer Hintergrundfarbe – 100 % lokal.',
    },
    howToTitle: 'So nutzen Sie den WebP zu JPG Konverter',
    howToSteps: [
      'Ziehen Sie eine oder mehrere .webp-Dateien in das Feld oben.',
      'Passen Sie die JPG-Qualität an und wählen Sie bei Bedarf eine Hintergrundfarbe für Transparenz (standardmäßig reines Weiß) für freigestellte WebP-Grafiken.',
      'Klicken Sie auf „Konvertieren“ und speichern Sie Ihre fertigen JPG-Bilder einzeln oder gesammelt als ZIP-Datei.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Sofortige Canvas-Konvertierung',
        body: 'Da Ihr Browser WebP nativ darstellt, dauert die Umwandlung von Dutzenden Bildern in JPG lokal nur Bruchteile einer Sekunde.',
      },
      {
        title: 'Sauberer Umgang mit Transparenz',
        body: 'Statt schwarzer Ränder hinter transparenten Stickern oder Produktfreistellern füllt OMECY transparente Bereiche sauber mit Weiß oder Ihrer Wunschfarbe.',
      },
      {
        title: 'Kein Upload & ZIP-Export für Stapel',
        body: 'Konvertieren Sie beliebig viele gespeicherte Grafiken und Produktfotos, ohne eine einzige Datei auf externe Server hochzuladen.',
      },
    ],
    aboutTitle: 'Über WebP-Downloads und universelle JPG-Unterstützung',
    aboutParagraphs: [
      'WebP wurde von Google entwickelt, um Bilder auf modernen Websites mit kleinerer Dateigröße auszuliefern – weshalb „Bild speichern unter“ in Chrome, Edge oder Safari heute immer häufiger eine .webp-Datei erzeugt. Viele ältere Bildbetrachter, Photoshop-Versionen, Fotodruck-Terminals, Marktplätze und Office-Programme verlangen jedoch nach wie vor ausdrücklich .jpg.',
      'Da JPG keinen Alpha-Kanal für Transparenz besitzt, muss ein transparentes WebP auf einer deckenden Hintergrundfarbe abgelegt werden. Bei OMECY wählen Sie diese Füllfarbe (standardmäßig Weiß) und die gewünschte JPG-Qualität direkt vor dem Export selbst aus.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Was passiert mit transparenten Bereichen beim Umwandeln von WebP in JPG?',
        answer:
          'Da JPG keine Transparenz unterstützt, füllt OMECY transparente Pixel standardmäßig sauber mit reinem Weiß (#FFFFFF) – oder mit jeder anderen von Ihnen gewählten Farbe.',
      },
      {
        question: 'Kann ich einen ganzen Stapel WebP-Bilder auf einmal in JPG umwandeln?',
        answer:
          'Ja. Ziehen Sie mehrere WebP-Dateien zusammen hinein, konvertieren Sie alle mit einem Klick und laden Sie die JPGs einzeln oder als ZIP-Archiv herunter.',
      },
      {
        question: 'Werden meine WebP-Bilder auf einen Server hochgeladen?',
        answer:
          'Nein. Alles geschieht lokal in Ihrem Browser über die HTML5 Canvas API, sodass Ihre Bilder Ihr Gerät nicht verlassen.',
      },
      {
        question: 'Ändern sich die Bildabmessungen beim Konvertieren von WebP zu JPG?',
        answer:
          'Nein. Das erzeugte JPG behält exakt die ursprüngliche Breite und Höhe in Pixeln der WebP-Quelldatei bei.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'heic-to-jpg': {
    name: 'HEIC zu JPG Konverter',
    shortName: 'HEIC zu JPG',
    cardDesc: 'Konvertieren Sie iPhone- und iOS-HEIC-Fotos privat auf Ihrem Gerät in Standard-JPGs.',
    meta: {
      title: 'HEIC zu JPG Konverter – iPhone-Fotos lokal wandeln | OMECY',
      description:
        'Konvertieren Sie iPhone- und iOS-HEIC-Fotos direkt auf Ihrem Gerät in universelle JPG-Bilder – kostenlos, schnell und 100 % privat ohne Server-Upload.',
      h1: 'HEIC zu JPG Konverter',
      subtitle:
        'Konvertieren Sie iPhone- und iPad-HEIC-Fotos direkt auf Ihrem Gerät in universelle JPG-Bilder – ganz ohne Foto-Upload.',
    },
    howToTitle: 'So nutzen Sie den HEIC zu JPG Konverter',
    howToSteps: [
      'Ziehen Sie ein oder mehrere .heic- oder .heif-Fotos vom iPhone in das Konverter-Feld oben.',
      'Wählen Sie die gewünschte JPG-Qualität (90 % erhalten scharfe Kameradetails bei moderater Dateigröße).',
      'Klicken Sie auf „Konvertieren“, um die Fotos lokal im Browser zu dekodieren, und speichern Sie einzelne JPGs oder nutzen Sie „Alle als ZIP laden“.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Ihre Fotomediathek bleibt privat',
        body: 'Familienbilder, Urlaubsfotos und fotografierte Unterlagen müssen niemals auf fremde Websites hochgeladen werden, nur um das Dateiformat zu ändern.',
      },
      {
        title: 'Ohne Zusatz-Codecs unter Windows',
        body: 'Öffnen und konvertieren Sie Apple-HEIC-Dateien direkt in Chrome, Edge oder Firefox – ganz ohne kostenpflichtige Codec-Erweiterungen aus dem Microsoft Store.',
      },
      {
        title: 'Stapelkonvertierung mit ZIP-Download',
        body: 'Ziehen Sie eine ganze Serie von iPhone-Bildern hinein und laden Sie alle fertigen JPG-Fotos mit einem Klick gesammelt herunter.',
      },
    ],
    aboutTitle: 'Über iPhone-HEIC-Fotos und warum JPG weiterhin gebraucht wird',
    aboutParagraphs: [
      'Seit iOS 11 speichern iPhones und iPads Fotos standardmäßig im Format HEIC (High Efficiency Image Container), das auf dem HEVC-Standard basiert. HEIC liefert hohe Bildschärfe bei ungefähr halbem Speicherbedarf gegenüber klassischem JPEG und spart so wertvollen Speicherplatz auf dem Smartphone.',
      'Viele Windows-PCs, Android-Apps, Bewerbungsportale, Behördenformulare und Redaktionssysteme haben jedoch weiterhin Probleme mit .heic-Dateien. OMECY lädt erst beim Start Ihrer Konvertierung einen lokalen HEIC-Decoder in den Browser und liefert sofort überall lesbare JPG-Fotos – ohne Kompromisse beim Datenschutz.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Werden meine iPhone-HEIC-Fotos bei der Konvertierung hochgeladen?',
        answer:
          'Niemals. OMECY dekodiert HEIC-Bilder ausschließlich lokal im Arbeitsspeicher Ihres Browsers auf Ihrem Gerät – Ihre privaten Aufnahmen verlassen den Rechner nicht.',
      },
      {
        question: 'Funktioniert das unter Windows 10 und Windows 11 ohne zusätzliche Codecs?',
        answer:
          'Ja. Da die Dekodierung per JavaScript/WebAssembly direkt im Browser erfolgt, benötigen Sie keine kostenpflichtigen HEVC- oder HEIF-Erweiterungen für Windows.',
      },
      {
        question: 'Kann ich Dutzende HEIC-Fotos gleichzeitig konvertieren?',
        answer:
          'Ja. Ziehen Sie mehrere .heic-Dateien gemeinsam hinein und laden Sie alle konvertierten JPGs einzeln oder gebündelt in einem ZIP-Archiv herunter.',
      },
      {
        question: 'Warum dauert die Umwandlung hochauflösender HEIC-Fotos einen kurzen Moment?',
        answer:
          'Aktuelle iPhone-Fotos besitzen 12 bis 48 Megapixel und erfordern eine vollständige HEVC-Dekodierung im Browser. Die lokale Ausführung hält Ihre Bilder vollständig privat und ist in wenigen Sekunden erledigt.',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },

  'image-resizer': {
    name: 'Bildgröße ändern',
    shortName: 'Bildgröße ändern',
    cardDesc: 'Skalieren Sie Fotos nach exakten Pixeln, Prozent oder Social-Media-Vorlagen mit Proportionalsperre.',
    meta: {
      title: 'Bildgröße ändern – Fotos nach Pixel & Social Media | OMECY',
      description:
        'Ändern Sie die Größe von JPG-, PNG- und WebP-Fotos nach Pixeln, Prozent oder Social-Media-Vorlagen direkt im Browser. Kostenlos und ohne Datei-Upload.',
      h1: 'Online-Tool zum Ändern der Bildgröße',
      subtitle:
        'Ändern Sie die Abmessungen von JPG-, PNG- und WebP-Bildern nach exakten Pixeln, Prozent oder Social-Media-Vorlagen – 100 % lokal im Browser.',
    },
    howToTitle: 'So ändern Sie die Bildgröße mit OMECY',
    howToSteps: [
      'Ziehen Sie ein JPG-, PNG- oder WebP-Bild in das Feld oben, um sofort die ursprünglichen Pixelmaße anzuzeigen.',
      'Geben Sie eigene Werte für „Breite“ und „Höhe“ in Pixeln ein (mit aktivierter oder deaktivierter Option „Seitenverhältnis sperren“), wechseln Sie zu „Prozent“ oder wählen Sie eine der Vorlagen für Social Media & Web.',
      'Wählen Sie JPG, PNG oder WebP als Ausgabeformat, klicken Sie auf „Bildgröße ändern“, prüfen Sie die scharfe Vorschau und laden Sie Ihr Bild sofort herunter.',
    ],
    whyLocalTitle: 'Warum Dateien lokal mit OMECY verarbeiten?',
    whyLocalPoints: [
      {
        title: 'Hochwertige lokale Neuberechnung',
        body: 'Nutzt glattes, hochwertiges Canvas-Resampling direkt im Browser für saubere Kanten und scharfe Verkleinerungen.',
      },
      {
        title: 'Social-Media-Formate mit einem Klick',
        body: 'Treffen Sie sofort exakte Maße für Instagram Quadrat (1080×1080), Hochformat (1080×1350), YouTube-Thumbnails (1280×720) oder Open-Graph-Banner (1200×630).',
      },
      {
        title: 'Privat, sofort und ohne Anmeldung',
        body: 'Passen Sie Profilbilder, Produktkataloge und Bloggrafiken an, ohne ein einziges Foto ins Netz hochzuladen.',
      },
    ],
    aboutTitle: 'Über das Anpassen von Bildgrößen für Web & Social Media',
    aboutParagraphs: [
      'Das Hochladen riesiger 4000-Pixel-Fotos für einen Blog-Header oder ein Profilbild verschwendet Bandbreite und zwingt Plattformen zu unberechenbarer serverseitiger Nachkomprimierung. Wenn Sie Bilder vor der Veröffentlichung auf die exakt benötigte Pixelgröße skalieren, bleiben Texte, Logos und Porträts sichtbar schärfer.',
      'Mit aktivierter Option „Seitenverhältnis sperren“ verhindern Sie versehentliches Strecken oder Stauchen, sobald Sie eine neue Breite oder Höhe eintippen. Gleichzeitig können Sie das Ausgabeformat wechseln – etwa einen schweren PNG-Screenshot auf die passende Größe verkleinern und direkt als leichtes WebP oder JPG fürs Web speichern.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        question: 'Wie ändere ich die Bildgröße, ohne das Foto zu verzerren?',
        answer:
          'Lassen Sie „Seitenverhältnis sperren“ aktiviert, während Sie entweder Breite oder Höhe eingeben – oder nutzen Sie den Prozent-Modus –, damit die Proportionen exakt erhalten bleiben.',
      },
      {
        question: 'Kann ich beim Skalieren gleichzeitig das Dateiformat ändern?',
        answer:
          'Ja. Sie können Ihr angepasstes Foto als JPG, PNG oder WebP exportieren und bei JPG und WebP zusätzlich die Qualitätsstufe festlegen.',
      },
      {
        question: 'Werden meine Fotos beim Ändern der Bildgröße auf einen Server geladen?',
        answer:
          'Nein. Die Skalierung läuft vollständig lokal in Ihrem Browser über die HTML5 Canvas API – ganz ohne Datei-Upload.',
      },
      {
        question: 'Welche Social-Media-Vorlagen sind enthalten?',
        answer:
          'OMECY bietet Ein-Klick-Vorlagen für Instagram Quadrat (1080×1080), Instagram Hochformat (1080×1350), Story/Reels (1080×1920), YouTube-Thumbnails (1280×720), Open Graph (1200×630) und Web Full HD (1920×1080).',
      },
    ],
    relatedTitle: 'Verwandte Medien-Tools auf OMECY',
  },
};
