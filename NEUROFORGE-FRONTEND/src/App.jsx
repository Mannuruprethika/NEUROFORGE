import { useEffect, useState } from "react";
import "./App.css";

// ======================================================
// ROLE BASED ACCESS CONTROL
// ======================================================

const ROLE_PERMISSIONS = {
  ADMIN: {
    pages: [
      "dashboard",
      "projects",
      "requirements",
      "stories",
      "tests",
      "bugs",
      "tasks",
      "sprints",
      "pipelines",
      "builds",
      "deployments",
      "repositories",
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },

  PROJECT_MANAGER: {
    pages: [
      "dashboard",
      "projects",
      "requirements",
      "stories",
      "sprints",
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },

  DEVELOPER: {
    pages: [
      "dashboard",
      "requirements",
      "stories",
      "tasks",
      "repositories",
    ],
    canCreate: true,
    canEdit: true,
    canDelete: false,
  },

  TESTER: {
    pages: [
      "dashboard",
      "requirements",
      "stories",
      "tests",
      "bugs",
    ],
    canCreate: true,
    canEdit: true,
    canDelete: false,
  },

  DEVOPS: {
    pages: [
      "dashboard",
      "pipelines",
      "builds",
      "deployments",
      "repositories",
    ],
    canCreate: true,
    canEdit: true,
    canDelete: false,
  },

  VIEWER: {
    pages: [
      "dashboard",
      "projects",
      "requirements",
      "stories",
      "tests",
      "bugs",
      "tasks",
      "sprints",
      "pipelines",
      "builds",
      "deployments",
      "repositories",
    ],
    canCreate: false,
    canEdit: false,
    canDelete: false,
  },
};

import {
  loginUser,
  logoutUser,

  getProjects,
  createProject,
  deleteProject,

  getRequirements,
  createRequirement,
  deleteRequirement,

  getUserStories,
  createUserStory,
  updateUserStory,
  deleteUserStory,

  getTestcases,
  createTestcase,
  updateTestcase,
  deleteTestcase,

  getBugs,
  createBug,
  updateBug,
  deleteBug,

  getTasks,
  createTask,
  updateTask,
  deleteTask,

  getSprints,
  createSprint,
  updateSprint,
  deleteSprint,

  getPipelines,
  createPipeline,
  updatePipeline,
  deletePipeline,

  getBuilds,
  createBuild,
  updateBuild,
  deleteBuild,

  getDeployments,
  createDeployment,
  updateDeployment,
  deleteDeployment,

  getRepositories,
  createRepository,
  updateRepository,
  deleteRepository,
  getUsers,
} from "./services/api";


// ======================================================
// APP
// ======================================================

function App() {

  // ======================================================
  // LOGIN STATE
  // ======================================================

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [page, setPage] = useState("dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


  // ======================================================
  // PROJECTS
  // ======================================================

  const [projects, setProjects] = useState([]);

  const [showProjectForm, setShowProjectForm] =
    useState(false);

  const [projectForm, setProjectForm] = useState({
    name: "",
    status: "ACTIVE",
    startDate: "",
    endDate: "",
  });


  // ======================================================
  // REQUIREMENTS
  // ======================================================

  const [requirements, setRequirements] = useState([]);

  const [showRequirementForm, setShowRequirementForm] =
    useState(false);

  const [requirementForm, setRequirementForm] =
    useState({
      projectId: "",
      description: "",
      priority: "MEDIUM",
      status: "TODO",
    });


  // ======================================================
  // LOGIN
  // ======================================================

  const login = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const data = await loginUser(
        email,
        password
      );

      setUser(data);
      setLoggedIn(true);

      localStorage.setItem(
        "neuroforgeUser",
        JSON.stringify(data)
      );

      await loadProjects();
      await loadRequirements();

    } catch (err) {

      setError(
        err.message || "Failed to login"
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================================
  // LOGOUT
  // ======================================================

  const logout = async () => {

    try {

      await logoutUser();

    } catch (err) {

      console.error(
        "Logout error:",
        err
      );

    }

    localStorage.removeItem(
      "neuroforgeUser"
    );

    setUser(null);
    setLoggedIn(false);
    setPage("dashboard");

    setProjects([]);
    setRequirements([]);
  };


  // ======================================================
  // LOAD PROJECTS
  // ======================================================

  const loadProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(
        "Projects error:",
        err
      );

    }
  };


  // ======================================================
  // LOAD REQUIREMENTS
  // ======================================================

  const loadRequirements = async () => {

    try {

      const data =
        await getRequirements();

      setRequirements(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(
        "Requirements error:",
        err
      );

    }
  };


  // ======================================================
  // CHECK LOGIN
  // ======================================================




  // ======================================================
  // CREATE PROJECT
  // ======================================================

  const handleCreateProject = async (e) => {

    e.preventDefault();

    try {

      await createProject(
        projectForm
      );

      setProjectForm({
        name: "",
        status: "ACTIVE",
        startDate: "",
        endDate: "",
      });

      setShowProjectForm(false);

      await loadProjects();

    } catch (err) {

      alert(err.message);

    }
  };


  // ======================================================
  // DELETE PROJECT
  // ======================================================

  const handleDeleteProject = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this project?"
      )
    ) {
      return;
    }

    try {

      await deleteProject(id);

      await loadProjects();
      await loadRequirements();

    } catch (err) {

      alert(err.message);

    }
  };


  // ======================================================
  // CREATE REQUIREMENT
  // ======================================================

  const handleCreateRequirement =
    async (e) => {

      e.preventDefault();

      try {

        await createRequirement(
          requirementForm
        );

        setRequirementForm({
          projectId: "",
          description: "",
          priority: "MEDIUM",
          status: "TODO",
        });

        setShowRequirementForm(
          false
        );

        await loadRequirements();

      } catch (err) {

        alert(err.message);

      }
    };


  // ======================================================
  // DELETE REQUIREMENT
  // ======================================================

  const handleDeleteRequirement =
    async (id) => {

      if (
        !window.confirm(
          "Delete this requirement?"
        )
      ) {
        return;
      }

      try {

        await deleteRequirement(id);

        await loadRequirements();

      } catch (err) {

        alert(err.message);

      }
    };


  // ======================================================
  // LOGIN SCREEN
  // ======================================================

  if (!loggedIn) {

    return (

      <div className="login-page">

        <div className="login-background">

          <div className="glow glow-one"></div>

          <div className="glow glow-two"></div>

        </div>


        <div className="login-card">

          <div className="brand-logo">
            N
          </div>

          <h1>
            NeuroForge
          </h1>

          <p className="login-subtitle">
            Software Development Management Platform
          </p>


          <form onSubmit={login}>

            <label>
              Email address
            </label>

            <div className="input-box">

              <span>✉</span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            <label>
              Password
            </label>

            <div className="input-box">

              <span>●</span>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            {error && (

              <div className="error-box">
                {error}
              </div>

            )}


            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign in →"}
            </button>

          </form>


          <p className="login-footer">
            Manage projects. Track requirements.
            Build better software.
          </p>

        </div>

      </div>

    );
  }


  // ======================================================
  // DASHBOARD COUNTS
  // ======================================================

  const totalProjects =
    projects.length;

  const totalRequirements =
    requirements.length;

  const completedRequirements =
    requirements.filter(
      (r) =>
        r.status === "COMPLETED"
    ).length;

  const pendingRequirements =
    requirements.filter(
      (r) =>
        r.status !== "COMPLETED"
    ).length;


  // ======================================================
  // NAVIGATION
  // ======================================================

  const navigation = [

    {
      id: "dashboard",
      icon: "⌂",
      name: "Dashboard",
    },

    {
      id: "projects",
      icon: "▦",
      name: "Projects",
    },

    {
      id: "requirements",
      icon: "☷",
      name: "Requirements",
    },

    {
      id: "stories",
      icon: "◇",
      name: "User Stories",
    },

    {
      id: "tests",
      icon: "✓",
      name: "Test Cases",
    },

    {
      id: "bugs",
      icon: "△",
      name: "Bugs",
    },

    {
      id: "tasks",
      icon: "□",
      name: "Tasks",
    },

    {
      id: "sprints",
      icon: "◷",
      name: "Sprints",
    },

    {
      id: "pipelines",
      icon: "⌁",
      name: "Pipelines",
    },

    {
      id: "builds",
      icon: "▤",
      name: "Builds",
    },

    {
      id: "deployments",
      icon: "↗",
      name: "Deployments",
    },

    {
      id: "repositories",
      icon: "⌘",
      name: "Repositories",
    },

  ];

  const userRole = String(
    user?.role || user?.roleName || "VIEWER"
  )
    .replace(/^ROLE_/, "")
    .toUpperCase();

  const permissions =
    ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.VIEWER;

  const visibleNavigation = navigation.filter((item) =>
    permissions.pages.includes(item.id)
  );


  // ======================================================
  // DASHBOARD
  // ======================================================

  const Dashboard = () => (

    <>

      <div className="welcome-section">

        <div>

          <span className="eyebrow">
            WORKSPACE OVERVIEW
          </span>

          <h1>
            Good evening,{" "}
            {user?.name || "Developer"}{" "}
            <span>👋</span>
          </h1>

          <p>
            Here's what's happening across
            your software projects today.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setShowProjectForm(true)
          }
        >
          + New Project
        </button>

      </div>


      <div className="stats-grid">

        <StatCard
          icon="▦"
          title="Total Projects"
          value={totalProjects}
          text="Active projects"
        />

        <StatCard
          icon="□"
          title="Requirements"
          value={totalRequirements}
          text="Across all projects"
        />

        <StatCard
          icon="✓"
          title="Completed"
          value={completedRequirements}
          text="Successfully completed"
        />

        <StatCard
          icon="△"
          title="Pending"
          value={pendingRequirements}
          text="Need attention"
        />

      </div>


      <div className="dashboard-grid">

        <section className="panel">

          <PanelHeader
            title="Recent Projects"
            subtitle="Your latest project activity"
            action="View all →"
            onClick={() =>
              setPage("projects")
            }
          />

          <div className="panel-content">

            {projects.length === 0 ? (

              <EmptyState
                text="No projects created yet."
              />

            ) : (

              projects
                .slice(0, 4)
                .map((project) => (

                  <div
                    className="list-row"
                    key={project.id}
                  >

                    <div className="list-icon">
                      N
                    </div>

                    <div className="list-info">

                      <strong>
                        {project.name}
                      </strong>

                      <span>
                        {project.status ||
                          "ACTIVE"}{" "}
                        · Project
                      </span>

                    </div>

                    <span className="status active">
                      {project.status ||
                        "ACTIVE"}
                    </span>

                  </div>

                ))

            )}

          </div>

        </section>


        <section className="panel">

          <PanelHeader
            title="Requirements"
            subtitle="Latest requirements"
            action="View all →"
            onClick={() =>
              setPage("requirements")
            }
          />

          <div className="panel-content">

            {requirements.length === 0 ? (

              <EmptyState
                text="No requirements created yet."
              />

            ) : (

              requirements
                .slice(0, 4)
                .map((requirement) => (

                  <div
                    className="list-row"
                    key={requirement.id}
                  >

                    <div className="list-icon purple">
                      R
                    </div>

                    <div className="list-info">

                      <strong>
                        {requirement.description ||
                          "Requirement"}
                      </strong>

                      <span>
                        Priority:{" "}
                        {requirement.priority ||
                          "MEDIUM"}
                      </span>

                    </div>

                    <span className="status todo">
                      {requirement.status ||
                        "TODO"}
                    </span>

                  </div>

                ))

            )}

          </div>

        </section>

      </div>


      <div className="dashboard-grid">

        <section className="panel progress-panel">

          <PanelHeader
            title="Project Progress"
            subtitle="Overall workspace progress"
          />

          <div className="progress-content">

            <div className="progress-label">

              <span>
                Requirements completed
              </span>

              <strong>

                {totalRequirements
                  ? Math.round(
                      (completedRequirements /
                        totalRequirements) *
                        100
                    )
                  : 0}
                %

              </strong>

            </div>


            <div className="progress-bar">

              <div
                style={{
                  width:
                    (totalRequirements
                      ? (completedRequirements / totalRequirements) * 100
                      : 0) + "%",
                }}
              ></div>

            </div>


            <p>
              Keep your requirements updated
              to maintain project visibility.
            </p>

          </div>

        </section>


        <section className="panel">

          <PanelHeader
            title="Quick Actions"
            subtitle="Common workspace actions"
          />

          <div className="quick-actions">

            <button
              onClick={() =>
                setShowProjectForm(true)
              }
            >
              + Create project
            </button>

            <button
              onClick={() =>
                setShowRequirementForm(true)
              }
            >
              + New requirement
            </button>

            <button
              onClick={() =>
                setPage("projects")
              }
            >
              ▦ View projects
            </button>

            <button
              onClick={() =>
                setPage("requirements")
              }
            >
              ✓ View requirements
            </button>

          </div>

        </section>

      </div>

    </>

  );


  // ======================================================
  // PROJECTS PAGE
  // ======================================================

  const ProjectsPage = () => (

    <>

      <PageHeader
        title="Projects"
        subtitle="Manage and track your software projects."
        button="+ New Project"
        onClick={() =>
          setShowProjectForm(true)
        }
      />


      <section className="table-panel">

        <div className="table-top">

          <div>

            <h2>
              All Projects
            </h2>

            <p>
              {projects.length} project(s)
            </p>

          </div>


          <button
            className="refresh-button"
            onClick={loadProjects}
          >
            ↻ Refresh
          </button>

        </div>


        {projects.length === 0 ? (

          <EmptyState
            text="No projects found."
          />

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>PROJECT</th>
                  <th>STATUS</th>
                  <th>START DATE</th>
                  <th>END DATE</th>
                  <th>ACTIONS</th>

                </tr>

              </thead>


              <tbody>

                {projects.map(
                  (project) => (

                    <tr
                      key={project.id}
                    >

                      <td>
                        <strong>
                          {project.name}
                        </strong>
                      </td>

                      <td>
                        <span className="status active">
                          {project.status ||
                            "ACTIVE"}
                        </span>
                      </td>

                      <td>
                        {project.startDate ||
                          "—"}
                      </td>

                      <td>
                        {project.endDate ||
                          "—"}
                      </td>

                      <td>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteProject(
                              project.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </>

  );


  // ======================================================
  // REQUIREMENTS PAGE
  // ======================================================

  const RequirementsPage = () => (

    <>

      <PageHeader
        title="Requirements"
        subtitle="Define and manage project requirements."
        button="+ New Requirement"
        onClick={() =>
          setShowRequirementForm(
            true
          )
        }
      />


      <section className="table-panel">

        <div className="table-top">

          <div>

            <h2>
              All Requirements
            </h2>

            <p>
              {requirements.length}
              {" "}requirement(s)
            </p>

          </div>


          <button
            className="refresh-button"
            onClick={
              loadRequirements
            }
          >
            ↻ Refresh
          </button>

        </div>


        {requirements.length === 0 ? (

          <EmptyState
            text="No requirements found."
          />

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    DESCRIPTION
                  </th>

                  <th>
                    PRIORITY
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    PROJECT
                  </th>

                  <th>
                    ACTIONS
                  </th>

                </tr>

              </thead>


              <tbody>

                {requirements.map(
                  (requirement) => (

                    <tr
                      key={requirement.id}
                    >

                      <td>
                        <strong>
                          {requirement.description ||
                            "Requirement"}
                        </strong>
                      </td>

                      <td>

                        <span className="priority">
                          {requirement.priority ||
                            "MEDIUM"}
                        </span>

                      </td>

                      <td>

                        <span className="status todo">
                          {requirement.status ||
                            "TODO"}
                        </span>

                      </td>

                      <td>
                        {requirement.projectId ||
                          "—"}
                      </td>

                      <td>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteRequirement(
                              requirement.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </>

  );


  // ======================================================
  // OTHER MODULE CONFIGURATION
  // ======================================================

  const moduleConfigs = {

    stories: {

      title: "User Stories",

      subtitle:
        "Create and manage user stories.",

      singular:
        "User Story",

      get: getUserStories,

      create: createUserStory,

      update: updateUserStory,

      delete: deleteUserStory,

      columns: [
        ["title", "TITLE"],
        ["requirementId", "REQUIREMENT"],
        ["storyPoints", "STORY POINTS"],
      ],

      fields: [
        {
          name: "requirementId",
          label: "Requirement",
          type: "text",
          required: true,
          relation: "requirementId",
        },

        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },

        {
          name: "storyPoints",
          label: "Story Points",
          type: "number",
          required: true,
        },
      ],

      relations: {
        requirementId: {
          get: getRequirements,
          label: (item) => item.description || "Requirement",
        },
      },

      initial: {
        requirementId: "",
        title: "",
        storyPoints: 0,
      },

    },


    tests: {

      title: "Test Cases",

      subtitle:
        "Create and manage software test cases.",

      singular:
        "Test Case",

      get: getTestcases,

      create: createTestcase,

      update: updateTestcase,

      delete: deleteTestcase,

      columns: [
        ["title", "TITLE"],
        ["type", "TYPE"],
        ["expectedResult", "EXPECTED RESULT"],
      ],

      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },

        {
          name: "type",
          label: "Type",
          type: "text",
          required: true,
        },

        {
          name: "expectedResult",
          label: "Expected Result",
          type: "text",
          required: true,
        },
      ],

      initial: {
        title: "",
        type: "",
        expectedResult: "",
      },

    },


    bugs: {

      title: "Bugs",

      subtitle:
        "Track and manage software bugs.",

      singular:
        "Bug",

      get: getBugs,

      create: createBug,

      update: updateBug,

      delete: deleteBug,

      columns: [
        ["testcaseId", "TEST CASE"],
        ["assigneeId", "ASSIGNEE"],
        ["severity", "SEVERITY"],
        ["status", "STATUS"],
      ],

      fields: [
        {
          name: "testcaseId",
          label: "Test Case",
          type: "text",
          required: true,
          relation: "testcaseId",
        },

        {
          name: "assigneeId",
          label: "Assignee",
          type: "text",
          required: false,
          relation: "assigneeId",
        },

        {
          name: "severity",
          label: "Severity",
          type: "text",
          required: true,
        },

        {
          name: "status",
          label: "Status",
          type: "text",
          required: true,
        },
      ],

      relations: {
        testcaseId: {
          get: getTestcases,
          label: (item) => item.title || "Test Case",
        },
        assigneeId: {
          get: getUsers,
          label: (item) => item.name || item.email || "User",
        },
      },

      initial: {
        testcaseId: "",
        assigneeId: "",
        severity: "",
        status: "",
      },

    },


    tasks: {

      title: "Tasks",

      subtitle:
        "Manage development tasks.",

      singular:
        "Task",

      get: getTasks,

      create: createTask,

      update: updateTask,

      delete: deleteTask,

      columns: [
        ["sprintId", "SPRINT"],
        ["userStoryId", "USER STORY"],
        ["assigneeId", "ASSIGNEE"],
        ["status", "STATUS"],
      ],

      fields: [
        {
          name: "sprintId",
          label: "Sprint",
          type: "text",
          required: true,
          relation: "sprintId",
        },

        {
          name: "userStoryId",
          label: "User Story",
          type: "text",
          required: false,
          relation: "userStoryId",
        },

        {
          name: "assigneeId",
          label: "Assignee",
          type: "text",
          required: false,
          relation: "assigneeId",
        },

        {
          name: "status",
          label: "Status",
          type: "text",
          required: true,
        },
      ],

      relations: {
        sprintId: {
          get: getSprints,
          label: (item) => item.name || "Sprint",
        },
        userStoryId: {
          get: getUserStories,
          label: (item) => item.title || "User Story",
        },
        assigneeId: {
          get: getUsers,
          label: (item) => item.name || item.email || "User",
        },
      },

      initial: {
        sprintId: "",
        userStoryId: "",
        assigneeId: "",
        status: "",
      },

    },


    sprints: {

      title: "Sprints",

      subtitle:
        "Plan and manage development sprints.",

      singular:
        "Sprint",

      get: getSprints,

      create: createSprint,

      update: updateSprint,

      delete: deleteSprint,

      columns: [
        ["projectId", "PROJECT"],
        ["name", "NAME"],
        ["startDate", "START DATE"],
        ["endDate", "END DATE"],
      ],

      fields: [
        {
          name: "projectId",
          label: "Project ID",
          type: "text",
          required: false,
          relation: "projectId",
        },

        {
          name: "name",
          label: "Sprint Name",
          type: "text",
          required: true,
        },

        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: false,
        },

        {
          name: "endDate",
          label: "End Date",
          type: "date",
          required: false,
        },
      ],

      relations: {
        projectId: {
          get: getProjects,
          label: (item) => item.name || "Project",
        },
      },

      initial: {
        projectId: "",
        name: "",
        startDate: "",
        endDate: "",
      },

    },


    pipelines: {

      title: "Pipelines",

      subtitle:
        "Manage CI/CD pipelines.",

      singular:
        "Pipeline",

      get: getPipelines,

      create: createPipeline,

      update: updatePipeline,

      delete: deletePipeline,

      columns: [
        ["name", "NAME"],
        ["triggerType", "TRIGGER TYPE"],
      ],

      fields: [
        {
          name: "name",
          label: "Pipeline Name",
          type: "text",
          required: true,
        },

        {
          name: "triggerType",
          label: "Trigger Type",
          type: "text",
          required: true,
        },
      ],

      initial: {
        name: "",
        triggerType: "",
      },

    },


    builds: {

      title: "Builds",

      subtitle:
        "Track software builds.",

      singular:
        "Build",

      get: getBuilds,

      create: createBuild,

      update: updateBuild,

      delete: deleteBuild,

      columns: [
        ["pipelineId", "PIPELINE"],
        ["status", "STATUS"],
        ["startTime", "START TIME"],
      ],

      fields: [
        {
          name: "pipelineId",
          label: "Pipeline",
          type: "text",
          required: true,
          relation: "pipelineId",
        },

        {
          name: "status",
          label: "Status",
          type: "text",
          required: true,
        },

        {
          name: "startTime",
          label: "Start Time",
          type: "datetime-local",
          required: false,
        },
      ],

      relations: {
        pipelineId: {
          get: getPipelines,
          label: (item) => item.name || "Pipeline",
        },
      },

      initial: {
        pipelineId: "",
        status: "",
        startTime: "",
      },

    },


    deployments: {

      title: "Deployments",

      subtitle:
        "Manage application deployments.",

      singular:
        "Deployment",

      get: getDeployments,

      create: createDeployment,

      update: updateDeployment,

      delete: deleteDeployment,

      columns: [
        ["buildId", "BUILD"],
        ["environment", "ENVIRONMENT"],
        ["version", "VERSION"],
      ],

      fields: [
        {
          name: "buildId",
          label: "Build",
          type: "text",
          required: true,
          relation: "buildId",
        },

        {
          name: "environment",
          label: "Environment",
          type: "text",
          required: true,
        },

        {
          name: "version",
          label: "Version",
          type: "text",
          required: true,
        },
      ],

      relations: {
        buildId: {
          get: getBuilds,
          label: (item) => `Build #${String(item.id || "").slice(0, 8)}`,
        },
      },

      initial: {
        buildId: "",
        environment: "",
        version: "",
      },

    },


    repositories: {

      title: "Repositories",

      subtitle:
        "Manage project repositories.",

      singular:
        "Repository",

      get: getRepositories,

      create: createRepository,

      update: updateRepository,

      delete: deleteRepository,

      columns: [
        ["projectId", "PROJECT"],
        ["name", "NAME"],
        ["url", "URL"],
      ],

      fields: [
        {
          name: "projectId",
          label: "Project ID",
          type: "text",
          required: true,
          relation: "projectId",
        },

        {
          name: "name",
          label: "Repository Name",
          type: "text",
          required: true,
        },

        {
          name: "url",
          label: "Repository URL",
          type: "text",
          required: true,
        },
      ],

      relations: {
        projectId: {
          get: getProjects,
          label: (item) => item.name || "Project",
        },
      },

      initial: {
        projectId: "",
        name: "",
        url: "",
      },

    },

  };


  // ======================================================
  // PAGE CONTENT
  // ======================================================

  let content;


  if (page === "dashboard") {

    content = <Dashboard />;

  }

  else if (page === "projects") {

    content = <ProjectsPage />;

  }

  else if (page === "requirements") {

    content = <RequirementsPage />;

  }

  else if (moduleConfigs[page]) {

    content = (
      <CrudPage
        config={moduleConfigs[page]}
      />
    );

  }

  else {

    content = (
      <EmptyState
        text="Page not found."
      />
    );

  }


  // ======================================================
  // MAIN APP
  // ======================================================

  return (

    <div className="app-shell">


      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-small">
            N
          </div>

          <div>

            <h2>
              NeuroForge
            </h2>

            <span>
              DEV PLATFORM
            </span>

          </div>

        </div>


        <div className="nav-title">
          WORKSPACE
        </div>


        <nav>

          {visibleNavigation.map(
            (item) => (

              <button
                key={item.id}
                className={`nav-item ${
                  page === item.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPage(item.id)
                }
              >

                <span className="nav-icon">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>

              </button>

            )
          )}

        </nav>


        <div className="sidebar-bottom">

          <button
            className="logout-button"
            onClick={logout}
          >
            ⇥ Sign out
          </button>

        </div>

      </aside>


      {/* MAIN AREA */}

      <main className="main-area">

        <header className="topbar">

          <div className="search-box">

            <span>⌕</span>

            <input
              placeholder="Search anything..."
            />

          </div>


          <div className="profile-wrapper">

  <button
    className="profile"
    onClick={() => setProfileOpen((prev) => !prev)}
    type="button"
  >
    <div className="profile-avatar">
      {user?.name
        ?.charAt(0)
        ?.toUpperCase() || "N"}
    </div>

    <div className="profile-info">
      <strong>
        {user?.name || "User"}
      </strong>

      <span>
        {user?.role || "USER"}
      </span>
    </div>

    <span className={`profile-arrow ${profileOpen ? "open" : ""}`}>
      ▾
    </span>
  </button>

 {profileOpen && (
  <div className="profile-dropdown">
    <div className="profile-dropdown-header">
      <strong>{user?.name || "User"}</strong>
    </div>

    <div className="profile-email">
      <span>Email :</span> {user?.email || "No email"}
    </div>

    <div className="profile-divider"></div>

    <button
      className="profile-logout"
      type="button"
      onClick={() => {
        setProfileOpen(false);
        logout();
      }}
    >
      <span>Logout</span>
      <span className="logout-arrow">→</span>
    </button>
  </div>
)}

</div>

        </header>


        <div className="content">

          {content}

        </div>

      </main>


      {/* ==================================================
          PROJECT MODAL
      ================================================== */}

      {showProjectForm && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <span className="eyebrow">
                  PROJECT MANAGEMENT
                </span>

                <h2>
                  Create New Project
                </h2>

              </div>


              <button
                className="close-button"
                onClick={() =>
                  setShowProjectForm(
                    false
                  )
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                handleCreateProject
              }
            >

              <label>
                Project Name
              </label>

              <input
                value={
                  projectForm.name
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    name:
                      e.target.value,
                  })
                }
                placeholder="Enter project name"
                required
              />


              <label>
                Status
              </label>

              <select
                value={
                  projectForm.status
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    status:
                      e.target.value,
                  })
                }
              >

                <option value="ACTIVE">
                  ACTIVE
                </option>

                <option value="PLANNING">
                  PLANNING
                </option>

                <option value="COMPLETED">
                  COMPLETED
                </option>

              </select>


              <div className="form-row">

                <div>

                  <label>
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={
                      projectForm.startDate
                    }
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        startDate:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <div>

                  <label>
                    End Date
                  </label>

                  <input
                    type="date"
                    value={
                      projectForm.endDate
                    }
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        endDate:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowProjectForm(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Project
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ==================================================
          REQUIREMENT MODAL
      ================================================== */}

      {showRequirementForm && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <span className="eyebrow">
                  REQUIREMENT MANAGEMENT
                </span>

                <h2>
                  Create Requirement
                </h2>

              </div>


              <button
                className="close-button"
                onClick={() =>
                  setShowRequirementForm(
                    false
                  )
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                handleCreateRequirement
              }
            >

              <label>
                Project ID
              </label>

              <select
                value={
                  requirementForm.projectId
                }
                onChange={(e) =>
                  setRequirementForm({
                    ...requirementForm,
                    projectId:
                      e.target.value,
                  })
                }
                required
              >

                <option value="">
                  Select project
                </option>

                {projects.map(
                  (project) => (

                    <option
                      key={project.id}
                      value={project.id}
                    >
                      {project.name}
                    </option>

                  )
                )}

              </select>


              <label>
                Description
              </label>

              <textarea
                value={
                  requirementForm.description
                }
                onChange={(e) =>
                  setRequirementForm({
                    ...requirementForm,
                    description:
                      e.target.value,
                  })
                }
                placeholder="Describe the requirement..."
                rows="4"
                required
              />


              <div className="form-row">

                <div>

                  <label>
                    Priority
                  </label>

                  <select
                    value={
                      requirementForm.priority
                    }
                    onChange={(e) =>
                      setRequirementForm({
                        ...requirementForm,
                        priority:
                          e.target.value,
                      })
                    }
                  >

                    <option value="LOW">
                      LOW
                    </option>

                    <option value="MEDIUM">
                      MEDIUM
                    </option>

                    <option value="HIGH">
                      HIGH
                    </option>

                    <option value="CRITICAL">
                      CRITICAL
                    </option>

                  </select>

                </div>


                <div>

                  <label>
                    Status
                  </label>

                  <select
                    value={
                      requirementForm.status
                    }
                    onChange={(e) =>
                      setRequirementForm({
                        ...requirementForm,
                        status:
                          e.target.value,
                      })
                    }
                  >

                    <option value="TODO">
                      TODO
                    </option>

                    <option value="IN_PROGRESS">
                      IN PROGRESS
                    </option>

                    <option value="COMPLETED">
                      COMPLETED
                    </option>

                  </select>

                </div>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowRequirementForm(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Create Requirement
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
}


// ======================================================
// PROFESSIONAL CRUD PAGE
// ======================================================

function CrudPage({ config }) {
  const [items, setItems] = useState([]);
  const [lookups, setLookups] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...config.initial });

  const load = async () => {
    try {
      setLoading(true);
      const data = await config.get();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err.message || `Failed to load ${config.title}`);
    } finally {
      setLoading(false);
    }
  };

  const loadLookups = async () => {
    if (!config.relations) {
      setLookups({});
      return;
    }

    const entries = Object.entries(config.relations);
    const result = await Promise.all(
      entries.map(async ([key, relation]) => {
        try {
          const data = await relation.get();
          return [key, Array.isArray(data) ? data : []];
        } catch {
          return [key, []];
        }
      })
    );

    setLookups(Object.fromEntries(result));
  };

  useEffect(() => {
    load();
    loadLookups();
  }, [config.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...form };

      if (Object.prototype.hasOwnProperty.call(data, "storyPoints")) {
        data.storyPoints = Number(data.storyPoints);
      }

      if (editingId) {
        await config.update(editingId, data);
      } else {
        await config.create(data);
      }

      closeForm();
      await load();
    } catch (err) {
      alert(err.message || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    const newForm = {};

    config.fields.forEach((field) => {
      newForm[field.name] = item[field.name] ?? "";
    });

    setForm(newForm);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${config.singular.toLowerCase()}?`)) {
      return;
    }

    try {
      await config.delete(id);
      await load();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...config.initial });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...config.initial });
  };

  const title = config.title;
  const isTasks = title === "Tasks";
  const isStories = title === "User Stories";
  const isTests = title === "Test Cases";
  const isBugs = title === "Bugs";
  const isSprints = title === "Sprints";
  const isPipelines = title === "Pipelines";
  const isBuilds = title === "Builds";
  const isDeployments = title === "Deployments";
  const isRepositories = title === "Repositories";

  const shortId = (value) => {
    if (!value) return "—";
    const text = String(value);
    return text.length <= 14
      ? text
      : `${text.slice(0, 8)}…${text.slice(-4)}`;
  };

  const resolveRelation = (key, value) => {
    if (!value) return "—";

    const relation = config.relations?.[key];
    const records = lookups[key] || [];

    if (relation) {
      const found = records.find(
        (record) => String(record.id) === String(value)
      );

      if (found) {
        return relation.label(found);
      }
    }

    return shortId(value);
  };

  const displayValue = (item, key) => {
    if (config.relations?.[key]) {
      return resolveRelation(key, item[key]);
    }

    if (key === "status") {
      return String(item[key] || "TODO").replace(/_/g, " ");
    }

    return item[key] ?? "—";
  };

  const statusClass = (value = "") => {
    const v = String(value).toLowerCase().replace(/[_-]/g, " ");

    if (
      v.includes("complete") ||
      v.includes("pass") ||
      v.includes("success") ||
      v.includes("active") ||
      v.includes("closed") ||
      v.includes("done")
    ) return "nf-badge success";

    if (
      v.includes("progress") ||
      v.includes("running") ||
      v.includes("open") ||
      v.includes("pending") ||
      v.includes("todo")
    ) return "nf-badge warning";

    if (
      v.includes("fail") ||
      v.includes("critical") ||
      v.includes("high") ||
      v.includes("blocked")
    ) return "nf-badge danger";

    return "nf-badge neutral";
  };

  const priorityClass = (value = "") => {
    const v = String(value).toLowerCase();

    if (v.includes("high") || v.includes("critical")) {
      return "nf-badge danger";
    }

    if (v.includes("medium")) {
      return "nf-badge warning";
    }

    return "nf-badge neutral";
  };

  const CardActions = ({ item }) => (
    <div className="nf-card-actions">
      <button className="nf-edit" onClick={() => handleEdit(item)}>
        Edit
      </button>
      <button className="nf-delete" onClick={() => handleDelete(item.id)}>
        Delete
      </button>
    </div>
  );

  const renderCard = (item, index) => {
    if (isTasks) return null;

    if (isStories) return (
      <article className="nf-module-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon purple">US</div>
          <span className="nf-badge neutral">STORY</span>
        </div>
        <h3>{item.title || "Untitled User Story"}</h3>
        <p>Requirement</p>
        <strong className="nf-related-name">
          {resolveRelation("requirementId", item.requirementId)}
        </strong>
        <div className="nf-meta-row">
          <span>⭐ {item.storyPoints ?? 0} points</span>
          <span>#{String(item.id || "").slice(0, 8)}</span>
        </div>
        <CardActions item={item} />
      </article>
    );

    if (isTests) return (
      <article className="nf-module-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon blue">TC</div>
          <span className={statusClass(item.status)}>
            {item.status || "READY"}
          </span>
        </div>
        <h3>{item.title || "Untitled Test Case"}</h3>
        <div className="nf-detail">
          <span>Type</span><b>{item.type || "—"}</b>
        </div>
        <div className="nf-detail">
          <span>Expected Result</span><b>{item.expectedResult || "—"}</b>
        </div>
        <CardActions item={item} />
      </article>
    );

    if (isBugs) return (
      <article className="nf-module-card bug-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon red">!</div>
          <span className={priorityClass(item.severity)}>
            {item.severity || "UNKNOWN"}
          </span>
        </div>
        <h3>Bug #{String(item.id || "").slice(0, 8)}</h3>
        <div className="nf-detail">
          <span>Test Case</span>
          <b>{resolveRelation("testcaseId", item.testcaseId)}</b>
        </div>
        <div className="nf-detail">
          <span>Assignee</span>
          <b>{resolveRelation("assigneeId", item.assigneeId)}</b>
        </div>
        <div className="nf-detail">
          <span>Status</span>
          <b><span className={statusClass(item.status)}>
            {item.status || "OPEN"}
          </span></b>
        </div>
        <CardActions item={item} />
      </article>
    );

    if (isSprints) return (
      <article className="nf-module-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon green">SP</div>
          <span className="nf-badge success">SPRINT</span>
        </div>
        <h3>{item.name || "Unnamed Sprint"}</h3>
        <p>Project</p>
        <strong className="nf-related-name">
          {resolveRelation("projectId", item.projectId)}
        </strong>
        <div className="nf-dates">
          <span>START <b>{item.startDate || "—"}</b></span>
          <span>END <b>{item.endDate || "—"}</b></span>
        </div>
        <div className="nf-progress">
          <div className="nf-progress-head">
            <span>Planning progress</span><b>Ready</b>
          </div>
          <div className="nf-progress-track">
            <div className="nf-progress-fill" style={{ width: "20%" }} />
          </div>
        </div>
        <CardActions item={item} />
      </article>
    );

    if (isPipelines) return (
      <article className="nf-module-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon purple">CI</div>
          <span className="nf-badge success">PIPELINE</span>
        </div>
        <h3>{item.name || "Unnamed Pipeline"}</h3>
        <p>Continuous Integration / Delivery</p>
        <div className="nf-pipeline">
          <span>Code</span><i>→</i><span>Build</span><i>→</i><span>Deploy</span>
        </div>
        <div className="nf-detail">
          <span>Trigger</span><b>{item.triggerType || "Manual"}</b>
        </div>
        <CardActions item={item} />
      </article>
    );

    if (isBuilds) return (
      <article className="nf-module-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon blue">BL</div>
          <span className={statusClass(item.status)}>
            {item.status || "PENDING"}
          </span>
        </div>
        <h3>Build #{String(item.id || "").slice(0, 8)}</h3>
        <div className="nf-detail">
          <span>Pipeline</span>
          <b>{resolveRelation("pipelineId", item.pipelineId)}</b>
        </div>
        <div className="nf-build-stages">
          <span className="done">✓ Source</span>
          <span>○ Compile</span><span>○ Package</span><span>○ Deploy</span>
        </div>
        <p>Started: {item.startTime || "Not started"}</p>
        <CardActions item={item} />
      </article>
    );

    if (isDeployments) return (
      <article className="nf-module-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon green">DP</div>
          <span className={statusClass(item.environment)}>
            {item.environment || "ENV"}
          </span>
        </div>
        <h3>Version {item.version || "—"}</h3>
        <div className="nf-detail">
          <span>Build</span>
          <b>{resolveRelation("buildId", item.buildId)}</b>
        </div>
        <div className="nf-deploy-line">
          <span className="dot" /> Deployment ready
        </div>
        <CardActions item={item} />
      </article>
    );

    if (isRepositories) return (
      <article className="nf-module-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon dark">RE</div>
          <span className="nf-badge neutral">
            {item.provider || "REPO"}
          </span>
        </div>
        <h3>{item.name || "Unnamed Repository"}</h3>
        <p>{item.url || "No repository URL"}</p>
        <div className="nf-detail">
          <span>Project</span>
          <b>{resolveRelation("projectId", item.projectId)}</b>
        </div>
        <CardActions item={item} />
      </article>
    );

    return (
      <article className="nf-module-card" key={item.id || index}>
        <div className="nf-card-top">
          <div className="nf-icon purple">NF</div>
          <span className="nf-badge neutral">ITEM</span>
        </div>
        {config.columns.slice(0, 4).map(([key, label]) => (
          <div className="nf-detail" key={key}>
            <span>{label}</span>
            <b>{displayValue(item, key)}</b>
          </div>
        ))}
        <CardActions item={item} />
      </article>
    );
  };

  const taskColumns = [
    { name: "TODO", values: ["TODO", "To Do", "NEW"] },
    { name: "IN PROGRESS", values: ["IN_PROGRESS", "IN PROGRESS", "IN-PROGRESS", "PROGRESS"] },
    { name: "COMPLETED", values: ["COMPLETED", "COMPLETE", "DONE", "CLOSED"] },
  ];

  const taskColumnItems = (values) =>
    items.filter((item) => {
      const status = String(item.status || "TODO")
        .toUpperCase()
        .replace(/-/g, " ");
      return values.some((v) => status === v.replace(/-/g, " "));
    });

  return (
    <>
      <PageHeader
        title={title}
        subtitle={config.subtitle}
        button={`+ New ${config.singular}`}
        onClick={openCreate}
      />

      <div className="nf-section-toolbar">
        <div>
          <h2>{title} Overview</h2>
          <p>{items.length} {title.toLowerCase()} in your workspace</p>
        </div>
        <button className="refresh-button" onClick={() => { load(); loadLookups(); }}>
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <EmptyState text={`Loading ${title.toLowerCase()}...`} />
      ) : items.length === 0 ? (
        <EmptyState text={`No ${title.toLowerCase()} found. Create your first ${config.singular.toLowerCase()}.`} />
      ) : isTasks ? (
        <div className="kanban-board nf-kanban">
          {taskColumns.map((column) => {
            const columnItems = taskColumnItems(column.values);

            return (
              <section className="kanban-column" key={column.name}>
                <div className="kanban-title">
                  <h3>{column.name}</h3>
                  <span>{columnItems.length}</span>
                </div>

                {columnItems.map((item, index) => (
                  <article className="kanban-card" key={item.id || index}>
                    <div className="nf-kanban-top">
                      <span className="nf-badge neutral">TASK</span>
                      <span>#{String(item.id || "").slice(0, 6)}</span>
                    </div>
                    <h4>{item.title || item.name || `Task ${index + 1}`}</h4>
                    <p>Sprint: {resolveRelation("sprintId", item.sprintId)}</p>
                    <p>User Story: {resolveRelation("userStoryId", item.userStoryId)}</p>
                    <div className="nf-assignee">
                      👤 {resolveRelation("assigneeId", item.assigneeId)}
                    </div>
                    <CardActions item={item} />
                  </article>
                ))}

                {columnItems.length === 0 && (
                  <div className="nf-column-empty">No tasks</div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <div className="nf-module-grid">
          {items.map(renderCard)}
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal nf-modal">
            <div className="modal-header">
              <div>
                <span className="eyebrow">NEUROFORGE WORKSPACE</span>
                <h2>{editingId ? `Edit ${config.singular}` : `Create ${config.singular}`}</h2>
              </div>
              <button className="close-button" onClick={closeForm}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              {config.fields.map((field) => {
                const relation = field.relation
                  ? config.relations?.[field.relation]
                  : null;
                const records = relation
                  ? (lookups[field.relation] || [])
                  : [];
                const options = field.options || [];

                return (
                  <div className="nf-field" key={field.name}>
                    <label>{field.label}</label>

                    {relation ? (
                      <select
                        name={field.name}
                        value={form[field.name] ?? ""}
                        onChange={handleChange}
                        required={field.required}
                      >
                        <option value="">
                          Select {field.label.toLowerCase()}
                        </option>
                        {records.map((record) => (
                          <option key={record.id} value={record.id}>
                            {relation.label(record)}
                          </option>
                        ))}
                      </select>
                    ) : options.length > 0 ? (
                      <select
                        name={field.name}
                        value={form[field.name] ?? ""}
                        onChange={handleChange}
                        required={field.required}
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {String(option).replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={form[field.name] ?? ""}
                        onChange={handleChange}
                        required={field.required}
                        rows="4"
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={form[field.name] ?? ""}
                        onChange={handleChange}
                        required={field.required}
                      />
                    )}
                  </div>
                );
              })}

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  {editingId ? `Update ${config.singular}` : `Create ${config.singular}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


// ======================================================
// SMALL COMPONENTS
// ======================================================

function StatCard({
  icon,
  title,
  value,
  text,
}) {

  return (

    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span className="growth">
          LIVE
        </span>

      </div>


      <span className="stat-title">
        {title}
      </span>


      <strong className="stat-value">
        {value}
      </strong>


      <span className="stat-text">
        {text}
      </span>

    </div>

  );
}


function PanelHeader({
  title,
  subtitle,
  action,
  onClick,
}) {

  return (

    <div className="panel-header">

      <div>

        <h2>
          {title}
        </h2>

        <p>
          {subtitle}
        </p>

      </div>


      {action && (

        <button
          onClick={onClick}
          className="view-button"
        >
          {action}
        </button>

      )}

    </div>

  );

}


function PageHeader({
  title,
  subtitle,
  button,
  onClick,
}) {

  return (

    <div className="page-header">

      <div>

        <span className="eyebrow">
          NEUROFORGE WORKSPACE
        </span>

        <h1>
          {title}
        </h1>

        <p>
          {subtitle}
        </p>

      </div>


      {button && (

        <button
          className="primary-button"
          onClick={onClick}
        >
          {button}
        </button>

      )}

    </div>

  );

}


function EmptyState({
  text,
}) {

  return (

    <div className="empty-state">
      {text}
    </div>

  );

}


export default App;
