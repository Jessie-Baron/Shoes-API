
import { React, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import * as shoeActions from "../../store/shoe";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
// import './NavBar.css'
import Shoes from '../Shoe/AllShoes';

const NavBar = () => {

    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)
    const [usersNav, setUsersNav] = useState([]);
    const [query, setQuery] = useState("")
    const shoes = Object.values(useSelector((state) => state.shoe));
    const ulRef = useRef();


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsersNav(responseData.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(shoeActions.fetchAllShoes());
    }, [dispatch]);


    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
        console.log("opening")
    }

    useEffect(() => {
        const closeMenu = () => {
            if (!showMenu) return
            setShowMenu(false)
            console.log("closing")
        }

        document.addEventListener("click", closeMenu)
        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    const searchItem = document.querySelector(".user-header-navi")
    const searchParam = Number(useLocation().pathname.split("/")[2]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const searchClick = () => {
        setQuery("")
        history.push(`/shoes/${searchItem?.href.slice(-1)}`)
    }

    const searchClick2 = (shoeId) => {
        history.push(`/shoes/${shoeId}`)
        setQuery("")
    }

    const closeMenu = () => setShowMenu(false);

    return (
        <nav>
            <div className="navigation-items">
                <div className="shoe-logo">
                    <NavLink className="logo-container" to="/" exact={true}>
                        <i id='home-logo' class="fa-brands fa-tiktok"></i>
                        <div className="logo-text">Soul</div>
                    </NavLink>
                </div>
                <form className='search-items'>
                    <div className='search-results'>
                        {query && <h5 className='search-results-header'>Shoes</h5>}
                        {query ? shoes.filter(shoe => {
                            if (query === '') {
                                return shoe
                            } else if (shoe.model.toLowerCase().includes(query.toLocaleLowerCase())) {
                                return user
                            }
                        }).map((shoe, index) => (
                            <div className='user-suggested-nav' key={shoe.id}>
                                <img className='profile-navi' src={shoe?.img_url} alt="shoe logo" />
                                <div className='suggested-text'>
                                    <div className='user-header-navi' onClick={() => searchClick2(shoe.id)}>{shoe.model}</div>
                                </div>
                            </div>
                        )) : null}
                    </div>
                    <input className='search-bar' placeholder='Search shoes' type='search' onChange={event => setQuery(event.target.value)}>
                    </input>
                    <hr className="search-divider" />
                    <i id={!searchItem || !query || searchItem === 0 ? "search-icon" : "search-icon-active"} class="fa-solid fa-magnifying-glass"></i>
                    <button className='search-button' disabled={!searchItem?.href || !query || searchItem === 0} onClick={() => searchClick()}>
                    </button>
                </form>
                <div className='nav-buttons'>
                    <button className='upload-button'><NavLink className='upload' to='/upload' exact={true} activeClassName='active'>Add Shoe</NavLink></button>
                    {user && <img onClick={openMenu} className='navbar-profile' src={user.image_url} alt='profile' />}
                    {!user && <div className='login-button'>            <OpenModalButton
                        buttonText="Log In"
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                    /></div>}
                    {!user && <div className='signup-button'>            <OpenModalButton
                        buttonText="Sign Up"
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    /></div>}
                </div>
                {showMenu &&
                    <div className='dropdown'>
                        <div className='main-menu-holder'>
                            <div className='main-menu-inner'>
                                <span />
                                <div className='main-menu-wrapper'>
                                    <div className='dropdown-info'>
                                        <p className='info-item'>{user.username}</p>
                                        <p className='info-item'>{user.first_name} {user.last_name}</p>
                                        <p className='info-item'>{user.email}</p>
                                    </div>
                                    <hr className='dropdown-divider' />
                                    <div className='dropdown-links'>
                                        <>
                                            <>
                                                <li>
                                                    <button onClick={handleLogout}>Log Out</button>
                                                </li>
                                            </>
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </nav>
    );
}

export default NavBar;
