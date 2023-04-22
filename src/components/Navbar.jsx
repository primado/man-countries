



export default function Navbar() {

    return (

        <div className="navbar bg-white shadow-md ">
            <div className="container flex justify-between items-center px-20 h-16 sm-425:px-10 sm-320:px-5">

                <div className="nav-left">
                    <h1 className="font-bold text-2xl sm-425:text-lg sm-470:text-xl">Where in the world?</h1>
                </div>

                <div className="theme font-medium">
                    <div className="mode">
                        Dark Mode
                    </div>
                </div>

            </div>
        </div>

    )

}