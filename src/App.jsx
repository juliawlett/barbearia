import { useEffect, useMemo, useState } from 'react';
import originalHtml from '../site_institucional_da_barbearia.html?raw';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed w-full glass z-50 border-b border-white/5 transition-all duration-300 ${
        isScrolled ? 'shadow-lg bg-dark-900/80' : 'bg-transparent'
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="font-heading text-2xl font-black tracking-tight text-white flex items-center gap-2">
              CLUBE DA{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent-dark">
                BARBA
              </span>
              <i className="fas fa-bolt text-accent text-lg" />
            </a>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#sobre" className="text-sm font-medium hover:text-white transition-colors duration-300">
              A Crew
            </a>
            <a href="#servicos" className="text-sm font-medium hover:text-white transition-colors duration-300">
              Serviços
            </a>
            <a href="#depoimentos" className="text-sm font-medium hover:text-white transition-colors duration-300">
              Reviews
            </a>
            <a href="#assinatura" className="relative text-sm font-bold text-white group">
              Assinatura VIP
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent-light to-accent-dark rounded-full" />
            </a>
          </nav>

          <div className="hidden md:flex">
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
            >
              <i className="fab fa-whatsapp text-green-400" /> Agendar
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-btn"
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none p-2"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <i className="fas fa-bars text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className={`${isMenuOpen ? '' : 'hidden'} md:hidden bg-dark-800 border-b border-white/5 absolute w-full`}>
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
          <a href="#sobre" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-white/5 text-white">
            A Crew
          </a>
          <a href="#servicos" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-white/5 text-white">
            Serviços
          </a>
          <a href="#assinatura" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-accent bg-accent/10">
            Assinatura VIP
          </a>
          <a href="#depoimentos" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-white/5 text-white">
            Reviews
          </a>
          <a
            href="https://wa.me/5511999999999"
            onClick={closeMenu}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-dark text-white px-5 py-3 rounded-xl font-bold"
          >
            <i className="fab fa-whatsapp" /> Agendar Agora
          </a>
        </div>
      </div>
    </header>
  );
}

function App() {
  const pageHtml = useMemo(() => {
    const documentHtml = new DOMParser().parseFromString(originalHtml, 'text/html');

    documentHtml.querySelector('header')?.remove();
    documentHtml.querySelectorAll('script').forEach((script) => script.remove());

    return documentHtml.body.innerHTML;
  }, []);

  return (
    <>
      <Header />
      <main dangerouslySetInnerHTML={{ __html: pageHtml }} />
    </>
  );
}

export default App;
