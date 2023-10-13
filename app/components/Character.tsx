import Image from 'next/image';

export interface ICharacter {
  id: string;
  name: string;
  image: string;
  found: boolean;
}
function Character(character: ICharacter) {
  return (
    <div className='character'>
      <Image
        src={character.image}
        alt={character.name}
        className='character-image'
      />
      <p className='character-name'>{character.name}</p>
    </div>
  );
}

export default Character;
