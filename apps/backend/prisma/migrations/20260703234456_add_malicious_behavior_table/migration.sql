-- CreateTable
CREATE TABLE "MaliciousBehavior" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "behaviorType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaliciousBehavior_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaliciousBehavior" ADD CONSTRAINT "MaliciousBehavior_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
