import approved from '../images/approved.jpg'
import disapproved from '../images/disapproved.jpg'
import buttonClose from "../images/image-button-close.png";

function InfoToolTip({ isOpen, popupType, handleClose }) {
    return (
      <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
        <div className='popup__container'>
          <button
            type='button'
            className='button-close-popup'
            onClick={handleClose}
          >
            <img
              src={(buttonClose)}
              alt="grande icone em 'x' para usado para fechar o popup"
            />
          </button>
          <div className='popup__form-container'>
            <form className='popup__form'>
              <fieldset className='popup__set'>
                <div>
                  <img alt="icones de aprovado e desaprovado" 
                  src={
                      popupType === 'success'
                        ? (approved)
                        : (disapproved)
                    }
                  />
                  <p className='popup__message'>
                    {popupType === 'success'
                      ? 'Vitória! Você se registrou.'
                      : 'Ops, algo deu errado! Por favor, tente novamente.'}
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    );
  }
  
  export default InfoToolTip;