import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type gameCardTypes = {
    title: string,
    image: string,
    author: string,
    avatar: string,
    description: string,
    badges: string[]
    os: string[]
}
const GameCard2 = ({ title, image, author, avatar, description, badges, os }: gameCardTypes) => {
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow">
                <img className="w-full" src={image} alt={title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={avatar} alt={avatar} />
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">{author}</p>
                            <p className="text-gray-600">Aug 18</p>
                        </div>
                    </div>
                    <p className="text-gray-700 text-base">
                        {description}
                    </p>
                </div>
                <div className="px-6 pb-2">
                    {
                        badges.map(b => (
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{b}</span>
                        ))
                    }
                </div>
                <div className="px-6 pb-2">
                    {
                        os.map(o => {
                            switch (o) {
                                case "windows":
                                    return (
                                        <span className="inline-block gap-2">
                                            <img src={require("../assets/icons/windows.png")} alt="" width="24" />
                                        </span>
                                    )


                                case "android":
                                    return (
                                        <span className="inline-block">
                                            <img src={require("../assets/icons/android.png")} alt="" width="24" />
                                        </span>
                                    )
                                case "inBrowser":
                                    return (
                                        <span className="inline-block gap-2">
                                            <img src={require("../assets/icons/browser.png")} alt="" width="24" />
                                        </span>
                                    )
                                default:
                                    break;
                            }
                        }

                        )
                    }
                </div>

            </div>
        </>
    )
}

export default GameCard2

