'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Sparkles, X } from 'lucide-react';

interface UploadLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingUploads: number;
}

export function UploadLimitModal({ isOpen, onClose, remainingUploads }: UploadLimitModalProps) {
  const hasUploadsLeft = remainingUploads > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <Card className="relative z-10 w-full max-w-md border-[3px] border-foreground rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] animate-in zoom-in-95 slide-in-from-bottom-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
            {hasUploadsLeft ? (
              <Sparkles className="w-8 h-8 text-primary" />
            ) : (
              <AlertCircle className="w-8 h-8 text-secondary" />
            )}
          </div>
          <CardTitle className="font-handwritten text-2xl">
            {hasUploadsLeft ? `${remainingUploads} Free Upload${remainingUploads === 1 ? '' : 's'} Left!` : 'Free Uploads Used'}
          </CardTitle>
          <CardDescription className="font-handwritten text-base pt-2">
            {hasUploadsLeft ? (
              <>
                You have <span className="font-bold text-primary">{remainingUploads} out of 3</span> free uploads remaining.
                <br />
                <span className="text-sm text-muted-foreground mt-2 block">
                  Upgrade to Pro on our iOS app for unlimited uploads!
                </span>
              </>
            ) : (
              <>
                You've used all <span className="font-bold text-secondary">3 free uploads</span>.
                <br />
                <span className="text-sm text-foreground/70 mt-3 block">
                  Download our <span className="font-bold">iOS app</span> to upgrade to Pro and get unlimited uploads, advanced features, and more!
                </span>
              </>
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col gap-2 pt-0">
          {!hasUploadsLeft && (
            <Button
              onClick={() => window.open('https://apps.apple.com/app/masterly-ai/id6738303032', '_blank')}
              className="w-full h-12 text-lg font-black font-handwritten"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get iOS App
            </Button>
          )}
          <Button
            onClick={onClose}
            variant={hasUploadsLeft ? "default" : "outline"}
            className="w-full h-12 text-lg font-black font-handwritten"
          >
            {hasUploadsLeft ? 'Continue' : 'Close'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

