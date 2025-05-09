-- AlterTable
ALTER TABLE "Checklist" ADD COLUMN     "order" INTEGER;

-- CreateTable
CREATE TABLE "ChildMemo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "order" INTEGER,
    "memoId" TEXT NOT NULL,

    CONSTRAINT "ChildMemo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChildMemo" ADD CONSTRAINT "ChildMemo_memoId_fkey" FOREIGN KEY ("memoId") REFERENCES "Memo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
