import { useEffect, useState, ChangeEvent } from 'react'
import { Params, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { error } from 'console';

interface IUser {
  userId: number;
  firstName: string | null;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
interface IComment {
  commentId: number
  createdAt: string
  user: IUser
  content: string
}

export default function OneGame() {
  const [cookies] = useCookies(['userId']);
  const { id } = useParams<Params<string>>();
  const [oneGame, setOneGame] = useState<any>({})
  const [gameComments, setGameComments] = useState<IComment[]>([])
  const [newComment, setNewComment] = useState<any>({
    UserId: cookies.userId,
    GameId: id,
    Content: ""
  })
  const [playOnBrowser, setPlayOnBrowser] = useState<boolean>(false)
  const [commentAdded, setcommentAdded] = useState<number>(0)
  const mydate = new Date(oneGame.createdAt)
  const formatedDate = mydate.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "2-digit" })

  const fdate = (date: string) => {
    const fDate = new Date(date)
    const formatedDate = fDate.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "2-digit" })
    return formatedDate
  }

  useEffect(() => {
    axios.get("https://localhost:7223/api/Game/" + id)
      .then(response => {
        console.log(response.data);
        setOneGame(response.data)
        setNewComment({
          ...newComment, Content: ""
        })
      })
      .catch(err => console.log(err))
  }, [commentAdded])
  useEffect(() => {
    axios.get("https://localhost:7223/api/Comment/" + id)
      .then(response => {
        console.log(response.data);
        setGameComments(response.data)
      })
      .catch(err => console.log(err))
  }, [oneGame])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post("https://localhost:7223/api/Comment/", newComment)
      .then(response => setcommentAdded(commentAdded + 1)
      )
      .catch(error => console.log(error))
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setNewComment({ ...newComment, [name]: value });

  };

  const creatorName = oneGame.creator?.firstName + " " + oneGame.creator?.lastName
  const creatorAvatar = oneGame.creator?.firstName + "+" + oneGame.creator?.lastName
  const handleDownload = () => {
    window.open(`https://localhost:7223/api/game/download/${id}`, "_blank");
  };
  return (
    <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <div className="pt-6">

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="overflow-hidden rounded-lg lg:block">
            <img
              src={oneGame.myImages ? oneGame.myImages[0].fileName : ""}
              alt={oneGame.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>


        {/* Game info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">

          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{oneGame.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Game information</h2>

            <p className="text-3xl tracking-tight text-gray-900">{oneGame.price !== 0 ? oneGame.price + " " + "TND" : "Free"}</p>

            <form className="mt-10">
              <button
                onClick={handleDownload}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Download
              </button>
            </form>
            <div className="mt-5">
              <button
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setPlayOnBrowser(true)}
              >
                Play in Browser
              </button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div className='flex flex-col gap-4'>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={`https://ui-avatars.com/api/?background=ae369e&color=fff&name=${creatorAvatar}`}
                  alt={creatorName}
                />
                <div className="text-xs">
                  <p className="text-gray-900 leading-none">{creatorName}</p>
                  <p className="text-gray-600">{formatedDate}</p>
                </div>
              </div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{oneGame.description}</p>
              </div>
            </div>
            {
              playOnBrowser &&
              <div className='mt-14' style={{ width: "1280px", height: "720px" }}>
                <iframe src={oneGame.path} title={oneGame.title} /* style={{ transform: "scale(0.95)" }} */ className="w-full h-full -ml-20" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            }
            <div className="py-6">
              <div className="flex flex-col space-y-4">
                <form className="bg-white p-4 rounded-lg shadow-md" onSubmit={handleSubmit}>
                  <h3 className="text-lg font-bold mb-2">Add a comment</h3>
                  <div className="mb-4">
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="comment" rows={3} name='Content' placeholder="Enter your comment"
                      onChange={handleChange}
                    >{newComment.Content}</textarea>
                  </div>
                  <button
                    className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Submit
                  </button>
                </form>
                {
                  gameComments?.map((comment: IComment) =>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-bold">{comment.user?.firstName} {comment.user?.lastName}</h3>
                      <p className="text-gray-700 text-sm mb-2">{fdate(comment.createdAt)}</p>
                      <p className="text-gray-700">
                        {comment.content}
                      </p>
                    </div>
                  )
                }

              </div>
            </div>

          </div>
        </div>
      </div >
    </div >
  )
}
