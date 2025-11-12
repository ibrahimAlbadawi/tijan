import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // SUPER ADMIN
  const superPass = await bcrypt.hash("superadmin123", 10);
  const superAdmin = await prisma.superAdmin.upsert({
    where: { email: "super@tijan.com" },
    update: {}, // Don't update anything if exists
    create: {
      email: "super@tijan.com",
      password: superPass
    }
  });

  // MEDICAL ADMIN USER
  const adminPass = await bcrypt.hash("admin123", 10);
  const medicalAdmin = await prisma.user.upsert({
    where: { email: "admin@tijan.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "Main",
      username: "admin_user",
      role: "medical_admin",
      email: "admin@tijan.com",
      password: adminPass,
      superAdminId: superAdmin.id,
    }
  });

  // MEDICAL CENTER
  const center = await prisma.medicalCenter.upsert({
    where: { adminId: medicalAdmin.id },
    update: {},
    create: {
      name: "Smile Dental Center",
      address: "Damascus - Mazzeh",
      phoneNumber: "0933333333",
      numberOfClinics: 3,
      notificationLeadTime: 2,
      adminId: medicalAdmin.id
    }
  });

  // DOCTOR USER
  const doctorPass = await bcrypt.hash("doctor123", 10);
  const doctorUser = await prisma.user.upsert({
    where: { email: "doctor@tijan.com" },
    update: {},
    create: {
      firstName: "Ahmad",
      lastName: "Dentist",
      username: "doctor1",
      role: "doctor",
      email: "doctor@tijan.com",
      password: doctorPass,
      superAdminId: superAdmin.id
    }
  });

  // DOCTOR LINK
  const doctor = await prisma.doctor.upsert({
    where: { userId: doctorUser.id },
    update: {},
    create: {
      userId: doctorUser.id,
      medicalCenterId: center.id,
      major: "Orthodontics"
    }
  });

  // RECEPTIONIST USER
  const recPass = await bcrypt.hash("reception123", 10);
  const receptionistUser = await prisma.user.upsert({
    where: { email: "reception@tijan.com" },
    update: {},
    create: {
      firstName: "Recept",
      lastName: "One",
      username: "recept1",
      role: "receptionist",
      email: "reception@tijan.com",
      password: recPass,
      superAdminId: superAdmin.id
    }
  });

  // RECEPTIONIST LINK
  await prisma.receptionist.upsert({
    where: { userId: receptionistUser.id },
    update: {},
    create: {
      userId: receptionistUser.id,
      medicalCenterId: center.id
    }
  });

  // PATIENTS SEED - Delete existing patients first to avoid duplicates
  await prisma.patientProfile.deleteMany({
    where: { medicalCenterId: center.id }
  });

  const patientsData = [
    { firstName: "Ali", lastName: "Saleh", gender: "Male", phoneNumber: "0991001001", email: "ali@test.com" },
    { firstName: "Sara", lastName: "Hamdan", gender: "Female", phoneNumber: "0991001002", email: "sara@test.com" },
    { firstName: "Omar", lastName: "Hassan", gender: "Male", phoneNumber: "0991001003", email: "omar@test.com" },
    { firstName: "Rami", lastName: "Ahmad", gender: "Male", phoneNumber: "0991001004", email: "rami@test.com" },
    { firstName: "Nour", lastName: "Farah", gender: "Female", phoneNumber: "0991001005", email: "nour@test.com" },
  ];

  const patients = [];

  for (const p of patientsData) {
    const newPatient = await prisma.patientProfile.create({
      data: {
        firstName: p.firstName,
        lastName: p.lastName,
        gender: p.gender,
        email: p.email,
        phoneNumber: p.phoneNumber,
        dateOfBirth: new Date("1998-01-01"),
        medicalCenterId: center.id
      }
    });
    patients.push(newPatient);
  }

  // Delete existing appointments and create new ones
  await prisma.appointment.deleteMany({
    where: { doctorId: doctor.id }
  });

  // 1 appointment per patient
  for (const patient of patients) {
    await prisma.appointment.create({
      data: {
        appointmentDateTime: new Date(),
        caseDescription: `General check for patient ${patient.firstName}`,
        status: "confirmed",
        patientId: patient.id,
        doctorId: doctor.id
      }
    });
  }

  console.log("🌱 DATABASE SEEDED SUCCESSFULLY ✅")
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());