/*
* 1406 Template Project
* This may be eventually used to create a class discord bot,
* managed by @clarkbains.
* Javadocs for the discord library may be found at
* https://www.javadoc.io/doc/com.discord4j/discord4j-core/latest/index.html
* */
package com.fourteenosix.discordBot;
import discord4j.core.DiscordClient;
import discord4j.core.GatewayDiscordClient;

import java.time.Duration;

public class Main {

    public static void main(String[] args) {
        System.out.println("init");
        while (true){
            String token = System.getenv("BOT_TOKEN");
            if (token == null){
                System.out.println("Please set the BOT_TOKEN env variable");
                break;
            }
            DiscordClient dc;
            GatewayDiscordClient gdc;
            try {
                 dc = DiscordClient.create(token);
               gdc = dc.login().block();
                System.out.println("Logged in as: " + gdc.getSelf().block().getAvatarUrl());
                DiscordBot bot = new DiscordBot(dc, gdc);
                gdc.onDisconnect().block();
            } catch (Exception e ){
                System.out.println("Check your token is valid");
                System.exit(1);
            }


        }


    }
}
