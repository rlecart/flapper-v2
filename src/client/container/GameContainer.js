import React, { Fragment, useState, useRef } from 'react';

import { Bird } from '../components/Bird';
import { PipesContainer } from './PipesContainer';

export const GameContainer = ({ }) => {
  const inGame = useRef(false);
  const gameInterval = useRef(undefined);
  const jumpInterval = useRef(undefined);
  const isMounted = useRef(false);
  const [distance, setDistance] = useState(0);
  const [pos, setPos] = useState(0);
  const prevPos = useRef(0);
  const add = useRef(200);
  const initialAdd = useRef(200);
  const isUp = useRef(true);
  const isInJump = useRef(false);

  const resetGame = () => {
    clearInterval(gameInterval.current);
    gameInterval.current = undefined;
    clearInterval(jumpInterval.current);
    jumpInterval.current = undefined;
    setPos(0);
    setDistance(0);
    inGame.current = false;
    prevPos.current = 0;
    add.current = initialAdd.current;
    isUp.current = true;
    isInJump.current = false;
  };

  const move = () => {
    if (isUp.current === true) {
      add.current /= 2;
      if (add.current <= 2) {
        isUp.current = !isUp.current;
      }
    }
    else {
      if (add.current * 2 < initialAdd.current * 3)
        add.current *= 2;
      else
        add.current += initialAdd.current;
    }
    setPos(prevPos.current + (add.current - initialAdd.current));
  };

  const jump = () => {
    if (isInJump.current === true) {
      clearInterval(jumpInterval.current);
      isUp.current = true;
      jumpInterval.current = undefined;
      // setPos(prevPos.current + (add.current - initialAdd.current));
    }
    isInJump.current = true;
    prevPos.current = pos;
    add.current = initialAdd.current;
    jumpInterval.current = setInterval(() => move(), 50);
  };

  const eventDispatcher = (event) => {
    if (event.key === ' ') {
      if (!inGame.current)
        inGame.current = true;
      jump();
    }
    else if (event.key === 'c')
      resetGame();
  };

  React.useEffect(() => {
    if (!isMounted.current) {
      window.addEventListener('keypress', eventDispatcher);
    }
    else {
      if (inGame.current) {
        gameInterval.current = setInterval(() => {
          setDistance(distance + 1);
        }, 50);
      }
      else {
        clearInterval(gameInterval.current);
        gameInterval.current = undefined;
      }
    }
    return (() => {
      window.removeEventListener('keypress', eventDispatcher);
      isMounted.current = false;
      console.log('quit')
    });
  }, [inGame, inGame.current, jumpInterval.current]);

  return (
    <Fragment>
      <Bird pos={-(pos)} />
      <PipesContainer
        distance={distance}
      // map={map}
      />
    </Fragment>
  );
};