function Footer() {
    return ( 
        <div className="text-center bg-light fixed-bottom ">
            <footer >
                <div className="p-3">
                    ©{new Date().getFullYear()} || desarrollado 💻🖱👾 por
                    <span className="text-dark" > Duverney Naveros G</span>
                </div>
            </footer>
        </div>
        
    );
}

export default Footer;