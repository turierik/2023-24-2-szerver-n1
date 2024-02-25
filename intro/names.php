<?php
    require_once("vendor/autoload.php");
    $faker = Faker\Factory::create('hu_HU');
    
    for ($i = 0; $i < 10; $i++){
        echo $faker->name() . "\n";
    }
?>