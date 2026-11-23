import type { ToolDictionary } from '../types';

export const toolsEn: ToolDictionary = {
  'video-to-mp3': {
    name: 'Video to MP3 Converter',
    shortName: 'Video to MP3',
    cardDesc: 'Extract crisp MP3 audio from MP4, MOV, WebM, and MKV videos locally in seconds.',
    meta: {
      title: 'Video to MP3 Converter – Extract Audio Privately | OMECY',
      description:
        'Extract crisp MP3 audio from MP4, MOV, WebM, and MKV videos right in your browser. Choose 128–320 kbps bitrate for free with zero file uploads.',
      h1: 'Video to MP3 Converter',
      subtitle:
        'Extract clean MP3 audio tracks from MP4, MOV, WebM, and MKV videos directly in your browser without uploading your files.',
    },
    howToTitle: 'How to Use Video to MP3 Converter',
    howToSteps: [
      'Drop an MP4, MOV, WebM, or MKV video file into the box above, or click Choose File to pick one from your device.',
      'Select your preferred MP3 audio bitrate: 128 kbps for lightweight voice clips, 192 kbps for balanced everyday listening, or 320 kbps for studio-grade music.',
      'Click Extract MP3 Audio to run the conversion locally, preview the track, and save your MP3 file instantly.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Zero-Upload Privacy',
        body: 'Lectures, private interviews, and personal recordings stay strictly inside your browser tab instead of sitting on remote conversion servers.',
      },
      {
        title: 'Skip Long Video Uploads',
        body: 'Why upload a 500 MB video over slow Wi-Fi just to download a 5 MB MP3? Local extraction reads directly from your disk.',
      },
      {
        title: 'Free Without Limits or Sign-Up',
        body: 'Convert as many clips as you need without daily caps, email prompts, or software installation.',
      },
    ],
    aboutTitle: 'About Extracting MP3 Audio from Video Files',
    aboutParagraphs: [
      'Most video files wrap separate video and audio streams inside containers like MP4, MOV, WebM, or MKV. When you extract audio to MP3, OMECY strips away the visual frames and encodes only the sound stream with the LAME MP3 encoder inside WebAssembly, shrinking a multi-hundred-megabyte video down to a portable audio track.',
      'Choosing the right bitrate balances clarity and file size. Spoken recordings, webinars, and meeting recaps sound clear at 128 kbps while keeping files tiny. Music videos, acoustic covers, and concert clips benefit from 192 kbps or 320 kbps to preserve high-frequency detail across headphones and car stereos.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Are my videos uploaded to a server when extracting MP3 audio?',
        answer:
          'No. OMECY processes your video strictly inside your browser using a client-side WebAssembly engine. Your video file never leaves your device.',
      },
      {
        question: 'Which video formats can I convert to MP3?',
        answer:
          'You can extract audio from MP4, MOV (iPhone and QuickTime), WebM, MKV, AVI, and M4V video files.',
      },
      {
        question: 'What MP3 bitrate should I choose?',
        answer:
          'Pick 128 kbps for podcasts and speech, 192 kbps for general music and YouTube-style clips, or 320 kbps for maximum audio fidelity.',
      },
      {
        question: 'Why is there a short engine download the first time I convert?',
        answer:
          'To keep pages blazing fast, OMECY lazy-loads the WebAssembly audio/video engine only when you start your first job. After that, your browser caches it for faster subsequent conversions.',
      },
      {
        question: 'Is there a file size limit?',
        answer:
          'OMECY does not impose artificial server caps. Practical limits depend only on your device memory, and most desktop browsers comfortably handle videos up to several hundred megabytes.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'webm-to-mp4': {
    name: 'WebM to MP4 Converter',
    shortName: 'WebM to MP4',
    cardDesc: 'Convert browser and screen-recorded WebM videos into universal H.264 MP4 files.',
    meta: {
      title: 'WebM to MP4 Converter – Fast Local Browser Video | OMECY',
      description:
        'Convert WebM screen recordings and web clips into universally compatible H.264 MP4 videos right in your browser. Free, fast, and 100% private.',
      h1: 'WebM to MP4 Converter',
      subtitle:
        'Turn WebM screen recordings and web downloads into universally playable H.264 MP4 videos locally in your browser.',
    },
    howToTitle: 'How to Use WebM to MP4 Converter',
    howToSteps: [
      'Drop your .webm video file into the converter card above or click Choose File.',
      'Choose a quality preset: Fast for quick sharing, Balanced for everyday sharpness and file size, or High Quality for crisp detail.',
      'Click Convert to MP4, preview the exported video in the player, and click Download MP4.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Keep Screen Captures Confidential',
        body: 'Bug reports, product demos, and Chrome screen recordings often show private tabs or dashboards—local conversion keeps them completely off external servers.',
      },
      {
        title: 'No Waiting in Cloud Queues',
        body: 'Conversion starts immediately on your own computer without waiting behind other users or slow upload bars.',
      },
      {
        title: 'Clean MP4 Output Without Watermarks',
        body: 'Export standard H.264 video with AAC audio and fast-start metadata so clips play immediately on iOS, Windows, macOS, and social apps.',
      },
    ],
    aboutTitle: 'About WebM vs. MP4 Video Compatibility',
    aboutParagraphs: [
      'WebM is an open web video container widely generated by browser screen recorders, Chrome extensions, video conferencing tools, and web apps using VP8, VP9, or AV1 video paired with Opus audio. While modern web browsers play WebM smoothly, many older video editors, PowerPoint decks, iPhones, and messaging apps still reject .webm attachments.',
      'MP4 encoded with H.264 (yuv420p pixel format) and AAC audio remains the most universally supported video standard on earth. OMECY also writes the MP4 fast-start atom at the front of the file so your converted clip begins playing right away when shared online.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Will my converted MP4 play on iPhone, Mac, and Windows?',
        answer:
          'Yes. OMECY encodes using H.264 with yuv420p color formatting and AAC audio, which is natively supported by iOS, macOS QuickTime, Windows Media Player, Android, and major social platforms.',
      },
      {
        question: 'Does converting WebM to MP4 upload my screen recording anywhere?',
        answer:
          'Never. Every frame is decoded and re-encoded locally in your browser via single-threaded WebAssembly.',
      },
      {
        question: 'Which quality preset should I pick?',
        answer:
          'Balanced is ideal for most recordings. Choose Fast when you want rapid encoding for quick chat sharing, or High Quality when preserving sharp UI text in tutorials.',
      },
      {
        question: 'Does this converter preserve audio from my WebM file?',
        answer:
          'Yes. Opus or Vorbis audio tracks inside the WebM container are cleanly converted into standard AAC stereo audio inside the MP4 file.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'video-compressor': {
    name: 'Video Compressor',
    shortName: 'Video Compressor',
    cardDesc: 'Shrink heavy videos for WhatsApp, Discord, email, and web without uploading.',
    meta: {
      title: 'Video Compressor – Shrink Videos for Chat & Web | OMECY',
      description:
        'Reduce video file size for WhatsApp, Discord, email, and web uploads without sending files to any server. Free local MP4 compression in your browser.',
      h1: 'Online Video Compressor',
      subtitle:
        'Shrink large MP4, MOV, and WebM videos for WhatsApp, Discord, email, or the web—100% locally in your browser.',
    },
    howToTitle: 'How to Use Video Compressor',
    howToSteps: [
      'Drop your MP4, MOV, WebM, or MKV video into the compressor box above.',
      'Pick a quick preset (WhatsApp, Discord, Email, Web) or fine-tune the Quality slider and maximum output resolution yourself.',
      'Click Compress, compare the original and reduced file sizes, and download your smaller MP4 video.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Zero-Upload Video Shrinking',
        body: 'Large phone clips and client deliverables stay safely on your device instead of uploading to third-party servers.',
      },
      {
        title: 'Tailored for Real Attachment Caps',
        body: 'One-click presets dial in practical resolution and bitrate settings suited for Discord, WhatsApp, and email attachments.',
      },
      {
        title: 'Transparent Before & After Size Stats',
        body: 'Immediately inspect exact megabytes saved and preview playback sharpness before saving the output file.',
      },
    ],
    aboutTitle: 'About Smart Browser Video Compression',
    aboutParagraphs: [
      'Modern smartphone cameras shoot 4K video at high bitrates that quickly exceed 100 MB for a single minute of footage. Messaging apps like Discord, WhatsApp, and email providers enforce strict attachment size ceilings that block raw camera recordings.',
      'Effective compression combines two levers: Constant Rate Factor (CRF) H.264 encoding, which allocates fewer bits to static scenes while preserving motion detail, and sensible resolution downscaling (such as 4K down to 1080p or 720p). Together, they frequently cut video file sizes by 60–85% while keeping playback clear on phone and laptop screens.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How much smaller will my video become?',
        answer:
          'Reduction depends on the source video bitrate and resolution. Uncompressed phone clips often shrink by 50% to 85% when using the WhatsApp, Discord, or Web presets.',
      },
      {
        question: 'Are my videos uploaded to the cloud during compression?',
        answer:
          'No. Compression runs entirely on your device inside your browser using WebAssembly, so your videos remain 100% private.',
      },
      {
        question: 'What does the CRF number next to the quality slider mean?',
        answer:
          'CRF stands for Constant Rate Factor. Lower CRF values keep higher visual sharpness with larger files, while higher CRF values produce smaller files for tight upload limits.',
      },
      {
        question: 'Can I downscale a 4K video to 720p or 1080p?',
        answer:
          'Yes. Use the Max Resolution dropdown to scale down to 1080p, 720p, or 480p while automatically preserving the original aspect ratio.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'video-trimmer': {
    name: 'Online Video Trimmer',
    shortName: 'Video Trimmer',
    cardDesc: 'Cut and trim video clips with instant playback preview and lossless stream copy.',
    meta: {
      title: 'Online Video Trimmer – Cut Clips Fast & Privately | OMECY',
      description:
        'Trim and cut MP4, MOV, WebM, and MKV videos directly in your browser with instant preview and lossless stream copy. Free, fast, with zero uploads.',
      h1: 'Online Video Trimmer',
      subtitle:
        'Trim unwanted beginnings or endings from MP4, MOV, and WebM videos right in your browser with zero file uploads.',
    },
    howToTitle: 'How to Use Online Video Trimmer',
    howToSteps: [
      'Drop a video file into the trimmer above to load an instant local preview in the video player.',
      'Drag the Start Time and End Time sliders—or pause playback and click Use Current Time—to frame the exact segment you want to keep.',
      'Choose Fast Lossless Copy for instant zero-quality-loss trimming (or Accurate Re-encode for frame-exact cuts), then click Trim & Export.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Instant Playback Without Uploading',
        body: 'Your browser plays the local video immediately so you can scrub through long recordings without waiting for an upload bar.',
      },
      {
        title: 'Lossless Stream Copy Option',
        body: 'Fast Lossless Copy trims directly on video keyframes without re-encoding, preserving 100% of original visual quality in seconds.',
      },
      {
        title: 'Private Footage Stays Local',
        body: 'Cut raw screen captures, wedding clips, or team calls privately without sending unedited footage online.',
      },
    ],
    aboutTitle: 'About Lossless Stream Copy vs. Accurate Video Trimming',
    aboutParagraphs: [
      'Compressed video formats store full reference pictures called keyframes every few seconds, with intermediate frames recording only changes between them. Fast Lossless Copy mode slices cleanly along the nearest keyframe without re-compressing pixels—making it near-instant and preserving identical original bitrate and crispness.',
      'When you need split-second precision between keyframes—such as cutting right before a spoken word or transition—switch to Accurate Re-encode mode. It decodes and cleanly re-encodes the exact chosen range into a smooth, universally compatible MP4 clip.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Does trimming a video reduce its visual quality?',
        answer:
          'In Fast Lossless Copy mode, zero re-encoding occurs, so your trimmed clip keeps 100% of the original video and audio quality.',
      },
      {
        question: 'When should I use Accurate Re-encode instead of Fast Lossless Copy?',
        answer:
          'Use Accurate Re-encode if your start point falls between keyframes and you notice a brief pause or slight offset at the very beginning of a lossless cut.',
      },
      {
        question: 'Are my unedited videos uploaded anywhere?',
        answer:
          'No. Both the preview player and the trimming engine run completely inside your browser with zero network uploads.',
      },
      {
        question: 'Which video formats can I trim?',
        answer:
          'You can trim MP4, MOV, WebM, and MKV files supported by your browser and FFmpeg WebAssembly.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'audio-joiner': {
    name: 'Audio Joiner & MP3 Merger',
    shortName: 'Audio Joiner',
    cardDesc: 'Combine multiple MP3, WAV, and M4A tracks with drag-to-reorder and smooth crossfade.',
    meta: {
      title: 'Audio Joiner & MP3 Merger – Combine Tracks Free | OMECY',
      description:
        'Merge multiple MP3, WAV, and M4A audio files into one seamless track with optional smooth crossfade. 100% private local processing in your browser.',
      h1: 'Audio Joiner & MP3 Merger',
      subtitle:
        'Combine multiple MP3, WAV, or M4A audio tracks into one seamless file with drag-to-reorder and optional crossfade—all locally.',
    },
    howToTitle: 'How to Use Audio Joiner & MP3 Merger',
    howToSteps: [
      'Drop two or more MP3, WAV, M4A, or OGG files into the dropzone above.',
      'Drag tracks into your desired order (or use the up/down arrows), set an optional smooth Crossfade duration, and choose MP3 or lossless WAV output.',
      'Click Merge Tracks to combine them inside your browser, listen to the merged preview, and download your single audio file.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Instant Web Audio Mixing',
        body: 'Your browser decodes and mixes audio tracks natively in memory—no waiting to upload multi-track podcast or music stems.',
      },
      {
        title: 'Equal-Power Smooth Crossfades',
        body: 'Blend track transitions cleanly without abrupt silence gaps or volume dips using equal-power crossfade curves.',
      },
      {
        title: 'Confidential Audio Stays Private',
        body: 'Combine podcast episodes, voiceovers, or recorded interviews without sending raw audio to external servers.',
      },
    ],
    aboutTitle: 'About Seamless Multi-Format Audio Merging',
    aboutParagraphs: [
      'Combining audio clips from different sources often fails when one track is a 48 kHz voice recording in M4A and another is a 44.1 kHz intro jingle in MP3 or WAV. OMECY automatically normalizes sample rates and stereo channels via the browser OfflineAudioContext before stitching tracks together.',
      'When crossfade is enabled, OMECY overlaps the tail of each clip with the start of the next using cosine/sine equal-power curves. Unlike linear fades that can momentarily sound quieter in the middle, equal-power crossfading keeps perceived loudness steady across transitions.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Can I merge different audio formats like MP3, WAV, and M4A together?',
        answer:
          'Yes. OMECY decodes each track into raw audio buffers, normalizes sample rates automatically, and exports one clean MP3 or WAV file.',
      },
      {
        question: 'How do I change the sequence of my audio clips?',
        answer:
          'Drag any track card up or down in the list, or click the accessible up and down arrow buttons on each row before merging.',
      },
      {
        question: 'Are my audio tracks uploaded to any server?',
        answer:
          'No. Decoding, crossfading, and MP3/WAV encoding run 100% locally inside your browser tab.',
      },
      {
        question: 'Should I export as MP3 or WAV?',
        answer:
          'Choose MP3 (192–320 kbps) for compact, ready-to-share podcasts, playlists, and voice compilations, or WAV if you plan to import the merged file into another audio editor without extra compression.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'mp3-cutter': {
    name: 'MP3 Cutter & Audio Trimmer',
    shortName: 'MP3 Cutter',
    cardDesc: 'Cut MP3 and audio clips visually on a waveform with custom fade-in and fade-out.',
    meta: {
      title: 'MP3 Cutter & Audio Trimmer – Visual Waveform Cut | OMECY',
      description:
        'Cut MP3 and audio files with precision using an interactive waveform, custom fade-in and fade-out, and instant preview. Free and private, no uploads.',
      h1: 'MP3 Cutter & Audio Trimmer',
      subtitle:
        'Visually trim MP3, WAV, and M4A clips on a crisp waveform with smooth fade-in and fade-out—processed 100% locally.',
    },
    howToTitle: 'How to Use MP3 Cutter & Audio Trimmer',
    howToSteps: [
      'Drop an MP3, WAV, M4A, or OGG file into the box above to render its interactive audio waveform instantly.',
      'Adjust the Start Time and End Time sliders to highlight your target clip, add optional Fade In or Fade Out, and click Preview Selection to check timing.',
      'Choose MP3 or lossless WAV output, click Trim & Export, and download your finished audio clip immediately.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Instant Visual Waveform Rendering',
        body: 'Spot silences, beats, and speech boundaries immediately without uploading your audio file first.',
      },
      {
        title: 'Built-In Fade-In & Fade-Out',
        body: 'Eliminate harsh pops or abrupt cuts on ringtones, podcast intros, and sound effects with smooth volume ramps.',
      },
      {
        title: '100% Browser-Based Privacy',
        body: 'Personal recordings, song demos, and voice notes never leave your computer or phone.',
      },
    ],
    aboutTitle: 'About Precision Audio Cutting & Ringtone Creation',
    aboutParagraphs: [
      'Cutting audio cleanly requires seeing where volume rises and drops rather than guessing timestamps blindly. By rendering peak amplitude bars directly from decoded PCM audio data, OMECY lets you isolate choruses, remove awkward pauses at the start of a recording, or craft custom ringtones in seconds.',
      'Adding even a subtle 0.5-second fade-in and fade-out prevents digital clicks that occur when an audio waveform is sliced mid-cycle away from zero amplitude, giving your trimmed clip a polished, broadcast-ready finish.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Can I preview the trimmed clip before downloading?',
        answer:
          'Yes. Click Preview Selection to hear your exact trimmed range—including any fade-in and fade-out effects—before exporting.',
      },
      {
        question: 'Does the MP3 cutter work with WAV and M4A files too?',
        answer:
          'Yes. You can trim MP3, WAV, M4A, OGG, and FLAC files supported by your browser and export the result as MP3 or WAV.',
      },
      {
        question: 'Are my audio files sent to a remote server?',
        answer:
          'Never. Waveform analysis, trimming, fades, and MP3 encoding all execute locally inside your browser memory.',
      },
      {
        question: 'Can I create a phone ringtone with this tool?',
        answer:
          'Yes. Trim a 20–30 second highlight from your track, apply a gentle fade-out at the end, and export as an MP3 file ready for Android or ringtone utilities.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'wav-to-mp3': {
    name: 'WAV to MP3 Converter',
    shortName: 'WAV to MP3',
    cardDesc: 'Convert bulky uncompressed WAV files into compact 128–320 kbps MP3 audio locally.',
    meta: {
      title: 'WAV to MP3 Converter – Fast Private Audio Shrink | OMECY',
      description:
        'Convert large uncompressed WAV files into portable 128–320 kbps MP3 audio directly inside your browser. Batch support, instant speed, zero uploads.',
      h1: 'WAV to MP3 Converter',
      subtitle:
        'Turn large uncompressed WAV recordings into compact, universal MP3 files in bulk—100% locally in your browser.',
    },
    howToTitle: 'How to Use WAV to MP3 Converter',
    howToSteps: [
      'Drop one or multiple .wav files into the dropzone above.',
      'Select your target MP3 bitrate (128, 192, 256, or 320 kbps) depending on whether you prioritize smallest size or top musical detail.',
      'Click Convert to MP3, check the file size savings badge on each track, and download individual MP3s or one ZIP archive.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Skip Uploading Massive WAV Files',
        body: 'Uncompressed stereo WAV files run roughly 10 MB per minute. Local conversion finishes before a typical upload would even reach 20%.',
      },
      {
        title: 'Protect Unreleased Studio Stems',
        body: 'Musicians, voice actors, and podcasters can batch-convert master mixes without placing unreleased audio on third-party servers.',
      },
      {
        title: 'Batch Conversion & Instant ZIP',
        body: 'Drop an entire folder of WAV tracks and export every converted MP3 neatly packaged in a single ZIP download.',
      },
    ],
    aboutTitle: 'About Uncompressed WAV vs. Portable MP3 Audio',
    aboutParagraphs: [
      'WAV (Waveform Audio File Format) stores raw, uncompressed PCM audio samples. A standard CD-quality 44.1 kHz, 16-bit stereo WAV recording consumes about 1,411 kilobits per second—roughly 50 MB for a five-minute song. That makes WAV ideal for editing in a DAW, but far too heavy for email, web streaming, or portable libraries.',
      'MP3 uses psychoacoustic compression to discard subtle frequencies masked by louder sounds that human ears rarely perceive. Converting WAV to 192 kbps or 320 kbps MP3 typically trims file size by 75% to 90% while preserving crisp, clean playback across virtually every device ever made.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How much smaller is an MP3 compared to a WAV file?',
        answer:
          'A 192 kbps MP3 is typically around 85% smaller than a standard 16-bit stereo WAV file, while a 320 kbps MP3 cuts size by roughly 75%.',
      },
      {
        question: 'Can I convert multiple WAV files to MP3 at once?',
        answer:
          'Yes. Drop multiple WAV files together, convert the whole batch in one click, and download each file or click Download All (ZIP).',
      },
      {
        question: 'Are my WAV recordings uploaded to a server?',
        answer:
          'No. Conversion runs inside your browser using native Web Audio decoding and a local JavaScript/WebAssembly MP3 encoder.',
      },
      {
        question: 'Which bitrate is best for music vs. spoken voice?',
        answer:
          'Use 128 kbps for speech and voice notes, 192 kbps for podcasts and general listening, and 256–320 kbps for music releases and mastering previews.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'm4a-to-mp3': {
    name: 'M4A to MP3 Converter',
    shortName: 'M4A to MP3',
    cardDesc: 'Convert iPhone Voice Memos and Apple M4A audio files into universal MP3 tracks.',
    meta: {
      title: 'M4A to MP3 Converter – Convert Voice Memos Free | OMECY',
      description:
        'Convert Apple M4A recordings and iPhone Voice Memos into universal MP3 files privately in your browser. Free batch conversion with zero file uploads.',
      h1: 'M4A to MP3 Converter',
      subtitle:
        'Convert iPhone Voice Memos, macOS recordings, and Apple M4A audio into universal MP3 files right in your browser.',
    },
    howToTitle: 'How to Use M4A to MP3 Converter',
    howToSteps: [
      'Drop one or more .m4a or .aac audio files (such as iPhone Voice Memos) into the converter box above.',
      'Pick your output MP3 bitrate—128 kbps is crisp for voice memos, while 192–320 kbps suits music tracks.',
      'Click Convert to MP3 to process every file locally, preview playback, and download individual MP3s or a ZIP bundle.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Keep Personal Voice Memos Private',
        body: 'Voice notes, meeting memos, and personal reminders stay completely on your device instead of traversing unknown online converters.',
      },
      {
        title: 'Fast Native Browser Decoding',
        body: 'Modern browsers decode AAC/M4A natively at high speed, converting minutes of speech to MP3 in just seconds.',
      },
      {
        title: 'Works Everywhere Without Installing Apps',
        body: 'No iTunes, desktop converters, or paid utilities required—convert directly in Chrome, Safari, Edge, or Firefox.',
      },
    ],
    aboutTitle: 'About Apple M4A Files & Universal MP3 Compatibility',
    aboutParagraphs: [
      'Apple devices—including iPhone Voice Memos, iPad, QuickTime, and GarageBand—default to saving audio in the .m4a container (MPEG-4 Audio), typically encoded with AAC or ALAC. While M4A delivers solid efficiency inside the Apple ecosystem, many Windows media tools, car stereos, transcription platforms, and upload forms still strictly require .mp3 files.',
      'Converting M4A to MP3 ensures your recording plays smoothly on any computer, Android phone, presentation slide, or audio player without codec warnings—while keeping your personal audio completely offline and under your control.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Does this work with iPhone Voice Memos (.m4a)?',
        answer:
          'Yes. Share or AirDrop your Voice Memo from iPhone to your device, drop the .m4a file into OMECY, and convert it to a standard MP3 in seconds.',
      },
      {
        question: 'Are my voice recordings uploaded anywhere?',
        answer:
          'No. All decoding and MP3 encoding happen strictly inside your local browser tab with zero server transmission.',
      },
      {
        question: 'Can I batch convert several M4A files at once?',
        answer:
          'Yes. Select or drop multiple M4A files together and download all resulting MP3 tracks individually or inside a single ZIP file.',
      },
      {
        question: 'What bitrate should I select for M4A voice recordings?',
        answer:
          '128 kbps or 192 kbps preserves full vocal clarity from iPhone microphones while keeping file sizes compact for easy sharing.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'image-compressor': {
    name: 'Image Compressor',
    shortName: 'Image Compressor',
    cardDesc: 'Bulk compress JPG, PNG, and WebP photos locally with quality control and ZIP export.',
    meta: {
      title: 'Image Compressor – Bulk Shrink JPG, PNG & WebP | OMECY',
      description:
        'Compress JPG, PNG, and WebP images in bulk directly in your browser with adjustable quality and ZIP download. Fast, free, and 100% zero-upload.',
      h1: 'Online Image Compressor',
      subtitle:
        'Shrink JPG, PNG, and WebP photos in bulk directly inside your browser with live savings stats and zero uploads.',
    },
    howToTitle: 'How to Use Image Compressor',
    howToSteps: [
      'Drop one or dozens of JPG, PNG, or WebP images into the dropzone above.',
      'Adjust the Quality slider (75–85% is the sweet spot for sharp web photos at a fraction of the original file size).',
      'Click Compress to optimize every image locally, check the exact size reduction, and download files individually or as a ZIP.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Private Photos Never Leave Your Device',
        body: 'Client assets, personal snapshots, and scanned documents stay strictly inside your browser tab.',
      },
      {
        title: 'Milliseconds Instead of Upload Bars',
        body: 'Canvas-powered local optimization runs instantly on your machine with no server queues or batch count restrictions.',
      },
      {
        title: 'Built for Faster Websites & Core Web Vitals',
        body: 'Lighter images speed up Largest Contentful Paint (LCP), shrink email attachments, and save mobile bandwidth.',
      },
    ],
    aboutTitle: 'About Optimizing JPG, PNG, and WebP Images',
    aboutParagraphs: [
      'Unoptimized camera photos and design exports routinely weigh 3–10 MB each, dragging down website load speeds and hitting form upload limits. Intelligent lossy compression reduces redundant color precision that the human eye barely notices while keeping edges, textures, and typography clean.',
      'For photographs, JPG and WebP at 75–85% quality routinely cut file weight by 60–80% with almost indistinguishable visual fidelity. For screenshots and UI graphics in PNG, careful re-encoding strips bloat while keeping crisp lines intact.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Which image formats can I compress?',
        answer:
          'OMECY compresses JPG/JPEG, PNG, and WebP images directly in your browser, preserving each image format while shrinking file size.',
      },
      {
        question: 'Can I compress multiple photos at the same time?',
        answer:
          'Yes. Drop multiple images at once, inspect the total megabytes saved, and download all compressed photos in a single ZIP archive.',
      },
      {
        question: 'Do my images get uploaded to any server?',
        answer:
          'No. Compression executes locally using browser Canvas and client-side JavaScript—nothing is ever sent over the network.',
      },
      {
        question: 'What quality setting gives the best balance of sharpness and size?',
        answer:
          'Setting quality between 75% and 82% typically yields dramatic size reductions while keeping photos sharp for websites, blogs, and email.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'webp-to-jpg': {
    name: 'WebP to JPG Converter',
    shortName: 'WebP to JPG',
    cardDesc: 'Convert web-saved WebP images into universal JPG photos with transparency fill.',
    meta: {
      title: 'WebP to JPG Converter – Instant Bulk Photo Tool | OMECY',
      description:
        'Convert web-saved WebP images into universal JPG files in bulk with custom transparency fill and quality control. Instant, free, and 100% private.',
      h1: 'WebP to JPG Converter',
      subtitle:
        'Convert web-saved WebP files into universally accepted JPG images in bulk with custom transparency fill—100% locally.',
    },
    howToTitle: 'How to Use WebP to JPG Converter',
    howToSteps: [
      'Drop one or multiple .webp images into the box above.',
      'Adjust JPG output quality and choose a background fill color (default crisp white) for any transparent areas in your WebP images.',
      'Click Convert to JPG and save your files individually or download the entire batch as one ZIP file.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Instant Canvas Conversion',
        body: 'Because your browser natively renders WebP, converting dozens of images to JPG takes a fraction of a second locally.',
      },
      {
        title: 'Clean Transparency Handling',
        body: 'Instead of harsh black boxes behind transparent stickers or product cutouts, OMECY cleanly fills transparency with white or your chosen color.',
      },
      {
        title: 'Zero Uploads & Bulk ZIP Support',
        body: 'Convert as many downloaded graphics or product images as needed without uploading anything to external servers.',
      },
    ],
    aboutTitle: 'About WebP Downloads vs. Universal JPG Support',
    aboutParagraphs: [
      'WebP was created by Google to deliver smaller file sizes on modern websites, which is why saving an image from Chrome, Edge, or Safari increasingly produces a .webp file. Unfortunately, many desktop photo viewers, older versions of Photoshop, print kiosks, marketplace portals, and office tools still ask specifically for .jpg files.',
      'Because JPG does not support an alpha transparency channel, converting a transparent WebP requires flattening it onto a solid background. OMECY lets you set that fill color (white by default) and dial in your exact JPG quality before exporting.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'What happens to transparent areas when converting WebP to JPG?',
        answer:
          'Since JPG does not support transparency, OMECY cleanly fills transparent pixels with pure white (#FFFFFF) by default—or any custom hex color you pick.',
      },
      {
        question: 'Can I convert a batch of WebP images to JPG at once?',
        answer:
          'Yes. Drop multiple WebP files together, convert all of them in one click, and download them individually or in a single ZIP archive.',
      },
      {
        question: 'Are my WebP images uploaded to a server?',
        answer:
          'No. Everything runs locally inside your browser using the HTML5 Canvas API, so your images never leave your device.',
      },
      {
        question: 'Does converting WebP to JPG change the image dimensions?',
        answer:
          'No. Your output JPG keeps the exact original pixel width and height of the source WebP file.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'heic-to-jpg': {
    name: 'HEIC to JPG Converter',
    shortName: 'HEIC to JPG',
    cardDesc: 'Convert iPhone and iOS HEIC photos into standard JPGs privately on your device.',
    meta: {
      title: 'HEIC to JPG Converter – Private iPhone Photo Fix | OMECY',
      description:
        'Convert iPhone and iOS HEIC photos to standard JPG images directly on your device without uploading private pictures to any server. Free and fast.',
      h1: 'HEIC to JPG Converter',
      subtitle:
        'Convert iPhone and iPad HEIC photos into universal JPG images directly on your device—with zero photo uploads.',
    },
    howToTitle: 'How to Use HEIC to JPG Converter',
    howToSteps: [
      'Drop one or more .heic or .heif iPhone photos into the converter card above.',
      'Select your desired JPG quality level (90% preserves crisp camera detail with reasonable file sizes).',
      'Click Convert to JPG to decode locally in your browser, then save individual JPG photos or click Download All (ZIP).',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'Your Camera Roll Stays Private',
        body: 'Personal family pictures, travel albums, and document photos should never have to be uploaded to unknown websites just to change file formats.',
      },
      {
        title: 'Zero Software Installation on Windows',
        body: 'Open and convert Apple HEIC files right inside Chrome, Edge, or Firefox without buying extra Windows Store codec extensions.',
      },
      {
        title: 'Bulk Batch Conversion with ZIP Export',
        body: 'Drop an entire set of iPhone photos and download every converted JPG together in one click.',
      },
    ],
    aboutTitle: 'About iPhone HEIC Photos & Why JPG Is Still Needed',
    aboutParagraphs: [
      'Since iOS 11, iPhones and iPads capture photos by default in HEIC (High Efficiency Image Container), built on the HEVC standard. HEIC keeps high photo clarity at roughly half the storage footprint of traditional JPEG, saving valuable phone space.',
      'However, Windows PCs, Android sharing apps, job portals, government upload forms, and many CMS platforms still struggle to open or accept .heic files. OMECY lazy-loads a dedicated client-side HEIC decoder strictly when you convert, giving you standard JPG photos compatible everywhere without compromising your privacy.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Are my iPhone HEIC photos uploaded to a server during conversion?',
        answer:
          'Never. OMECY decodes HEIC images strictly inside your browser memory on your own device, so personal photos never cross the network.',
      },
      {
        question: 'Does this work on Windows 10 and Windows 11 without installing codecs?',
        answer:
          'Yes. Because decoding runs inside your web browser via JavaScript/WebAssembly, you do not need any paid Windows HEVC or HEIF extensions.',
      },
      {
        question: 'Can I convert dozens of HEIC photos at once?',
        answer:
          'Yes. Drop multiple .heic files at the same time and export all converted JPGs individually or packaged inside a single ZIP download.',
      },
      {
        question: 'Why does converting HEIC take a moment per high-resolution photo?',
        answer:
          'Modern iPhone photos are 12 MP to 48 MP and require full HEVC decoding inside your browser. Running locally keeps your pictures completely private while finishing in a few seconds.',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },

  'image-resizer': {
    name: 'Image Resizer',
    shortName: 'Image Resizer',
    cardDesc: 'Resize photos by exact pixels, percentage, or social presets with aspect ratio lock.',
    meta: {
      title: 'Image Resizer – Resize Photos by Pixels or Social | OMECY',
      description:
        'Resize JPG, PNG, and WebP photos by exact pixels, percentage, or social presets with aspect ratio lock right in your browser. Free and zero-upload.',
      h1: 'Online Image Resizer',
      subtitle:
        'Resize JPG, PNG, and WebP images by exact pixels, percentage, or social media presets—100% locally in your browser.',
    },
    howToTitle: 'How to Use Image Resizer',
    howToSteps: [
      'Drop a JPG, PNG, or WebP image into the box above to view its original pixel dimensions.',
      'Enter custom Width and Height in pixels (with Aspect Ratio Lock on or off), switch to Percentage scaling, or pick a one-click Social & Web preset.',
      'Choose JPG, PNG, or WebP output format, click Resize Image, preview the crisp result, and download immediately.',
    ],
    whyLocalTitle: 'Why Process Files Locally with OMECY?',
    whyLocalPoints: [
      {
        title: 'High-Quality Local Resampling',
        body: 'Uses smooth high-quality Canvas resampling directly in your browser for sharp edges and clean downscaling.',
      },
      {
        title: 'One-Click Social Media Dimensions',
        body: 'Instantly target Instagram Square (1080×1080), Portrait (1080×1350), YouTube Thumbnails (1280×720), or Open Graph banners (1200×630).',
      },
      {
        title: 'Private, Instant, No Sign-Up',
        body: 'Resize profile pictures, product catalogs, and blog graphics without uploading a single image online.',
      },
    ],
    aboutTitle: 'About Resizing Images for Web & Social Platforms',
    aboutParagraphs: [
      'Uploading oversized 4000-pixel photos to a blog hero slot or social profile wastes bandwidth and forces platforms to apply unpredictable server-side re-compression. Resizing images to the exact pixel dimensions needed before publishing keeps text, logos, and portraits noticeably crisper.',
      'Keeping Aspect Ratio Lock enabled prevents accidental stretching or squishing whenever you type a new width or height. You can also convert output format on the fly—for example, resizing a heavy PNG screenshot into a lightweight WebP or JPG ready for fast web publishing.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How do I resize an image without distorting or stretching it?',
        answer:
          'Leave Lock Aspect Ratio checked while entering either Width or Height—or switch to Percentage mode—so proportions scale evenly.',
      },
      {
        question: 'Can I change the output file format while resizing?',
        answer:
          'Yes. You can export your resized photo as JPG, PNG, or WebP and customize quality for JPG and WebP outputs.',
      },
      {
        question: 'Are my photos uploaded to a server when resizing?',
        answer:
          'No. Resizing runs completely inside your browser via the HTML5 Canvas API with zero file uploads.',
      },
      {
        question: 'What social media presets are included?',
        answer:
          'OMECY includes one-click presets for Instagram Square (1080×1080), Instagram Portrait (1080×1350), Story/Reels (1080×1920), YouTube Thumbnails (1280×720), Open Graph (1200×630), and Web Full HD (1920×1080).',
      },
    ],
    relatedTitle: 'Related Media Tools on OMECY',
  },
};
