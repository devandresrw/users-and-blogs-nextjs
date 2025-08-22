import { prisma } from './prisma-singleton'

class PrismaService {
  public prisma = prisma

  async disconnect() {
    await this.prisma.$disconnect()
  }
}

export default new PrismaService()