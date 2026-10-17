// src/data/product.js
import espressoImage from "../assets/images/espresso.jpg";
import cappuccinoImage from "../assets/images/cappuccino.jpg";
import caffeLatteImage from "../assets/images/caffe-latte.jpg";
import americanoImage from "../assets/images/americano.jpg";
import icedLatteImage from "../assets/images/iced-latte.jpg";
import coldBrewImage from "../assets/images/cold-brew.jpg";
import icedAmericanoImage from "../assets/images/iced-americano.jpg";
import classicTeaImage from "../assets/images/classic-tea.jpg";
import greenTeaImage from "../assets/images/green-tea.jpg";
import caramelFrappeImage from "../assets/images/caramel-frappe.jpg";
import mochaFrappeImage from "../assets/images/mocha-frappe.jpg";
import orangeJuiceImage from "../assets/images/orange-juice.jpg";
import lemonMintImage from "../assets/images/lemon-mint.jpg";
import strawberrySmoothieImage from "../assets/images/strawberry-smoothie.jpg";
import mangoSmoothieImage from "../assets/images/mango-smoothie.jpg";

export const categories = [
  { id: "hot-coffee", name: "Hot Coffee" },
  { id: "iced-coffee", name: "Iced Coffee" },
  { id: "tea", name: "Tea" },
  { id: "frappes", name: "Frappes" },
  { id: "fresh-juice", name: "Fresh Juice" },
  { id: "smoothies", name: "Smoothies" },
];

export const products = [
  // Hot Coffee
  {
    id: 1,
    name: "Espresso",
    category: "hot-coffee",
    price: 65,
    rating: 4.8,
    description: "Rich and bold espresso shot.",
    image: espressoImage,
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "hot-coffee",
    price: 90,
    rating: 4.9,
    description: "Espresso with steamed milk and foam.",
    image: cappuccinoImage,
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: 3,
    name: "Caffe Latte",
    category: "hot-coffee",
    price: 95,
    rating: 4.7,
    description: "Smooth espresso blended with milk.",
    image: caffeLatteImage,
    isFeatured: false,
    isAvailable: true,
  },
  {
    id: 4,
    name: "Americano",
    category: "hot-coffee",
    price: 70,
    rating: 4.6,
    description: "Espresso diluted with hot water.",
    image: americanoImage,
    isFeatured: false,
    isAvailable: true,
  },

  // Iced Coffee
  {
    id: 5,
    name: "Iced Latte",
    category: "iced-coffee",
    price: 100,
    rating: 4.9,
    description: "Chilled espresso with fresh milk.",
    image: icedLatteImage,
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: 7,
    name: "Iced Americano",
    category: "iced-coffee",
    price: 80,
    rating: 4.5,
    description: "Bold espresso served cold over ice.",
    image: icedAmericanoImage,
    isFeatured: false,
    isAvailable: true,
  },

  // Tea
  {
    id: 8,
    name: "Classic Tea",
    category: "tea",
    price: 40,
    rating: 4.5,
    description: "Classic tea with a comforting aroma.",
    image: classicTeaImage,
    isFeatured: false,
    isAvailable: true,
  },
  {
    id: 9,
    name: "Green Tea",
    category: "tea",
    price: 50,
    rating: 4.6,
    description: "Light and refreshing green tea.",
    image: greenTeaImage,
    isFeatured: false,
    isAvailable: true,
  },

  // Frappes
  {
    id: 10,
    name: "Caramel Frappe",
    category: "frappes",
    price: 120,
    rating: 4.9,
    description: "Blended coffee with caramel flavor.",
    image: caramelFrappeImage,
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: 11,
    name: "Mocha Frappe",
    category: "frappes",
    price: 125,
    rating: 4.8,
    description: "Chocolate and coffee blended with ice.",
    image: mochaFrappeImage,
    isFeatured: false,
    isAvailable: true,
  },

  // Fresh Juice
  {
    id: 12,
    name: "Orange Juice",
    category: "fresh-juice",
    price: 75,
    rating: 4.7,
    description: "Freshly squeezed orange juice.",
    image: orangeJuiceImage,
    isFeatured: false,
    isAvailable: true,
  },
  {
    id: 13,
    name: "Lemon Mint",
    category: "fresh-juice",
    price: 70,
    rating: 4.6,
    description: "Fresh lemon juice with mint.",
    image: lemonMintImage,
    isFeatured: false,
    isAvailable: true,
  },

  // Smoothies
  {
    id: 14,
    name: "Strawberry Smoothie",
    category: "smoothies",
    price: 115,
    rating: 4.8,
    description: "Sweet strawberries blended until smooth.",
    image: strawberrySmoothieImage,
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: 15,
    name: "Mango Smoothie",
    category: "smoothies",
    price: 110,
    rating: 4.7,
    description: "Creamy smoothie made with ripe mango.",
    image: mangoSmoothieImage,
    isFeatured: false,
    isAvailable: true,
  },
];
