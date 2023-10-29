import Image from 'next/image';

export interface ICharacter {
  id: string;
  name: string;
  image: string;
  found: boolean;
  position: number;
  // coordinates: {
  //   x: number;
  //   y: number;
  // };
}

interface ICharacterProps {
  key: string;
  character: ICharacter;
}

function Character(props: ICharacterProps) {
  return (
    <div
      className='flex flex-col justify-center items-center
    transform scale-100 hover:scale-110 transition-transform ease-in-out duration-300'>
      <Image
        src={props.character.image}
        alt={props.character.name}
        width={50}
        height={50}
        className='character-image'
      />
      <span className='mt-4 text-lg'>{props.character.name}</span>
    </div>
  );
}

export default Character;
