<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class SetupProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:setup-project {--wData : Generáljon demó ajánlatokat és profilokat} {--woData : Csak a demó felhasználót hozza létre}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call("migrate:fresh");
        User::create([
            "name" => "Tóth János",
            "password" => "tothjanos123",
            "email" => "tothjanos123@gmail.com"
        ]);

        $this->info("Demó felhasználó létrehozva.");
        if($this->option("wData")) {
            $this->info("Demó ajánlatok és profilok generálása...");

            $this->call("db:seed", ["--class" => "UserProfileSeeder"]);
            $this->call("db:seed", ["--class" => "OfferSeeder"]);

            $this->info("Demó ajánlatok és profilok sikeresen létrehozva.");
        };

        if($this->option("woData")){
            $this->info("Üres környezet beállítva.");
        };
    }
}
