"use client";
import clsx from "clsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
  targetChildren?: boolean;
};


export function FadeIn({ children, vars, start, className, targetChildren = false}: FadeInProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        const target = targetChildren ? containerRef.current?.children : containerRef.current;
        if (!target) return;
        
        gsap.set(target, { opacity: 0, y: 16 });

        gsap.to(target, {
            duration: .8,
            opacity: 1,
            ease: "power3.out",
            y: 0,
            stagger: 0.2,
            ...vars,
        })

    }, [vars, start, targetChildren]);

    return (
        <div ref={containerRef} className={clsx(className)}>
        {children}
        </div>
    )
}