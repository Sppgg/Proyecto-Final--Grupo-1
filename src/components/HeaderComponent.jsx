import "../styles/HeaderStyle.css"; //Ruta de donde coge estilos el componente Header.

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; //useLocation nos permite obtener la ruta exacta de la página en la que nos encontramos. 

import { useNavigate } from "react-router-dom"; /*Redirección en todas las páginas al header*/

const HeaderComponent = () => {    

  const location = useLocation(); /*useLocation nos permite obtener la ruta en la que nos encontramos actualmente.*/
  console.log("Ruta actual:", location.pathname); /*Comprobación de la ruta en la que nos encontramos*/
  const isLoginPageOrRegisterPage = location.pathname === "/" || location.pathname === "/register"; /* Si estoy localizada en la página de Login o en la de Register.*/

  const navigate = useNavigate();
  const handleHomeRedirect = (e) => {
    if (location.path === "/" || location.path === "/register") {
    e.preventDefault();
    } else { 
    navigate ("/home");
    }
  };


  const [isMenuOpen, setMenuOpen] = useState(false); /*useState nos permite manejar el estado de apertura del menu hamburguesa.*/
   /*useState nos permite manejar el estado de apertura del menu hamburguesa.*/
  
  /*MENÚ HAMBURGUESA*/
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
 
  /*Cierre del menú hamburguesa tras hacer click en cualquiera de las posibles opciones (Mi perfil, mis favoritos y logout)*/
  const closeMenu = () => setMenuOpen (false);

  /*Cada vez que cambiemos de página se cerrrá automáticamente el menú hamburguesa, para que cuando cambiemos de página usando 
  botones situados fuera del menú hamburguesa se cierre el menú automáticamente*/
  useEffect (() => {
    setMenuOpen (false);
  }, [location.pathname]); 

 
  return (
    <header className="header" style={{ backgroundColor: "#d21b53" }}>
      <a href="/home" onClick={handleHomeRedirect}
      style={{
        cursor: isLoginPageOrRegisterPage ? "default" : "pointer", /*Mostramos el puntero del ratón "mano" sólo donde es posible usarlo para clicar(todas las páginas menos en la página de entrada (login ("/") y en la de registro ("/register")). */
        pointerEvents: isLoginPageOrRegisterPage ? "none" : "auto" /* El puntero del ratón no actúa en la página de login ("/") ni en la de registro ("/register")*/
      }}>
      <div className="header__logo-img">
        <img src="/logo.png" alt="Logo" />
      </div>
      </a>
      <div className="header__title" style={{ fontFamily: "Roboto" }}>
        BOOKSPACE
      </div>
  
      {/* Para ocultar el menú hamburguesa si estamos en la página de inicio (LoginPage): "/" */}
      {!isLoginPageOrRegisterPage && (
        <div className="header__menu-icon" onClick={toggleMenu}>
          <svg viewBox="0 0 100 80" width="100%" height="100%">
            <rect width="100" height="20" fill="#333333"></rect>
            {/* fill ="color" rellena rect del color elegido */}
            <rect y="30" width="100" height="20" fill="#333333"></rect>
            <rect y="60" width="100" height="20" fill="#333333"></rect>
          </svg>
        </div>
      )}
  
      {isMenuOpen && (
        <div className="header__menu-overlay">
          <ul className="header__menu-list">
            <li>
              <Link to="/dashboard" onClick={closeMenu}>
                Mi Perfil
              </Link>
            </li>
            <li>
              <Link to="/favorites" onClick={closeMenu}>
                Mis Favoritos
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeMenu}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}  

export default HeaderComponent;