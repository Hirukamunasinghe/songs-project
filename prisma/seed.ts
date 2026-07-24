// Seeds the database with starter songs. Run once with: npm run db:seed
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const songs = [
  {
    title: "විශ්වය ඔබෙයි",
    artist: "Worship",
    lyrics: `විශ්වය ඔබෙයි නිර්මාණකරුනි
සැලසුම් ඔබෙයි මා ජීවිත ගමනේ

සෙනෙහස ගලයි ඒ ලෙය පව් නසයි
සිහසුන දරයි ඔබ මගේ හද මඩලේ

මගේ දෑත් ඔසවා ඔබව නමදින්නෙමි
මගේ හදවත පතුලෙන් ඔබේ ගුණ ගයන්නෙමි

සමිඳේ ඔබෙ ස්පර්ශය මට දැන් දැනෙනවාය
ගින්නක් සේ මා තුළ පැතිර යයි
නිරතුරු ඔබ මා තුළ රජ කරයි
රජ කරයි, රජ කරයි
සමිඳේ ඔබ මා තුළ රජ කරයි
මට හැඟෙයි, එය දැන් දැනෙයි
සමිඳේ ඔබෙ ස්පර්ශය මට දැනෙයි
මගේ දෑත් ඔසවා ඔබව නමදින්නෙමි...

සමිඳේ ඔබෙ ස්පර්ශය ...
හාලේලූයියා...`,
  },
];

async function main() {
  for (const song of songs) {
    await prisma.song.create({ data: song });
  }
  console.log(`Seeded ${songs.length} song(s).`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
