import { Link } from 'react-router-dom'

type gameCardTypes = {
  title: string,
  price: number,
  image: string,
  id: number,
  avatar: string,
  creator: string,
  date: string
  description: string
}
const GameCard = ({ id, title, price, image, avatar, creator, date, description }: gameCardTypes) => {
  const mydate = new Date(date)
  const formatedDate = mydate.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "2-digit" })

  return (
    <>
      <div key={id} className="group relative bg-white rounded-md p-2 bg-opacity-20 backdrop-filter backdrop-blur-lg" >
        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-100">
          <img
            // src={require(image).default}
            src={image}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
          {/* {game.myImages.length !== 0 ? <p className='text-red-500'> game.myImages[0].fileName</p> : ""} */}
        </div>
        <div className="p-1 flex flex-col gap-y-1">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                <Link to={`/games/one/${id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {title}
                </Link>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">{price}DT</p>

          </div>
          <div className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-4" src={avatar} alt={avatar} />
            <div className="text-xs">
              <p className="text-gray-900 leading-none">{creator}</p>
              <p className="text-gray-600">{formatedDate}</p>
            </div>
          </div>
          <p className="text-sm truncate">{description}</p>
          <p className="text-sm truncate">{description}</p>
        </div>

      </div >
    </>


  );

};

export default GameCard;
