'use client';
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";


/**
 * Props for `BentoBox`.
 */
export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>;

/**
 * Component for "BentoBox" Slices.
 */
const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="text-6xl font-bold-slanted mb-8 scroll-pt-6 uppercase md:text-8xl">
      <PrismicRichText field={slice.primary.heading} />
      </h2>
      {slice.primary.items.map((item, index) => (
        <div key={index}>
          <PrismicNextImage field={item.image} />
          <PrismicRichText field={item.text} />
        </div> 
      ))}
    </Bounded>
  );
};

export default BentoBox;
