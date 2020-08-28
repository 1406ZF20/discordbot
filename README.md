# 1406 Discord Bot
This is an intellij template project for a community discord bot, using discord4j-core, a java discord api wrapper.


### Things you may need to do to get this project working for you
 TODO, but mostly step 9-18. You'll want to create another run configuration, so that way git doesn't commit your discord bot token
### Template Creation
A template can be created by following these steps in intellij.
 1. File >> New >> Project
 2. Select Java on the right, and select Java 13 as the SDK
 3. Next
 4. Select Create project from template, and select Command Line App
 5. Name your project and select a location. The name is irrelevant
 6. Select Finish
 7. Go to File >> Project Structure >> Modules >> Dependencies
 8. Hit the Plus sign on the right, and select Library >> From Maven
 9. Paste `com.discord4j:discord4j-core:3.1.0` into the bar at the top, select JavaDocs and Transitive dependencies, and press OK
 10. Press ok on the following screen
 11. Press Apply and OK in the project structure tab, then reopen it at File >> Project Structure >> Modules >> Sources
 12. You should see a folder named named libraries, in the .idea folder. Click on it, and mark it as a source with the blue folder icon above. 
 13. Again, press Apply and OK.
 14. Find your discord bot token
 15. Open Run Configuration, under Run >> Edit Configurations.
 16. In the Enviromental variables input, paste `BOT_TOKEN=mytokenhere`. Note that spacing and capitalization are important.
 17. Press Apply and the OK
 18. You are now set up. Past the following in the Main Class main method as a hello world, and click the green play at the top right to tun, or use shift+f10. You will need to have your bot in a server, and send `!ping` to get a response

```java 
String token = System.getenv("BOT_TOKEN");
if (token == null){
    System.out.println("Please set the BOT_TOKEN env variable");
    System.exit(1);
}
final DiscordClient client = DiscordClient.create(token);
final GatewayDiscordClient gateway = client.login().block();
gateway.on(MessageCreateEvent.class).subscribe(event -> {
      final Message message = event.getMessage();
      if ("!ping".equals(message.getContent())) {
        final MessageChannel channel = message.getChannel().block();
        channel.createMessage("Pong!").block();
      }
});

gateway.onDisconnect().block();
```
.