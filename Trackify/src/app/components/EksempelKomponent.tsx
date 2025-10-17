import React from 'react';

const EksempelKomponent: React.FC = () => {
    return (
        <div className="eksempel-komponent" style={{ padding: 16, fontFamily: 'Arial, sans-serif' }}>
            <header>
                <h1>Eksempel Komponent</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                </p>
            </header>

            <section>
                <h2>Introduktion</h2>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
                        vestibulum. Cras venenatis euismod malesuada.
                    </p>
                    <p>
                        Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus porttitor.
                        Maecenas faucibus mollis interdum.
                    </p>
                </div>
            </section>

            <section>
                <h3>Detaljer</h3>
                <div>
                    <p>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque
                        nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla.
                    </p>
                    <p>
                        Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis
                        dapibus posuere velit aliquet.
                    </p>
                </div>
            </section>

            <footer>
                <small>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                </small>
            </footer>
        </div>
    );
};

export default EksempelKomponent;