// /components/CountdownTimer.js
import { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      {Object.keys(timeLeft).length > 0 ? (
        <span>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      ) : (
        <span>Auction Ended</span>
      )}
    </div>
  );
};

export default CountdownTimer;



