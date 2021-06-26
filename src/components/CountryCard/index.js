import React from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import Info from "../Info";

import { formatNumber } from "../../utils";
import styles from "./styles.module.scss";

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
      duration: .6,
      ease: easeOut
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: .2
    }
  }
}

function CountryCard({ country }) {
  const { name, flag, region, capital, population } = country;
  const formattedPopulation = formatNumber(population);

  return (
    <Link href={`/${name.toLowerCase()}`}>
      <motion.div className={styles.container} variants={variants} initial="initial" animate="fadeInUp" whileHover="hover">
        <div
          style={{ backgroundImage: `url('${flag}')` }}
          className={styles.flag}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{name}</h3>
          <Info
            className={styles.text}
            title="Population"
            description={formattedPopulation}
          />
          <Info className={styles.text} title="Region" description={region} />
          <Info className={styles.text} title="Capital" description={capital} />
        </div>
      </motion.div>
    </Link>
  );
}

export default CountryCard;
