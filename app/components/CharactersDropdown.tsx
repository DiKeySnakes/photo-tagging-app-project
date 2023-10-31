import Image from 'next/image';
import Dropdown from './Dropdown';
import { ICharacter } from './Character';

interface ICharactersDropdownProps {
  characters: ICharacter[];
  onCharacterClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  coordinates: {
    x: number;
    y: number;
  };
  containerSize: {
    height: number;
    width: number;
  };
}

function CharactersDropdown({
  characters,
  onCharacterClick,
  coordinates,
  containerSize,
}: ICharactersDropdownProps) {
  const availableCharacters = characters.filter(
    (character) => !character.found
  );

  const adaptedOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const adaptedEvent =
      event as unknown as React.MouseEvent<HTMLAnchorElement>;
    onCharacterClick(adaptedEvent);
  };

  return (
    <div className='flex flex-col gap-1 rounded-md'>
      <Dropdown
        x={coordinates.x}
        y={coordinates.y}
        containerSize={containerSize}>
        {availableCharacters.map((character) => (
          <li
            key={character.id}
            className='transition-all duration-300 hover:scale-105 hover:bg-base-300'>
            <button
              onClick={adaptedOnClick}
              className='flex items-center gap-4 px-3 py-4 w-full'
              data-id={character.id}>
              <Image
                src={character.image}
                alt={character.name}
                width={50}
                height={50}
              />
              <span className='text-xl font-semibold'>{character.name}</span>
            </button>
          </li>
        ))}
      </Dropdown>
    </div>
  );
}

export default CharactersDropdown;
