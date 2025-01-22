import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoLogInSharp } from 'react-icons/io5';
import { MdGroups3 } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import './Navbar.css';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const path = useLocation();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log("log out")
    try {
      console.log(USER_API_END_POINT); // Should display the correct API URL
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  useEffect(() => {
    const pathName = path.pathname;
    if (pathName === '/') setSelectedItem(0);
    else if (pathName === '/collab') setSelectedItem(1);
    else if (pathName === '/profile') setSelectedItem(2);
    else if (pathName === '/discussion') setSelectedItem(3);
  }, [path]);

  useEffect(() => {
    const handleScroll = () => {
      const stickyElement = stickyRef.current;
      const rect = stickyElement.getBoundingClientRect();
      setIsSticky(rect.top === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div ref={stickyRef} className={`sticky top-0 z-10 ${isSticky ? 'bg-white shadow' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <h2 data-text = "SmartHire"  className="font-style text-4xl font-bold pt-3  ">
        {/* <button class="text-2xl group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left pl-4 p-3 text-gray-50 font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
  SmartHire
</button> */}
      SmartHire

        </h2>
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/admin/companies">Companies</NavLink>
                </li>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/admin/jobs">Jobs</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/">Home</NavLink>
                </li>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/jobs">Jobs</NavLink>
                </li>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/browse">Browse</NavLink>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="hover:bg-[#F83002] hover:text-white transition-colors">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition-colors">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer transition-transform hover:scale-105">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" className="rounded-full" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <Link to='/profile' className="flex gap-2 space-y-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </Link>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === 'student' && (
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[#F83002] transition-colors">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#F83002] transition-colors">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col items-start p-4 bg-white shadow-md lg:hidden">
          <ul className="flex flex-col gap-4 font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/admin/companies">Companies</NavLink>
                </li>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/admin/jobs">Jobs</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/">Home</NavLink>
                </li>
                <li className="">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/jobs">Jobs</NavLink>
                </li>
                <li className="hover:text-[#F83002] transition-colors">
                  <NavLink className={({ isActive }) => 
                            isActive ? "text-blue-400 font-bold" : "hover:text-blue-900 transition-colors"} to="/browse">Browse</NavLink>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="mt-4">
              <Link to="/login">
                <Button variant="outline" className="hover:bg-[#F83002] hover:text-white transition-colors">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="ml-2">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition-colors">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="mt-4 cursor-pointer transition-transform hover:scale-105">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-full mt-2">
                <Link to='/profile' className="flex gap-2 space-y-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </Link>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === 'student' && (
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[#F83002] transition-colors">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#F83002] transition-colors">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar