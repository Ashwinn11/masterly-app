'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon,
  Mic,
  Type,
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase/client';

type UploadMode = 'file' | 'text' | 'record';

export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<UploadMode>('file');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
      setError('');
    } catch (err) {
      setError('Failed to access microphone. Please allow microphone access.');
      console.error('Recording error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const handleRecordingUpload = async () => {
    if (!recordedBlob || !user?.id) return;

    setUploading(true);
    setStatus('processing');
    setError('');

    try {
      // Convert blob to base64
      const reader = new FileReader();
      const fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(recordedBlob);
      });

      const base64Data = fileData.split(',')[1];
      const supabase = getSupabaseClient();

      // Call edge function to process audio
      const { data, error: functionError } = await supabase.functions.invoke('process-audio', {
        body: {
          fileData: base64Data,
          fileName: `recording-${Date.now()}.webm`,
          mimeType: 'audio/webm',
        },
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to process recording');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to process recording');
      }

      // Save material to database
      const { data: materialData, error: materialError } = await (supabase
        .from('materials') as any)
        .insert({
          user_id: user.id,
          title: title.trim() || `Recording ${new Date().toLocaleDateString()}`,
          file_type: 'audio',
          extracted_text: data.text,
        })
        .select()
        .single();

      if (materialError) {
        throw new Error('Failed to save material');
      }

      // Generate questions
      const { data: questionsData, error: questionsError } = await (supabase.functions.invoke('generate-questions', {
        body: {
          text: data.text,
        },
      }) as any);

      if (questionsError || !questionsData.success) {
        throw new Error('Failed to generate questions');
      }

      // Save questions using RPC (creates question_set + individual_questions)
      const { data: savedQuestions, error: saveError } = await (supabase.rpc as any)('save_questions', {
        p_user_id: user.id,
        p_material_id: materialData.id,
        p_question_data: questionsData.questions,
        p_question_count: questionsData.questions.length,
      });

      if (saveError || !savedQuestions?.success) {
        throw new Error('Failed to save questions');
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/materials');
      }, 1500);

    } catch (err: any) {
      console.error('Recording upload error:', err);
      setError(err.message || 'An error occurred');
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = [
        'application/pdf', 
        'image/jpeg', 
        'image/png', 
        'image/jpg',
        'audio/mpeg',
        'audio/mp3',
        'audio/wav',
        'audio/m4a',
        'audio/mp4'
      ];
      
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, image (JPG, PNG), or audio file (MP3, WAV, M4A)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const handleFileUpload = async () => {
    if (!file || !user?.id) return;

    setUploading(true);
    setStatus('processing');
    setError('');

    try {
      // Convert file to base64
      const reader = new FileReader();
      const fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = fileData.split(',')[1];
      const supabase = getSupabaseClient();

      // Determine file type and edge function
      let functionName: string;
      let fileType: 'pdf' | 'image' | 'audio';

      if (file.type === 'application/pdf') {
        functionName = 'process-pdf';
        fileType = 'pdf';
      } else if (file.type.startsWith('image/')) {
        functionName = 'process-image';
        fileType = 'image';
      } else if (file.type.startsWith('audio/')) {
        functionName = 'process-audio';
        fileType = 'audio';
      } else {
        throw new Error('Unsupported file type');
      }

      // Call edge function to process file
      const { data, error: functionError } = await supabase.functions.invoke(functionName, {
        body: {
          fileData: base64Data,
          fileName: file.name,
          mimeType: file.type,
        },
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to process file');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to process file');
      }

      // Save material to database
      const { data: materialData, error: materialError } = await (supabase
        .from('materials') as any)
        .insert({
          user_id: user.id,
          title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          file_type: fileType,
          extracted_text: data.text,
        })
        .select()
        .single();

      if (materialError) {
        throw new Error('Failed to save material');
      }

      // Generate questions
      const { data: questionsData, error: questionsError } = await (supabase.functions.invoke('generate-questions', {
        body: {
          text: data.text,
        },
      }) as any);

      if (questionsError || !questionsData.success) {
        throw new Error('Failed to generate questions');
      }

      // Save questions using RPC (creates question_set + individual_questions)
      const { data: savedQuestions, error: saveError } = await (supabase.rpc as any)('save_questions', {
        p_user_id: user.id,
        p_material_id: materialData.id,
        p_question_data: questionsData.questions,
        p_question_count: questionsData.questions.length,
      });

      if (saveError || !savedQuestions?.success) {
        throw new Error('Failed to save questions');
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/materials');
      }, 1500);

    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'An error occurred during upload');
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleTextUpload = async () => {
    if (!text.trim() || !user?.id) return;

    setUploading(true);
    setStatus('processing');
    setError('');

    try {
      const supabase = getSupabaseClient();

      // Validate text length
      if (text.length < 50) {
        throw new Error('Text must be at least 50 characters long');
      }

      // Save material to database
      const { data: materialData, error: materialError } = await (supabase
        .from('materials') as any)
        .insert({
          user_id: user.id,
          title: title.trim() || 'Pasted Text',
          file_type: 'text',
          extracted_text: text.trim(),
        })
        .select()
        .single();

      if (materialError) {
        throw new Error('Failed to save material');
      }

      // Generate questions
      const { data: questionsData, error: questionsError } = await (supabase.functions.invoke('generate-questions', {
        body: {
          text: text.trim(),
        },
      }) as any);

      if (questionsError || !questionsData.success) {
        throw new Error('Failed to generate questions');
      }

      // Save questions using RPC (creates question_set + individual_questions)
      const { data: savedQuestions, error: saveError } = await (supabase.rpc as any)('save_questions', {
        p_user_id: user.id,
        p_material_id: materialData.id,
        p_question_data: questionsData.questions,
        p_question_count: questionsData.questions.length,
      });

      if (saveError || !savedQuestions?.success) {
        throw new Error('Failed to save questions');
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/materials');
      }, 1500);

    } catch (err: any) {
      console.error('Text upload error:', err);
      setError(err.message || 'An error occurred');
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Upload Material</h1>
        <p className="text-muted-foreground text-lg">
          Upload files or paste text to generate AI flashcards
        </p>
      </div>

      <Tabs value={mode} onValueChange={(v) => setMode(v as UploadMode)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="file">Upload File</TabsTrigger>
          <TabsTrigger value="record">Record Audio</TabsTrigger>
          <TabsTrigger value="text">Paste Text</TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Select File</CardTitle>
              <CardDescription>
                Supported formats: PDF, Images (JPG, PNG), Audio (MP3, WAV, M4A) - max 10MB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">Choose a file</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.mp3,.wav,.m4a"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>

              {file && (
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50">
                  {file.type === 'application/pdf' ? (
                    <FileText className="w-8 h-8 text-red-500" />
                  ) : file.type.startsWith('image/') ? (
                    <ImageIcon className="w-8 h-8 text-blue-500" />
                  ) : (
                    <Mic className="w-8 h-8 text-purple-500" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-red-500/20 bg-red-500/10 text-red-600">
                  <XCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {status === 'processing' && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <p className="text-sm">Processing your file and generating questions...</p>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-green-500/20 bg-green-500/10 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="text-sm">Success! Redirecting to your materials...</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleFileUpload}
                  disabled={!file || uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload & Generate Questions
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={uploading}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="record" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Record Audio</CardTitle>
              <CardDescription>
                Record your voice to create study material from spoken content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="record-title">Title (optional)</Label>
                <Input
                  id="record-title"
                  placeholder="e.g., Lecture Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={uploading || isRecording}
                />
              </div>

              {/* Recording Controls */}
              <div className="flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed bg-muted/30">
                {!recordedBlob ? (
                  <>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                      isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary/20'
                    }`}>
                      <Mic className={`w-12 h-12 ${isRecording ? 'text-white' : 'text-primary'}`} />
                    </div>
                    
                    {isRecording ? (
                      <>
                        <p className="text-2xl font-bold mb-2">{formatTime(recordingTime)}</p>
                        <p className="text-sm text-muted-foreground mb-4">Recording in progress...</p>
                        <Button onClick={stopRecording} variant="destructive" size="lg">
                          Stop Recording
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-semibold mb-2">Ready to Record</p>
                        <p className="text-sm text-muted-foreground mb-4">Click the button to start</p>
                        <Button onClick={startRecording} size="lg" className="gap-2">
                          <Mic className="w-5 h-5" />
                          Start Recording
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <p className="text-lg font-semibold mb-2">Recording Complete</p>
                    <p className="text-sm text-muted-foreground mb-4">Duration: {formatTime(recordingTime)}</p>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => {
                          setRecordedBlob(null);
                          setRecordingTime(0);
                        }} 
                        variant="outline"
                        disabled={uploading}
                      >
                        Record Again
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-red-500/20 bg-red-500/10 text-red-600">
                  <XCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {status === 'processing' && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <p className="text-sm">Processing your recording and generating questions...</p>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-green-500/20 bg-green-500/10 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="text-sm">Success! Redirecting to your materials...</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleRecordingUpload}
                  disabled={!recordedBlob || uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload & Generate Questions
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={uploading || isRecording}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paste Text</CardTitle>
              <CardDescription>
                Paste or type your study material (minimum 50 characters)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title (optional)</Label>
                <Input
                  id="title"
                  placeholder="e.g., Biology Chapter 3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={uploading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Your Text</Label>
                <Textarea
                  id="text"
                  placeholder="Paste your study material here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={uploading}
                  rows={12}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {text.length} characters {text.length < 50 && `(${50 - text.length} more needed)`}
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-red-500/20 bg-red-500/10 text-red-600">
                  <XCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {status === 'processing' && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <p className="text-sm">Generating questions from your text...</p>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 p-4 rounded-lg border border-green-500/20 bg-green-500/10 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="text-sm">Success! Redirecting to your materials...</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleTextUpload}
                  disabled={text.length < 50 || uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Type className="w-4 h-4 mr-2" />
                      Generate Questions
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={uploading}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
