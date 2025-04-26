import React from 'react';

const mapLink = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5504.7819889977545!2d6.496874270697566!3d36.2687458867285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f17bb115bb7373%3A0xd44f460db20f4e41!2sConstantine%20ain%20smara!5e0!3m2!1sfr!2sdz!4v1738514701664!5m2!1sfr!2sdz';

export default function Map() {
  return (
    <div className='order-5 container mx-auto rounded-lg overflow-hidden h-[300px] sm:h-[400px] my-4' data-aos="fade-up">
      <iframe
        className='w-full h-full'
        src={mapLink}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}