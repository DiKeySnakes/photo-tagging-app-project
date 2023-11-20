'use client';

import Image from 'next/image';
import Modal from './Modal';
import Character, { ICharacter } from './Character';

interface IInstructions {
  level: {
    id: string | number;
    name: string;
    image: string;
    characters: ICharacter[];
  };
  onStart: () => void;
}

function GameStartModal({ level, onStart }: IInstructions) {
  return (
    <Modal id='game-start-modal'>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <div className='max-h-[80vh] mr-6'>
            <Image
              src={level.image}
              alt={level.name}
              width={500}
              height={500}
              // fill
              // sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              draggable={false}
              className='w-full h-full object-cover rounded-xl'
            />
          </div>
          <div className='w-full flex flex-col gap-2 p-1'>
            <h1 className='text-center text-3xl mb-5 font-bold'>
              {level.name}
            </h1>
            <div className='h-full grid grid-cols-3 mx-8 gap-6'>
              {level.characters.map((character) => (
                <Character key={character.id} character={character} />
              ))}
            </div>
            <div className='w-full flex justify-center mt-5'>
              <button className='btn btn-primary' onClick={onStart}>
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default GameStartModal;
