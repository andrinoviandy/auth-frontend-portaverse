const notifUrlLookup = (data, id) => ({
  COMMUNITY_ADD_COREMEMBER: `/communities/${id}`,
  COMMUNITY_AGENDA_ADD_COMITEE: `/communities/${id}/${id}`,
  COMMUNITY_AGENDA_ADD_NOTETAKER: `/communities/${id}/${id}`,
  COMMUNITY_AGENDA_ADD_SPEAKER: `/communities/${id}/${id}`,
  COMMUNITY_REMINDER_AGENDA: `/communities/${id}/${id}`,
  KMAP_ADD_COLLABORATOR_KMAP: `/kmap`,
  KMAP_ADD_COLLABORATOR_KMAP_OBJECTIVE: `/kmap`,
  KMAP_ADD_SME_KMAP: `/kmap`,
  KMAP_COMMENT_KMAP: `/kmap`,
  KMAP_COMMENT_KMAP_OBJECTIVE: `/kmap`,
  REPOSITORY_ADD_COLLABORATOR: `/repository`,
  SOCIAL_COMMENT_POST: `/home?post=${data}`,
  SOCIAL_FOLLOW: `/home/detail/${id}`,
  SOCIAL_LIKE_POST: `/home?post=${data}`,
  SOCIAL_MENTION: `/home?post=${data}`,
});

export default notifUrlLookup;
