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
        onClick={onImageClick}
        draggable={false}
        className='input-game-image'
      />

      {foundList.map((found, index) => (
        <div
          className='found-item'
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
