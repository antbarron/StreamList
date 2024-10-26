import socialMediaImage from './../Social Media.jpeg';

const list = [
    {
      id: 1,
      service: "Basic Subscription",
      serviceInfo: "For one User",
      price: 4.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3231802/ticket-icon-md.png",
      amount: 1,
    },
    {
        id: 2,
        service: "Gold Subscription",
        serviceInfo: "Share with Family",
        price: 9.99,
        img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3237088/ticket-icon-md.png",
        amount: 1,
    },
    {
        id: 3,
        service: "Premium Subscription",
        serviceInfo: "Share with the World",
        price: 12.99,
        img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3258730/ticket-icon-md.png",
        amount: 1,
      },
      {
        id: 4,
        service: "Social Media Sharing Subscription",
        serviceInfo: "Share your list",
        price: 2.99,
        img: socialMediaImage,
        amount: 1,
      }
];

export default list;