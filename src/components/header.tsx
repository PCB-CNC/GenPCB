import ".././assets/header.css"
import imagemLogo from '../Logo.png'

export function Header() {

    return (
        <div className="headerContainer">
            <div className="headerImage">
                <a href='/'><img src={imagemLogo}/></a>
            </div>
        </div>
    );
}