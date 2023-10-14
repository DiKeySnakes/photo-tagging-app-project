import Image from 'next/image';
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

function Instructions({ level, onStart }: IInstructions) {
  return (
    <div className='game-instructions modal'>
      <div className='game-instructions-content'>
        <div className='game-instructions-image-container'>
          <Image
            src={level.image}
            alt={level.name}
            draggable={false}
            className='game-instructions-image'
          />
        </div>
        <div className='game-instructions-info'>
          <h1 className='game-instructions-level-name'>{level.name}</h1>
          <div className='game-info-characters'>
            {level.characters.map((character) => (
              <Character key={character.id} character={character} />
            ))}
          </div>
          <button type='button' onClick={onStart} className='start-game'>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
