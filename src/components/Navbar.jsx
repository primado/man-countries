import { useState, useEffect } from "react";
import { IoSunnySharp, IoMoonOutline } from "react-icons/io5";


export default function Navbar() {

    

    const [theme, setTheme] = useState('')

   // for dark mode
 useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('theme'));
    // if not theme and user OS is dark mode
    if ((!theme && 
      window.matchMedia('(prefers-color-scheme: dark)').matches) || theme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
   

    function toggleTheme () {
        if (theme === "light") {
              // when theme is changed, set the localStorage
            localStorage.setItem("theme", JSON.stringify("dark"));
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", JSON.stringify("light"));
            setTheme("light");
            document.documentElement.classList.remove("dark")
        }
    }

    return (

        <div className="navbar bg-white shadow-md dark:bg-[#2b3743] ">
            <div className="container flex justify-between items-center px-20 h-16 sm-425:px-10 sm-320:px-5">

                <div className="nav-left">
                    <h1 className="font-bold text-2xl sm-425:text-lg sm-470:text-xl dark:text-white sm-320:text-base">Where in the world?</h1>
                </div>

                <div className="theme font-medium">
                    <div className="mode">
                        <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        >
                        {theme === 'dark' ? (
                            <div className="flex items-center gap-x-2 animate-in slide-in-from-top spin-in-3 fade-in-50 duration-700 ease-in-out">
                                <IoSunnySharp className="w-6 h-6 dark:text-white"/> 
                                <span className="dark:text-gray-300 font-semibold text-sm">Light Mode</span>
                            </div>
                           )
                           : (
                            <div className="flex items-center gap-x-2 animate-out slide-out-to-top spin-in-3 fade-in-50 duration-700 ease-in-out">
                                <IoMoonOutline className="w-6 h-6"/>
                                <span className="dark:text-gray-300 font-semibold text-sm">Dark Mode</span>
                            </div>
                           )}
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )

}