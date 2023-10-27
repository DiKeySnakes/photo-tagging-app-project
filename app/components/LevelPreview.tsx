import Image from 'next/image';
import { ICharacter } from './Character';

interface ILevelPreviewProps {
  showCharacters?: boolean;
  level: {
    name: string;
    image: string;
    characters: ICharacter[];
  };
}

// Default props
const defaultProps: Partial<ILevelPreviewProps> = {
  showCharacters: false,
};

function LevelPreview({ level, showCharacters }: ILevelPreviewProps) {
  return (
    <div
      className='h-full p-8 border-2 border-neutral rounded-xl'
      data-characters-showing={showCharacters}>
      <div className='flex justify-center mb-4'>
        <h2 className='card-title'>{level.name}</h2>
      </div>

      <div className='card w-96 bg-base-100 shadow-xl'>
        <figure className='px-10 pt-10 mt-10 w-full h-80'>
          <Image
            src={level.image}
            alt={level.name}
            quality={100}
            fill
            sizes='100vw'
            className='rounded-xl'
            style={{ objectFit: 'cover' }}
          />
        </figure>
      </div>
    </div>
  );
}

export default LevelPreview;
