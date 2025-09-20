// // restaurantData.js
// export const restaurantData = [
//   {
//     id: 'r1',
//     name: 'Burger Heaven',
//     category: 'Burgers',
//     image: 'https://tb-static.uber.com/prod/image-proc/processed_images/798222427fa48dddae3250557266c5e1/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r1d${i + 1}`,
//       name: `Burger Dish ${i + 1}`,
//       price: `$${(9 + i * 0.5).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r2',
//     name: 'Pizza Paradise',
//     category: 'Pizza',
//     image: 'http://a.mktgcdn.com/p/d9AXTJEWMZ156q11dLLVRHsmufNu0K-ng4JYb_4WwRI/4500x3381.jpg',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r2d${i + 1}`,
//       name: `Pizza Dish ${i + 1}`,
//       price: `$${(10 + i * 0.4).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r3',
//     name: 'Sushi Zen',
//     category: 'Japanese',
//     image: 'https://tse2.mm.bing.net/th/id/OIP.2D5xkL79WbFsMzS7xD9qUAHaHa?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r3d${i + 1}`,
//       name: `Sushi Dish ${i + 1}`,
//       price: `$${(12 + i * 0.3).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r4',
//     name: 'Taco Fiesta',
//     category: 'Mexican',
//     image: 'https://tse1.mm.bing.net/th/id/OIP.TE0KGEiIR4s0RdgqOVFEXAHaHa?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r4d${i + 1}`,
//       name: `Taco Dish ${i + 1}`,
//       price: `$${(8 + i * 0.2).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r5',
//     name: 'Pasta Palace',
//     category: 'Italian',
//     image: 'https://tse1.mm.bing.net/th/id/OIP.kL-hZMfwj1dXy7_2yB3buAHaHa?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r5d${i + 1}`,
//       name: `Pasta Dish ${i + 1}`,
//       price: `$${(11 + i * 0.5).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r6',
//     name: 'Green Eats',
//     category: 'Healthy',
//     image: 'https://tse2.mm.bing.net/th/id/OIP.WcNzNKGT9-pyEYZaWgRZTAHaE8?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r6d${i + 1}`,
//       name: `Healthy Dish ${i + 1}`,
//       price: `$${(9 + i * 0.4).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r7',
//     name: 'Coffee Central',
//     category: 'Coffee',
//     image: 'https://tse2.mm.bing.net/th/id/OIP.zMFtlEEJqLUrX3QgDoG-qwHaE8?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r7d${i + 1}`,
//       name: `Coffee Item ${i + 1}`,
//       price: `$${(4 + i * 0.2).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r8',
//     name: 'Sweet Treats',
//     category: 'Desserts',
//     image: 'https://tse2.mm.bing.net/th/id/OIP.oWlMF31OctLHLhs2czVEegHaFr?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r8d${i + 1}`,
//       name: `Dessert Item ${i + 1}`,
//       price: `$${(5 + i * 0.3).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r9',
//     name: 'BBQ Junction',
//     category: 'BBQ',
//     image: 'https://tse2.mm.bing.net/th/id/OIP.OY_cEBj5nr2XWgJ5ZmzkIAHaLG?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r9d${i + 1}`,
//       name: `BBQ Dish ${i + 1}`,
//       price: `$${(13 + i * 0.6).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r10',
//     name: 'Mediterranean Delight',
//     category: 'Mediterranean',
//     image: 'https://tse2.mm.bing.net/th/id/OIP.5oM4TvfCu66fvX8fwU26wgAAAA?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r10d${i + 1}`,
//       name: `Mediterranean Dish ${i + 1}`,
//       price: `$${(10 + i * 0.5).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r11',
//     name: 'Curry Express',
//     category: 'Indian',
//     image: 'https://tse2.mm.bing.net/th/id/OIP.1w9pX0HA05tO8JX9a5nqdQAAAA?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r11d${i + 1}`,
//       name: `Indian Dish ${i + 1}`,
//       price: `$${(9 + i * 0.4).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r12',
//     name: 'Ocean Bites',
//     category: 'Seafood',
//     image: 'https://tse4.mm.bing.net/th/id/OIP.2mmpJ7F3KcJIO5Wu7u3XKQHaFj?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r12d${i + 1}`,
//       name: `Seafood Dish ${i + 1}`,
//       price: `$${(14 + i * 0.5).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r13',
//     name: 'Morning Mood',
//     category: 'Breakfast',
//     image: 'https://static01.nyt.com/images/2023/04/23/multimedia/23WELL-HEALTHY-BREAKFAST9-lgwc/23WELL-HEALTHY-BREAKFAST9-lgwc-videoSixteenByNine3000.jpg',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r13d${i + 1}`,
//       name: `Breakfast Dish ${i + 1}`,
//       price: `$${(6 + i * 0.3).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r14',
//     name: 'Vegan Valley',
//     category: 'Vegan',
//     image: 'https://c8.alamy.com/comp/2PM282P/vegan-food-logo-design-2PM282P.jpg',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r14d${i + 1}`,
//       name: `Vegan Dish ${i + 1}`,
//       price: `$${(8 + i * 0.4).toFixed(2)}`
//     }))
//   },
//   {
//     id: 'r15',
//     name: 'Wok Dynasty',
//     category: 'Chinese',
//     image: 'https://tse3.mm.bing.net/th/id/OIP.D3WbiVcmcCwEEFB4nquyZQHaC8?pid=Api&P=0&h=220',
//     dishes: Array.from({ length: 20 }, (_, i) => ({
//       id: `r15d${i + 1}`,
//       name: `Chinese Dish ${i + 1}`,
//       price: `$${(10 + i * 0.5).toFixed(2)}`
//     }))
//   }
// ];


