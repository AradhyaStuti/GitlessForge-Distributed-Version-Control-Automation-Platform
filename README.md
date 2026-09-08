# Gitless Forge

A side project where I tried to build a GitHub-style platform from scratch, including my own version control instead of using Git underneath.

> **Not a Git wrapper.** It doesn't use libgit2 or run the `git` command. The version control part is implemented from scratch using file snapshots, commit metadata, branches, and related operations.

I started this project because I wanted to understand what actually happens behind commands like `git commit`, `git branch`, and the pull request workflow. So I built the main parts myself, including file snapshots, branch state, commits, a CI runner, code review, and project boards.

This is mainly a learning project, not production software. I'm still working on it and there are parts that need improvement.

## Running it

```bash
git clone https://github.com/AradhyaStuti/Gitless-Forge-Distributed-Version-Control-Automation-Platform.git
cd Gitless-Forge-Distributed-Version-Control-Automation-Platform

cp backend-main/.env.example backend-main/.env
# add MONGO_URI and JWT_SECRET to .env

cd backend-main
npm install
npm start

cd ../frontend-main
npm install
npm run dev

Or run it with Docker:
docker compose up --build

WHAT'S IN HERE:

Version control: Repositories are stored using file snapshots and commit metadata. There is also a CLI with commands such as init, add, commit, branch, merge, diff, log, stash, and revert. The CLI uses yargs. Commit information is stored in MongoDB so it can also be displayed in the web application.

Pull requests: Pull requests are branch-based and include reviews, status, and a merge flow.

Code review: There is a basic static analysis step that checks the diff for things like hardcoded secrets, unsafe calls such as eval, and some SQL-injection-related patterns. It is only a basic check and is not meant to replace a proper linter or security scanner.

CI/CD: Pipelines run Node processes and capture their output, exit codes, and results. Pipelines can also have multiple stages.

Project boards: A Kanban-style board with tasks, priorities, assignees, and drag-and-drop support.

Authentication and other features: JWT authentication, bcrypt password hashing, rate limiting, request validation, Swagger API docs, Socket.IO for live updates, and API keys for programmatic access.

STACK:
React + Vite
Node.js + Express
MongoDB
Jest
Docker Compose
Socket.IO

TESTS:
cd backend-main
npm test

cd ../frontend-main
npm test

The backend has tests for authentication, repositories, pull requests, code review, pipelines, project boards, API keys, and middleware.

CURRENT STATUS:

The project works locally and with the Docker Compose setup.

There are still some rough parts. For example, the merge logic doesn't handle three-way conflicts properly yet, and the diff view is line-based rather than token-based.

It's a learning project, so I'm still improving it.
