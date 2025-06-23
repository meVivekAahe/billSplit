import ApiService from './api';

export const groupService = {
  // Get all groups for user
  getUserGroups: () => ApiService.get('/groups'),

  // Create new group
  createGroup: (groupData) => ApiService.post('/groups', groupData),

  // Get group details
  getGroup: (id) => ApiService.get(`/groups/${id}`),

  // Update group
  updateGroup: (id, groupData) => ApiService.put(`/groups/${id}`, groupData),

  // Delete group
  deleteGroup: (id) => ApiService.delete(`/groups/${id}`),

  // Add member to group
  addMember: (groupId, userId) => ApiService.post(`/groups/${groupId}/members`, { userId }),

  // Remove member from group
  removeMember: (groupId, userId) => ApiService.delete(`/groups/${groupId}/members/${userId}`),
};