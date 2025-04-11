'use client';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  const startGame = () => {
    const roomId = uuidv4();
    router.push(`/game/${roomId}`);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-6">🔤 Word Chain Game</h1>
      <p className="mb-4 text-gray-600">Challenge your friend to a fast-paced word battle.</p>
      <Button onClick={startGame}>Start New Game</Button>
    </main>
  );
}
