
import './footer.css';
import {useState} from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import firebase from "firebase/app";

function Footer() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const inputHandler = (e) => {setInput(e.target.value)}
  const submitHandler = (e) => {
    e.preventDefault()
    if (input) {
      console.log(input)

      db.collection("emails").add({
        email: input,
        time: firebase.firestore.fieldvalue.serverTimestamp()
      })
      setInput("")
      setMessage("Thank you for subcribing!!!")
      setTimeout(()=> {
        setMessage("")
      }, 3000)
    }
  }
    return (
      <div className='footer-container'>
        <section className='footer-subscription'>
          <p className='footer-subscription-heading'>
            Please subscribe to our Newsletter
          </p>
          <p className='footer-subscription-text'>
            You can unsubscribe at any time.
          </p>
          <div className='input-areas'>
            <form onSubmit={submitHandler}>
              <input
                className='footer-input'
                name='email'
                type='email' onChange={inputHandler} value={input}
                placeholder='Your Email'
              />
              <button type="submit">Submit</button>
             
            </form>
            {message && <span>{message}</span>}
          </div>
        </section>
        <div className='footer-links'>
          <div className='footer-link-wrapper'>
            <div className='footer-link-items'>
              <h2>About Us</h2>
              <Link to='/sign-up'>How it works</Link>
         
            </div>
            <div className='footer-link-items'>
              <h2>Contact Us</h2>
              <Link to='/'>Contact</Link>
              <Link to='/'>Support</Link>
             
            </div>
          </div>
          
            <div className='footer-link-items'>
              <h2>Social Media</h2>
              <Link to='/'>Instagram</Link>
              <Link to='/'>Facebook</Link>
              <Link to='/'>Youtube</Link>
              <Link to='/'>Twitter</Link>
            </div>
          
        </div>
        <section className='social-media'>
          <div className='social-media-wrap'>
            <div className='footer-logo'>
              <Link to='/' className='social-logo'>
              <img src="RCCG-logo.png" height="88" width="88" style={{backgroundColor: "", borderRadius: "50px"}}  alt="chat-icon" />
                <i className='fab fa-typo3' />
              </Link>
            </div>
            <small className='website-rights'>Abia Province 3 © 2023</small>
            <div className='social-icons'>
              <Link
                className='social-icon-link facebook'
                to='/'
                target='_blank'
                aria-label='Facebook'
              >
                <i className='fab fa-facebook-f' />
              </Link>
              <Link
                className='social-icon-link instagram'
                to='/'
                target='_blank'
                aria-label='Instagram'
              >
                <i className='fab fa-instagram' />
              </Link>
              <Link
                className='social-icon-link youtube'
                to='/'
                target='_blank'
                aria-label='Youtube'
              >
                <i className='fab fa-youtube' />
              </Link>
              <Link
                className='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='Twitter'
              >
                <i className='fab fa-twitter' />
              </Link>
              <Link
                className='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='LinkedIn'
              >
                <i className='fab fa-linkedin' />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default Footer;