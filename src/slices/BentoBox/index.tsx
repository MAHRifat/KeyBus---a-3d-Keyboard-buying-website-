'use client';
import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { KEYCAP_TEXTURES } from "../ColorChanger";


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
      <PrismicText field={slice.primary.heading} />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
      {slice.primary.items.map((item) => (
        <BentoBoxItem key={asText(item.text)} item={item} />
      ))}
      </div>
    </Bounded>
  );
};

export default BentoBox;

type BentoBoxItemProps = {
  item: Content.BentoBoxSliceDefaultPrimaryItemsItem;
}


function BentoBoxItem({item}: BentoBoxItemProps) {
  return (
    <div className={clsx(
      'relative overflow-hidden rounded-lg',
      item.size === 'Large' && 'md:col-span-4',
      item.size === 'Small' && 'md:col-span-2',
      item.size === 'Medium' && 'md:col-span-3',
    )}>
          <PrismicNextImage field={item.image} 
          className="object-cover w-full h-full" 
          quality={96}
          width={700}/>

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black">

          </div>

          <div className="absolute bottom-0 left-0 text-white max-w-xl p-6 text-xl text-balance">
          <PrismicRichText field={item.text} />
          </div>
      </div> 
  )
}