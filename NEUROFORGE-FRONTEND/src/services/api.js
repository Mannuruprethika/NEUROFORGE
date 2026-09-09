const API =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

// ======================================================
// COMMON HELPERS
// ======================================================

const getErrorMessage = async (response, defaultMessage) => {
  try {
    const data = await response.json();
    return data.message || defaultMessage;
  } catch {
    return defaultMessage;
  }
};


// ======================================================
// AUTH
// ======================================================

export const loginUser = async (email, password) => {
  const response = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid email or password");
  }

  return data;
};


export const logoutUser = async () => {
  const response = await fetch(`${API}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return true;
};


// ======================================================
// PROJECTS
// ======================================================

export const getProjects = async () => {
  const response = await fetch(`${API}/api/projects`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load projects");
  }

  return await response.json();
};


export const getProjectById = async (id) => {
  const response = await fetch(`${API}/api/projects/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load project");
  }

  return await response.json();
};


export const createProject = async (project) => {
  const response = await fetch(`${API}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create project")
    );
  }

  return await response.json();
};


export const updateProject = async (id, project) => {
  const response = await fetch(`${API}/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update project")
    );
  }

  return await response.json();
};


export const deleteProject = async (id) => {
  const response = await fetch(`${API}/api/projects/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete project")
    );
  }

  return await response.text();
};


// ======================================================
// REQUIREMENTS
// ======================================================

export const getRequirements = async () => {
  const response = await fetch(`${API}/api/requirements`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load requirements");
  }

  return await response.json();
};


export const getRequirementById = async (id) => {
  const response = await fetch(`${API}/api/requirements/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load requirement");
  }

  return await response.json();
};


export const createRequirement = async (requirement) => {
  const response = await fetch(`${API}/api/requirements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(requirement),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create requirement")
    );
  }

  return await response.json();
};


export const updateRequirement = async (id, requirement) => {
  const response = await fetch(`${API}/api/requirements/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(requirement),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update requirement")
    );
  }

  return await response.json();
};


export const deleteRequirement = async (id) => {
  const response = await fetch(`${API}/api/requirements/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete requirement")
    );
  }

  return await response.text();
};


// ======================================================
// USER STORIES
// ======================================================

export const getUserStories = async () => {
  const response = await fetch(`${API}/api/userstories`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load user stories");
  }

  return await response.json();
};


export const getUserStoryById = async (id) => {
  const response = await fetch(`${API}/api/userstories/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load user story");
  }

  return await response.json();
};


export const createUserStory = async (userStory) => {
  const response = await fetch(`${API}/api/userstories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userStory),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create user story")
    );
  }

  return await response.json();
};


export const updateUserStory = async (id, userStory) => {
  const response = await fetch(`${API}/api/userstories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userStory),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update user story")
    );
  }

  return await response.json();
};


export const deleteUserStory = async (id) => {
  const response = await fetch(`${API}/api/userstories/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete user story")
    );
  }

  return await response.text();
};


// ======================================================
// TEST CASES
// ======================================================

export const getTestcases = async () => {
  const response = await fetch(`${API}/api/testcases`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load test cases");
  }

  return await response.json();
};


export const getTestcaseById = async (id) => {
  const response = await fetch(`${API}/api/testcases/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load test case");
  }

  return await response.json();
};


export const createTestcase = async (testcase) => {
  const response = await fetch(`${API}/api/testcases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(testcase),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create test case")
    );
  }

  return await response.json();
};


export const updateTestcase = async (id, testcase) => {
  const response = await fetch(`${API}/api/testcases/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(testcase),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update test case")
    );
  }

  return await response.json();
};


export const deleteTestcase = async (id) => {
  const response = await fetch(`${API}/api/testcases/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete test case")
    );
  }

  return true;
};


// ======================================================
// BUGS
// ======================================================

export const getBugs = async () => {
  const response = await fetch(`${API}/api/bugs`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load bugs");
  }

  return await response.json();
};


export const getBugById = async (id) => {
  const response = await fetch(`${API}/api/bugs/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load bug");
  }

  return await response.json();
};


export const createBug = async (bug) => {
  const response = await fetch(`${API}/api/bugs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bug),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create bug")
    );
  }

  return await response.json();
};


export const updateBug = async (id, bug) => {
  const response = await fetch(`${API}/api/bugs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bug),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update bug")
    );
  }

  return await response.json();
};


export const deleteBug = async (id) => {
  const response = await fetch(`${API}/api/bugs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete bug")
    );
  }

  return true;
};


// ======================================================
// TASKS
// ======================================================

export const getTasks = async () => {
  const response = await fetch(`${API}/api/tasks`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load tasks");
  }

  return await response.json();
};


export const getTaskById = async (id) => {
  const response = await fetch(`${API}/api/tasks/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load task");
  }

  return await response.json();
};


export const createTask = async (task) => {
  const response = await fetch(`${API}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create task")
    );
  }

  return await response.json();
};


export const updateTask = async (id, task) => {
  const response = await fetch(`${API}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update task")
    );
  }

  return await response.json();
};


export const deleteTask = async (id) => {
  const response = await fetch(`${API}/api/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete task")
    );
  }

  return true;
};


// ======================================================
// SPRINTS
// ======================================================

export const getSprints = async () => {
  const response = await fetch(`${API}/api/sprints`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load sprints");
  }

  return await response.json();
};


export const getSprintById = async (id) => {
  const response = await fetch(`${API}/api/sprints/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load sprint");
  }

  return await response.json();
};


