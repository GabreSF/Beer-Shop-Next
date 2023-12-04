import Image from "next/image";

const HomeBanner = () => {
    return ( 
        <div className="relative bg-gradient-to-r from-stone-800 to-black mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6x1 font-bold mb-4 text-white">Black Friday</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Aproveite os descontos incríveis da Black Friday!!</p>
                    <p className="text-2x1 md:text-5x1 text-yellow-400 font-bold">Ganhe 40% DE DESCONTO</p>
                </div>
                <div className="w-1/3 relative aspect-video">
                    <Image src="/banner-image.png" fill alt="Banner image" className="object-contain"/>
                </div>
            </div>
        </div> );
}
 
export default HomeBanner;