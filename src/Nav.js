 import { Link } from "react-router-dom";
import { useRef } from "react";

import { FaBars, FaTimes } from "react-icons/fa";


import "./nav.css";

function Nav() {

  const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};
  return (
    <header className="container">
      <img src="RCCG-logo.png" height="88" width="88" style={{backgroundColor: "", borderRadius: "50px"}}  alt="chat-icon" />
      <h1>abia province 3</h1>

      <nav ref={navRef}>
				<Link to="/">Home</Link>
				<Link to="/mission">Mission</Link>
				<Link to="/contact">About Us</Link>
				<Link to="/post">
         <img src="logo.png" height="68" width="68" alt="chat-icon" /> </Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
</header> )}



export default Nav;
