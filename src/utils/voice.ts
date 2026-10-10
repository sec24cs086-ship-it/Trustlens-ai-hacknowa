import { Language } from '../types';

export class VoiceController {
  private recognition: any = null;
  private isListening: boolean = false;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
      }
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
    }
  }

  public isSpeechSupported(): boolean {
    return !!this.recognition;
  }

  public isSynthSupported(): boolean {
    return !!this.synth;
  }

  public startListening(
    language: Language,
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) {
      onError("Speech recognition is not supported in this browser.");
      return false;
    }

    try {
      // Map app language to BCP 47 language code
      let langCode = 'en-IN';
      if (language === 'ta' || language === 'tanglish') {
        langCode = 'ta-IN';
      } else if (language === 'hi' || language === 'hinglish') {
        langCode = 'hi-IN';
      }

      this.recognition.lang = langCode;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          onResult(finalTranscript, true);
        } else if (interimTranscript) {
          onResult(interimTranscript, false);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        onError(event.error || "Speech recognition error occurred");
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      this.isListening = false;
      onError(e.message || "Failed to start speech recognition");
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
      this.isListening = false;
    }
  }

  public speak(
    text: string,
    language: Language,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (!this.synth) return;

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Determine locale
    let locale = 'en-IN';
    if (language === 'ta') locale = 'ta-IN';
    else if (language === 'hi') locale = 'hi-IN';
    else if (language === 'tanglish') locale = 'ta-IN';
    else if (language === 'hinglish') locale = 'hi-IN';

    utterance.lang = locale;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick best available voice if possible
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang === locale || v.lang.startsWith(locale.substring(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      onEnd?.();
    };

    this.synth.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}

export const voiceController = new VoiceController();
