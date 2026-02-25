import React from 'react';
import {
  Satellite,
  Box,
  Droplet,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Globe,
  Send,
  ArrowRight,
  Wrench,
  Bot
} from 'lucide-react';

// Cores da Marca baseadas no PDF
const colors = {
  dark: '#2B2B2B',
  blue: '#3347FF',
  peach: '#FFE3D6',
  rawhide: '#B2624F',
  lightBg: '#F9F8F6', // Fundo bem limpo para dar respiro
  white: '#FFFFFF'
};

// Componente da Logo Oficial Data Frontier convertido de SVG para JSX com otimizações de SEO/Acessibilidade
const LogoDataFrontier = ({ className }) => (
  <svg
    viewBox="0 0 837.24402 837.24402"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Logotipo da Data Frontier"
  >
    <title>Logo Data Frontier</title>
    <defs>
      <clipPath id="clipPath20" clipPathUnits="userSpaceOnUse">
        <path d="M 0,627.933 H 627.933 V 0 H 0 Z" />
      </clipPath>
    </defs>
    <g transform="matrix(1.3333333,0,0,-1.3333333,0,837.244)">
      <g clipPath="url(#clipPath20)">
        <g transform="translate(238.6387,462.4807)">
          <path
            fill="#3347ff"
            fillRule="nonzero"
            stroke="none"
            d="M 0,0 0.001,-0.001 H 0 Z m -22.47,-207.322 0.182,-0.104 c 1.72,-0.988 3.565,-1.778 5.65,-2.412 l 1.892,-0.582 v 170.417 c 0,1.253 0.114,2.542 0.343,3.841 l 0.197,0.92 c 0.302,1.419 0.754,2.844 1.347,4.226 l 0.171,0.395 c 0.198,0.442 0.431,0.874 0.743,1.461 0.125,0.234 0.25,0.468 0.385,0.696 l 0.317,0.489 c 0.686,1.081 1.388,2.022 2.152,2.88 l 0.229,0.306 c 1.528,1.669 3.316,3.109 5.317,4.278 4.699,2.745 10.053,3.789 15.552,2.677 C 5.172,-28.136 1.424,-40.585 1.424,-53.138 V -208.85 l 19.627,11.487 v 144.376 c 0,15.62 8.114,29.877 21.177,37.201 12.729,7.142 27.922,7.1 40.642,-0.119 l 108.994,-61.834 0.291,2.141 c 1.606,11.742 -4.039,23.079 -14.372,28.885 L 92.553,1.159 C 73.16,12.163 50.165,11.877 31.021,0.4 29.69,-0.4 28.349,-1.299 26.852,-2.391 20.059,1.071 12.558,2.63 5.094,2.142 4.267,2.09 3.436,2.006 2.407,1.876 1.653,1.783 0.915,1.653 0.172,1.513 L -0.296,1.435 C -0.951,1.299 -1.611,1.144 -2.401,0.946 L -2.942,0.816 C -3.431,0.686 -3.909,0.535 -4.392,0.385 L -4.969,0.208 -5.588,0.01 c -0.478,-0.156 -0.946,-0.337 -1.486,-0.551 l -3.66,-1.58 c -0.311,-0.15 -0.618,-0.312 -0.92,-0.478 l -0.571,-0.307 -1.196,-0.649 c -0.67,-0.39 -1.336,-0.801 -1.98,-1.227 l -0.307,-0.213 c -0.624,-0.411 -1.227,-0.842 -1.819,-1.284 l -0.328,-0.25 c -8.119,-6.18 -13.686,-15.053 -15.676,-24.996 l -0.115,-1.455 h 0.005 c -0.488,-2.672 -0.733,-5.359 -0.733,-8.01 v -145.078 c 0,-8.831 4.564,-16.976 11.904,-21.254"
          />
        </g>
        <g transform="translate(393.5143,262.5085)">
          <path
            fill="#3347ff"
            fillRule="nonzero"
            stroke="none"
            d="m 0,0 c 7.724,4.522 12.527,12.683 12.527,21.498 -0.011,1.913 -0.25,3.857 -0.728,5.952 l -0.447,1.944 -147.016,-86.144 c -7.813,-4.585 -17.288,-4.107 -24.732,1.252 -3.337,2.407 -5.894,5.749 -7.469,9.752 1.336,-0.094 2.594,-0.141 3.8,-0.141 10.749,0 21.441,2.937 30.916,8.499 L 2.718,42.238 -17.127,53.346 -143.061,-20.464 c -13.02,-7.625 -28.593,-7.693 -41.676,-0.203 -13.083,7.506 -20.891,20.984 -20.891,36.058 v 146.632 l -1.944,-0.666 c -10.572,-3.633 -17.678,-13.592 -17.678,-24.773 V 16.545 c 0,-22.668 11.867,-43.496 30.964,-54.349 1.586,-0.905 3.306,-1.767 5.229,-2.63 1.227,-13.655 8.603,-25.854 19.856,-32.762 6.752,-4.148 14.403,-6.342 22.138,-6.342 7.407,0 14.783,2.027 21.321,5.858 z"
          />
        </g>
        <g transform="translate(459.6675,325.7353)">
          <path
            fill="#3347ff"
            fillRule="nonzero"
            stroke="none"
            d="m 0,0 c -0.104,15.261 -8.093,28.864 -21.368,36.395 l -124.967,70.899 c -7.563,4.294 -16.446,4.673 -23.76,1.05 -0.561,-0.275 -1.112,-0.571 -1.663,-0.894 -1.596,-0.93 -3.114,-2.058 -4.642,-3.456 l -1.486,-1.362 146.839,-83.301 c 7.095,-4.029 11.368,-11.305 11.425,-19.466 0.042,-5.515 -1.856,-10.687 -5.369,-14.772 -5.37,10.983 -13.889,20.001 -24.753,26.166 L -184.852,87.885 V 65.332 L -59.427,-5.811 c 13.062,-7.412 20.921,-20.797 21.025,-35.808 0.104,-15.017 -7.573,-28.516 -20.521,-36.105 l -144.797,-84.844 1.767,-1.321 c 4.99,-3.721 10.916,-5.608 16.867,-5.608 4.886,0 9.793,1.273 14.206,3.846 l 121.875,70.998 c 19.081,11.18 30.381,31.057 30.225,53.169 -0.015,1.84 -0.125,3.779 -0.343,5.889 C -7.028,-27.725 0.104,-14.486 0,0"
          />
        </g>
      </g>
    </g>
  </svg>
);

