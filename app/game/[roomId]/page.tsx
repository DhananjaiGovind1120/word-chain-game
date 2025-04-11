'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const sessionId = uuidv4();

export default function WordChainGame() {
  const { roomId } = useParams();
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [turn, setTurn] = useState<'self' | 'opponent'>('self');

  useEffect(() => {
    const channel = new BroadcastChannel(String(roomId));
    channel.onmessage = (event) => {
      if (event.data.type === 'word' && event.data.sender !== sessionId) {
        setWords((prev) => [...prev, event.data.word]);
        setTurn('self');
      }
    };
    return () => channel.close();
  }, [roomId]);

  const submitWord = () => {
    if (words.length > 0) {
      const lastLetter = words[words.length - 1].slice(-1).toLowerCase();
      if (currentWord[0].toLowerCase() !== lastLetter)
        return alert(`Word must start with '${lastLetter}'`);
    }
    const channel = new BroadcastChannel(String(roomId));
    channel.postMessage({ type: 'word', word: currentWord, sender: sessionId });
    setWords((prev) => [...prev, currentWord]);
    setCurrentWord('');
    setTurn('opponent');
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🔤 Word Chain</h1>
      <Card className="mb-4">
        <CardContent>
          {words.length === 0 ? (
            <p className="text-gray-500">Start the game by typing a word!</p>
          ) : (
            <motion.div
              key={words[words.length - 1]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold"
            >
              Last Word: <span className="text-blue-600">{words[words.length - 1]}</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter a word"
          value={currentWord}
          disabled={turn === 'opponent'}
          onChange={(e) => setCurrentWord(e.target.value)}
          className="flex-1"
        />
        <Button onClick={submitWord} disabled={turn === 'opponent' || !currentWord}>
          Submit
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        Share this link to play: <code>{typeof window !== 'undefined' && window.location.href}</code>
      </p>
    </div>
  );
}

