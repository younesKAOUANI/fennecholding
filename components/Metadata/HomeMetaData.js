import React from 'react';
import Head from 'next/head'; // If you are using Next.js

const HomeMetaData = () => {
  return (
    <Head>
      {/* Référencement de base */}
      <title>Fennec Holding | Vente de Machines de Construction en Algérie</title>
      <meta name="description" content="Découvrez Fennec Holding, fournisseur leader de machines de construction et d'équipements lourds en Algérie." />
      <meta name="keywords" content="fennec, fennec holding, dz, algerie, construction, fennec construction, fennec holding dz, fennec holding construction, fennec holding construction dz, machine de construction en algerie, machines de construction Algérie, équipements lourds Algérie, Fennec Holding, Fennec Group, fournisseur machines de chantier, vente engins de chantier Algérie, machines BTP Algérie, matériel de construction Algérie, bulldozers Algérie, grues Algérie, pelleteuses Algérie, chargeuses Algérie, compacteurs Algérie, matériel BTP neuf Algérie, location engins de chantier Algérie, vente machines de chantier Alger, fournisseurs BTP Algérie, machines terrassement Algérie, équipements industriels Algérie, tractopelles Algérie, pelles hydrauliques Algérie, camions de chantier Algérie, nacelles élévatrices Algérie, équipements génie civil Algérie, outillage construction Algérie, vente matériel de chantier Algérie, vente grues mobiles Algérie, importation machines BTP Algérie" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.fennecholding.dz/" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Fennec Holding | Vente de Machines de Construction en Algérie" />
      <meta property="og:description" content="Découvrez Fennec Holding, fournisseur leader de machines de construction et d'équipements lourds en Algérie." />
      <meta property="og:url" content="https://www.fennecholding.dz/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.fennecholding.com/_next/image?url=%2Flogo-submark.png&w=384&q=75" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Fennec Holding | Vente de Machines de Construction en Algérie" />
      <meta name="twitter:description" content="Découvrez Fennec Holding, fournisseur leader de machines de construction et d'équipements lourds en Algérie." />
      <meta name="twitter:image" content="https://www.fennecholding.com/_next/image?url=%2Flogo-submark.png&w=384&q=75" />

      {/* Données structurées pour l'organisation */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Fennec Holding",
          "url": "https://www.fennecholding.dz/",
          "logo": "https://fennecholding.dz/_next/image?url=%2Flogo-submark.png&w=384&q=75",
          "description": "Fennec Holding est spécialisée dans la fourniture de machines de construction et d'équipements lourds en Algérie.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "DZ"
          }
        })
      }} />
    </Head>
  );
};

export default HomeMetaData;
