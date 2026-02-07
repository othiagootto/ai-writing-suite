import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { useChatStore } from '@/stores/chatStore';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/services/supabase';
import { Send, Upload, Trash2, User, Bot } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function AIChat() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const { messages, isLoading, addMessage, setLoading, clearMessages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMessage });
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: userMessage, history: messages },
      });

      if (error) throw error;

      if (data?.response) {
        addMessage({ role: 'assistant', content: data.response });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : t('chat.failedResponse');
      toast.error(message);
      addMessage({
        role: 'assistant',
        content: t('chat.errorResponse'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = () => {
    toast.info(t('chat.fileUploadSoon'));
  };

  const handleClear = () => {
    if (messages.length === 0) return;
    if (confirm(t('chat.clearConfirm'))) {
      clearMessages();
      toast.success(t('chat.cleared'));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('chat.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('chat.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFileUpload}
              disabled
            >
              <Upload className="h-4 w-4 mr-2" />
              {t('common.upload')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={messages.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('common.clear')}
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="max-w-4xl mx-auto px-4 py-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 mb-4">
                  <Bot className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {t('chat.emptyTitle')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('chat.emptySubtitle')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {[
                    t('chat.prompt1'),
                    t('chat.prompt2'),
                    t('chat.prompt3'),
                    t('chat.prompt4'),
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(prompt)}
                      className="p-3 text-left text-sm border border-border rounded-lg hover:border-muted-foreground hover:bg-accent transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-start gap-4',
                    message.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <div
                      className={cn(
                        'w-full h-full flex items-center justify-center',
                        message.role === 'user'
                          ? 'bg-primary'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      )}
                    >
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </Avatar>
                  <div
                    className={cn(
                      'flex-1 rounded-lg p-4 max-w-3xl',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-sm">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-4">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </Avatar>
                  <div className="flex-1 rounded-lg p-4 max-w-3xl bg-card border border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chat.placeholder')}
              className="min-h-[60px] max-h-[200px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="lg"
              className="bg-primary hover:bg-primary/90 px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