// restaurantData.js
export const restaurantData = [
  {
    id: 'r1',
    name: 'Burger Heaven',
    category: 'Burgers',
    image: 'https://tb-static.uber.com/prod/image-proc/processed_images/798222427fa48dddae3250557266c5e1/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r1d${i + 1}`,
      name: `Burger Dish ${i + 1}`,
      price: 9 + i * 0.5,
          image: 'https://tb-static.uber.com/prod/image-proc/processed_images/798222427fa48dddae3250557266c5e1/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg',
    }))
  },
  {
    id: 'r2',
    name: 'Pizza Paradise',
    category: 'Pizza',
    image: 'http://a.mktgcdn.com/p/d9AXTJEWMZ156q11dLLVRHsmufNu0K-ng4JYb_4WwRI/4500x3381.jpg',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r2d${i + 1}`,
      name: `Pizza Dish ${i + 1}`,
      price: 10 + i * 0.4,
        image: 'http://a.mktgcdn.com/p/d9AXTJEWMZ156q11dLLVRHsmufNu0K-ng4JYb_4WwRI/4500x3381.jpg',
    }))
  },
  {
    id: 'r3',
    name: 'Sushi Zen',
    category: 'Japanese',
    image: 'https://tse2.mm.bing.net/th/id/OIP.2D5xkL79WbFsMzS7xD9qUAHaHa?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r3d${i + 1}`,
      name: `Sushi Dish ${i + 1}`,
      price: 12 + i * 0.3,
       image: 'https://tse2.mm.bing.net/th/id/OIP.2D5xkL79WbFsMzS7xD9qUAHaHa?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r4',
    name: 'Taco Fiesta',
    category: 'Mexican',
    image: 'https://tse1.mm.bing.net/th/id/OIP.TE0KGEiIR4s0RdgqOVFEXAHaHa?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r4d${i + 1}`,
      name: `Taco Dish ${i + 1}`,
      price: 8 + i * 0.2,
      image: 'https://tse1.mm.bing.net/th/id/OIP.TE0KGEiIR4s0RdgqOVFEXAHaHa?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r5',
    name: 'Pasta Palace',
    category: 'Italian',
    image: 'https://tse1.mm.bing.net/th/id/OIP.kL-hZMfwj1dXy7_2yB3buAHaHa?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r5d${i + 1}`,
      name: `Pasta Dish ${i + 1}`,
      price: 11 + i * 0.5,
       image: 'https://tse1.mm.bing.net/th/id/OIP.kL-hZMfwj1dXy7_2yB3buAHaHa?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r6',
    name: 'Green Eats',
    category: 'Healthy',
    image: 'https://tse2.mm.bing.net/th/id/OIP.WcNzNKGT9-pyEYZaWgRZTAHaE8?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r6d${i + 1}`,
      name: `Healthy Dish ${i + 1}`,
      price: 9 + i * 0.4,
       image: 'https://tse2.mm.bing.net/th/id/OIP.WcNzNKGT9-pyEYZaWgRZTAHaE8?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r7',
    name: 'Coffee Central',
    category: 'Coffee',
    image: 'https://tse2.mm.bing.net/th/id/OIP.zMFtlEEJqLUrX3QgDoG-qwHaE8?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r7d${i + 1}`,
      name: `Coffee Item ${i + 1}`,
      price: 4 + i * 0.2,
      image: 'https://tse2.mm.bing.net/th/id/OIP.zMFtlEEJqLUrX3QgDoG-qwHaE8?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r8',
    name: 'Sweet Treats',
    category: 'Desserts',
    image: 'https://tse2.mm.bing.net/th/id/OIP.oWlMF31OctLHLhs2czVEegHaFr?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r8d${i + 1}`,
      name: `Dessert Item ${i + 1}`,
      price: 5 + i * 0.3,
         image: 'https://tse2.mm.bing.net/th/id/OIP.oWlMF31OctLHLhs2czVEegHaFr?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r9',
    name: 'BBQ Junction',
    category: 'BBQ',
    image: 'https://tse2.mm.bing.net/th/id/OIP.OY_cEBj5nr2XWgJ5ZmzkIAHaLG?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r9d${i + 1}`,
      name: `BBQ Dish ${i + 1}`,
      price: 13 + i * 0.6,
       image: 'https://tse2.mm.bing.net/th/id/OIP.OY_cEBj5nr2XWgJ5ZmzkIAHaLG?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r10',
    name: 'Mediterranean Delight',
    category: 'Mediterranean',
    image: 'https://tse2.mm.bing.net/th/id/OIP.5oM4TvfCu66fvX8fwU26wgAAAA?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r10d${i + 1}`,
      name: `Mediterranean Dish ${i + 1}`,
      price: 10 + i * 0.5,
       image: 'https://tse2.mm.bing.net/th/id/OIP.5oM4TvfCu66fvX8fwU26wgAAAA?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r11',
    name: 'Curry Express',
    category: 'Indian',
    image: 'https://tse2.mm.bing.net/th/id/OIP.1w9pX0HA05tO8JX9a5nqdQAAAA?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r11d${i + 1}`,
      name: `Indian Dish ${i + 1}`,
      price: 9 + i * 0.4,
      image: 'https://tse2.mm.bing.net/th/id/OIP.1w9pX0HA05tO8JX9a5nqdQAAAA?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r12',
    name: 'Ocean Bites',
    category: 'Seafood',
    image: 'https://tse4.mm.bing.net/th/id/OIP.2mmpJ7F3KcJIO5Wu7u3XKQHaFj?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r12d${i + 1}`,
      name: `Seafood Dish ${i + 1}`,
      price: 14 + i * 0.5,
       image: 'https://tse4.mm.bing.net/th/id/OIP.2mmpJ7F3KcJIO5Wu7u3XKQHaFj?pid=Api&P=0&h=220',
    }))
  },
  {
    id: 'r13',
    name: 'Morning Mood',
    category: 'Breakfast',
    image: 'https://static01.nyt.com/images/2023/04/23/multimedia/23WELL-HEALTHY-BREAKFAST9-lgwc/23WELL-HEALTHY-BREAKFAST9-lgwc-videoSixteenByNine3000.jpg',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r13d${i + 1}`,
      name: `Breakfast Dish ${i + 1}`,
      price: 6 + i * 0.3,
       image: 'https://static01.nyt.com/images/2023/04/23/multimedia/23WELL-HEALTHY-BREAKFAST9-lgwc/23WELL-HEALTHY-BREAKFAST9-lgwc-videoSixteenByNine3000.jpg',
    }))
  },
  {
    id: 'r14',
    name: 'Vegan Valley',
    category: 'Vegan',
    image: 'https://c8.alamy.com/comp/2PM282P/vegan-food-logo-design-2PM282P.jpg',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r14d${i + 1}`,
      name: `Vegan Dish ${i + 1}`,
      price: 8 + i * 0.4,
      image:'https://c8.alamy.com/comp/2PM282P/vegan-food-logo-design-2PM282P.jpg'
    }))
  },
  {
    id: 'r15',
    name: 'Wok Dynasty',
    category: 'Chinese',
    image: 'https://tse3.mm.bing.net/th/id/OIP.D3WbiVcmcCwEEFB4nquyZQHaC8?pid=Api&P=0&h=220',
    dishes: Array.from({ length: 20 }, (_, i) => ({
      id: `r15d${i + 1}`,
      name: `Chinese Dish ${i + 1}`,
      price: 10 + i * 0.5,
        image: 'https://tse3.mm.bing.net/th/id/OIP.D3WbiVcmcCwEEFB4nquyZQHaC8?pid=Api&P=0&h=220',
    }))
  }
];


