/* eslint-disable */
const storeItems = [
  {
    city: 'Ahmedabad',
    store: 'Acropolis Mall',
    address: 'S.G.Highway,Thaltej Cross Road - Block C',
    pincode: '380054',
    state: 'Gujarat',
    phone: '09374282101'
  },
  {
    city: 'ASANSOL',
    store: 'SENTRUM MALL',
    address: 'GT ROAD,SHRISTI NAGAR,THE NEW ASANSOL',
    pincode: '713347',
    state: 'West Bengal',
    phone: ''
  },
  {
    city: 'Bangalore',
    store: 'Marathahalli ',
    address: 'Outer Ring Road,Near Innovative Multiplex',
    pincode: '560037',
    state: 'Karnataka',
    phone: '080-66621121/22/23'
  },
  {
    city: 'Bangalore',
    store: 'Jayanagar Central ',
    address: '9th Block, Near Ragigudda Temple.',
    pincode: '560069',
    state: 'Karnataka',
    phone: '080-43320605'
  },
  {
    city: 'Bangalore',
    store: 'Mantri Square No.1',
    address: '2nd Floor, Sampige Road Malleshwaram',
    pincode: '560003',
    state: 'Karnataka',
    phone: ' 080-30160208 / 30160209'
  },
  {
    city: 'Bangalore',
    store: 'Rajajinagar',
    address: '5th Floor, Big Bazaar Family Centre, Nr. Iscon Temple.',
    pincode: '560010',
    state: 'Karnataka',
    phone: '080-23479886'
  },
  {
    city: 'GHAZIABAD',
    store: 'Indirapuram',
    address: ' 1st Floor, Big Bazaar, Aditya Mall, Plot No. 3, Vaibhav Khand.',
    pincode: '201012',
    state: 'Uttar Pradesh',
    phone: '0120-4307816 / 08373900142'
  },
  {
    city: 'NCR-GURGAON',
    store: 'AmbienceMall',
    address: ' Atrium 3, 5th Floor, Ambience Island,_NH 8.',
    pincode: '122006',
    state: 'Haryana',
    phone: '0124-4665766 / 4665768 / 08373902250'
  },
  {
    city: 'Hyderabad',
    store: 'Punjagutta',
    address: '6-3-676, Next to Hyderabad Central',
    pincode: '500029',
    state: 'Telangana',
    phone: '08886041117'
  },
  {
    city: 'Hyderabad',
    store: 'Inorbit Mall',
    address: 'Madhapur,Shop No. 7, 3rd Floor, Level 5, Next to PVR, Hi-Tech City.',
    pincode: '500081',
    state: 'Telangana',
    phone: '08886037878'
  },
  {
    city: 'HYDERABAD',
    store: 'NAVAYUGAVIZVA',
    address: '4TH FLOR,,GACHIBOWLI VILAGE,RANGA REDDY DIS.,SERILINGAMPALLY MANDAL',
    pincode: '500032',
    state: 'Telangana',
    phone: ''
  },
  {
    city: 'KOCHI',
    store: 'CENTRE SQUARE',
    address: ' NEAR HOTEL ABAD PLAZA,M. G. ROAD',
    pincode: '682035',
    state: 'Kerala',
    phone: ''
  },
  {
    city: 'Kolkata',
    store: 'Bhawanipore-18B',
    address: 'Ashutosh Mukherjee Rd., HomeLand Mall, 2nd Floor.',
    pincode: '700020',
    state: 'West Bengal',
    phone: ' 09330020218/033-40633756'
  },
  {
    city: 'Kolkata',
    store: 'Rajarhat - Block by Block Shopping Mall',
    address: 'New Town, Near DLF IT Park.',
    pincode: '700156',
    state: 'West Bengal',
    phone: '033-3068 0531'
  },
  {
    city: 'Kolkata',
    store: 'Diamond Plaza Mall',
    address: 'Jessore Road.,Diamond City North,Nager Bazaar, 68',
    pincode: '700055',
    state: 'West Bengal',
    phone: '033-3012 2550'
  },
  {
    city: 'Kolkata',
    store: 'Mani Square',
    address: 'Manick Talla main road, :164/1 , Mani Square Mall, 2nd Floor, Kolkata-54',
    pincode: '700054',
    state: 'West Bengal',
    phone: '09330041548 / 033-65405317'
  },
  {
    city: 'LUCKNOW',
    store: 'Phoenix United Mall',
    address: 'Kanpur Road,3rd Floor, CP 8, Sector B, LDA Colony, Lucknow',
    pincode: '226012',
    state: 'Uttar Pradesh',
    phone: '0522-2425565'
  },
  {
    city: 'Mumbai',
    store: '247 Park',
    address: 'L.B.S. Marg-Vikhroli (W)',
    pincode: '400083',
    state: 'Maharashtra',
    phone: '022-65179096 / 65156189'
  },
  {
    city: 'Mumbai',
    store: 'NEW ERA HOUSE',
    address: 'MOGUL LANE,GROUND FLOOR,MATUNGA',
    pincode: '400016',
    state: 'Maharashtra',
    phone: ''
  },
  {
    city: 'MYSORE',
    store: 'Big Bazzar Super Centre',
    address: 'Jhansi Laxmi Bai Road,Chamrajpuram',
    pincode: '570004',
    state: 'Karnataka',
    phone: '0821-4003693 / 9538018881 / 9538354400'
  },
  {
    city: 'NAGPUR',
    store: 'Landmark Tower',
    address: 'Wardha Road ,Above Big Bazaar.',
    pincode: '440010',
    state: 'Maharashtra',
    phone: ' 0712-6631442'
  },
  {
    city: 'NEW DELHI',
    store: 'AMBIENCE MALL',
    address: 'ROHINI CENTRAL,PLOT NO.2B2,TWIN DIRSTICT CENTRE,ROHINI,SECTOR 10',
    pincode: '110085',
    state: 'Delhi',
    phone: ''
  },
  {
    city: 'NOIDA',
    store: 'The Great India Place Mall (Opp. Atta Market)',
    address: 'Noida - , A2, Lower Ground Floor, Sector 38A',
    pincode: '201301',
    state: 'Uttar Pradesh',
    phone: '0120-3347843 / 09643328729'
  },
  {
    city: 'NOIDA',
    store: 'THE GRAND VENICE',
    address: 'SH-3, SITE IV,GREATER NOIDA',
    pincode: '201308',
    state: 'Uttar Pradesh',
    phone: ''
  },
  {
    city: 'PUNE',
    store: ' Ishanya Mall',
    address: 'Off Airport Road, Yerwada,Arcade 1',
    pincode: '411006',
    state: 'Maharashtra',
    phone: '020-66405831'
  },
  {
    city: 'PUNE',
    store: 'Hadapsar - West Blok',
    address: 'Amanora Park, Lower Ground Floor, Town Centre, Hadapsar Kharadi Bypass.',
    pincode: '411028',
    state: 'Maharashtra',
    phone: ' 020-30454858'
  },
  {
    city: 'PUNE',
    store: 'MSM PARANJAPE MALL',
    address: 'OFF KARVE ROAD, NEAR MES COLLEGE.',
    pincode: '411004',
    state: 'Maharashtra',
    phone: ''
  },
  {
    city: 'PUNE',
    store: 'MARKET CITY,VIMAN NAGAR',
    address: 'UNIT NO. S-37,LOWER SECOND FLOOR, NAGAR ROAD,',
    pincode: '411014',
    state: 'Maharashtra',
    phone: ' '
  },
  {
    city: 'RAIPUR',
    store: 'Chhattisgarh City Center Mall',
    address: 'Devendra Nagar,Pandri, Raipur',
    pincode: '492001',
    state: 'Chhattisgarh',
    phone: '09301940993 / 0771-4032588'
  },
  {
    city: 'RANCHI',
    store: '5Th Floor, Big Bazaar Building',
    address: 'Main Road,Ranchi.',
    pincode: '834001',
    state: 'Jharkhand',
    phone: ' 0651-6888895 / 09334749303 / 07488223997'
  },
  {
    city: 'SILIGURI',
    store: 'Cosmos Mall',
    address: 'Sevoke Road,1st Floor, Siliguri',
    pincode: '734001',
    state: 'West Bengal',
    phone: '09832072365 / 0353-3041085'
  },
  {
    city: 'THANE',
    store: 'Ghodbunder Road R-Mall',
    address: '3rd Floor, Chitalsar- Manpada,Thane (W)',
    pincode: '400601',
    state: 'Maharashtra',
    phone: ' 022-39945484/45.'
  },
  {
    city: 'Mira-Bhayandar',
    store: 'THAKUR SHOPPING MALL',
    address: 'NEAR DAHISAR CHECK NAKA POST,NEAR LION PENCIL, MIRA BHAYA',
    pincode: '401104',
    state: 'Maharashtra',
    phone: ''
  },
  {
    city: 'THANE',
    store: 'LODHA EXPERIA MALL',
    address: 'KALYAN-SHIL ROAD,PALAVA CITY, JUNCTION OF DOMBIVALI',
    pincode: '421204',
    state: 'Maharashtra',
    phone: ''
  },
  {
    city: 'VADODARA',
    store: 'OPP.SARABHAI CHEMICALS',
    address: 'WADI,BARODA',
    pincode: '390007',
    state: 'Gujarat',
    phone: ''
  },
  {
    city: 'VASAI',
    store: 'Big Bazaar',
    address: 'Bhabola Papdi Road,2nd floor, Dattani Village,Vasai (W)',
    pincode: '401201',
    state: 'Maharashtra',
    phone: '09664650793'
  },
  {
    city: 'VASHI',
    store: 'CENTER ONE MALL',
    address: 'SECTOR 30/A, PLOT NO. 33, THIRD FLOOR, VASHI',
    pincode: '400705',
    state: 'Maharashtra',
    phone: ''
  },
  {
    city: 'VIRAR',
    store: 'YASHWANT BLDG',
    address: 'VILLAGE DONGRE-BYPASS ROAD,, OPP. MAGNUS MOTOR',
    pincode: '401304',
    state: 'Maharashtra',
    phone: ''
  },
  {
    city: 'VISHAKAPATNAM',
    store: 'CMR CENTRAL MALL',
    address: 'MADDILAPALEM,SECOND FLOOR,NEW RESAPUVANIPALEM',
    pincode: '530013',
    state: 'Andhra Pradesh',
    phone: ''
  }
];

export default storeItems;
