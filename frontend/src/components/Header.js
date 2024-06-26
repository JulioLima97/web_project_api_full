import clipboard from '../images/clipboard.png'
import logo from '../images/logo.png'

export default function Header({ text, exit }) {
  function menuOpen() {
    const menu = document.querySelector('.header__menu');
    menu.classList.toggle('header__menu_open');
  }
  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            className="header__photo"
            src={logo}
            alt="logo de Around TheUS"
          />
        <div/>
        <div className='header__clipboard'>
            <button className='header__clipboard_button' onClick={menuOpen}>
              <img src={(clipboard)} alt="icone prancheta"/>
            </button>
          </div>
          <div className='header__login'>
            <span>{text}</span>
            <span>{exit}</span>
          </div>
        </div>

          <div className='header__menu'>
            <span>{text}</span>
            <span className='header__logout'>{exit}</span>
          </div>
      </header>
    </>
  );
}