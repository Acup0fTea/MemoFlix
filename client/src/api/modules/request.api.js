import privateClient from "../client/private.client";

const requestEndpoints = {
  createMessage: "/request",
};

const requestApi = {
  createMessage: async (messageData) => {
    try {
      const response = await privateClient.post(requestEndpoints.createMessage, messageData);
      return response;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  },
};

export default requestApi;
