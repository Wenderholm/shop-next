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
      description:
        "Premium wireless productivity mouse. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 449.99,
      stock: 25,
      imageUrls: [
        "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
        "https://i.ibb.co/RGh5Wym9/redmouse.png",
        "https://i.ibb.co/hFWpH4pp/greenmouse.png",
      ],
      createdAt: new Date("2026-08-10"),
      categoryId: mouse.id,
      brandId: logitech.id,
    },
    {
      name: "Logitech G Pro X Superlight 2",
      description:
        "Ultra-lightweight gaming mouse. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 699.99,
      stock: 20,
      imageUrls: [
        "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
        "https://i.ibb.co/RGh5Wym9/redmouse.png",
        "https://i.ibb.co/hFWpH4pp/greenmouse.png",
      ],
      createdAt: new Date("2026-08-15"),
      categoryId: mouse.id,
      brandId: logitech.id,
    },
    {
      name: "Razer DeathAdder V3",
      description:
        "Ergonomic esports gaming mouse. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 379.99,
      stock: 18,
      imageUrls: [
        "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
        "https://i.ibb.co/RGh5Wym9/redmouse.png",
        "https://i.ibb.co/hFWpH4pp/greenmouse.png",
      ],
      createdAt: new Date("2026-07-15"),
      categoryId: mouse.id,
      brandId: razer.id,
    },
    {
      name: "Razer Basilisk V3 Pro",
      description:
        "Wireless customizable gaming mouse. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 649.99,
      stock: 15,
      imageUrls: [
        "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
        "https://i.ibb.co/RGh5Wym9/redmouse.png",
        "https://i.ibb.co/hFWpH4pp/greenmouse.png",
      ],
      createdAt: new Date("2026-08-05"),
      categoryId: mouse.id,
      brandId: razer.id,
    },
    {
      name: "AOC M75 Air",
      description:
        "Ultra-light wireless gaming mouse. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 529.99,
      stock: 16,
      imageUrls: [
        "https://i.ibb.co/YBBR7sYq/myszka-tlo.png",
        "https://i.ibb.co/RGh5Wym9/redmouse.png",
        "https://i.ibb.co/hFWpH4pp/greenmouse.png",
      ],
      createdAt: new Date("2026-07-28"),
      categoryId: mouse.id,
      brandId: aoc.id,
    },

    // =======================
    // Monitor
    // =======================

    {
      name: "ROG PA279CV",
      description:
        "27-inch professional 4K monitor. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 1899.99,
      stock: 10,
      imageUrls: [
        "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
        "https://i.ibb.co/gM9MWwZY/red-Monit.png",
        "https://i.ibb.co/ych69HFq/green-Monit.png",
      ],
      createdAt: new Date("2026-08-12"),
      categoryId: monitor.id,
      brandId: rog.id,
    },
    {
      name: "ROG Swift PG32UCDM",
      description:
        "32-inch 4K OLED gaming monitor. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 6499.99,
      stock: 6,
      imageUrls: [
        "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
        "https://i.ibb.co/gM9MWwZY/red-Monit.png",
        "https://i.ibb.co/ych69HFq/green-Monit.png",
      ],
      createdAt: new Date("2026-08-08"),
      categoryId: monitor.id,
      brandId: rog.id,
    },
    {
      name: "JBL 32UN880",
      description:
        "32-inch UHD Ergo monitor. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 2799.99,
      stock: 8,
      imageUrls: [
        "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
        "https://i.ibb.co/gM9MWwZY/red-Monit.png",
        "https://i.ibb.co/ych69HFq/green-Monit.png",
      ],
      createdAt: new Date("2026-07-20"),
      categoryId: monitor.id,
      brandId: jbl.id,
    },
    {
      name: "AOC XENEON 32QHD240",
      description:
        "32-inch OLED gaming monitor. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 5299.99,
      stock: 7,
      imageUrls: [
        "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
        "https://i.ibb.co/gM9MWwZY/red-Monit.png",
        "https://i.ibb.co/ych69HFq/green-Monit.png",
      ],
      createdAt: new Date("2026-07-10"),
      categoryId: monitor.id,
      brandId: aoc.id,
    },
    {
      name: "ROG TUF Gaming VG27AQ",
      description:
        "27-inch QHD gaming monitor. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 1699.99,
      stock: 12,
      imageUrls: [
        "https://i.ibb.co/wZ3pqjhD/moniotr-tlo.png",
        "https://i.ibb.co/gM9MWwZY/red-Monit.png",
        "https://i.ibb.co/ych69HFq/green-Monit.png",
      ],
      createdAt: new Date("2026-06-25"),
      categoryId: monitor.id,
      brandId: rog.id,
    },

    // =======================
    // Headphone
    // =======================

    {
      name: "Logitech G Pro X 2",
      description:
        "Wireless gaming headset. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 1099.99,
      stock: 18,
      imageUrls: [
        "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
        "https://i.ibb.co/gL2n3szJ/read-Head.png",
        "https://i.ibb.co/xSmdHdfg/green-Head.png",
      ],
      createdAt: new Date("2026-08-14"),
      categoryId: headphone.id,
      brandId: logitech.id,
    },
    {
      name: "Razer BlackShark V2 Pro",
      description:
        "Esports wireless headset. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 999.99,
      stock: 15,
      imageUrls: [
        "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
        "https://i.ibb.co/gL2n3szJ/read-Head.png",
        "https://i.ibb.co/xSmdHdfg/green-Head.png",
      ],
      createdAt: new Date("2026-08-02"),
      categoryId: headphone.id,
      brandId: razer.id,
    },
    {
      name: "Rexus Arctis Nova Pro",
      description:
        "Premium gaming headset with ANC. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 1499.99,
      stock: 12,
      imageUrls: [
        "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
        "https://i.ibb.co/gL2n3szJ/read-Head.png",
        "https://i.ibb.co/xSmdHdfg/green-Head.png",
      ],
      createdAt: new Date("2026-07-18"),
      categoryId: headphone.id,
      brandId: rexus.id,
    },
    {
      name: "AOC HS80 Max",
      description:
        "Wireless RGB gaming headset. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 899.99,
      stock: 14,
      imageUrls: [
        "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
        "https://i.ibb.co/gL2n3szJ/read-Head.png",
        "https://i.ibb.co/xSmdHdfg/green-Head.png",
      ],
      createdAt: new Date("2026-07-05"),
      categoryId: headphone.id,
      brandId: aoc.id,
    },
    {
      name: "ROG ROG Delta S",
      description:
        "USB-C gaming headset. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 799.99,
      stock: 10,
      imageUrls: [
        "https://i.ibb.co/4wqkyj9N/sluchaw-tlo.png",
        "https://i.ibb.co/gL2n3szJ/read-Head.png",
        "https://i.ibb.co/xSmdHdfg/green-Head.png",
      ],
      createdAt: new Date("2026-06-20"),
      categoryId: headphone.id,
      brandId: rog.id,
    },

    // =======================
    // Keyboard
    // =======================

    {
      name: "Logitech MX Keys S",
      description:
        "Wireless productivity keyboard. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 549.99,
      stock: 22,
      imageUrls: [
        "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
        "https://i.ibb.co/W4KVKFnR/red-Klaw.png",
        "https://i.ibb.co/BKQQG8ZQ/green-Klaw.png",
      ],

      createdAt: new Date("2026-08-11"),
      categoryId: keyboard.id,
      brandId: logitech.id,
    },
    {
      name: "Logitech G915 X",
      description:
        "Low-profile wireless gaming keyboard. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 999.99,
      stock: 15,
      imageUrls: [
        "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
        "https://i.ibb.co/W4KVKFnR/red-Klaw.png",
        "https://i.ibb.co/BKQQG8ZQ/green-Klaw.png",
      ],
      createdAt: new Date("2026-07-30"),
      categoryId: keyboard.id,
      brandId: logitech.id,
    },
    {
      name: "Razer BlackWidow V4",
      description:
        "Mechanical RGB gaming keyboard. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 799.99,
      stock: 18,
      imageUrls: [
        "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
        "https://i.ibb.co/W4KVKFnR/red-Klaw.png",
        "https://i.ibb.co/BKQQG8ZQ/green-Klaw.png",
      ],
      createdAt: new Date("2026-07-12"),
      categoryId: keyboard.id,
      brandId: razer.id,
    },
    {
      name: "AOC K70 RGB Pro",
      description:
        "Mechanical gaming keyboard. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 849.99,
      stock: 16,
      imageUrls: [
        "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
        "https://i.ibb.co/W4KVKFnR/red-Klaw.png",
        "https://i.ibb.co/BKQQG8ZQ/green-Klaw.png",
      ],
      createdAt: new Date("2026-06-28"),
      categoryId: keyboard.id,
      brandId: aoc.id,
    },
    {
      name: "Rexus Apex Pro",
      description:
        "Mechanical keyboard with adjustable switches. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 1199.99,
      stock: 12,
      imageUrls: [
        "https://i.ibb.co/607cD4Pg/kalwaitura-tlo.png",
        "https://i.ibb.co/W4KVKFnR/red-Klaw.png",
        "https://i.ibb.co/BKQQG8ZQ/green-Klaw.png",
      ],
      createdAt: new Date("2026-06-15"),
      categoryId: keyboard.id,
      brandId: rexus.id,
    },

    // =======================
    // Webcam
    // =======================

    {
      name: "Logitech Brio 4K",
      description:
        "Professional 4K webcam. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 799.99,
      stock: 20,
      imageUrls: [
        "https://i.ibb.co/JwSsB54d/cam-tlo.png",
        "https://i.ibb.co/M0YqvSW/red-Cam.png",
        "https://i.ibb.co/35RN8rTJ/green-Cam.png",
      ],
      createdAt: new Date("2026-08-16"),
      categoryId: webcam.id,
      brandId: logitech.id,
    },
    {
      name: "Logitech StreamCam",
      description:
        "Full HD webcam for creators. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 599.99,
      stock: 25,
      imageUrls: [
        "https://i.ibb.co/JwSsB54d/cam-tlo.png",
        "https://i.ibb.co/M0YqvSW/red-Cam.png",
        "https://i.ibb.co/35RN8rTJ/green-Cam.png",
      ],
      createdAt: new Date("2026-08-06"),
      categoryId: webcam.id,
      brandId: logitech.id,
    },
    {
      name: "Razer Kiyo Pro Ultra",
      description:
        "High-end streaming webcam. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 1499.99,
      stock: 10,
      imageUrls: [
        "https://i.ibb.co/JwSsB54d/cam-tlo.png",
        "https://i.ibb.co/M0YqvSW/red-Cam.png",
        "https://i.ibb.co/35RN8rTJ/green-Cam.png",
      ],
      createdAt: new Date("2026-07-22"),
      categoryId: webcam.id,
      brandId: razer.id,
    },
    {
      name: "ROG Webcam C3",
      description:
        "Full HD webcam with dual microphones. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 349.99,
      stock: 18,
      imageUrls: [
        "https://i.ibb.co/JwSsB54d/cam-tlo.png",
        "https://i.ibb.co/M0YqvSW/red-Cam.png",
        "https://i.ibb.co/35RN8rTJ/green-Cam.png",
      ],
      createdAt: new Date("2026-07-08"),
      categoryId: webcam.id,
      brandId: rog.id,
    },
    {
      name: "Logitech C920 HD Pro",
      description:
        "One of the most popular Full HD webcams. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      price: 399.99,
      stock: 30,
      imageUrls: [
        "https://i.ibb.co/JwSsB54d/cam-tlo.png",
        "https://i.ibb.co/M0YqvSW/red-Cam.png",
        "https://i.ibb.co/35RN8rTJ/green-Cam.png",
      ],
      createdAt: new Date("2026-06-18"),
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
