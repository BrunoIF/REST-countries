import React from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import Info from "components/Info";

import { formatNumber } from "utils";
import s from "./styles.module.scss";

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

function CountryCard({ country }) {
  const { name, flag, region, capital, population } = country;
  const formattedPopulation = formatNumber(population);

  return (
    <Link href={`/${name.toLowerCase()}`}>
      <motion.div
        className={s.container}
        variants={variants}
        initial="initial"
        animate="fadeInUp"
        whileHover="hover"
      >
        <div style={{ backgroundImage: `url('${flag}')` }} className={s.flag} />
        <div className={s.content}>
          <h3 className={s.title}>{name}</h3>
          <Info
            className={s.text}
            title="Population"
            description={formattedPopulation}
          />
          <Info className={s.text} title="Region" description={region} />
          <Info className={s.text} title="Capital" description={capital} />
        </div>
      </motion.div>
    </Link>
  );
}

export default CountryCard;