// Componente de Bloco Flexível (Adapta ao conteúdo)
const ContentBlock = ({ children, className, href, bgColor = colors.white, textColor = colors.dark }) => {
  const content = (
    <div
      className={`relative w-full rounded-3xl p-8 md:p-10 transition-all duration-300 shadow-sm hover:shadow-xl border border-black/5 flex flex-col gap-6 h-full ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </div>
  );

  return href ? (
    <a href={href} className="block w-full h-full transform hover:-translate-y-2 transition-transform duration-300">
      {content}
    </a>
  ) : (
    <div className="w-full h-full">
      {content}
    </div>
  );
};

// Componente Social
const SocialLink = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#F0F2F5] hover:bg-[#3347FF] hover:text-white text-[#2B2B2B] transition-colors duration-300 font-bold shadow-sm"
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </a>
);

export default function App() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = React.useState({ type: '', message: '' });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/sendContactEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Falha ao enviar e-mail.');
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans pb-16 selection:bg-[#3347FF] selection:text-white" style={{ backgroundColor: colors.lightBg, color: colors.dark }}>

      <main className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-6">

        {/* 1. HEADER (Marca e Introdução) - Ocupa 100% da largura */}
        <ContentBlock bgColor={colors.peach} className="md:flex-row md:items-center md:justify-between gap-10 border-none">
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center bg-white shadow-md p-1.5">
              <LogoDataFrontier className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 leading-[1.1]" style={{ color: colors.dark }}>
                <span className="sr-only">Data Frontier: Soluções Tecnológicas, IoT, Impressão 3D e Usinagem</span>
                <span aria-hidden="true">data<br />frontier</span>
              </h1>
              <p className="text-sm font-bold tracking-widest uppercase mt-3 opacity-80" style={{ color: colors.dark }}>
                Tecnologia única como você
              </p>
            </div>
          </div>
          <div className="max-w-sm md:text-right">
            <p className="text-lg leading-relaxed font-medium" style={{ color: colors.dark }}>
              Projetos completos que integram uma metodologia do começo ao fim. Da criação, perpassando pelo sistema que executa até o fornecimento da matéria-prima.
            </p>
          </div>
        </ContentBlock>

        {/* Título oculto para hierarquia de SEO */}
        <h2 className="sr-only">Nossos Serviços e Soluções</h2>

        {/* 2. LINHA DE SERVIÇOS 1: Academy (Maior) e IoT (Menor) */}
        <div className="flex flex-col md:flex-row gap-6">
          <div id="academy" className="w-full md:w-3/5">
            <ContentBlock href="#academy" bgColor={colors.blue} textColor={colors.white}>
              <div className="p-4 rounded-2xl bg-white/10 w-fit backdrop-blur-sm">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="mt-auto pt-6">
                <h3 className="text-3xl font-bold mb-3">Data Frontier Academy</h3>
                <p className="text-base text-white/80 font-medium leading-relaxed">
                  Nossa plataforma de aprendizado virtual. Capacitação tecnológica com foco no futuro e nas demandas reais do mercado.
                </p>
              </div>
              <div className="absolute top-8 right-8 bg-white/20 p-2 rounded-full hidden md:block">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </ContentBlock>
          </div>

          <div id="iot" className="w-full md:w-2/5">
            <ContentBlock href="#iot" bgColor={colors.white}>
              <div className="p-4 rounded-2xl w-fit" style={{ backgroundColor: '#F0F3FF' }}>
                <Satellite className="w-8 h-8" style={{ color: colors.blue }} />
              </div>
              <div className="mt-auto pt-4">
                <h3 className="text-2xl font-bold mb-2">IoT Satelital</h3>
                <p className="text-sm font-medium text-gray-500">
                  Conectividade global e monitoramento remoto de ponta.
                </p>
              </div>
            </ContentBlock>
          </div>
        </div>

        {/* 3. LINHA DE SERVIÇOS 2: STL (Menor) e Resinas (Maior) */}
        <div className="flex flex-col md:flex-row gap-6">
          <div id="stl" className="w-full md:w-2/5 flex flex-col">
            <ContentBlock href="#stl" bgColor={colors.white}>
              <div className="p-4 rounded-2xl w-fit" style={{ backgroundColor: '#FFF5F2' }}>
                <Box className="w-8 h-8" style={{ color: colors.rawhide }} />
              </div>
              <div className="mt-auto pt-4">
                <h3 className="text-2xl font-bold mb-2">STL Prime</h3>
                <p className="text-sm font-medium text-gray-500">
                  Plataforma exclusiva para venda e download de modelos 3D.
                </p>
              </div>
            </ContentBlock>
          </div>

          <div id="materiais" className="w-full md:w-3/5">
            <ContentBlock href="#materiais" bgColor={colors.rawhide} textColor={colors.white}>
              <div className="p-4 rounded-2xl bg-white/10 w-fit backdrop-blur-sm">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <div className="mt-auto pt-6">
                <h3 className="text-3xl font-bold mb-3">Resinas & Filamentos</h3>
                <p className="text-base text-white/90 font-medium leading-relaxed">
                  Fornecimento de matéria-prima de altíssima qualidade. Precisão e durabilidade para todas as suas impressões 3D.
                </p>
              </div>
              <div className="absolute top-8 right-8 bg-white/20 p-2 rounded-full hidden md:block">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </ContentBlock>
          </div>
        </div>

        {/* 4. LINHA DE SERVIÇOS 3: Usinagem (Maior) e Robótica (Menor) */}
        <div className="flex flex-col md:flex-row gap-6">
          <div id="usinagem" className="w-full md:w-3/5">
            <ContentBlock href="#usinagem" bgColor={colors.dark} textColor={colors.white}>
              <div className="p-4 rounded-2xl bg-white/10 w-fit backdrop-blur-sm">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div className="mt-auto pt-6">
                <h3 className="text-3xl font-bold mb-3">Usinagem e Caldeiraria</h3>
                <p className="text-base text-white/80 font-medium leading-relaxed">
                  Projetos mecânicos e estruturas sob medida. Fabricação de precisão com maquinário avançado para transformar exigências em realidade.
                </p>
              </div>
              <div className="absolute top-8 right-8 bg-white/20 p-2 rounded-full hidden md:block">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </ContentBlock>
          </div>

          <div id="robotica" className="w-full md:w-2/5 flex flex-col">
            <ContentBlock href="#robotica" bgColor={colors.white}>
              <div className="p-4 rounded-2xl w-fit" style={{ backgroundColor: '#F0F3FF' }}>
                <Bot className="w-8 h-8" style={{ color: colors.blue }} />
              </div>
              <div className="mt-auto pt-4">
                <h3 className="text-2xl font-bold mb-2">Robótica</h3>
                <p className="text-sm font-medium text-gray-500">
                  Fabricamos desde kits educacionais interativos até robôs industriais de alta performance.
                </p>
              </div>
            </ContentBlock>
          </div>
        </div>

        {/* 5. REDES SOCIAIS */}
        <ContentBlock bgColor={colors.white} className="items-center text-center py-10">
          <h2 className="text-2xl font-bold mb-6">Conecte-se com a Nossa Força</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <SocialLink icon={Instagram} href="#" label="Instagram" />
            <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
            <SocialLink icon={Globe} href="#" label="Website" />
            <SocialLink icon={MessageCircle} href="https://wa.me/5500000000000" label="WhatsApp" />
          </div>
        </ContentBlock>

        {/* 6. FORMULÁRIO DE CONTATO */}
        <ContentBlock bgColor={colors.white} className="border-t-4" style={{ borderTopColor: colors.blue }}>
          <div className="max-w-2xl mx-auto w-full text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#F0F3FF] flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" style={{ color: colors.blue }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vamos iniciar seu projeto?</h2>
            <p className="text-lg text-gray-500 font-medium">
              Preencha os dados abaixo. Nossa equipe retornará o contato para entender suas necessidades tecnológicas.
            </p>
          </div>

          <form className="max-w-3xl mx-auto w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Nome Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: João da Silva"
                className="w-full bg-[#F9F8F6] border border-gray-200 text-gray-900 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#3347FF] focus:ring-4 focus:ring-[#3347FF]/10 transition-all text-lg placeholder:text-gray-400"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <label className="text-sm font-bold text-gray-700 ml-1">E-mail Corporativo</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemplo@empresa.com"
                  className="w-full bg-[#F9F8F6] border border-gray-200 text-gray-900 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#3347FF] focus:ring-4 focus:ring-[#3347FF]/10 transition-all text-lg placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <label className="text-sm font-bold text-gray-700 ml-1">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="w-full bg-[#F9F8F6] border border-gray-200 text-gray-900 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#3347FF] focus:ring-4 focus:ring-[#3347FF]/10 transition-all text-lg placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {status.message && (
              <div className={`p-4 rounded-xl text-center font-bold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-white text-lg hover:opacity-90 hover:-translate-y-1 transition-all active:scale-95 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ backgroundColor: colors.blue }}
            >
              <span>{loading ? 'Enviando...' : 'Enviar Mensagem'}</span>
              <Send className="w-6 h-6" />
            </button>
          </form>
        </ContentBlock>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-sm text-gray-500 font-bold">
        <p>© {new Date().getFullYear()} Data Frontier. Tecnologia única como você.</p>
      </footer>

      {/* Botão Flutuante do WhatsApp */}
      <a
        href="https://wa.me/5500000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20bd5a] hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-[#2B2B2B] text-sm font-bold px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg border border-gray-100">
          Fale conosco!
        </span>
      </a>

    </div>
  );
}