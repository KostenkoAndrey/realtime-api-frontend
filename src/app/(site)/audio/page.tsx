'use client';

import React, { useState, useRef, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import purpleMic from '@/assets/lottie/voice-purple.json';
import redMic from '@/assets/lottie/voice-red.json';
import wavesAnimation from '@/assets/lottie/waves.json';

const Page = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullTextRef = useRef('');
  const currentIndexRef = useRef(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lottiePurpleRef = useRef<LottieRefCurrentProps>(null);
  const lottieRedRef = useRef<LottieRefCurrentProps>(null);
  const lottieWavesRef = useRef<LottieRefCurrentProps>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const chunkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const typeNewText = (fullText: string) => {
    const startIndex = currentIndexRef.current;

    if (startIndex < fullText.length) {
      currentIndexRef.current++;
      setDisplayedText(fullText.substring(0, currentIndexRef.current));

      typingTimeoutRef.current = setTimeout(() => {
        typeNewText(fullText);
      }, 30);
    }
  };

  const handleToggle = async () => {
    if (!isRecording) {
      try {
        setDisplayedText('');
        fullTextRef.current = '';
        currentIndexRef.current = 0;

        const ws = new WebSocket('ws://localhost:3000/audio');
        ws.binaryType = 'arraybuffer';
        wsRef.current = ws;

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'transcript_chunk' || data.type === 'transcript_final') {
              const newText = fullTextRef.current + (fullTextRef.current ? ' ' : '') + data.text;
              fullTextRef.current = newText;

              if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
              }

              typeNewText(newText);
            }
          } catch (err) {}
        };

        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('WebSocket connection timeout'));
          }, 5000);

          ws.onopen = () => {
            clearTimeout(timeout);
            ws.send(JSON.stringify({ type: 'start_recording' }));
            resolve();
          };

          ws.onerror = (err) => {
            clearTimeout(timeout);
            reject(err);
          };
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: 48000,
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
        mediaStreamRef.current = stream;

        const audioContext = new AudioContext({ sampleRate: 48000 });
        audioContextRef.current = audioContext;
        await audioContext.audioWorklet.addModule('/worklet-processor.js');

        const source = audioContext.createMediaStreamSource(stream);
        const workletNode = new AudioWorkletNode(audioContext, 'pcm-sender');
        workletRef.current = workletNode;

        let audioBuffer: Int16Array[] = [];
        let totalSamples = 0;
        const SAMPLES_PER_CHUNK = 48000;

        workletNode.port.onmessage = (event) => {
          const pcmData = event.data as Float32Array;

          const int16Data = new Int16Array(pcmData.length);
          for (let i = 0; i < pcmData.length; i++) {
            const s = Math.max(-1, Math.min(1, pcmData[i]));
            int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
          }

          audioBuffer.push(int16Data);
          totalSamples += int16Data.length;

          if (totalSamples >= SAMPLES_PER_CHUNK && ws.readyState === WebSocket.OPEN) {
            const merged = new Int16Array(totalSamples);
            let offset = 0;
            for (const chunk of audioBuffer) {
              merged.set(chunk, offset);
              offset += chunk.length;
            }

            ws.send(merged.buffer);
            audioBuffer = [];
            totalSamples = 0;
          }
        };

        source.connect(workletNode);

        chunkIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'process_chunk' }));
          }
        }, 3000);

        lottiePurpleRef.current?.stop();
        lottieRedRef.current?.play();
        lottieWavesRef.current?.play();

        setIsRecording(true);
      } catch (err) {
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
      }
    } else {
      try {
        if (chunkIntervalRef.current) {
          clearInterval(chunkIntervalRef.current);
          chunkIntervalRef.current = null;
        }

        if (workletRef.current) {
          workletRef.current.port.onmessage = null;
        }

        workletRef.current?.disconnect();
        workletRef.current = null;

        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;

        await new Promise((resolve) => setTimeout(resolve, 100));

        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'stop_recording' }));
        }

        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          await audioContextRef.current.close();
        }
        audioContextRef.current = null;

        lottieRedRef.current?.stop();
        lottiePurpleRef.current?.play();
        lottieWavesRef.current?.stop();

        setIsRecording(false);
      } catch (err) {}
    }
  };

  useEffect(() => {
    return () => {
      if (chunkIntervalRef.current) {
        clearInterval(chunkIntervalRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      workletRef.current?.disconnect();
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      audioContextRef.current?.close();
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className='text-[#d4d4d8]'>
      <div
        className={`flex flex-col items-center mt-[130px] bg-[#18181b] max-w-[552px] rounded-3xl m-auto ${isRecording ? 'py-5' : 'pt-[78px] pb-[68px]'}`}
      >
        {!isRecording && <span>Start a conversation with assistants</span>}

        <div
          className={`transition-all duration-500 ${
            isRecording ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 hidden'
          }`}
        >
          <Lottie
            lottieRef={lottieWavesRef}
            animationData={wavesAnimation}
            loop
            autoplay={false}
            style={{ width: 150, height: 150 }}
          />
        </div>

        <button
          onClick={handleToggle}
          className='relative w-[120px] h-[120px] rounded-full overflow-hidden focus:outline-none transition-all duration-300'
        >
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${isRecording ? 'opacity-0' : 'opacity-100'}`}
          >
            <Lottie
              lottieRef={lottiePurpleRef}
              animationData={purpleMic}
              loop
              autoplay={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-300 ${isRecording ? 'opacity-100' : 'opacity-0'}`}
          >
            <Lottie
              lottieRef={lottieRedRef}
              animationData={redMic}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </button>
      </div>

      <div className='text-white text-center px-4 mt-4'>
        {displayedText && (
          <span className='text-lg leading-snug'>
            {displayedText}
            <span className='animate-pulse ml-1'>|</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Page;
