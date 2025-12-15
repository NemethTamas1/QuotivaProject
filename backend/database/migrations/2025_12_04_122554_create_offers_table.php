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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->integer("offer_number");
            $table->string("offer_name", 100);
            $table->string("status", 30);
            $table->date("dated");
            $table->date("valid_until");
            $table->string("currency", 15);
            $table->float("tax_percent");
            $table->float("net_total", 12, 2)->default(0);
            $table->float("gross_total", 12, 2)->default(0);

            $table->string("client_name", 100);
            $table->string("client_email", 50)->nullable();
            $table->string("client_phone", 25)->nullable();
            $table->string("client_tax_number",20)->nullable();
            $table->string("client_zip",5);
            $table->string("client_city",30);
            $table->string("client_street", 50);
            $table->string("client_house_number", 10);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
