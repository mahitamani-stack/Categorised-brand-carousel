const BASE =
  'https://raw.githubusercontent.com/mahitamani-stack/brand-carousel/566efbb0f2bed410072b7e34149e90777758b0b2/client/public/logos';

const logo = (file, label) => ({ src: `${BASE}/${file}.png`, alt: label ?? file });

export const categories = [
  {
    name: 'Beverages',
    logos: [
      logo('7up', '7UP'),
      logo('campacola', 'Campa Cola'),
      logo('cocacola', 'Coca-Cola'),
      logo('horlicks', 'Horlicks'),
      logo('keventers', 'Keventers'),
      logo('mirinda', 'Mirinda'),
      logo('nescafe', 'Nescafé'),
      logo('pepsi', 'Pepsi'),
      logo('slice', 'Slice'),
      logo('threemango', 'Three Mango'),
    ],
  },
  {
    name: 'Snacks & Namkeen',
    logos: [
      logo('balaji', 'Balaji'),
      logo('bingo', 'Bingo'),
      logo('crax', 'Crax'),
      logo('Haldirams', "Haldiram's"),
      logo('kemchho', 'Kemchho'),
      logo('kp', 'KP'),
      logo('lays', 'Lays'),
      logo('realbites', 'Real Bites'),
      logo('sunderfarsan', 'Sunder Farsan'),
      logo('snacksbeyond', 'Snacks Beyond'),
      logo('gippi', 'Gippi'),
      logo('granamma', 'Granamma'),
      logo('prabhuji', 'Prabhuji'),
      logo('jolliz', 'Jolliz'),
    ],
  },
  {
    name: 'Masalas & Spices',
    logos: [
      logo('aachi', 'Aachi'),
      logo('ajmi', 'Ajmi'),
      logo('brahmins', "Brahmin's"),
      logo('eastern', 'Eastern'),
      logo('everest', 'Everest'),
      logo('ganesh', 'Ganesh'),
      logo('nilons', 'Nilons'),
      logo('shan', 'Shan'),
      logo('shana', 'Shana'),
      logo('suruchi', 'Suruchi'),
      logo('talod', 'Talod'),
    ],
  },
  {
    name: 'Dairy & Frozen',
    logos: [
      logo('gowardhan', 'Gowardhan'),
      logo('milkmaid', 'Milkmaid'),
      logo('motherdairy', 'Mother Dairy'),
      logo('gocheese', 'Go Cheese'),
      logo('havmor', 'Havmor'),
      logo('savai', 'Savai'),
      logo('nic', 'NIC'),
      logo('silvercoin', 'Silver Coin'),
    ],
  },
  {
    name: 'Noodles & Instant',
    logos: [
      logo('indomie', 'Indomie'),
      logo('maggi', 'Maggi'),
      logo('nissin', 'Nissin'),
      logo('topramen', 'Top Ramen'),
      logo('yippee', 'Yippee'),
      logo('chings', "Ching's"),
      logo('mtr', 'MTR'),
    ],
  },
  {
    name: 'Biscuits & Cereals',
    logos: [
      logo('britannia', 'Britannia'),
      logo('sunfeast', 'Sunfeast'),
      logo('tuc', 'TUC'),
      logo('indiagate', 'India Gate'),
      logo('cerelac', 'Cerelac'),
      logo('aashirvaad', 'Aashirvaad'),
    ],
  },
  {
    name: 'Oils & Staples',
    logos: [
      logo('saffola', 'Saffola'),
      logo('fortune', 'Fortune'),
    ],
  },
  {
    name: 'Chocolates',
    logos: [
      logo('cadbury', 'Cadbury'),
      logo('munch', 'Munch'),
    ],
  },
  {
    name: 'QSR & Restaurants',
    logos: [
      logo('burgerking', 'Burger King'),
      logo('dominos', "Domino's"),
      logo('kfc', 'KFC'),
      logo('mcdonalds', "McDonald's"),
      logo('papajohns', "Papa John's"),
      logo('pizzahut', 'Pizza Hut'),
      logo('subway', 'Subway'),
      logo('tacobell', 'Taco Bell'),
    ],
  },
  {
    name: 'Condiments & Sauces',
    logos: [
      logo('veeba', 'Veeba'),
      logo('farmley', 'Farmley'),
    ],
  },
  {
    name: 'Health & Organic',
    logos: [
      logo('organictatva', 'Organic Tatva'),
      logo('superyou', 'Super You'),
      logo('licious', 'Licious'),
      logo('addme', 'Addme'),
    ],
  },
  {
    name: 'Others',
    logos: [
      logo('caldera', 'Caldera'),
      logo('kivo', 'Kivo'),
      logo('mimo', 'Mimo'),
      logo('reliance', 'Reliance'),
      logo('zeeba', 'Zeeba'),
    ],
  },
];
