'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { BackButton } from '@/components/ui/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload as UploadIcon, 
  FileText, 
  Image as ImageIcon,
  Mic,
  Type,
  Loader2,
  CheckCircle2,
  XCircle,
  Search,
  Check,
  RefreshCw
} from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { ProcessingModal } from '@/components/ui/ProcessingModal';
import { UploadLimitModal } from '@/components/ui/UploadLimitModal';
import { cn, getFriendlyErrorMessage } from '@/lib/utils';
import { uploadLimitService } from '@/lib/uploadLimitService';

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en-US" },
  { label: "Spanish", value: "es-ES" },
  { label: "French", value: "fr-FR" },
  { label: "German", value: "de-DE" },
  { label: "Italian", value: "it-IT" },
  { label: "Portuguese", value: "pt-BR" },
  { label: "Russian", value: "ru-RU" },
  { label: "Japanese", value: "ja-JP" },
  { label: "Korean", value: "ko-KR" },
  { label: "Chinese", value: "zh-CN" },
  { label: "Arabic", value: "ar-SA" },
  { label: "Hindi", value: "hi-IN" },
  { label: "Tamil", value: "ta-IN" },
  { label: "Telugu", value: "te-IN" },
  { label: "Kannada", value: "kn-IN" },
  { label: "Malayalam", value: "ml-IN" },
  { label: "Bengali", value: "bn-IN" },
  { label: "Marathi", value: "mr-IN" },
  { label: "Gujarati", value: "gu-IN" },
  { label: "Dutch", value: "nl-NL" },
  { label: "Polish", value: "pl-PL" },
  { label: "Turkish", value: "tr-TR" },
  { label: "Swedish", value: "sv-SE" },
  { label: "Danish", value: "da-DK" },
  { label: "Norwegian", value: "no-NO" },
  { label: "Finnish", value: "fi-FI" },
];

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [languageSearchQuery, setLanguageSearchQuery] = useState('');
  const [remainingUploads, setRemainingUploads] = useState<number | null>(null);
  const [limitModalOpen, setLimitModalOpen] = useState(false);

  const filteredLanguages = LANGUAGE_OPTIONS.filter(lang => 
    lang.label.toLowerCase().includes(languageSearchQuery.toLowerCase())
  );
  const currentLanguageLabel = LANGUAGE_OPTIONS.find(l => l.value === selectedLanguage)?.label || "English";

  useEffect(() => {
    if (status === 'processing' || status === 'error') {
      setModalOpen(true);
    }
  }, [status]);

  // Fetch upload stats when page loads
  useEffect(() => {
    const fetchUploadStats = async () => {
      if (user?.id) {
        try {
          const remaining = await uploadLimitService.getRemainingUploads(user.id);
          setRemainingUploads(remaining);
        } catch (error) {
          console.error('[Upload] Error fetching upload stats:', error);
        }
      }
    };

    fetchUploadStats();
  }, [user?.id]);

  const handleCloseModal = () => {
    if (status === 'error') {
      setModalOpen(false);
      setStatus('idle');
      setError('');
    }
  };

  // Check if user can upload (has remaining uploads)
  const checkUploadLimit = async (): Promise<boolean> => {
    if (!user?.id) return false;
    
    const canUpload = await uploadLimitService.canUserUpload(user.id);
    if (!canUpload) {
      setLimitModalOpen(true);
      return false;
    }
    return true;
  };
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    setLanguageSearchQuery('');
  }, [mode, isRecording]);

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
      const reader = new FileReader();
      const fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(recordedBlob);
      });

      const base64Data = fileData.split(',')[1];
      const supabase = getSupabaseClient();

      const { data, error: functionError } = await supabase.functions.invoke('process-audio', {
        body: {
          fileData: base64Data,
          fileName: `recording-${Date.now()}.webm`,
          languageCode: selectedLanguage,
        },
      });

      if (functionError) throw new Error(functionError.message || 'Failed to process recording');
      if (!data.success) throw new Error(data.error || 'Failed to process recording');

      // Generate questions FIRST
      const { data: questionsData, error: questionsError } = await (supabase.functions.invoke('generate-questions', {
        body: { text: data.text },
      }) as any);

      if (questionsError || !questionsData.success) throw new Error('Failed to generate questions');
      
      if (!questionsData.questions || questionsData.questions.length === 0) {
        throw new Error('No questions could be generated from this recording. Please try recording more content.');
      }

      // Only save material if we have questions
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

      if (materialError) throw new Error('Failed to save material');

      const { data: savedQuestions, error: saveError } = await (supabase.rpc as any)('save_questions', {
        p_user_id: user.id,
        p_material_id: materialData.id,
        p_question_data: questionsData.questions,
        p_question_count: questionsData.questions.length,
      });

      if (saveError || !savedQuestions?.success) {
        await (supabase.from('materials') as any).delete().eq('id', materialData.id);
        throw new Error('Failed to save questions');
      }

      setStatus('success');
      setTimeout(() => router.push('/materials'), 1500);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
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
      const validTypes = [
        'application/pdf', 
        'image/jpeg', 
        'image/png', 
        'image/jpg',
        'text/plain',
        'text/markdown',
        '' // For some systems where .md doesn't have a mime type
      ];
      if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.md') && !selectedFile.name.endsWith('.txt')) {
        setError('Please upload a PDF, image (JPG, PNG), or text file (.txt, .md)');
        return;
      }
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
      const reader = new FileReader();
      const fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const supabase = getSupabaseClient();

      let extractedText: string;
      let fileType: 'pdf' | 'image' | 'audio' | 'text';

      // Handle plain text files locally
      if (file.type === 'text/plain' || file.type === 'text/markdown' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        extractedText = await file.text();
        fileType = 'text';
      } else {
        const base64Data = fileData.split(',')[1];
        let functionName: string;

        if (file.type === 'application/pdf') {
          functionName = 'process-pdf';
          fileType = 'pdf';
        } else if (file.type.startsWith('image/')) {
          functionName = 'process-image';
          fileType = 'image';
        } else {
          throw new Error('Unsupported file type');
        }

        // Process file to extract text via Edge Function
        const { data, error: functionError } = await supabase.functions.invoke(functionName, {
          body: {
            fileData: base64Data,
            fileName: file.name,
            mimeType: file.type,
          },
        });

        if (functionError) throw new Error(functionError.message || 'Failed to process file');
        if (!data.success) throw new Error(data.error || 'Failed to process file');
        
        extractedText = data.text;
      }

      // Step 2: Generate questions FIRST
      const { data: questionsData, error: questionsError } = await (supabase.functions.invoke('generate-questions', {
        body: { text: extractedText },
      }) as any);

      if (questionsError || !questionsData.success) throw new Error('Failed to generate questions');
      
      // Step 3: Check if we have questions
      if (!questionsData.questions || questionsData.questions.length === 0) {
        throw new Error('No questions could be generated from this content. Please try a different file or add more content.');
      }

      // Step 4: Only NOW save the material (since we know we have questions)
      const { data: materialData, error: materialError } = await (supabase
        .from('materials') as any)
        .insert({
          user_id: user.id,
          title: file.name.replace(/\.[^/.]+$/, ''),
          file_type: fileType,
          extracted_text: extractedText,
        })
        .select()
        .single();

      if (materialError) throw new Error('Failed to save material');

      // Step 5: Save the questions
      const { data: savedQuestions, error: saveError } = await (supabase.rpc as any)('save_questions', {
        p_user_id: user.id,
        p_material_id: materialData.id,
        p_question_data: questionsData.questions,
        p_question_count: questionsData.questions.length,
      });

      if (saveError || !savedQuestions?.success) {
        // If saving questions fails, delete the material we just created
        await (supabase.from('materials') as any).delete().eq('id', materialData.id);
        throw new Error('Failed to save questions');
      }

      // Increment upload count after successful upload
      await uploadLimitService.incrementUploadCount(user.id);
      const newRemaining = await uploadLimitService.getRemainingUploads(user.id);
      setRemainingUploads(newRemaining);

      setStatus('success');
      setTimeout(() => router.push('/materials'), 1500);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
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
      if (text.length < 50) throw new Error('Text must be at least 50 characters long');

      // Generate questions FIRST
      const { data: questionsData, error: questionsError } = await (supabase.functions.invoke('generate-questions', {
        body: { text: text.trim() },
      }) as any);

      if (questionsError || !questionsData.success) throw new Error('Failed to generate questions');
      
      if (!questionsData.questions || questionsData.questions.length === 0) {
        throw new Error('No questions could be generated from this text. Please add more content or try different text.');
      }

      // Only save material if we have questions
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

      if (materialError) throw new Error('Failed to save material');

      const { data: savedQuestions, error: saveError } = await (supabase.rpc as any)('save_questions', {
        p_user_id: user.id,
        p_material_id: materialData.id,
        p_question_data: questionsData.questions,
        p_question_count: questionsData.questions.length,
      });

      if (saveError || !savedQuestions?.success) {
        await (supabase.from('materials') as any).delete().eq('id', materialData.id);
        throw new Error('Failed to save questions');
      }

      // Increment upload count after successful upload
      await uploadLimitService.incrementUploadCount(user.id);
      const newRemaining = await uploadLimitService.getRemainingUploads(user.id);
      setRemainingUploads(newRemaining);

      setStatus('success');
      setTimeout(() => router.push('/materials'), 1500);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScreenLayout title="Upload" subtitle="Upload files or paste text to generate AI flashcards">
      <div className="max-w-3xl mx-auto w-full space-y-4">
        {/* Upload Limit Indicator */}
        {remainingUploads !== null && remainingUploads < 100 && (
          <Card className={cn(
            "border-[3px] rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]",
            remainingUploads === 0 ? "border-red-500 bg-red-50" : 
            remainingUploads === 1 ? "border-yellow-500 bg-yellow-50" : 
            "border-blue-500 bg-blue-50"
          )}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-black text-xl",
                  remainingUploads === 0 ? "bg-red-500 text-white" :
                  remainingUploads === 1 ? "bg-yellow-500 text-white" :
                  "bg-blue-500 text-white"
                )}>
                  {remainingUploads}
                </div>
                <div>
                  <p className="font-handwritten text-lg font-black">
                    {remainingUploads === 0 ? "No Free Uploads Left" :
                     remainingUploads === 1 ? "1 Free Upload Remaining" :
                     `${remainingUploads} Free Uploads Remaining`}
                  </p>
                  <p className="font-handwritten text-sm text-muted-foreground">
                    {remainingUploads === 0 ? 
                      "Upgrade to Masterly Pro for unlimited uploads!" :
                      "Get unlimited uploads with Masterly Pro"}
                  </p>
                </div>
              </div>
              {remainingUploads === 0 && (
                <Button
                  onClick={() => setLimitModalOpen(true)}
                  variant="default"
                  className="font-handwritten font-black px-6 py-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-2 border-foreground"
                >
                  Go Premium
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Pro Active Indicator */}
        {remainingUploads !== null && remainingUploads >= 100 && (
          <Card className="border-[3px] border-primary/30 rounded-2xl bg-primary/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-handwritten text-lg font-black text-primary">Masterly Pro Active</p>
                  <p className="font-handwritten text-sm text-primary/70">Enjoy unlimited uploads and premium features!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={mode} onValueChange={(v) => setMode(v as UploadMode)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-background/50 p-1 border-2 border-foreground/10 rounded-xl h-14">
            <TabsTrigger value="file" className="font-handwritten text-lg text-foreground/40 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:opacity-100 rounded-lg transition-all">Upload File</TabsTrigger>
            <TabsTrigger value="record" className="font-handwritten text-lg text-foreground/40 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:opacity-100 rounded-lg transition-all">Record Audio</TabsTrigger>
            <TabsTrigger value="text" className="font-handwritten text-lg text-foreground/40 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:opacity-100 rounded-lg transition-all">Paste Text</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="mt-4 animate-in fade-in slide-in-from-bottom-4">
            <Card className="border-[3px] border-foreground rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              <CardHeader className="pb-4">
                <CardTitle className="font-handwritten text-2xl">Select File</CardTitle>
                <CardDescription className="font-handwritten text-base italic">
                  PDF, JPG, PNG, TXT, MD (max 10MB)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  
                  {/* Hidden file input */}
                  <input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.txt,.md"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                  />
                  
                  {/* Custom file picker button */}
                  <label
                    htmlFor="file"
                    className={cn(
                      "flex flex-col items-center justify-center p-8 rounded-2xl border-[3px] border-dashed border-foreground/20 bg-muted/10 cursor-pointer transition-all",
                      "hover:border-primary hover:bg-primary/5 hover:scale-[1.02]",
                      (uploading || remainingUploads === 0) && "opacity-50 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <UploadIcon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-xl font-black font-handwritten text-foreground mb-1">
                      Click to browse files
                    </p>
                    <p className="text-sm font-handwritten text-info/70 text-center">
                      PDF, JPG, PNG, TXT, MD (max 10MB)
                    </p>
                  </label>
                </div>

                {file && (
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center gap-3 p-3 rounded-xl border-[2px] border-foreground/10 bg-muted/30">
                      {file.type === 'application/pdf' ? (
                        <div className="p-2 bg-secondary/10 rounded-lg"><FileText className="w-6 h-6 text-secondary" /></div>
                      ) : file.type.startsWith('image/') ? (
                        <div className="p-2 bg-info/10 rounded-lg"><ImageIcon className="w-6 h-6 text-info" /></div>
                      ) : (
                        <div className="p-2 bg-accent/10 rounded-lg"><FileText className="w-6 h-6 text-accent" /></div>
                      )}
                      <div className="flex-1 text-left">
                        <p className="font-handwritten text-lg font-black">{file.name}</p>
                        <p className="font-handwritten text-sm opacity-60">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleFileUpload}
                    disabled={!file || uploading || remainingUploads === 0}
                    className="flex-1 h-12 text-lg font-black font-handwritten"
                  >
                    {uploading ? (
                      <><Loader2 className="w-6 h-6 mr-2 animate-spin" />Processing...</>
                    ) : (
                      <><UploadIcon className="w-6 h-6 mr-2" />Upload & Generate</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="record" className="mt-4 animate-in fade-in slide-in-from-bottom-4">
            <Card className="border-[3px] border-foreground rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              <CardHeader className="pb-4">
                <CardTitle className="font-handwritten text-2xl">Record Audio</CardTitle>
                <CardDescription className="font-handwritten text-base italic">
                  Record your voice to create study material
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-[3px] border-dashed border-foreground/20 bg-muted/10">
                  {!recordedBlob ? (
                    <>
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg transition-all ${
                        isRecording ? 'bg-secondary animate-pulse scale-110 shadow-secondary/20' : 'bg-primary/20'
                      }`}>
                        <Mic className={`w-12 h-12 ${isRecording ? 'text-white' : 'text-primary'}`} />
                      </div>
                      
                      {isRecording ? (
                        <>
                          <p className="text-3xl font-black font-handwritten mb-3 text-secondary">{formatTime(recordingTime)}</p>
                          <Button onClick={stopRecording} variant="destructive" size="lg" className="h-12 px-6 font-handwritten text-lg font-black rounded-xl">
                            Stop Recording
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-xl font-handwritten font-black mb-4">Ready to Record</p>
                          <Button onClick={startRecording} disabled={remainingUploads === 0} size="lg" className="h-12 px-6 font-handwritten text-lg font-black rounded-xl gap-2">
                            <Mic className="w-6 h-6" />
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
                      <p className="text-xl font-handwritten font-black mb-1 text-green-600">Recording Complete</p>
                      <p className="text-base font-handwritten mb-4 text-info">Duration: {formatTime(recordingTime)}</p>

                      <div className="w-full max-w-md space-y-3 mb-6 bg-background/50 p-4 rounded-xl border-2 border-foreground/5 text-left">
                        <div className="flex flex-col gap-2">
                          <Label className="font-handwritten text-base font-bold text-foreground/70">Transcription Language</Label>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              placeholder="Search language..."
                              value={languageSearchQuery}
                              onChange={(e) => setLanguageSearchQuery(e.target.value)}
                              className="pl-9 font-handwritten h-10 border-foreground/10"
                            />
                          </div>
                          <div className="max-h-[140px] overflow-y-auto border-2 border-foreground/5 rounded-xl bg-background/80 divide-y divide-foreground/5 thin-scrollbar">
                            {filteredLanguages.length > 0 ? (
                              filteredLanguages.map((lang) => (
                                <button
                                  key={lang.value}
                                  onClick={() => setSelectedLanguage(lang.value)}
                                  className={cn(
                                    "w-full flex items-center justify-between px-4 py-2 hover:bg-primary/5 transition-colors text-left font-handwritten text-sm",
                                    selectedLanguage === lang.value && "bg-primary/10 text-primary font-bold"
                                  )}
                                >
                                  <span>{lang.label}</span>
                                  {selectedLanguage === lang.value && <Check className="w-4 h-4" />}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-4 text-center text-muted-foreground font-handwritten text-sm">
                                No languages found
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-center pt-1 border-t border-foreground/5">
                          <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-handwritten font-black shadow-sm flex gap-2">
                            Language: <span className="text-white">{currentLanguageLabel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button onClick={() => { setRecordedBlob(null); setRecordingTime(0); }} variant="outline" disabled={uploading} className="h-12 font-handwritten text-lg font-bold">
                          Record Again
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleRecordingUpload}
                    disabled={!recordedBlob || uploading || remainingUploads === 0}
                    className="flex-1 h-14 text-xl font-black font-handwritten"
                  >
                    {uploading ? (
                      <><Loader2 className="w-6 h-6 mr-2 animate-spin" />Processing...</>
                    ) : (
                      <><UploadIcon className="w-6 h-6 mr-2" />Upload & Generate</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text" className="mt-4 animate-in fade-in slide-in-from-bottom-4">
            <Card className="border-[3px] border-foreground rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              <CardHeader className="pb-4">
                <CardTitle className="font-handwritten text-2xl">Paste Text</CardTitle>
                <CardDescription className="font-handwritten text-base italic">
                  Paste or type your study material
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text" className="font-handwritten text-lg font-bold">Your Text</Label>
                  <Textarea
                    id="text"
                    placeholder="Paste your study material here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={uploading || remainingUploads === 0}
                    rows={8}
                    className="resize-none border-2 border-foreground/10 rounded-xl bg-background/50 font-handwritten text-lg p-4 leading-relaxed"
                  />
                  <p className="font-handwritten text-sm text-info">
                    {text.length} characters {text.length < 50 && `(${50 - text.length} more needed)`}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleTextUpload}
                    disabled={text.length < 50 || uploading || remainingUploads === 0}
                    className="flex-1 h-12 text-lg font-black font-handwritten"
                  >
                    {uploading ? (
                      <><Loader2 className="w-6 h-6 mr-2 animate-spin" />Processing...</>
                    ) : (
                      <><Type className="w-6 h-6 mr-2" />Generate Questions</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ProcessingModal
        isOpen={modalOpen}
        message={status === 'success' ? 'All set!' : 'Working on it...'}
        error={error}
        onClose={handleCloseModal}
      />

      <UploadLimitModal
        isOpen={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
        remainingUploads={remainingUploads || 0}
      />
    </ScreenLayout>
  );
}
