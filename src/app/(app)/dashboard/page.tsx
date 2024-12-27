"use client"
import React, { useCallback, useState, useEffect } from 'react';
import { Message } from '@/app/model/user';
import { useToast } from '@/hooks/use-toast';
import { AcceptMessageSchema } from '@/app/schemas/acceptMessageSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MessageCard } from '@/component/MessageCard';
import { Separator } from '@/components/ui/separator';
import { Loader2, RefreshCcw } from 'lucide-react';
import { ObjectId } from "mongodb";

export default function Page() {
  const [message, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();

  const { data: session } = useSession();
  const form = useForm({ resolver: zodResolver(AcceptMessageSchema) });
  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const handleDeleteMessage = (messageId: ObjectId) => {
    setMessage(message.filter((message) => message._id !== messageId));
  };

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');
      setMessage(response.data.messages || []);
      if (refresh) {
        toast({
          title: "Refreshed Messages",
          description: "Showing latest messages",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [fetchAcceptMessage, fetchMessages, session]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to update message settings",
        variant: "destructive",
      });
    }
  };

  const { username } = session?.user || '';
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const ProfileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ProfileUrl);
    toast({
      title: 'Profile URL copied to clipboard',
      description: 'Profile url has been copied to clipboard',
    });
  };

  if (!session || !session.user) return <div>Please Login..</div>;

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={ProfileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">Accept Messages: {acceptMessages ? 'On' : 'Off'}</span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>

      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Your Messages</h1>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : message.length > 0 ? (
          message.map((message, index) => (
            <div key={index}>
              <MessageCard message={message} onMessageDelete={handleDeleteMessage} />
            </div>
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}
