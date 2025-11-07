import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash("tijan123", 10)

  // seed receptionist user
  await prisma.user.upsert({
    where: { email: "receptionist@tijan.com" },
    update: {},
    create: {
      name: "Receptionist One",
      email: "receptionist@tijan.com",
      username: "receptionist",
      password,
      role: "receptionist",
    },
  })

  // seed some patients
  await prisma.patient.createMany({
    data: [
      {
        fullName: "Yara Hassan",
        email: "yara@example.com",
        phone: "0933333333",
        gender: "female",
        birthdate: new Date("2002-04-11"),
        address: "Damascus",
      },
      {
        fullName: "Ali Khalid",
        email: "ali@example.com",
        phone: "0999888777",
        gender: "male",
        birthdate: new Date("1998-06-12"),
        address: "Homs",
      },
      {
        fullName: "Sara Ibrahim",
        email: "sara@example.com",
        phone: "0987654321",
        gender: "female",
        birthdate: new Date("2000-09-23"),
        address: "Aleppo",
      },
    ],
  })

  console.log("Seed complete ✅")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
