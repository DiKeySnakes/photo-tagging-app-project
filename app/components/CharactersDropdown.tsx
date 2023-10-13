import Image from 'next/image';
import Dropdown from './Dropdown';
import { ICharacter } from './Character';

interface ICharactersDropdownProps {
  characters: ICharacter[];
  onCharacterClick: () => void;
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

  return (
    <form
      action=''
      onSubmit={onCharacterClick}
      className='game-level-characters-dropdown'>
      <Dropdown
        x={coordinates.x}
        y={coordinates.y}
        containerSize={containerSize}>
        {availableCharacters.map((character) => (
          <li key={character.id} className='character-list-item'>
            <button
              type='submit'
              className='character-button-submit'
              data-id={character.id}>
              <Image src={character.image} alt={character.name} />
              <span className='character-name'>{character.name}</span>
            </button>
          </li>
        ))}
      </Dropdown>
    </form>
  );
}

export default CharactersDropdown;
