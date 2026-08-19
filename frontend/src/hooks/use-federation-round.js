import { useEffect, useMemo, useRef, useState } from 'react';
import demoData, { getRound } from '../data/demo-data.js';

const AUTOPLAY_MS = 1600;

const useFederationRound = ({ autoplay: _autoplay = false } = {}) => {
  const total = demoData.rounds.roundsTotal;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  const round = useMemo(() => getRound(index), [index]);
  const progress = useMemo(() => (total <= 1 ? 0 : index / (total - 1)), [index, total]);
  const nextRound = useMemo(() => getRound(index + 1), [index]);

  useEffect(() => {
    if (!playing) return undefined;
    timer.current = setInterval(() => {
      setIndex((i) => {
        const next = i + 1;
        if (next >= total) {
          setPlaying(false);
          return i;
        }
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(timer.current);
  }, [playing, total]);

  const reset = () => {
    setPlaying(false);
    setIndex(0);
  };
  const go = (i) => {
    setIndex(Math.min(total - 1, Math.max(0, Math.floor(i))));
  };
  const step = () => go(index + 1);
  const back = () => go(index - 1);
  const play = () => {
    if (index >= total - 1) setIndex(0);
    setPlaying(true);
  };
  const pause = () => setPlaying(false);
  const toggle = () => (playing ? pause() : play());

  return {
    index,
    total,
    progress,
    round,
    nextRound,
    rounds: demoData.rounds.rounds,
    phaseOrder: demoData.rounds.phaseOrder,
    phaseLabels: demoData.rounds.phaseLabels,
    playing,
    play,
    pause,
    toggle,
    reset,
    go,
    step,
    back,
  };
};

export default useFederationRound;
