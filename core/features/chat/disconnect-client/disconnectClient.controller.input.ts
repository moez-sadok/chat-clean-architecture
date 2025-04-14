
export interface IDisconnectClientInput {
  disconnectClient(userId: number): Promise<boolean> 
}
