/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Group.name_unique" ON "Group"("name");