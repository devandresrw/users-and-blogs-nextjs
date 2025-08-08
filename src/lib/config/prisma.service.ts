import { PrismaClient } from '@/generated/prisma';

class PrismaService {
 public prisma: PrismaClient;

 constructor() {
  this.prisma = new PrismaClient();
 }

 async disconnect() {
  await this.prisma.$disconnect();
 }
}

export default new PrismaService();