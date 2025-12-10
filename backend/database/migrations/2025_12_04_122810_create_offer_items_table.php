<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offer_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id')->constrained()->onDelete('cascade');
            $table->string("name", 100);
            $table->string("description", 255)->nullable();
            $table->decimal("quantity", 12, 2);
            $table->string("quantity_type", 20);
            $table->decimal("labor_unit_price", 12, 2)->default(0); // Munkadíj egységár (nettó)
            $table->decimal("material_unit_price", 12, 2)->default(0); // Anyagdíj egységár (nettó)
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offer_items');
    }
};
