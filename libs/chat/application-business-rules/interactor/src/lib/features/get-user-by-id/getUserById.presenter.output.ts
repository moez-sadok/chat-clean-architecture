import {UserOutputData } from "../../dtos/output.chat.data";

export interface IGetUserByIdPresenterOutput {
    selectedUser(user: UserOutputData): UserOutputData;
}