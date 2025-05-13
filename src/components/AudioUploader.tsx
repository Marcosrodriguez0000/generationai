
import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Mic, Upload } from 'lucide-react';

interface AudioUploaderProps {
  onAudioUpload: (file: File) => void;
  isProcessing: boolean;
}

const AudioUploader = ({ onAudioUpload, isProcessing }: AudioUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Manejo de subida de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAudioUpload(file);
    }
  };

  // Manejo de arrastrar y soltar
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      onAudioUpload(file);
    }
  };

  // Manejo de grabación
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
        const file = new File([audioBlob], "grabacion.wav", { type: 'audio/wav' });
        onAudioUpload(file);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Detener todas las pistas de audio
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-cosmos-purple bg-cosmos-purple/5' : 'border-gray-200 dark:border-gray-700 hover:border-cosmos-purple/50'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-10 w-10 text-cosmos-purple mb-2" />
          <p className="font-medium">Arrastra aquí un archivo de audio o haz clic para seleccionarlo</p>
          <p className="text-sm text-muted-foreground mt-1">MP3, WAV o M4A (máx. 10MB)</p>
        </div>
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="audio/*" 
          className="hidden" 
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">o</p>
        {isRecording ? (
          <Button 
            onClick={stopRecording} 
            variant="destructive"
            disabled={isProcessing}
            className="w-full"
          >
            <span className="flex items-center gap-2">
              <span className="animate-pulse h-2 w-2 bg-red-500 rounded-full"></span> Detener grabación
            </span>
          </Button>
        ) : (
          <Button 
            onClick={startRecording} 
            className="w-full bg-gradient-to-r from-cosmos-purple to-cosmos-pink hover:opacity-90 text-white"
            disabled={isProcessing}
          >
            <Mic className="h-5 w-5 mr-2" /> Grabar audio
          </Button>
        )}
      </div>
    </div>
  );
};

export default AudioUploader;
