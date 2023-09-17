const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api`;

export const fetchSkills = (authToken) => {
  return fetch(`${BASE_URL}/user/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  }).then(res => res.json());
};

export const addSkill = (authToken, newSkill, skillCategory) => {
  return fetch(`${BASE_URL}/skill/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ name: newSkill, category: skillCategory }),
  }).then(res => res.json());
};

export const updateSkills = (authToken, updatedSkills, type) => {
  return fetch(`${BASE_URL}/user/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ [type]: updatedSkills }),
  });
};

export const deleteSkill = (authToken, skillId) => {
  return fetch(`${BASE_URL}/skill/${skillId}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  });
};