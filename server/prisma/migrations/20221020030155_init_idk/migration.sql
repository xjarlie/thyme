-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "authToken" TEXT NOT NULL,
    "tokenExpires" BIGINT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Timetable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Timetable_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "timetableID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Subject_timetableID_fkey" FOREIGN KEY ("timetableID") REFERENCES "Timetable" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subject_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubjectInstance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectID" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "room" TEXT,
    "teacher" TEXT,
    "userID" TEXT NOT NULL,
    "timetableID" TEXT,
    CONSTRAINT "SubjectInstance_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubjectInstance_timetableID_fkey" FOREIGN KEY ("timetableID") REFERENCES "Timetable" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectID" TEXT,
    "due" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Task_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "text" TEXT,
    "isPinboard" BOOLEAN NOT NULL DEFAULT false,
    "pinboardID" TEXT,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Note_pinboardID_fkey" FOREIGN KEY ("pinboardID") REFERENCES "Pinboard" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Note_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pinboard" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Pin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "text" TEXT,
    "pinboardID" TEXT,
    CONSTRAINT "Pin_pinboardID_fkey" FOREIGN KEY ("pinboardID") REFERENCES "Pinboard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "pinID" TEXT,
    CONSTRAINT "Url_pinID_fkey" FOREIGN KEY ("pinID") REFERENCES "Pin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_authToken_key" ON "User"("authToken");

-- CreateIndex
CREATE UNIQUE INDEX "Note_pinboardID_key" ON "Note"("pinboardID");
