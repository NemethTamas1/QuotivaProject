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
<<<<<<<< HEAD:backend/database/migrations/2025_11_10_122941_create_prod_datas_table.php
        Schema::create('prod_datas', function (Blueprint $table) {
========
        Schema::create('dev_datas', function (Blueprint $table) {
>>>>>>>> dev:backend/database/migrations/2025_11_10_122941_create_dev_datas_table.php
            $table->id();
            $table->string("name");
            $table->integer("price");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
<<<<<<<< HEAD:backend/database/migrations/2025_11_10_122941_create_prod_datas_table.php
        Schema::dropIfExists('prod_datas');
========
        Schema::dropIfExists('dev_datas');
>>>>>>>> dev:backend/database/migrations/2025_11_10_122941_create_dev_datas_table.php
    }
};
