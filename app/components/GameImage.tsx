// import Image from 'next/image';
'use client';

interface IGameImageProps {
  image: string;
  name: string;
  onImageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  foundList: {
    x: number;
    y: number;
    name: string;
  }[];
}

function GameImage({ image, name, onImageClick, foundList }: IGameImageProps) {
  return (
    <>
      <input
        type='image'
        src={image}
        alt={name}
        width='100%'
        height='100%'
        onClick={onImageClick}
        draggable={false}
        // input-game-image
        className='block w-full'
      />

      {foundList.map((found, index) => (
        <div
          // found-item
          className='font-bold p-1 rounded-md text-center text-xs max-w-[100px]'
          data-testid='found-item'
          style={{ position: 'absolute', left: found.x, top: found.y }}
          key={index}>
          {found.name}
        </div>
      ))}
    </>
  );
}

export default GameImage;
