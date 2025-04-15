import queue
import threading
import simpleaudio as sa

from gtts import gTTS
from pydub import AudioSegment
from io import BytesIO

tts_cache = {}
playback_lock = threading.Lock()
playback_thread = None
playback_queue = queue.Queue()
current_playback = {"player": None, "thread": None}

def stop_current_playback():
    if current_playback["player"] is not None:
        current_playback["player"].stop()
        current_playback["player"] = None
        
    if (current_playback["thread"] and current_playback["thread"].is_alive()
        and current_playback["thread"] != threading.current_thread()):
        current_playback["thread"].join()
        

def play_tts(audio_data):
    stop_current_playback()
  
    player = sa.play_buffer(audio_data.raw_data,
                            num_channels=audio_data.channels,
                            bytes_per_sample=audio_data.sample_width,
                            sample_rate=audio_data.frame_rate)
  
    current_playback["player"] = player

# Voiced critique/motivation
def text_to_speech(text):
    def run_tts():
        try:
            speech = gTTS(text, lang='en', tld='co.uk', slow=False)

            to_speek = BytesIO()
            speech.write_to_fp(to_speek)
            to_speek.seek(0)
            spoken_text = AudioSegment.from_file(to_speek, format="mp3")

            play_tts(spoken_text)
        except Exception as e:
            print(f"Error in TTS: {e}")

    stop_current_playback()

    tts_thread = threading.Thread(target=run_tts, daemon=True)
    current_playback["thread"] = tts_thread
    tts_thread.start()