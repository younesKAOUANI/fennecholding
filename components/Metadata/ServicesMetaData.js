import React from 'react';
import Head from 'next/head'; // If you are using Next.js

const ServicesMetaData = () => {
  return (
    <Head>
      {/* Référencement de base */}
      <title>Nos Services | Fennec Holding</title>
      <meta name="description" content="Découvrez nos services, chez Fennec Holding, fournisseur leader de machines de construction et d'équipements lourds en Algérie." />
      <meta name="keywords" content="services, machines de construction Algérie, équipements lourds Algérie, Fennec Holding, Fennec Group, fournisseur machines de chantier" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.fennecholding.dz/services" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Nos Services | Fennec Holding" />
      <meta property="og:description" content="Découvrez nos services, chez Fennec Holding, fournisseur leader de machines de construction et d'équipements lourds en Algérie." />
      <meta property="og:url" content="https://www.fennecholding.dz/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.fennecholding.com/_next/image?url=%2Flogo-submark.png&w=384&q=75" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Nos Services | Fennec Holding" />
      <meta name="twitter:description" content="Découvrez nos services, chez Fennec Holding, fournisseur leader de machines de construction et d'équipements lourds en Algérie." />
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

export default ServicesMetaData;
