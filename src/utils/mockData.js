export const mockData = [
  {
    id: "list-1",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Fix login bug",
        description:
          "Investigate and fix the issue preventing users from logging in.",
        dueDate: "2025-03-07",
        labels: ["Bug", "Urgent"],
      },
      {
        id: "card-2",
        title: "Write unit tests",
        description: "Ensure all new features have at least 80% test coverage.",
        dueDate: "2025-03-10",
        labels: ["Testing"],
      },
      {
        id: "card-3",
        title: "Design landing page",
        description:
          "Create a wireframe and UI design for the new landing page.",
        dueDate: "2025-03-12",
        labels: ["Design", "High Priority"],
      },
    ],
  },
  {
    id: "list-2",
    title: "In Progress",
    cards: [
      {
        id: "card-4",
        title: "Implement user authentication",
        description: "Use JWT for secure login and OAuth for social logins.",
        dueDate: "2025-03-08",
        labels: ["Development", "Backend"],
      },
      {
        id: "card-5",
        title: "Create API documentation",
        description: "Write comprehensive API documentation using Swagger.",
        dueDate: "2025-03-11",
        labels: ["Docs"],
      },
    ],
  },
  {
    id: "list-3",
    title: "Review",
    cards: [
      {
        id: "card-6",
        title: "Code review: Authentication module",
        description:
          "Review PR #1023 for security vulnerabilities and best practices.",
        dueDate: "2025-03-09",
        labels: ["Code Review", "Security"],
      },
    ],
  },
  {
    id: "list-4",
    title: "Done",
    cards: [
      {
        id: "card-7",
        title: "Setup CI/CD pipeline",
        description:
          "Automate deployment process using GitHub Actions and AWS.",
        dueDate: "2025-02-28",
        labels: ["DevOps", "Automation"],
      },
    ],
  },
];
