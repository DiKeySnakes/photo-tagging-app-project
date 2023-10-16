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
      className='level-preview-card'
      data-characters-showing={showCharacters}>
      <div className='level-preview-card-image-container'>
        <Image
          src={level.image}
          alt={level.name}
          className='level-preview-card-image'
        />
      </div>
      <div className='level-preview-card-info'>
        <p className='level-preview-card-name'>{level.name}</p>
        {showCharacters && level.characters.length > 0 && (
          <div className='level-preview-card-character-photos'>
            {level.characters.map(({ image, id }) => (
              <Image
                key={id}
                src={image}
                alt={level.name}
                className='level-preview-card-character-photo'
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LevelPreview;
