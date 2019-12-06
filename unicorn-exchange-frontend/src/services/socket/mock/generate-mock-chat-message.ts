type IChatMessage = any;

export function generateMockChatMessage(msg: IChatMessage): IChatMessage {
  return {
    text: `Some text ${msg.text}`,
    fromUserId: "sad",
    receiverUserIds: [],
    // user: {
    //   name: "Kate Moss",
    //   avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    // },
  };
}
