import queue
import threading
from gtts import gTTS
from io import BytesIO
import tempfile
from playsound import playsound

tts_cache = {}
playback_lock = threading.Lock()
playback_queue = queue.Queue()
current_playback = {"thread": None}

def stop_current_playback():
    if (current_playback["thread"] and current_playback["thread"].is_alive()
        and current_playback["thread"] != threading.current_thread()):
        current_playback["thread"].join()

def play_tts(mp3_data: BytesIO):
    stop_current_playback()
    
    # Save to temporary file
    with tempfile.NamedTemporaryFile(delete=True, suffix=".mp3") as tmpfile:
        tmpfile.write(mp3_data.read())
        tmpfile.flush()
        playsound(tmpfile.name)

def text_to_speech(text):
    def run_tts():
        try:
            tts = gTTS(text, lang='en', tld='co.uk', slow=False)
            mp3_data = BytesIO()
            tts.write_to_fp(mp3_data)
            mp3_data.seek(0)
            play_tts(mp3_data)
        except Exception as e:
            print(f"Error in TTS: {e}")

    stop_current_playback()

    tts_thread = threading.Thread(target=run_tts, daemon=True)
    current_playback["thread"] = tts_thread
    tts_thread.start()