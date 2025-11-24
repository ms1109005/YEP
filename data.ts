
import { Product } from './types';

export const products: Product[] = [
  {
    id: 'kit-expedition',
    name: 'Kit Rando "EXPEDITION"',
    description: "L'autonomie totale pour les treks engagés. Résiste à l'immersion et aux chocs.",
    price: 71.98,
    category: 'kits',
    imageColor: 'bg-white',
    badges: ['Best-seller'],
    specs: ['20.000 mAh', 'Étanche IP65', 'Charge Rapide 35W'],
    inStock: true,
    images: [
      '/images/kit1.1.jpg',
      '/images/kit1.2.jpg',
      '/images/kit1.3.jpg'
    ],
    longDescription: `
      <p><strong>Le kit ultime pour l'aventure.</strong></p>
      <p>Le Kit EXPEDITION est conçu pour ceux qui partent loin et longtemps. Il combine notre panneau solaire <strong>"Performance"</strong> haute efficacité avec la batterie Xtorm Rugged 20K, une référence mondiale en matière de résistance.</p>
      <p>Que vous soyez sur le GR20, en Islande ou en haute montagne, ce kit vous assure une réserve d'énergie constante et fiable, quelles que soient les conditions météorologiques.</p>
    `,
    features: [
      "Autonomie illimitée grâce au solaire",
      "Résistance totale à l'eau et aux chocs (IP65)",
      "Lampe torche intégrée 100 lumens",
      "Fixation universelle sur tout sac à dos"
    ],
    technicalSpecs: {
        capacity: "20.000 mAh (74Wh)",
        input: "USB-C PD 35W",
        output: "2x USB-C, 2x USB-A (Max 35W)",
        weight: "Panneau (200g) + Batterie (540g)",
        waterproof: "IP65 (Batterie et Panneau)",
        warranty: "3 ans",
        boxContents: "Panneau Flex 10W, Batterie Xtorm Rugged 20K, Câble USB-C, Mousquetons"
    }
  },
  {
    id: 'kit-essentiel',
    name: 'Kit Rando "ESSENTIEL"',
    description: "L'alternative légère et éthique. Parfait pour la journée ou les études. Coque 100% recyclée.",
    price: 33.36,
    category: 'kits',
    imageColor: 'bg-white',
    badges: [],
    specs: ['10.000 mAh', 'Poids Plume (210g)', 'Assemblé Jura'],
    inStock: true,
    images: [
      '/images/kit.jpg'
    ],
    longDescription: `
        <p><strong>Léger, Local, Durable.</strong></p>
        <p>Le Kit ESSENTIEL associe la performance de notre panneau solaire <strong>"Eco"</strong> léger à l'éthique de la batterie La Française. C'est le choix idéal pour le randonneur soucieux de son poids et de son impact écologique.</p>
        <p>Avec seulement 210g pour la batterie, vous ne sentirez même pas que vous transportez une centrale électrique.</p>
    `,
    features: [
        "Poids ultra-léger",
        "Batterie fabriquée en France",
        "Plastiques 100% recyclés",
        "Format poche idéal"
    ],
    technicalSpecs: {
        capacity: "10.000 mAh",
        input: "USB-C",
        output: "USB-A & USB-C (22.5W)",
        weight: "Panneau (200g) + Batterie (210g)",
        origin: "Assemblage France (Jura)",
        warranty: "3 ans",
        boxContents: "Panneau Flex 10W, Batterie La Française 10K, Câble, Mousquetons"
    }
  },
  {
    id: 'batt-rugged',
    name: 'Batterie "Xtorm Rugged 20K"',
    description: "La batterie des survivants. Chute, boue, pluie : elle résiste à tout. Lampe torche intégrée.",
    price: 54.89,
    category: 'batteries',
    imageColor: 'bg-white',
    badges: ['Outdoor Expert'],
    specs: ['20.000 mAh', 'IP65', 'Anti-Choc'],
    inStock: true,
    images: [
      '/images/XR202-00.png'
    ],
    longDescription: `
        <h3>IP65 Water Resistant</h3>
        <p>This power bank has been designed and tested to be IP65 water resistant, meaning you don’t have to worry about unpredictable weather or accidentally dropping the power bank in shallow water. Perfect for any situation when exploring the outdoors!</p>
        
        <h3>Recharge your phone 4x</h3>
        <p>Don’t let the compact design fool you, this power bank packs a powerful 20.000mAh battery that’s large enough to recharge your phone at least 4 times. You can also easily charge other small electronic devices such as a digital camera, GPS or drone.</p>
        
        <h3>Fast charge any device</h3>
        <p>The power bank features a USB-C Power Delivery port capable of 35W in-/output, as well as two regular USB ports with Quick Charge 3.0.</p>
    `,
    features: [
        "20.000mAh internal battery",
        "Charges 4 devices at the same time",
        "Integrated Flashlight",
        "Water-resistant IP65",
        "Shockproof design"
    ],
    technicalSpecs: {
        brand: "Xtorm",
        capacity: "20.000 mAh (74Wh)",
        input: "USB-C PD 35W",
        output: "1x USB-C PD (35W), 1x USB-C (15W), 2x USB-A QC 3.0 (18W)",
        weight: "540g",
        dimensions: "23.60 x 11.90 x 3.00 cm",
        waterproof: "IP65",
        warranty: "2 ans",
        material: "ABS, PC"
    }
  },
  {
    id: 'batt-fr',
    name: 'La Française 10K',
    description: "Élégance et performance. Une batterie ultra-compacte assemblée en France.",
    price: 17.29,
    category: 'batteries',
    imageColor: 'bg-white',
    badges: ['Made in France'],
    specs: ['10.000 mAh', 'Garantie 3 ans', 'Format Poche'],
    inStock: true,
    images: [
        '/images/Powerbank-ALEX-6.jpg'
    ],
    longDescription: `
        <p><strong>Batterie "La Française 10K" (Modèle ALEX) - L'alternative éthique et locale.</strong></p>
        <p>Cette batterie incarne notre engagement pour un circuit court. Assemblée dans le Jura, elle limite drastiquement l'impact carbone lié au transport tout en soutenant l'industrie française.</p>
        <p>Malgré sa fabrication locale, elle ne fait aucun compromis sur la performance avec une charge rapide 22.5W et un format ultra-compact qui se glisse dans n'importe quelle poche de sac à dos.</p>
    `,
    features: [
        "Origine Certifiée : Assemblée en France (Jura)",
        "Garantie Étendue : 3 ans",
        "Éco-conception : Coque en ABS Recyclé",
        "Poids Plume : Seulement 210g"
    ],
    technicalSpecs: {
        brand: "Meaning Crafters",
        capacity: "10.000 mAh",
        input: "USB-C",
        output: "USB-A & USB-C (22.5W Charge Rapide)",
        weight: "210g",
        dimensions: "140 x 67 x 15.7 mm",
        origin: "France",
        warranty: "3 ans",
        material: "Recycled ABS"
    }
  },
  {
    id: 'solar-performance',
    name: 'Panneau Solaire "PERFORMANCE"',
    description: "Cellules haute efficacité pour une charge rapide. Fabricant : SOECOPO (40W pliable).",
    price: 17.10,
    category: 'accessoires',
    imageColor: 'bg-white',
    badges: ['Premium'],
    specs: ['40W pliable', 'Silicium monocristallin', 'Charge 2h30', 'Fabricant SOECOPO'],
    inStock: true,
    images: ['/images/panneau.jpg'],
    longDescription: "<p>Le panneau <strong>Performance</strong> est celui intégré au Kit EXPEDITION. Fabriqué par <strong>SOECOPO</strong>, il s'agit d'un module pliable de 40W en silicium monocristallin. Résultat : une charge complète de votre batterie en environ <strong>2h30</strong>, même en montagne.</p>",
    technicalSpecs: {
        capacity: "10 Watts",
        output: "USB-A 5V/2A",
        weight: "200g",
        dimensions: "Format A4 environ",
        waterproof: "IP65 (Face avant)",
        warranty: "3 ans"
    }
  },
  {
    id: 'solar-eco',
    name: 'Panneau Solaire "ECO"',
    description: "L'entrée de gamme fiable et légère. Fabricant : Oillu (15W pliable).",
    price: 10.87,
    category: 'accessoires',
    imageColor: 'bg-white',
    badges: ['Eco'],
    specs: ['15W pliable', 'Silicone monocristallin + PET + tissu', 'Charge 4h', 'Fabricant Oillu'],
    inStock: true,
    images: ['/images/panneau.jpg'],
    longDescription: "<p>Le panneau <strong>Eco</strong> équipe le Kit ESSENTIEL. Fournisseur <strong>Oillu</strong>, format 15W pliable en silicone monocristallin + PET + tissu. Comptez environ <strong>4 heures</strong> pour recharger complètement la batterie standard, avec un poids minimal.</p>",
    technicalSpecs: {
        capacity: "8 Watts",
        output: "USB-A 5V/1.5A",
        weight: "150g",
        dimensions: "Format compact",
        waterproof: "IP54",
        warranty: "2 ans"
    }
  },
  {
    id: 'sunbag-one',
    name: 'Sac à Dos "SUNBAG ONE"',
    description: "Un sac technique de 40L avec compartiment solaire natif. Dos ventilé et passages de câbles.",
    price: 249.00,
    category: 'accessoires',
    imageColor: 'bg-white',
    badges: ['Nouveau'],
    specs: ['40 Litres', 'Tissu Ripstop', 'Ergonomie Trekking'],
    inStock: true,
    images: [
        '/images/sac1.jpg',
            '/images/galery2.png',
        '/images/galery3.jpg',
        '/images/galery4.jpg'
    ],
    longDescription: "<p>Le SUNBAG ONE est l'aboutissement de notre vision. Conçu spécifiquement pour intégrer le panneau solaire, il dispose d'un compartiment dédié 'Power Station' pour protéger votre batterie tout en la gardant connectée. Son dos ventilé et ses bretelles ergonomiques en font un véritable sac de trek.</p>",
    technicalSpecs: {
        capacity: "40 Litres",
        material: "Nylon Ripstop & Matériaux revalorisés",
        weight: "1.2 kg (à vide)",
        features: "Housse de pluie, Passages de câbles internes, Dos filet tendu",
        warranty: "2 ans"
    }
  }
];