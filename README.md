# Devopsx

A monorepo of DevOps and Infrastructure-as-Code (IaC) projects — hands-on work with tools like Pulumi, Terraform, Docker, Kubernetes, CI/CD pipelines, and cloud providers (AWS, Azure, GCP, Cloudflare).

Each project lives in its own directory with its own README, dependencies, and instructions.

## Projects

| Project                                                               | Tools                      | Description                                                         |
| --------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------- |
| [pulumi-iac-aws-static-website-s3](pulumi-iac-aws-static-website-s3/) | Pulumi, TypeScript, AWS S3 | Static website hosted on S3, built with a reusable Pulumi component |

_More projects coming as the repo grows._

## Structure

```
devopsx/
├── <project-name>/     # one self-contained project per directory
│   ├── README.md       # project-specific docs
│   └── ...
└── README.md           # this file — index of all projects
```

## Getting started

Each project is self-contained. To run one:

```bash
cd <project-name>
# follow the project's README
```

## Conventions

- Directory names describe the project: `<tool>-<category>-<cloud>-<what>` (e.g. `pulumi-iac-aws-static-website-s3`)
- Every project ships its own README with prerequisites and usage
- Secrets and credentials are never committed — use environment variables or each tool's secret management
