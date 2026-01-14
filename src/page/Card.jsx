import { useState } from 'react';
import profileImage from '../assets/profile.png';
import { FaHeartPulse } from 'react-icons/fa6';

const moodTints = {
  strength: 'bg-emerald-50',
  distance: 'bg-indigo-50',
  reassurance: 'bg-rose-50',
};

const formatDate = () => {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

const Card = () => {
  const [affirmation, setAffirmation] = useState(
    'This space is for you. When the days feel long or the distance feels heavier, press refresh and take the words slowly. They are meant to meet you where you are.'
  );
  const [mood, setMood] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date] = useState(formatDate());

  const fetchAffirmation = async () => {
    try {
      setIsLoading(true);
      setIsFading(true);

      const res = await fetch(' https://love-card-6xg6.onrender.com/api/affirmation');
      const data = await res.json();

      setTimeout(() => {
        setAffirmation(data.affirmation);
        setMood(data.mood);
        setIsFading(false);
        setIsLoading(false);
      }, 250);
    } catch (e) {
      console.error('Failed to fetch affirmation', e);
      setIsLoading(false);
      setIsFading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECECEC] p-4 md:p-10">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row">
        {/* Image section */}
        <div className="md:w-1/2">
          <img
            src={profileImage}
            alt="Kingsley"
            className="w-full h-full object-cover md:rounded-l-3xl"
          />
        </div>

        {/* Content section */}
        <div className="md:w-1/2 px-6 py-8 md:px-10 md:py-12 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
              Kingsley Chibuikem
            </h1>

            <p className="mt-1 text-xs tracking-[0.25em] uppercase text-gray-400">
              Web Developer
            </p>

            <div className="mt-5">
              <span className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-medium text-white">
                To you, my love
                <FaHeartPulse className="text-red-500 text-sm" />
              </span>
            </div>

            <div
              className={`mt-6 rounded-xl p-4 transition-colors duration-300 ${
                mood ? moodTints[mood] : 'bg-transparent'
              }`}
            >
              {mood && (
                <span className="block mb-2 text-[11px] uppercase tracking-widest text-gray-400">
                  {mood}
                </span>
              )}

              <div className="relative m min-h-40 md:min-h-44">
                <p
                  className={`text-sm md:text-base leading-relaxed text-gray-600 transition-opacity duration-300 ${
                    isFading ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  {isLoading ? (
                    <span className="block h-16 w-full animate-pulse rounded" />
                  ) : (
                    affirmation
                  )}
                </p>
              </div>

              <div className="mt-4 space-y-1 text-xs text-gray-400">
                <p>Just for you, today</p>
                <p>{date}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={fetchAffirmation}
              className="w-full rounded-2xl bg-black py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
