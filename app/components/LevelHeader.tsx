import { useState } from 'react';
import Header from './Header';
import Character, { ICharacter } from './Character';
import Timer from './Timer';

interface ILevelHeaderProps {
  characters: ICharacter[];
  timeTaken: number | Date;
}

function LevelHeader({ characters, timeTaken }: ILevelHeaderProps) {
  const [isCharactersOpen, setIsCharactersOpen] = useState(false);
  const charactersLeft = characters.filter((character) => !character.found);

  return (
    <Header className='game-level-header'>
      <Timer timeTaken={timeTaken} />
      <div className='characters-reference'>
        <button
          type='button'
          onClick={() => setIsCharactersOpen(!isCharactersOpen)}>
          {charactersLeft.length}
        </button>
        {isCharactersOpen && (
          <ul className='options'>
            {characters.map((character) => (
              <li key={character.id} data-found={!!character.found}>
                <Character key={character.id} character={character} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Header>
  );
}

export default LevelHeader;
