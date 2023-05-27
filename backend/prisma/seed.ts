import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

const csvText = './prisma/csv/texts.csv';
const csvConfig = './prisma/csv/configs.csv';


async function seedData(): Promise<void> {
    try {
        const [textContents, configContents] = await Promise.all([
            fs.promises.readFile(csvText, 'utf-8'),
            fs.promises.readFile(csvConfig, 'utf-8')
        ]);

        const textlines = textContents.trim().split('\n').slice(1);
        const configlines = configContents.trim().split('\n').slice(1);

        for (const line of textlines) {
            const [u1, key, u2, en, u3, fr, u4] = line.split('\"');
            const existingText = await prisma.texts.findUnique({ where: { key } });
            if (!existingText) {
                await prisma.texts.create({
                    data: { key, en, fr }
                });
            }

        }
        console.log('✅  All Data from ' + csvText + ' seeded successfully');

        for (const line of configlines) {
            const [u1, key, u2, value, u3] = line.split('\"');
            const existingConfig = await prisma.configs.findUnique({ where: { key } });
            if (!existingConfig)
            {
                await prisma.configs.create({
                    data: { key, value }
                });
            }
        }
        console.log('✅  All Data from ' + csvConfig + ' seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData();
