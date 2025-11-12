import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(identifier: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier }
      ]
    },
    include: {
      // Include relationships to get medical center based on role
      receptionist: {
        include: {
          medicalCenter: {
            select: {
              id: true,
              name: true
            }
          }
        }
      },
      doctor: {
        include: {
          medicalCenter: {
            select: {
              id: true,
              name: true
            }
          }
        }
      },
      adminMedicalCenter: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!user) throw new Error("Invalid credentials 1");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials 2");

  // Extract medical center based on user role
  let medicalCenter = null;
  
  if (user.role === 'receptionist' && user.receptionist) {
    medicalCenter = user.receptionist.medicalCenter;
  } else if (user.role === 'doctor' && user.doctor) {
    medicalCenter = user.doctor.medicalCenter;
  } else if (user.role === 'medical_admin' && user.adminMedicalCenter) {
    medicalCenter = user.adminMedicalCenter;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { 
    token, 
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      medicalCenter // Add medical center to the user object
    }
  };
}