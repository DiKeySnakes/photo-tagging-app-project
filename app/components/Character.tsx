import Image from 'next/image';

export interface ICharacter {
  id: string;
  name: string;
  image: string;
  found: boolean;
}

interface ICharacterProps {
  key: string;
  character: ICharacter;
}

function Character(props: ICharacterProps) {
  return (
    <div className='character'>
      <Image
        src={props.character.image}
        alt={props.character.name}
        className='character-image'
      />
      <p className='character-name'>{props.character.name}</p>
    </div>
  );
}

export default Character;
