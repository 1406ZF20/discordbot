package com.fourteenosix.discordBot;

import discord4j.core.DiscordClient;
import discord4j.core.GatewayDiscordClient;
import discord4j.core.event.domain.message.MessageCreateEvent;
import discord4j.core.event.domain.message.MessageDeleteEvent;

public class DiscordBot {
    private DiscordClient discordClient;
    private GatewayDiscordClient gatewayDiscordClient;

    public DiscordBot(DiscordClient discordClient, GatewayDiscordClient gatewayDiscordClient) {
        this.discordClient = discordClient;
        this.gatewayDiscordClient = gatewayDiscordClient;

        this.gatewayDiscordClient.on(MessageCreateEvent.class).subscribe(e->this.onMessageCreate(e));
        this.gatewayDiscordClient.on(MessageDeleteEvent.class).subscribe(e->this.onMessageDelete(e));
    }
    private void onMessageCreate(MessageCreateEvent e){
        if (e.getMessage().getUserData().id().equals(this.gatewayDiscordClient.getSelf().block().getId().asString()))
            return;
        e.getMessage().getChannel().block().createMessage(
                e.getMessage().getAuthorAsMember().block().getAvatarUrl()
        ).block();
        System.out.println("Got Message: " +  e.getMessage().getContent());
        System.out.println("\tBy Author: " + e.getMessage().getAuthor().get().getUsername());
    }
    private void onMessageDelete(MessageDeleteEvent e){
        System.out.println("Deleted Message: " +  e.getMessage().get().getContent());
        System.out.println("\tBy Author: " + e.getMessage().get().getAuthor().get().getUsername());
    }
}
