# DarkFactory

This repo implements an AI agents flow that is easy to extend.

## Technology

- Language: TypeScript
- Hosting: GitHub Actions

## Target Flow

[README.md](README.md) contains the final target flow diagram (Scrum Master → BA → Dev ↔ Code Review agents, coordinated via GitHub Issue comments and GitHub Artifacts). It is the target state the project is being built toward, not the current state. Read it before designing or changing any agent or workflow.

## Strict Rules

1. Do not over-engineer and do not introduce fallback approaches that were not asked for. If you add something that is not directly covered in the conversation, EXPLICITLY ask the user for confirmation first.
