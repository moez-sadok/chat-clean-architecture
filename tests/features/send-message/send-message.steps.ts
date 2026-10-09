// Steps for docs/features/send-message/send-message-bdd.feature
// Generated from cucumber-js --dry-run snippets.
import { Given, When, Then } from '@cucumber/cucumber';

Given('the chat room {string} with participants Alice, Bob and Carol', async function (string: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('Alice and Bob are connected', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('Alice sends {string} in {string}', async function (string: string, string2: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('{string} by Alice is saved in the history of {string}', async function (string: string, string2: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Alice gets the sent message back with her name, her id and the room id', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('Carol is connected', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Bob receives {string} from Alice in {string}', async function (string: string, string2: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Carol receives {string} from Alice in {string}', async function (string: string, string2: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Alice does not receive her own message as a new message', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('Carol is not connected', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Carol gets a push notification with {string}', async function (string: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('{string} is in the history of {string} when Carol comes back', async function (string: string, string2: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('Alice sends {string} in room {int}', async function (string: string, int: number) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('an error says the room {int} was not found', async function (int: number) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('no message is saved', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
