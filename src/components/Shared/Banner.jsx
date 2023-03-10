import React from "react";
import styles from "../assets/css/banner.module.css";
import Info from "../Styled/Info";
import bannerImage from "../assets/images/banner.png";
import inraeImage from "../assets/images/inrae.png";
import { BsEnvelopeFill, BsGlobe } from "react-icons/bs";

function Banner() {
  return (
    <section>
      <div className={styles.banner}>
        <img className={styles.banner_logo} src={bannerImage} alt="image" />
        <div className={styles.banner_content}>
          <Info
            text="Attention Mise à jour prévue le 2 novembre 2022, votre outil préféré sera indisponible jusqu’à 10h."
            icon="fas fa-exclamation-triangle"
            type="warning"
          ></Info>
          <div className={styles.banner_main}>
            <div className={styles.banner_flex}>
              <img src={inraeImage} alt="" />
              <div className={styles.banner_details}>
                <div>
                  {/* <span>
                    <a className="" href="#">
                      <i className="fas fa-envelope" />
                    </a>
                  </span> */}
                  <BsEnvelopeFill size={20} />
                  <span className={styles.banner_span}>Contact</span>
                </div>

                <div>
                  <BsGlobe size={20} />
                  <span className={styles.banner_span}>Gestion et partage des données scientifiques</span>
                </div>
                <div>
                  <BsGlobe size={20} />
                  <span className={styles.banner_span}>Portail Data INRAE</span>
                </div>
              </div>
            </div>
            <div className={styles.banner_details}>
              Pour être alerté.e des actualités sur DMP OPIDoR et les modèles de plans, rejoignez le groupe de messagerie DMPOPIDoR@inrae.fr
              11.05.2022 - <strong>Mise à jour des modèles de plan de gestion de données INRAE</strong> pour les projets et pour ls structures :
              chapitres «<strong>Sensibilité des données</strong>» (auparavant : «Confidentialité») et «
              <strong>Stockage et sécurité des données</strong>», ainsi que des recommandations associées.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
