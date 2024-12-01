import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
    targetDate: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate} ) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate).getTime() - new Date().getTime();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };
        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(timer);
    }, [targetDate]);

    if (timeLeft.days < 0) return null;

    return (
        <div className="flex items-center space-x-4 text-sm bg-zinc-800/50 rounded-lg p-2 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-zinc-400" />
            <div className="flex space-x-2">
                {Object.entries(timeLeft).map(([key, value]) => (
                    <div key={key} className="flex flex-col items-center">
                        <span className="text-zinc-200 font-mono">{value.toString().padStart(2, '0')}</span>
                        <span className="text-zinc-500 text-xs">{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountdownTimer;