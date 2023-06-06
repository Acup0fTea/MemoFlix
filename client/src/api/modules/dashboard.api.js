import privateClient from "../client/private.client";

const dashboardAPI = {
  getDashboard: () => {
    return privateClient.get("/dashboard");
  },

  searchReviewsAndUsers: (searchTerm) => {
    return privateClient.get(`/dashboard?search=${searchTerm}`);
  },

  deleteReview: (reviewId) => {
    return privateClient.delete(`/dashboard?id=${reviewId}&collection=reviews`);
  },

  deleteUser: (userId) => {
    return privateClient.delete(`/dashboard?id=${userId}&collection=users`);
  },
};

export default dashboardAPI;