export const createSprint = async (sprint) => {
  const response = await fetch(`${API}/api/sprints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(sprint),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create sprint")
    );
  }

  return await response.json();
};


export const updateSprint = async (id, sprint) => {
  const response = await fetch(`${API}/api/sprints/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(sprint),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update sprint")
    );
  }

  return await response.json();
};


export const deleteSprint = async (id) => {
  const response = await fetch(`${API}/api/sprints/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete sprint")
    );
  }

  return true;
};


// ======================================================
// PIPELINES
// ======================================================

export const getPipelines = async () => {
  const response = await fetch(`${API}/api/pipelines`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load pipelines");
  }

  return await response.json();
};


export const getPipelineById = async (id) => {
  const response = await fetch(`${API}/api/pipelines/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load pipeline");
  }

  return await response.json();
};


export const createPipeline = async (pipeline) => {
  const response = await fetch(`${API}/api/pipelines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(pipeline),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create pipeline")
    );
  }

  return await response.json();
};


export const updatePipeline = async (id, pipeline) => {
  const response = await fetch(`${API}/api/pipelines/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(pipeline),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update pipeline")
    );
  }

  return await response.json();
};


export const deletePipeline = async (id) => {
  const response = await fetch(`${API}/api/pipelines/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete pipeline")
    );
  }

  return true;
};


// ======================================================
// BUILDS
// ======================================================

export const getBuilds = async () => {
  const response = await fetch(`${API}/api/builds`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load builds");
  }

  return await response.json();
};


export const getBuildById = async (id) => {
  const response = await fetch(`${API}/api/builds/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load build");
  }

  return await response.json();
};


export const createBuild = async (build) => {
  const response = await fetch(`${API}/api/builds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(build),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create build")
    );
  }

  return await response.json();
};


export const updateBuild = async (id, build) => {
  const response = await fetch(`${API}/api/builds/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(build),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update build")
    );
  }

  return await response.json();
};


export const deleteBuild = async (id) => {
  const response = await fetch(`${API}/api/builds/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete build")
    );
  }

  return true;
};


// ======================================================
// DEPLOYMENTS
// ======================================================

export const getDeployments = async () => {
  const response = await fetch(`${API}/api/deployments`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load deployments");
  }

  return await response.json();
};


export const getDeploymentById = async (id) => {
  const response = await fetch(`${API}/api/deployments/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load deployment");
  }

  return await response.json();
};


export const createDeployment = async (deployment) => {
  const response = await fetch(`${API}/api/deployments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(deployment),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create deployment")
    );
  }

  return await response.json();
};


export const updateDeployment = async (id, deployment) => {
  const response = await fetch(`${API}/api/deployments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(deployment),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update deployment")
    );
  }

  return await response.json();
};


export const deleteDeployment = async (id) => {
  const response = await fetch(`${API}/api/deployments/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete deployment")
    );
  }

  return true;
};


// ======================================================
// REPOSITORIES
// ======================================================

export const getRepositories = async () => {
  const response = await fetch(`${API}/api/repositories`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load repositories");
  }

  return await response.json();
};


export const getRepositoryById = async (id) => {
  const response = await fetch(`${API}/api/repositories/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load repository");
  }

  return await response.json();
};


export const createRepository = async (repository) => {
  const response = await fetch(`${API}/api/repositories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(repository),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create repository")
    );
  }

  return await response.json();
};


export const updateRepository = async (id, repository) => {
  const response = await fetch(`${API}/api/repositories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(repository),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update repository")
    );
  }

  return await response.json();
};


export const deleteRepository = async (id) => {
  const response = await fetch(`${API}/api/repositories/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete repository")
    );
  }

  return await response.text();
};


// ======================================================
// USERS
// ======================================================

export const getUsers = async () => {
  const response = await fetch(`${API}/api/users`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load users");
  }

  return await response.json();
};


export const getUserById = async (id) => {
  const response = await fetch(`${API}/api/users/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load user");
  }

  return await response.json();
};


export const getUserByEmail = async (email) => {
  const response = await fetch(
    `${API}/api/users/email/${encodeURIComponent(email)}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load user");
  }

  return await response.json();
};


export const createUser = async (user) => {
  const response = await fetch(`${API}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create user")
    );
  }

  return await response.json();
};


export const updateUser = async (id, user) => {
  const response = await fetch(`${API}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update user")
    );
  }

  return await response.json();
};


export const deleteUser = async (id) => {
  const response = await fetch(`${API}/api/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete user")
    );
  }

  return await response.text();
};


// ======================================================
// ROLES
// ======================================================

export const getRoles = async () => {
  const response = await fetch(`${API}/api/roles`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load roles");
  }

  return await response.json();
};


export const getRoleById = async (id) => {
  const response = await fetch(`${API}/api/roles/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load role");
  }

  return await response.json();
};


export const createRole = async (role) => {
  const response = await fetch(`${API}/api/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(role),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to create role")
    );
  }

  return await response.json();
};


export const updateRole = async (id, role) => {
  const response = await fetch(`${API}/api/roles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(role),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to update role")
    );
  }

  return await response.json();
};


export const deleteRole = async (id) => {
  const response = await fetch(`${API}/api/roles/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Failed to delete role")
    );
  }

  return true;
};


// ======================================================
// DEFAULT EXPORT
// ======================================================

export default API;