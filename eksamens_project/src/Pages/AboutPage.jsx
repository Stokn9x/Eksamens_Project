import './AboutPage.css';
import logo from '../assets/Logo/LogoMedNavn.png'; // Importer billedet

function AboutPage() {
    return (
        <div className="about-page-container">
            <div className="about-page-content">
                <h1>Om Manaish Huset</h1>
                <p>
                    Manaish er en restaurant, der åbner dørene for alle kulturer. Der er mulighed for både burger og libanesisk mad. Her er alle velkomne.
                    <br></br>
                    <br></br>
                    Restauranten er et familieprojekt, som er samlingspunkt for hele familien Hansen. Det er vores fælles samlingspunkt.
                    <br></br>
                    <br></br>
                    Vi vil gerne give jer som gæster en lille bid af Libanon og bringe noget af vores kultur til jer.
                </p>
            </div>
            <div className="about-page-image">
                <img src={logo}/>
            </div>
        </div>
    );
}

export default AboutPage;