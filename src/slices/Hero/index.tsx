'use client';
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-white blue-gradient-bg font-extrabold tracking-wider relative h-dvh text-shadow-black/30 text-shadow-lg"
    >
      <div className="hero-scene pointer-events-none top-0 h-dvh w-full">
        {/* Canvas goes here */}
        <Canvas shadows="soft">
          <Scene />
        </Canvas>
      </div>

      <div className="hero-content absolute inset-x-0 top-0 h-dvh" >
        <Bounded fullWidth className="absolute top-18 inset-x-0 md:top-24 md:left-[8vw] ">

          <PrismicRichText field={slice.primary.heading} components={{
            heading1: ({ children }) => <h1 className="font-black-slanted hero-heading leading-[0.8] sm:text-7xl lg:text-8xl text-7xl uppercase">{children}</h1>,
            
          }}/>
        </Bounded>
          
        <Bounded fullWidth
        className="hero-body absolute bottom-0 inset-x-0 md:right-[8vw] md:left-auto " 
        innerClassName="flex flex-col gap-3">
        <div className="max-w-md">
            <PrismicRichText field={slice.primary.body} components={{
              heading2: ({ children }) => 
                <h2 className="text-4xl mb-1 uppercase lg:mb-2 lg:text-6xl font-bold-slanted sm:text-5xl">{children}</h2>,
            }}/>
        </div>
          <button className="font-bold-slanted flex w-fit cursor-pointer group gap-1 rounded bg-[#01A7E1] px-3 py-1 text-2xl uppercase transition disable:grayscale">        
            {slice.primary.buy_button_text}
            <span className="group-hover:translate-x-1 transition-transform">{">"}</span>
          </button>
        </Bounded>
      </div>
    </section>
  );
};

export default Hero;
