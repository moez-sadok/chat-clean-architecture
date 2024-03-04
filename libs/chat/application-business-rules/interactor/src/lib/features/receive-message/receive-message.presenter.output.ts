import {MessageOutputData } from "../../dtos/output.chat.data";

export interface IReceiveMessagePresenterOutput {
    receiveMessage(message: MessageOutputData): MessageOutputData;
}