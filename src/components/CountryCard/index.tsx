import React from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import Info from "components/Info";

import { formatNumber } from "utils";
import s from "./styles.module.scss";
import { CountryThumbnail } from "types/Country";

const easeOut = [0.6, -0.5, 0.01, 0.99];

const variants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  fadeInUp: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

interface Props {
  country: CountryThumbnail
}

function CountryCard({ country }: Props) {
  const {
    name: { common: name },
    flags,
    region,
    capital,
    population,
  } = country;
  const formattedPopulation = formatNumber(population);

  return (
    <Link href={`/${name.toLowerCase()}`} aria-label={name}>
      {/* @ts-ignore */}
      <motion.div
        className={s.container}
        variants={variants}
        initial="initial"
        animate="fadeInUp"
        whileHover="hover"
      >
        <div
          style={{ backgroundImage: `url('${flags.svg}')` }}
          className={s.flag}
          aria-label={flags.alt}
        />
        <div className={s.content}>
          <h4 className={s.title}>{name}</h4>
          <Info
            className={s.text}
            title="Population"
            description={formattedPopulation}
          />
          <Info className={s.text} title="Region" description={region} />
          <Info className={s.text} title="Capital" description={capital[0]} />
        </div>
      </motion.div>
    </Link>
  );
}

export default CountryCard;
