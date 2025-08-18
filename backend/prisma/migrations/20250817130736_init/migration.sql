-- CreateTable
CREATE TABLE "public"."product" (
    "id" SERIAL NOT NULL,
    "product_code" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "generic_name" TEXT NOT NULL,
    "manufacturer" TEXT,
    "pack_size" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "mrp" DECIMAL(10,2) NOT NULL,
    "rate" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(5,2) NOT NULL,
    "tax" DECIMAL(5,2) NOT NULL,
    "gross_amount" DECIMAL(10,2) NOT NULL,
    "final_amount" DECIMAL(10,2) NOT NULL,
    "final_rate" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_product_code_key" ON "public"."product"("product_code");

-- CreateIndex
CREATE INDEX "product_product_code_idx" ON "public"."product"("product_code");

-- CreateIndex
CREATE INDEX "product_product_name_idx" ON "public"."product"("product_name");

-- CreateIndex
CREATE INDEX "product_generic_name_idx" ON "public"."product"("generic_name");
