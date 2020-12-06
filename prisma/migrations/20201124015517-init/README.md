# Migration `20201124015517-init`

This migration has been generated by Connor Bär at 11/24/2020, 2:55:17 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Unit" AS ENUM ('Liter', 'Milliliter', 'Gallon', 'FluidOunce', 'Cup', 'Tablespoon', 'Teaspoon', 'Kilogram', 'Gram', 'Milligram', 'Pund', 'Ounce', 'Meter', 'Centimeter', 'Millimeter', 'Inch', 'Celsius', 'Fahrenheit')

CREATE TABLE "tags" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "recipeId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE TABLE "recipes" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "description" JSONB,
    "serves" INTEGER,
    "prepTime" INTEGER,
    "cookTime" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
)

CREATE TABLE "ingredientsInRecipes" (
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" "Unit",

    PRIMARY KEY ("recipeId","ingredientId")
)

CREATE TABLE "ingredients" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "instructionId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE TABLE "utensils" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "recipeId" INTEGER,
    "instructionId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE TABLE "instructions" (
"id" SERIAL,
    "content" JSONB NOT NULL,
    "recipeId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE INDEX "tags.title_index" ON "tags"("title")

CREATE INDEX "recipes.title_index" ON "recipes"("title")

CREATE INDEX "ingredients.title_index" ON "ingredients"("title")

CREATE INDEX "utensils.title_index" ON "utensils"("title")

ALTER TABLE "tags" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "ingredientsInRecipes" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "ingredientsInRecipes" ADD FOREIGN KEY("ingredientId")REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "ingredients" ADD FOREIGN KEY("instructionId")REFERENCES "instructions"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "utensils" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "utensils" ADD FOREIGN KEY("instructionId")REFERENCES "instructions"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "instructions" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201124015517-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,110 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Tag {
+  id       Int     @id @default(autoincrement())
+  title    String
+  recipe   Recipe? @relation(fields: [recipeId], references: [id])
+  recipeId Int?
+
+  @@index([title])
+  @@map(name: "tags")
+}
+
+model Recipe {
+  id           Int                  @id @default(autoincrement())
+  title        String
+  description  Json?
+  serves       Int?
+  prepTime     Int?
+  cookTime     Int?
+  updatedAt    DateTime             @updatedAt
+  createdAt    DateTime             @default(now())
+  tags         Tag[]
+  utensils     Utensil[]
+  instructions Instruction[]
+  ingredients  IngredientInRecipe[]
+
+  @@index([title])
+  @@map(name: "recipes")
+}
+
+model IngredientInRecipe {
+  recipe       Recipe     @relation(fields: [recipeId], references: [id])
+  recipeId     Int
+  ingredient   Ingredient @relation(fields: [ingredientId], references: [id])
+  ingredientId Int
+  amount       Int
+  unit         Unit?
+
+  @@id([recipeId, ingredientId])
+  @@map(name: "ingredientsInRecipes")
+}
+
+model Ingredient {
+  id            Int                  @id @default(autoincrement())
+  title         String
+  recipes       IngredientInRecipe[]
+  instruction   Instruction?         @relation(fields: [instructionId], references: [id])
+  instructionId Int?
+
+  @@index([title])
+  @@map(name: "ingredients")
+}
+
+model Utensil {
+  id            Int          @id @default(autoincrement())
+  title         String
+  recipe        Recipe?      @relation(fields: [recipeId], references: [id])
+  recipeId      Int?
+  instruction   Instruction? @relation(fields: [instructionId], references: [id])
+  instructionId Int?
+
+  @@index([title])
+  @@map(name: "utensils")
+}
+
+model Instruction {
+  id          Int          @id @default(autoincrement())
+  content     Json
+  recipe      Recipe?      @relation(fields: [recipeId], references: [id])
+  recipeId    Int?
+  ingredients Ingredient[]
+  utensils    Utensil[]
+
+  @@map(name: "instructions")
+}
+
+enum Unit {
+  // Volume
+  Liter
+  Milliliter
+  Gallon
+  FluidOunce
+  Cup
+  Tablespoon
+  Teaspoon
+  // Weight
+  Kilogram
+  Gram
+  Milligram
+  Pund
+  Ounce
+  // Length
+  Meter
+  Centimeter
+  Millimeter
+  Inch
+  // Temperature
+  Celsius
+  Fahrenheit
+}
```

