import { Link } from 'react-router-dom'
interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
interface IGameJam {
  gameJamId: number;
  userId: number;
  creator: IUser;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  votingEndDate: string;
  createdAt: string;
  updatedAt: string;
}
const OneGameJam = ({
  gameJamId,
  userId,
  creator,
  title,
  description,
  image,
  startDate,
  endDate,
  votingEndDate,
  createdAt,
  updatedAt,
}: IGameJam) => {
  const formatStartDate = (startDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Date(startDate).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <Link to={`/OneGameJam/${gameJamId}`}>
    <div key={gameJamId} className="group relative">
      <div className="flex items-start justify-around">
        <div className=" min-h-80 aspect-h-1 aspect-w-1 w-20 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-20">
          <img
            src="https://i.pinimg.com/564x/dc/c9/9f/dcc99fc7e408573b86c8beb0cc817df4.jpg"
            alt="Game Jam image"
            className=" object-cover object-center h-20 w-20"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-violet-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </h2>
          <h2 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              Hosted By: {creator.firstName} {creator.lastName}
            </a>
          </h2>
          <p className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {description}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700">
        <span aria-hidden="true" className="absolute inset-0" />
        Start Date: {formatStartDate(startDate)}
      </p>
      {/* <div className="mt-4 flex justify-between">
                  
                  
                </div> */}
    </div>
    </Link>
  );
};

export default OneGameJam;
