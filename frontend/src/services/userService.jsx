import ApiService from './api';

export const userService = {
  // Get user's friends
  getFriends: () => ApiService.get('/users/friends'),

  // Send friend request
  sendFriendRequest: (email) => ApiService.post('/users/friends/request', { email }),

  // Accept friend request
  acceptFriendRequest: (requestId) => ApiService.post(`/users/friends/accept/${requestId}`),

  // Get user profile
  getProfile: () => ApiService.get('/users/profile'),

  // Update user profile
  updateProfile: (profileData) => ApiService.put('/users/profile', profileData),
};