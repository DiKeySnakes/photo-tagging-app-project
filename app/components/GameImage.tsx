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
        className='block w-full mt-16 cursor-crosshair'
      />

      {foundList.map((found, index) => (
        <div
          className='font-bold p-1 rounded-md text-center text-xs text-white max-w-[100px]'
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
