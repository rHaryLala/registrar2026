import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import Particles from '@/components/particles';
import SplitText from '@/components/split-text';
import TextType from '@/components/text-type';
import GlareHover from '@/components/glare-hover';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Gestion Scolaire">
                <link rel="icon" type="image/png" href="/logo.png" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] relative">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Particles
                        particleCount={1000}
                        particleSpread={8}
                        speed={0.15}
                        particleColors={["#1e3a8a", "#3b82f6", "#60a5fa", "#fff"]}
                        alphaParticles={true}
                        particleBaseSize={80}
                        sizeRandomness={1}
                        cameraDistance={10}
                        disableRotation={false}
                        className="w-full h-full"
                    />
                </div>
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#1e3a8a35] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1e3a8a4a] dark:border-[#3b82f6] dark:text-[#EDEDEC] dark:hover:border-[#60a5fa]"
                            >
                                Tableau de bord
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1e3a8a35] dark:text-[#EDEDEC] dark:hover:border-[#3b82f6]"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#1e3a8a35] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1e3a8a4a] dark:border-[#3b82f6] dark:text-[#EDEDEC] dark:hover:border-[#60a5fa]"
                                >
                                    S'inscrire
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 font-medium">
                                <TextType 
                                text={["Bienvenue à l'Université Adventiste Zurcher"]}
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor={true}
                                cursorCharacter="|"
                                />
                                <br /></h1>
                            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                                Votre plateforme de gestion de vie académique de l'université.
                                Accédez à tous vos services étudiants en un seul endroit.
                            </p>
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#1e3a8a] dark:bg-[#3b82f6]" />
                                        </span>
                                    </span>
                                    <span>
                                        Consultez votre
                                        <a
                                            href="/planning"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-[#1e3a8a] underline underline-offset-4 dark:text-[#60a5fa]"
                                        >
                                            <span>Planning de cours</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </a>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#1e3a8a] dark:bg-[#3b82f6]" />
                                        </span>
                                    </span>
                                    <span>
                                        Accédez à vos
                                        <a
                                            href="/notes"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-[#1e3a8a] underline underline-offset-4 dark:text-[#60a5fa]"
                                        >
                                            <span>Notes et évaluations</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </a>
                                    </span>
                                </li>
                            </ul>
                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <a
                                        href="/dashboard"
                                        // className="inline-block rounded-sm border border-[#1e3a8a] bg-[#1e3a8a] px-5 py-1.5 text-sm leading-normal text-white hover:border-[#1e40af] hover:bg-[#1e40af] dark:border-[#3b82f6] dark:bg-[#3b82f6] dark:text-white dark:hover:border-[#2563eb] dark:hover:bg-[#2563eb]"
                                    >
                                          <GlareHover
                                            glareColor="#ffffff"
                                            glareOpacity={0.3}
                                            glareAngle={-30}
                                            glareSize={300}
                                            transitionDuration={800}
                                            playOnce={false}
                                        >
                                            <h2 style={{ fontSize: '0.9rem', fontWeight: '100', color: '#F0F8FF', margin: 5 }}>            
                                                Accéder au portail
                                            </h2>
                                        </GlareHover>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#eff6ff] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#0f172a]">
                            {/* Logo universitaire stylisé avec animations */}
                            <div className="flex h-full items-center justify-center p-8">
                                <div className="text-center translate-y-0 opacity-100 transition-all delay-300 duration-750 starting:translate-y-6 starting:opacity-0">
                                    <div className="mb-6 flex justify-center">
                                        <div className="relative translate-y-0 opacity-100 transition-all delay-500 duration-750 starting:translate-y-4 starting:opacity-0">
                                            <div className="h-32 w-32 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                                                <img
                                                    src="/logo.png"
                                                    alt="Logo Université Adventiste Zurcher"
                                                    className="h-full w-full object-contain transition-transform duration-500 hover:rotate-3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#1e3a8a] dark:text-[#60a5fa] mb-2 translate-y-0 opacity-100 transition-all delay-400 duration-750 starting:translate-y-4 starting:opacity-0">
                                        <SplitText
                                        text="UAZ Portal"
                                        className="text-2xl font-semibold text-center"
                                        delay={100}
                                        duration={0.6}
                                        ease="power3.out"
                                        splitType="chars"
                                        from={{ opacity: 0, y: 40 }}
                                        to={{ opacity: 1, y: 0 }}
                                        threshold={0.1}
                                        rootMargin="-100px"
                                        textAlign="center"
                                        onLetterAnimationComplete={handleAnimationComplete}
                                        />
                                    </h2>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm translate-y-0 opacity-100 transition-all delay-600 duration-750 starting:translate-y-4 starting:opacity-0">
                                        Université Adventiste Zurcher
                                    </p>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-xs mt-1 translate-y-0 opacity-100 transition-all delay-800 duration-750 starting:translate-y-4 starting:opacity-0">
                                        Système de gestion académique
                                    </p>
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(30,58,138,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_rgba(59,130,246,0.2)]" />
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
