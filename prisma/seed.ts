import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seed started...");

  // USUWANIE DANYCH
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared.");

  const mouse = await prisma.category.create({
    data: {
      name: "Mouse",
      description:
        "Computer mice for work and gaming. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://i.ibb.co/NdFWFrn7/mause-img.png",
      exploreInfo: "Find the perfect mouse.",
    },
  });

  const monitor = await prisma.category.create({
    data: {
      name: "Monitor",
      description:
        "Monitors for work and entertainment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://i.ibb.co/cSP8zvwW/monit300.png",
      exploreInfo: "Choose your ideal display.",
    },
  });

  const headphone = await prisma.category.create({
    data: {
      name: "Headphone",
      description:
        "Headphones for music and gaming. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://i.ibb.co/4nR5ZdWF/sluch300.png",
      exploreInfo: "Experience premium sound.",
    },
  });

  const keyboard = await prisma.category.create({
    data: {
      name: "Keyboard",
      description:
        "Mechanical and membrane keyboards. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://i.ibb.co/cSkCxY5T/klaw300.png",
      exploreInfo: "Boost your productivity.",
    },
  });

  const webcam = await prisma.category.create({
    data: {
      name: "Webcam",
      description:
        "Webcams for streaming and meetings. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://i.ibb.co/GQjHSpxD/cam300.png",
      exploreInfo: "Look your best online.",
    },
  });

  console.log("Categories created.");
  const rog = await prisma.brand.create({
    data: {
      name: "ROG",
    },
  });

  const logitech = await prisma.brand.create({
    data: {
      name: "Logitech",
    },
  });

  const jbl = await prisma.brand.create({
    data: {
      name: "JBL",
    },
  });

  const aoc = await prisma.brand.create({
    data: {
      name: "AOC",
    },
  });
  const razer = await prisma.brand.create({
    data: {
      name: "Razer",
    },
  });
  const rexus = await prisma.brand.create({
    data: {
      name: "Rexus",
    },
  });
  console.log("Brands created.");

  const products = [
    // =======================
    // Mouse
    // =======================

    {
      name: "Logitech MX Master 3S",
      description: "Premium wireless productivity mouse.",
      price: 449.99,
      stock: 25,
      imageUrl: "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
      categoryId: mouse.id,
      brandId: logitech.id,
    },
    {
      name: "Logitech G Pro X Superlight 2",
      description: "Ultra-lightweight gaming mouse.",
      price: 699.99,
      stock: 20,
      imageUrl: "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
      categoryId: mouse.id,
      brandId: logitech.id,
    },
    {
      name: "Razer DeathAdder V3",
      description: "Ergonomic esports gaming mouse.",
      price: 379.99,
      stock: 18,
      imageUrl: "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
      categoryId: mouse.id,
      brandId: razer.id,
    },
    {
      name: "Razer Basilisk V3 Pro",
      description: "Wireless customizable gaming mouse.",
      price: 649.99,
      stock: 15,
      imageUrl: "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
      categoryId: mouse.id,
      brandId: razer.id,
    },
    {
      name: "AOC M75 Air",
      description: "Ultra-light wireless gaming mouse.",
      price: 529.99,
      stock: 16,
      imageUrl: "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
      categoryId: mouse.id,
      brandId: aoc.id,
    },

    // =======================
    // Monitor
    // =======================
    {
      name: "ROG PA279CV",
      description: "27-inch professional 4K monitor.",
      price: 1899.99,
      stock: 10,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: monitor.id,
      brandId: rog.id,
    },
    {
      name: "ROG Swift PG32UCDM",
      description: "32-inch 4K OLED gaming monitor.",
      price: 6499.99,
      stock: 6,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: monitor.id,
      brandId: rog.id,
    },
    {
      name: "JBL 32UN880",
      description: "32-inch UHD Ergo monitor.",
      price: 2799.99,
      stock: 8,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: monitor.id,
      brandId: jbl.id,
    },
    {
      name: "AOC XENEON 32QHD240",
      description: "32-inch OLED gaming monitor.",
      price: 5299.99,
      stock: 7,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: monitor.id,
      brandId: aoc.id,
    },
    {
      name: "ROG TUF Gaming VG27AQ",
      description: "27-inch QHD gaming monitor.",
      price: 1699.99,
      stock: 12,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: monitor.id,
      brandId: rog.id,
    },

    // =======================
    // Headphone
    // =======================

    {
      name: "Logitech G Pro X 2",
      description: "Wireless gaming headset.",
      price: 1099.99,
      stock: 18,
      imageUrl: "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
      categoryId: headphone.id,
      brandId: logitech.id,
    },
    {
      name: "Razer BlackShark V2 Pro",
      description: "Esports wireless headset.",
      price: 999.99,
      stock: 15,
      imageUrl: "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
      categoryId: headphone.id,
      brandId: razer.id,
    },
    {
      name: "Rexus Arctis Nova Pro",
      description: "Premium gaming headset with ANC.",
      price: 1499.99,
      stock: 12,
      imageUrl: "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
      categoryId: headphone.id,
      brandId: rexus.id,
    },
    {
      name: "AOC HS80 Max",
      description: "Wireless RGB gaming headset.",
      price: 899.99,
      stock: 14,
      imageUrl: "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
      categoryId: headphone.id,
      brandId: aoc.id,
    },
    {
      name: "ROG ROG Delta S",
      description: "USB-C gaming headset.",
      price: 799.99,
      stock: 10,
      imageUrl: "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
      categoryId: headphone.id,
      brandId: rog.id,
    },

    // =======================
    // Keyboard
    // =======================

    {
      name: "Logitech MX Keys S",
      description: "Wireless productivity keyboard.",
      price: 549.99,
      stock: 22,
      imageUrl: "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
      categoryId: keyboard.id,
      brandId: logitech.id,
    },
    {
      name: "Logitech G915 X",
      description: "Low-profile wireless gaming keyboard.",
      price: 999.99,
      stock: 15,
      imageUrl: "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
      categoryId: keyboard.id,
      brandId: logitech.id,
    },
    {
      name: "Razer BlackWidow V4",
      description: "Mechanical RGB gaming keyboard.",
      price: 799.99,
      stock: 18,
      imageUrl: "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
      categoryId: keyboard.id,
      brandId: razer.id,
    },
    {
      name: "AOC K70 RGB Pro",
      description: "Mechanical gaming keyboard.",
      price: 849.99,
      stock: 16,
      imageUrl: "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
      categoryId: keyboard.id,
      brandId: aoc.id,
    },
    {
      name: "Rexus Apex Pro",
      description: "Mechanical keyboard with adjustable switches.",
      price: 1199.99,
      stock: 12,
      imageUrl: "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
      categoryId: keyboard.id,
      brandId: rexus.id,
    },

    // =======================
    // Webcam
    // =======================

    {
      name: "Logitech Brio 4K",
      description: "Professional 4K webcam.",
      price: 799.99,
      stock: 20,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: webcam.id,
      brandId: logitech.id,
    },
    {
      name: "Logitech StreamCam",
      description: "Full HD webcam for creators.",
      price: 599.99,
      stock: 25,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: webcam.id,
      brandId: logitech.id,
    },
    {
      name: "Razer Kiyo Pro Ultra",
      description: "High-end streaming webcam.",
      price: 1499.99,
      stock: 10,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: webcam.id,
      brandId: razer.id,
    },
    {
      name: "ROG Webcam C3",
      description: "Full HD webcam with dual microphones.",
      price: 349.99,
      stock: 18,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: webcam.id,
      brandId: rog.id,
    },
    {
      name: "Logitech C920 HD Pro",
      description: "One of the most popular Full HD webcams.",
      price: 399.99,
      stock: 30,
      imageUrl: "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
      categoryId: webcam.id,
      brandId: logitech.id,
    },
  ];

  // dodawanie produktow w petli zamiast pojedynczych wywolan create pojedynczo dla kazdego np
  //   await prisma.product.create({
  //   data: {
  //     name: "iPhone 16 Pro",
  //     description: "Apple flagship smartphone.",
  //     price: 5999.99,
  //     stock: 25,
  //     imageUrl: "https://...",

  //     categoryId: electronics.id,
  //     brandId: apple.id,
  //   },
  // });
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Products created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
