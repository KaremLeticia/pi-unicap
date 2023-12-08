import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log('Usuário encontrado:', user);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      console.log('Senha informada:', password);
      console.log('Senha do banco de dados:', user.password);

      if (passwordMatch) {
        console.log('Senha válida. Realizando login.');
        return NextResponse.json(user, { status: 200 });
      }
    }

    console.error('Credenciais inválidas.');
    return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return NextResponse.json({ error: 'Erro ao realizar login.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
