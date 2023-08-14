import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

const csvAchievements = './prisma/csv/achievements.csv';


async function seedData(): Promise<void> {
    try {
        const [achievContent] = await Promise.all([
            fs.promises.readFile(csvAchievements, 'utf-8')
        ]);
        const achievlines = achievContent.trim().split('\n').slice(1);
        for (const line of achievlines) {
            const [u1, name, u2, description, u3, milestone, u4, points, u5] = line.split('\"');
            const existingAchievement = await prisma.achievement.findUnique({ where: { name } });
            if (!existingAchievement) {
                await prisma.achievement.create({
                    data: { name, description, milestone, points }
                });
            }
        }
        console.log('✅  All Data from ' + csvAchievements + ' seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData();