export const restaurants = [
  {
    id: 1,
    name: "Spice Villa",
    type: "Veg",
    rating: 4.5,
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg", // real
    menu: [
      {
        id: "1a",
        name: "Paneer Butter Masala",
        price: 220,
        image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg", // real
      },
      {
        id: "1b",
        name: "Veg Biryani",
        price: 180,
        image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg", // real
      },
    ],
  },
  {
    id: 2,
    name: "Royal Biryani House",
    type: "Non-Veg",
    rating: 4.7,
    image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg",
    menu: [
      {
        id: "2a",
        name: "Chicken Dum Biryani",
        price: 280,
        image: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg",
      },
      {
        id: "2b",
        name: "Mutton Rogan Josh",
        price: 350,
        image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
      },
    ],
  },
  {
    id: 3,
    name: "Green Leaf Café",
    type: "Veg",
    rating: 4.2,
    image: "https://images.pexels.com/photos/368310/pexels-photo-368310.jpeg",
    menu: [
      {
        id: "3a",
        name: "Veg Burger",
        price: 150,
        image: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg",
      },
      {
        id: "3b",
        name: "French Fries",
        price: 90,
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      },
    ],
  },
  {
    id: 4,
    name: "BBQ Nation",
    type: "Non-Veg",
    rating: 4.8,
    image: "https://images.pexels.com/photos/37376/restaurant-barbecue-restaurant-barbecue-37376.jpeg",
    menu: [
      {
        id: "4a",
        name: "Grilled Chicken",
        price: 300,
        image: "https://images.pexels.com/photos/998875/pexels-photo-998875.jpeg",
      },
      {
        id: "4b",
        name: "Prawns Kebab",
        price: 400,
        image: "https://images.pexels.com/photos/784044/pexels-photo-784044.jpeg",
      },
    ],
  },
  {
    id: 5,
    name: "Desi Tandoor",
    type: "Veg",
    rating: 4.3,
    image: "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg",
    menu: [
      {
        id: "5a",
        name: "Tandoori Roti",
        price: 30,
        image: "https://images.pexels.com/photos/2434/bread-food-restaurant-table.jpg",
      },
      {
        id: "5b",
        name: "Dal Tadka",
        price: 160,
        image: "https://images.pexels.com/photos/1111314/pexels-photo-1111314.jpeg",
      },
    ],
  },
  {
    id: 6,
    name: "Seafood Delight",
    type: "Non-Veg",
    rating: 4.6,
    image: "https://images.pexels.com/photos/357743/seafood-dinner-salmon-table.jpg",
    menu: [
      {
        id: "6a",
        name: "Fish Curry",
        price: 320,
        image: "https://images.pexels.com/photos/1580466/pexels-photo-1580466.jpeg",
      },
      {
        id: "6b",
        name: "Crab Masala",
        price: 450,
        image: "https://images.pexels.com/photos/365754/pexels-photo-365754.jpeg",
      },
    ],
  },
  {
    id: 7,
    name: "South Thali House",
    type: "Veg",
    rating: 4.1,
    image: "https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg",
    menu: [
      {
        id: "7a",
        name: "Masala Dosa",
        price: 120,
        image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
      },
      {
        id: "7b",
        name: "Idli Sambhar",
        price: 80,
        image: "https://images.pexels.com/photos/1615198/pexels-photo-1615198.jpeg",
      },
    ],
  },
  {
    id: 8,
    name: "Kebab Junction",
    type: "Non-Veg",
    rating: 4.4,
    image: "https://images.pexels.com/photos/46239/restaurant-gourmet-kebab.jpg",
    menu: [
      {
        id: "8a",
        name: "Chicken Seekh Kebab",
        price: 250,
        image: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg",
      },
      {
        id: "8b",
        name: "Mutton Kebab",
        price: 320,
        image: "https://images.pexels.com/photos/237319/pexels-photo-237319.jpeg",
      },
    ],
  },
  {
    id: 9,
    name: "Vegan Vibes",
    type: "Veg",
    rating: 4.0,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    menu: [
      {
        id: "9a",
        name: "Vegan Pizza",
        price: 280,
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
      },
      {
        id: "9b",
        name: "Tofu Salad",
        price: 200,
        image: "https://images.pexels.com/photos/5938/salad-vegetables-healthy-5938.jpeg",
      },
    ],
  },
  {
    id: 10,
    name: "Mughlai Darbar",
    type: "Non-Veg",
    rating: 4.7,
    image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg",
    menu: [
      {
        id: "10a",
        name: "Butter Chicken",
        price: 340,
        image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      },
      {
        id: "10b",
        name: "Naan",
        price: 40,
        image: "https://images.pexels.com/photos/1435903/pexels-photo-1435903.jpeg",
      },
    ],
  },
];
