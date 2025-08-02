import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, User, BookOpen, Target, Clock, Star, Mic, MicOff, Volume2, Play, Check, X, RotateCcw, Plus } from 'lucide-react';

const LearningJourney = ({ onNavigate }) => {
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordedText, setRecordedText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [stream, setStream] = useState(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Timer effect for recording duration
  useEffect(() => {
    if (isRecording) {
      console.log('Starting timer, isRecording:', isRecording);
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => {
          console.log('Timer tick, duration:', prev + 1);
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        console.log('Stopping timer');
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRecording]);

  // Initialize speech recognition with multi-language support
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      // Set to Indonesian as primary, but it can detect English too
      recognitionInstance.lang = 'id-ID';
      
      recognitionInstance.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setRecordedText(transcript);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        // Show preview if we have recorded text
        if (recordedText.trim()) {
          setShowPreview(true);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    }
  }, [recordedText]);

  const startRecording = async () => {
    if (recognition && !isRecording) {
      try {
        // Request microphone access
        const audioStream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          } 
        });
        
        setStream(audioStream);
        
        // Reset states
        setIsRecording(true);
        setRecordedText('');
        setShowPreview(false);
        setAudioBlob(null);
        setRecordingDuration(0);
        
        audioChunksRef.current = [];
        
        // Try to create MediaRecorder with different formats
        let recorder;
        const options = [
          { mimeType: 'audio/webm;codecs=opus' },
          { mimeType: 'audio/webm' },
          { mimeType: 'audio/mp4' },
          { mimeType: 'audio/wav' },
          {} // fallback with no specific format
        ];
        
        for (const option of options) {
          try {
            if (!option.mimeType || MediaRecorder.isTypeSupported(option.mimeType)) {
              recorder = new MediaRecorder(audioStream, option);
              break;
            }
          } catch (e) {
            continue;
          }
        }
        
        if (!recorder) {
          throw new Error('No supported audio format found');
        }
        
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          
          // Clean up stream
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
        };
        
        recorder.onerror = (event) => {
          console.error('MediaRecorder error:', event.error);
          setIsRecording(false);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        };
        
        setMediaRecorder(recorder);
        
        // Start recording
        recorder.start(1000); // Record in 1-second chunks
        
        // Start speech recognition
        recognition.start();
        
      } catch (error) {
        console.error('Error starting recording:', error);
        setIsRecording(false);
        
        // Fallback to speech recognition only
        if (recognition) {
          try {
            setRecordedText('');
            setIsRecording(true);
            setRecordingDuration(0);
            
            recognition.start();
          } catch (speechError) {
            console.error('Speech recognition fallback failed:', speechError);
          }
        }
      }
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          console.error('Error stopping speech recognition:', e);
        }
      }
      
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        try {
          mediaRecorder.stop();
        } catch (e) {
          console.error('Error stopping media recorder:', e);
        }
      }
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Show preview even if no audio was recorded
      setTimeout(() => {
        if (recordedText.trim()) {
          setShowPreview(true);
        }
      }, 500);
    }
  };

  const playAudio = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audioRef.current.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      setIsPlaying(true);
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      });
    }
  };

  const acceptRecording = () => {
    setAnswer(recordedText);
    setShowPreview(false);
    setRecordedText('');
    setAudioBlob(null);
  };

  const rejectRecording = () => {
    setShowPreview(false);
    setRecordedText('');
    setAudioBlob(null);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [stream]);

  const handleSubmit = () => {
    console.log('Learning Quest Answer:', answer);
    
    // Extract topic from the answer (simple approach - take first few words or main topic)
    let topic = answer.trim();
    
    // Try to extract key learning topics from the answer (Indonesian and English)
    const topicKeywords = [
      'web development', 'data science', 'machine learning', 'programming', 'javascript', 'python', 'react', 'node.js', 'css', 'html', 'database', 'sql', 'ai', 'mobile development', 'android', 'ios', 'flutter', 'design', 'ui/ux', 'devops', 'cloud', 'aws', 'blockchain', 'cybersecurity',
      'pemrograman', 'pengembangan web', 'data sains', 'pembelajaran mesin', 'kecerdasan buatan', 'aplikasi mobile', 'desain', 'basis data'
    ];
    
    // Find if any known topics are mentioned
    const foundTopic = topicKeywords.find(keyword => 
      answer.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (foundTopic) {
      topic = foundTopic;
    } else {
      // If no specific topic found, use first 3 words or limit to 30 characters
      const words = answer.trim().split(' ');
      if (words.length > 3) {
        topic = words.slice(0, 3).join(' ');
      } else if (topic.length > 30) {
        topic = topic.substring(0, 30) + '...';
      }
    }
    
    // Capitalize first letter
    topic = topic.charAt(0).toUpperCase() + topic.slice(1);
    
    // Save the new quest using the global function
    if (window.zenverseAddQuest && typeof window.zenverseAddQuest === 'function') {
      window.zenverseAddQuest({ 
        topic: topic,
        originalAnswer: answer 
      });
    }
    
    // Navigate to course result page
    if (onNavigate) {
      onNavigate('course-result');
    }
  };

  return (
    <div className="min-h-screen" style={{background: '#372974'}}>
      {/* Mobile optimized container */}
      <div className="px-4 py-6 pb-12">
        <div className="max-w-full mx-auto min-h-[calc(100vh-8rem)] flex flex-col">
          
          {/* Header - Mobile optimized */}
          <div className="p-4 pb-1">
            <div className="text-center mb-4">
            </div>
          </div>

          {/* Question Content - Mobile optimized - Centered */}
          <div className="px-4 flex-1 flex flex-col justify-center items-center">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-44 h-44 bg-orange-100 rounded-full mb-4">
                <img 
                  src="/images/zenquest mascot.png" 
                  alt="ZenQuest Mascot" 
                  className="w-40 h-40 object-contain"
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 leading-tight">What do you want to learn?</h2>
              <p className="text-gray-200 text-sm px-2">Tell us about your learning goals and we'll create the perfect quest for you</p>
            </div>

            {/* Voice Recording Preview Modal */}
            {showPreview && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Volume2 className="w-8 h-8 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Voice Recording</h3>
                    <p className="text-sm text-gray-600">Duration: {formatDuration(recordingDuration)}</p>
                  </div>
                  
                  {/* Recorded Text Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700">
                      {recordedText || "Processing your voice..."}
                    </p>
                  </div>
                  
                  {/* Audio Controls */}
                  {audioBlob && (
                    <div className="flex items-center justify-center mb-6">
                      <button
                        onClick={playAudio}
                        disabled={isPlaying}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          isPlaying 
                            ? 'bg-orange-200 text-orange-600' 
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                      >
                        <Play className="w-5 h-5 ml-0.5" />
                      </button>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={rejectRecording}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700 font-medium">Record Again</span>
                    </button>
                    
                    <button
                      onClick={acceptRecording}
                      disabled={!recordedText.trim()}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-colors ${
                        recordedText.trim()
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span className="font-medium">Use This</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Answer Input with Voice Option - Widget Style */}
            <div className="mb-6 w-full max-w-lg">
              <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-1 shadow-md">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="e.g., I want to master web development, learn data science, improve my programming skills..."
                  className="w-full h-32 p-4 pr-14 bg-transparent rounded-xl border-0 resize-none focus:outline-none text-gray-700 placeholder-gray-500 text-sm leading-relaxed"
                  rows={4}
                />
                
                {/* Voice Input Button */}
                {isSupported && (
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
              
              {/* Voice Input Status */}
              {isRecording && (
                <div className="flex items-center justify-center mt-3 space-x-2">
                  <Volume2 className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-sm text-white font-medium">
                    Listening... {formatDuration(recordingDuration)}
                  </span>
                </div>
              )}
              
              {/* Voice Input Instructions */}
              {isSupported && !isRecording && (
                <div className="text-center mt-3">
                </div>
              )}
            </div>

            {/* Navigation - Mobile optimized */}
            <div className="w-full max-w-lg">
              <button
                onClick={handleSubmit}
                disabled={!answer.trim()}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors text-sm ${
                  answer.trim()
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Create My Quest</span>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningJourney; 