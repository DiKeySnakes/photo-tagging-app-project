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
    <Header
      className='fixed top-0 left-0 z-10 w-full bg-base-300
    flex flex-row justify-around items-center gap-2 px-4 h-16'>
      <Timer timeTaken={timeTaken} />

      <div className='dropdown dropdown-hover dropdown-end'>
        <label
          tabIndex={0}
          className='btn btn-circle btn-primary m-4'
          onMouseEnter={() => setIsCharactersOpen(true)}
          onMouseLeave={() => setIsCharactersOpen(false)}>
          {charactersLeft.length}
        </label>
        {isCharactersOpen && (
          <ul
            tabIndex={0}
            className='dropdown-content z-[1] menu p-2
            shadow bg-base-100 rounded-box w-96 grid grid-cols-2'>
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
