# Docker Documentation - 120,000 Tokens

This comprehensive Docker documentation contains code snippets, examples, installation guides, and API references retrieved from the official Docker documentation repository.

## Installation and Setup

### Installing Docker Desktop

Docker Desktop provides an easy-to-use interface for managing Docker containers and images across different operating systems.

#### Windows Installation

```bash
# Download Docker Desktop for Windows
# Install using the executable installer
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

#### macOS Installation

```console
$ softwareupdate --install-rosetta
```

For Mac users with Apple silicon, installing Rosetta 2 is recommended for optimal experience:

```console
$ softwareupdate --install-rosetta
```

#### Linux Installation

For Ubuntu/Debian systems:

```bash
sudo apt-get update
sudo apt-get install ./docker-desktop-amd64.deb
```

For RHEL/CentOS systems:

```bash
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

### Docker Engine Installation

#### Installing Latest Docker Engine

```console
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### Installing Specific Version

```console
$ VERSION_STRING=5:24.0.7-1~ubuntu.22.04~jammy
$ sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin
```

#### Starting Docker Service

```console
sudo systemctl enable --now docker
```

## Getting Started with Docker

### What is Docker?

Docker is a platform that uses containerization technology to package applications and their dependencies into portable, lightweight containers. These containers can run consistently across different environments.

### Basic Docker Commands

#### Building Images

Build a Docker image from a Dockerfile:

```console
$ docker build -t getting-started .
```

#### Running Containers

Run a container from an image:

```console
$ docker run -dp 127.0.0.1:3000:3000 getting-started
```

#### Listing Containers

```console
docker ps
```

#### Listing Images

```console
docker image ls
```

### Docker Concepts

#### What is a Container?

Containers are lightweight, portable, and isolated environments that package an application with all its dependencies.

#### Docker Images

Images are read-only templates used to create containers. They contain the application code, runtime, system tools, libraries, and settings.

## Dockerfile Best Practices

### Basic Dockerfile Structure

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.12
WORKDIR /usr/local/app

# Install the application dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy in the source code
COPY src ./src
EXPOSE 5000

# Setup an app user so the container doesn't run as the root user
RUN useradd app
USER app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Multi-stage Builds

Multi-stage builds help create smaller, more secure images by separating build dependencies from runtime dependencies:

```dockerfile
# syntax=docker/dockerfile:1
FROM node:lts AS build
WORKDIR /app
COPY package* yarn.lock ./
RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
```

### Security Best Practices

#### Running as Non-Root User

```dockerfile
FROM alpine AS builder
COPY Makefile ./src /
RUN make build

FROM alpine AS runtime
COPY --from=builder bin/production /app
USER nonroot
ENTRYPOINT ["/app/production"]
```

#### Optimizing RUN Instructions

```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    aufs-tools \
    automake \
    build-essential \
    curl \
    dpkg-sig \
    libcap-dev \
    libsqlite3-dev \
    mercurial \
    reprepro \
    ruby1.9.1 \
    ruby1.9.1-dev \
    s3cmd=1.1.* \
    && rm -rf /var/lib/apt/lists/*
```

## Docker Compose

### Basic Compose File

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
```

### Starting Services

```console
$ docker compose up
```

### Building and Starting Services

```console
$ docker compose up --build
```

### Background Execution

```console
$ docker compose up -d
```

## Networking

### Creating Custom Networks

```console
$ docker network create --driver bridge my-network
```

### Connecting Containers to Networks

```console
$ docker run -d --name devtest --network my-network nginx:latest
```

### Overlay Networks for Swarm

```console
$ docker network create --driver overlay my-overlay
```

## Volume Management

### Creating Volumes

```console
$ docker volume create myvol2
```

### Using Volumes with Containers

Using --mount flag:
```console
$ docker run -d \
  --name devtest \
  --mount source=myvol2,target=/app \
  nginx:latest
```

Using -v flag:
```console
$ docker run -d \
  --name devtest \
  -v myvol2:/app \
  nginx:latest
```

### Bind Mounts

```console
$ docker run -d \
  -it \
  --name broken-container \
  -v /tmp:/usr \
  nginx:latest
```

## Docker Swarm

### Initializing a Swarm

```bash
docker swarm init
```

### Creating Services

```bash
docker service create --name demo alpine:latest ping 8.8.8.8
```

### Listing Services

```bash
docker service ls
```

### Scaling Services

```bash
docker service scale demo=3
```

### Updating Services

```bash
docker service update <SERVICE-NAME>
```

## Container Registry and Docker Hub

### Tagging Images

```bash
docker tag my-app:1.0 your-dockerhub-username/my-app:1.0
```

### Pushing Images

```bash
docker push your-dockerhub-username/my-app:1.0
```

### Pulling Images

```console
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
a480a496ba95: Pull complete
f3ace1b8ce45: Pull complete
11d6fdd0e8a7: Pull complete
f1091da6fd5c: Pull complete
40eea07b53d8: Pull complete
6476794e50f4: Pull complete
70850b3ec6b2: Pull complete
Digest: sha256:28402db69fec7c17e179ea87882667f1e054391138f77ffaf0c3eb388efc3ffb
Status: Downloaded newer image for nginx:latest
```

## Docker Extensions

### Creating Extensions

```console
$ docker extension init <my-extension>
```

### Building Extensions

```console
$ docker build -t <name-of-your-extension> .
```

### Installing Extensions

```console
$ docker extension install <name-of-your-extension>
```

### Listing Extensions

```bash
docker extension ls
```

### Removing Extensions

```console
$ docker extension rm <name-of-your-extension>
```

## Docker Build

### Advanced Build Features

#### Build with Specific Target

```console
$ docker build --target production .
```

#### Multi-Platform Builds

```console
$ docker build --platform linux/amd64,linux/arm64 -t multi-platform .
```

#### Using BuildKit

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN uname -m > /arch
```

```console
$ mkdir multi-platform
$ cd multi-platform
$ docker build --platform linux/amd64,linux/arm64 -t multi-platform .
$ docker run --rm multi-platform cat /arch
```

### Docker Buildx

#### Creating a Builder

```bash
docker buildx create --use --driver cloud "${DOCKER_ACCOUNT}/${CLOUD_BUILDER_NAME}"
```

#### Building with Buildx

```bash
$ docker buildx build --allow device .
```

## Configuration and Secrets Management

### Docker Configs

Creating configs:
```console
$ docker config create site.conf site.conf
```

Listing configs:
```console
$ docker config ls

ID                          NAME                CREATED             UPDATED
4ory233120ccg7biwvy11gl5z   site.conf           4 seconds ago       4 seconds ago
```

### Docker Secrets

Creating secrets:
```bash
$ docker secret create site.crt site.crt
$ docker secret create site.key site.key
```

Using secrets in services:
```bash
$ docker service create \
  --name nginx \
  --secret site.crt \
  --secret site.key \
  --config source=site.conf,target=/etc/nginx/conf.d/site.conf,mode=0440 \
  --publish published=3000,target=443 \
  nginx:latest
```

## Security

### Container Isolation

Docker provides several security features including:

- User namespaces
- Control groups (cgroups)
- Secure computing mode (seccomp)
- AppArmor and SELinux profiles

### Best Practices

1. **Use Official Images**: Start with official base images when possible
2. **Keep Images Updated**: Regularly update base images and dependencies
3. **Scan for Vulnerabilities**: Use Docker Scout or similar tools
4. **Run as Non-Root**: Avoid running containers as root user
5. **Limit Resources**: Use resource constraints to prevent DoS attacks

## Monitoring and Logging

### Container Logs

```console
$ docker logs <container-id>
```

### Real-time Logs

```console
$ docker logs -f <container-id>
```

### System Information

```console
docker system df -v
```

### Container Statistics

```console
docker stats
```

## Debugging and Troubleshooting

### Executing Commands in Running Containers

```console
$ docker exec -it <container-id> /bin/bash
```

### Inspecting Containers

```console
$ docker inspect <container-id>
```

### Health Checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
```

Example with custom health check:
```console
$ docker run --name=test -d \
    --health-cmd='stat /etc/passwd || exit 1' \
    --health-interval=2s \
    busybox sleep 1d
```

## Development Workflows

### Development with Bind Mounts

```console
$ docker run -dp 127.0.0.1:3000:3000 \
    -w //app --mount type=bind,src="/$(pwd)",target=/app \
    node:18-alpine \
    sh -c "yarn install && yarn run dev"
```

### Hot Reloading

For development environments, you can set up automatic reloading:

```python
return f'Hello from Docker! I have been seen {count} times.\n'
```

### Multi-Container Development

```yaml
services:
  web:
    build: .
    ports:
      - "8000:5000"
    develop:
      watch:
        - action: sync
          path: .
          target: /code
  redis:
    image: "redis:alpine"
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Build and Push Docker Image

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Extract Docker image metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ vars.DOCKER_USERNAME }}/my-image

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ vars.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          annotations: ${{ steps.meta.outputs.annotations }}
          provenance: true
          sbom: true
```

## Language-Specific Examples

### Node.js Applications

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Python Applications

```dockerfile
#syntax=docker/dockerfile:1

#=== Build stage: Install dependencies and create virtual environment ===#
FROM python:3.13-alpine3.21 AS builder

ENV LANG=C.UTF-8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/venv/bin:$PATH"

WORKDIR /app

RUN python -m venv /app/venv
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

#=== Final stage: Create minimal runtime image ===#
FROM python:3.13-alpine3.21

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PATH="/app/venv/bin:$PATH"

COPY image.py image.png ./
COPY --from=builder /app/venv /app/venv

ENTRYPOINT [ "python", "/app/image.py" ]
```

### Go Applications

```dockerfile
# syntax=docker/dockerfile:1

FROM golang:1.19

# Set destination for COPY
WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code. Note the slash at the end, as explained in
# https://docs.docker.com/reference/dockerfile/#copy
COPY *.go ./

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping

# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/reference/dockerfile/#expose
EXPOSE 8080
```

Multi-stage Go build:
```dockerfile
# syntax=docker/dockerfile:1

# Build the application from source
FROM golang:1.19 AS build-stage

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping

# Run the tests in the container
FROM build-stage AS run-test-stage
RUN go test -v ./...
```

## Docker API

### Container Management via API

#### Creating Containers

```go
package main

import (
	"context"
	"io"
	"os"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
)

func main() {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()

	reader, err := cli.ImagePull(ctx, "docker.io/library/alpine", image.PullOptions{})
	if err != nil {
		panic(err)
	}

	defer reader.Close()
	io.Copy(os.Stdout, reader)

	resp, err := cli.ContainerCreate(ctx, &container.Config{
		Image: "alpine",
		Cmd:   []string{"echo", "hello world"},
		Tty:   false,
	}, nil, nil, nil, "")
	if err != nil {
		panic(err)
	}

	if err := cli.ContainerStart(ctx, resp.ID, container.StartOptions{}); err != nil {
		panic(err)
	}

	statusCh, errCh := cli.ContainerWait(ctx, resp.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errCh:
		if err != nil {
			panic(err)
		}
	case <-statusCh:
	}

	out, err := cli.ContainerLogs(ctx, resp.ID, container.LogsOptions{ShowStdout: true})
	if err != nil {
		panic(err)
	}

	stdcopy.StdCopy(os.Stdout, os.Stderr, out)
}
```

#### Listing Images

```go
package main

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
)

func main() {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()

	images, err := cli.ImageList(ctx, image.ListOptions{})
	if err != nil {
		panic(err)
	}

	for _, image := range images {
		fmt.Println(image.ID)
	}
}
```

#### Python SDK Examples

```python
import docker
client = docker.from_env()
for container in client.containers.list():
  print(container.id)
```

```python
import docker
client = docker.from_env()
for image in client.images.list():
  print(image.id)
```

### HTTP API Examples

#### Listing Containers

```http
$ curl --unix-socket /var/run/docker.sock http://localhost/v1.47/containers/json
[{
  "Id":"ae63e8b89a26f01f6b4b2c9a7817c31a1b6196acf560f66586fbc8809ffcd772",
  "Names":["/tender_wing"],
  "Image":"bfirsh/reticulate-splines",
  ...
}]
```

#### Creating Exec Instances

```json
{
 "Detach": false,
 "Tty": false
}
```

## Plugins and Extensions

### Volume Plugins

```console
docker plugin install tiborvass/sample-volume-plugin
latest: Pulling from tiborvass/sample-volume-plugin
eb9c16fbdc53: Download complete
Digest: sha256:00b42de88f3a3e0342e7b35fa62394b0a9ceb54d37f4c50be5d3167899994639
Status: Downloaded newer image for tiborvass/sample-volume-plugin:latest
Installed plugin tiborvass/sample-volume-plugin
```

### Logging Plugins

```bash
docker plugin install <org/image>
docker plugin ls
docker inspect
```

### Plugin Configuration

```json
{
  "Args": {
    "Description": "",
    "Name": "",
    "Settable": null,
    "Value": null
  },
  "Description": "A sample volume plugin for Docker",
  "Documentation": "https://docs.docker.com/engine/extend/plugins/",
  "Entrypoint": [
    "/usr/bin/sample-volume-plugin",
    "/data"
  ],
  "Env": [
    {
      "Description": "",
      "Name": "DEBUG",
      "Settable": [
        "value"
      ],
      "Value": "0"
    }
  ],
  "Interface": {
    "Socket": "plugin.sock",
    "Types": [
      "docker.volumedriver/1.0"
    ]
  },
  "Linux": {
    "Capabilities": null,
    "AllowAllDevices": false,
    "Devices": null
  },
  "Mounts": null,
  "Network": {
    "Type": ""
  },
  "PropagatedMount": "/data",
  "User": {},
  "Workdir": ""
}
```

## Docker Desktop Features

### CLI Commands

```
Command: start
  Description: Starts Docker Desktop
Command: stop
  Description: Stops Docker Desktop
Command: restart
  Description: Restarts Docker Desktop
Command: status
  Description: Displays whether Docker Desktop is running or stopped.
Command: engine ls
  Description: Lists available engines (Windows only)
Command: engine use
  Description: Switch between Linux and Windows containers (Windows only)
Command: update
  Description: Manage Docker Desktop updates. Available for Mac only with Docker Desktop version 4.38, or all OSs with Docker Desktop version 4.39 and later.
Command: logs
  Description: Print log entries
Command: disable
  Description: Disable a feature
Command: enable
  Description: Enable a feature
Command: version
  Description: Show the Docker Desktop CLI plugin version information
Command: module
  Description: Manage Docker Desktop modules
```

### Starting Docker Desktop

```console
$ systemctl --user start docker-desktop
```

### CLI Command Example

```console
docker desktop start
```

## Container Orchestration

### Kubernetes Integration

Docker Desktop includes Kubernetes integration for local development.

#### Deploying to Kubernetes

```text
deployment.apps/docker-deno-demo created
service/service-entrypoint created
```

#### Checking Pod Status

```shell
NAME      READY     STATUS    RESTARTS   AGE
demo      1/1       Running   0          4s
```

### Docker Swarm Service Management

#### Creating Services with Replicas

```console
$ docker service create --network globalnet --name myservice --replicas=8 mrjana/simpleweb simpleweb
w90drnfzw85nygbie9kb89vpa
```

#### Service Status

```shell
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
il7elwunymbs        demo_bb-app         replicated          1/1                 getting-started:latest   *:8000->3000/tcp
```

## Monitoring and Observability

### Prometheus Integration

```yaml
✔ Network go-prometheus-monitoring_go-network  Created                                                           0.0s 
✔ Container grafana                            Created                                                           0.3s 
✔ Container go-api                             Created                                                           0.2s 
✔ Container prometheus                         Created                                                           0.3s 
Attaching to go-api, grafana, prometheus
go-api      | [GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

go-api      | [GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
go-api      |  - using env:    export GIN_MODE=release
go-api      |  - using code:    gin.SetMode(gin.ReleaseMode)
go-api      | 
go-api      | [GIN-debug] GET    /metrics                  --> main.PrometheusHandler.func1 (3 handlers)
go-api      | [GIN-debug] GET    /health                   --> main.main.func1 (4 handlers)
go-api      | [GIN-debug] GET    /v1/users                 --> main.main.func2 (4 handlers)
go-api      | [GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
go-api      | Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
go-api      | [GIN-debug] Listening and serving HTTP on :8000
prometheus  | ts=2025-03-15T05:57:06.676Z caller=main.go:627 level=info msg="No time or size retention was set so using the default time retention" duration=15d
prometheus  | ts=2025-03-15T05:57:06.678Z caller=main.go:671 level=info msg="Starting Prometheus Server" mode=server version=\"(version=2.55.0, branch=HEAD, revision=91d80252c3e528728b0f88d254dd720f6be07cb8)"
grafana     | logger=settings t=2025-03-15T05:57:06.865335506Z level=info msg="Config overridden from command line" arg=\"default.log.mode=console\"
grafana     | logger=settings t=2025-03-15T05:57:06.865337131Z level=info msg="Config overridden from Environment variable" var=\"GF_PATHS_DATA=/var/lib/grafana\"
```

### Health Checks

```console
$ docker run --name=test -d \
    --health-cmd='stat /etc/passwd || exit 1' \
    --health-interval=2s \
    busybox sleep 1d
$ sleep 2; docker inspect --format='{{.State.Health.Status}}' test
healthy
$ docker exec test rm /etc/passwd
$ sleep 2; docker inspect --format='{{json .State.Health}}' test
{
  "Status": "unhealthy",
  "FailingStreak": 3,
  "Log": [
    {
      "Start": "2016-05-25T17:22:04.635478668Z",
      "End": "2016-05-25T17:22:04.7272552Z",
      "ExitCode": 0,
      "Output": "  File: /etc/passwd\n  Size: 334       \tBlocks: 8          IO Block: 4096   regular file\nDevice: 32h/50d\tInode: 12          Links: 1\nAccess: (0664/-rw-rw-r--)  Uid: (    0/    root)   Gid: (    0/    root)\nAccess: 2015-12-05 22:05:32.000000000\nModify: 2015..."
    }
  ]
}
```

## Advanced Topics

### Container Device Integration

```bash
$ docker buildx build --allow device .
[...] 
#7 0.155 FOO=injected
#7 DONE 0.2s
```

```dockerfile
FROM busybox
RUN --device=vendor1.com/device   env | grep ^FOO=
```

### Storage Drivers

#### VFS Driver

```console
$ sudo systemctl start docker
```

#### Overlay2 Driver

The overlay2 storage driver is the recommended storage driver for Docker.

### Runtime Configuration

```bash
# Enable experimental features
docker daemon --experimental

# Set a custom shutdown timeout
docker daemon --shutdown-timeout 60

# Run a container with tini as init process
docker run --init alpine echo "Hello"

# Prune unused Docker objects
docker system prune -a

# Inspect container stats
docker stats

# Execute a command in a container with a specific seccomp profile
docker run --seccomp-profile /path/to/profile.json ubuntu bash -c "echo hello"
```

### Enterprise Features

#### Hardened Desktop Settings

```
DockerCLIInstallLocation:
  Default value: `system`
  Accepted values: File path
  Format: String
  Description: Install location for Docker CLI binaries.
  OS: All
  Use case: Customize CLI install location for compliance or tooling.
  Configure with: Advanced settings in Docker Desktop GUI.
```

#### Policy Management

Examples of patterns used to define allowed base images:

```dockerfile
docker.io/*
docker.io/library/*
docker.io/orgname/*
docker.io/orgname/repository:*
registry.example.com/*
docker.io/library/node:*-slim
```

## Database Integration

### PostgreSQL Setup

```dockerfile
# syntax=docker/dockerfile:1

FROM ubuntu

RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

RUN apt-get update && apt-get install -y python-software-properties software-properties-common postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3

USER postgres

RUN    /etc/init.d/postgresql start &&\
    psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
    createdb -O docker docker

RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf

RUN echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf

EXPOSE 5432

VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

CMD ["/usr/lib/postgresql/9.3/bin/postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]
```

### Database Commands

```bash
$ docker container stop postgres
$ docker compose up -d --build
$ docker exec -it my_postgres_db psql -h localhost -U postgres sampledb
```

```sql
sampledb=# SELECT * FROM users;
  id | name  |       email
----+-------+-------------------
   1 | Alpha | alpha@example.com
   2 | Beta  | beta@example.com
   3 | Gamma | gamma@example.com
(3 rows)

sampledb=#
```

### CockroachDB Example

```console
$ docker run -d \
  --name roach \
  --hostname db \
  --network mynet \
  -p 26257:26257 \
  -p 8080:8080 \
  -v roach:/cockroach/cockroach-data \
  cockroachdb/cockroach:latest-v20.1 start-single-node \
  --insecure
```

## Cleanup and Maintenance

### Service Cleanup

```bash
$ docker service rm nginx

$ docker secret rm site.crt site.key

$ docker config rm site.conf
```

### Image Cleanup

```bash
docker system prune -a
```

### Volume Cleanup

```bash
docker volume prune
```

## Testing and Quality Assurance

### Docker Scout

```console
git clone https://github.com/docker/scout-demo-service.git
cd scout-demo-service
```

### Scout Version Information

```console
$ docker scout version

      ⢀⢀⢀             ⣀⣀⡤⣔⢖⣖⢽⢝
   ⡠⡢⡣⡣⡣⡣⡣⡣⡢⡀    ⢀⣠⢴⡲⣫⡺⣜⢞⢮⡳⡵⡹⡅
  ⡜⡜⡜⡜⡜⡜⠜⠈⠈        ⠁⠙⠮⣺⡪⡯⣺⡪⡯⣺ 
 ⢘⢜⢜⢜⢜⠜               ⠈⠪⡳⡵⣹⡪⠇ 
 ⠨⡪⡪⡪⠂    ⢀⡤⣖⢽⡹⣝⡝⣖⢤⡀    ⠘⢝⢮⡚       _____                 _   
  ⠱⡱⠁    ⡴⡫⣞⢮⡳⣝⢮⡺⣪⡳⣝⢦    ⠘⡵⠁      / ____| Docker        | |  
   ⠁    ⣸⢝⣕⢗⡵⣝⢮⡳⣝⢮⡺⣪⡳⣣    ⠁      | (___   ___ ___  _   _| |_ 
        ⣗⣝⢮⡳⣝⢮⡳⣝⢮⡳⣝⢮⢮⡳            \___ \ / __/ _ \| | | | __|
   ⢀    ⢱⡳⡵⣹⡪⡳⣝⢮⡳⣝⢮⡳⡣⡏    ⡀       ____) | (_| (_) | |_| | |_ 
  ⢀⢾⠄    ⠫⣞⢮⡺⣝⢮⡳⣝⢮⡳⣝⠝    ⢠⢣⢂     |_____/ \______/ \__,_|\__|
  ⡼⣕⢗⡄    ⠈⠓⠝⢮⡳⣝⠮⠳⠙     ⢠⢢⢣⢣  
 ⢰⡫⡮⡳⣝⢦⡀              ⢀⢔⢕⢕⢕⢕⠅ 
 ⡯⣎⢯⡺⣪⡳⣝⢖⣄⣀        ⡀⡠⡢⡣⡣⡣⡣⡣⡃  
⢸⢝⢮⡳⣝⢮⡺⣪⡳⠕⠗⠉⠁    ⠘⠜⡜⡜⡜⡜⡜⡜⠜⠈   
⡯⡳⠳⠝⠊⠓⠉             ⠈⠈⠈⠈      

version: v1.0.9 (go1.21.3 - darwin/arm64)
git commit: 8bf95bf60d084af341f70e8263342f71b0a3cd16
```

### Build Cache Optimization

```dockerfile
FROM busybox
WORKDIR /src
RUN touch foo.txt
RUN --mount=target=. ls -1
RUN ls -1
```

Build output:
```plaintext
#8 [stage-0 3/5] RUN touch foo.txt
#8 DONE 0.1s

#9 [stage-0 4/5] RUN --mount=target=. ls -1
#9 0.040 Dockerfile
#9 DONE 0.0s

#10 [stage-0 5/5] RUN ls -1
#10 0.046 foo.txt
#10 DONE 0.1s
```

## Alternative Installation Methods

### Binary Installation

#### Linux Binary Installation

```console
$ tar xzvf /path/to/<FILE>.tar.gz
$ sudo cp docker/* /usr/bin/
$ sudo dockerd &
$ sudo docker run hello-world
```

#### Windows Binary Installation

```powershell
&$Env:ProgramFiles\Docker\dockerd --register-service
Start-Service docker
```

### Package Manager Installation

#### PowerShell Installation

```powershell
Install-Module DockerMsftProvider -Force
Install-Package Docker -ProviderName DockerMsftProvider -Force
[System.Environment]::SetEnvironmentVariable("DOCKER_FIPS", "1", "Machine")
Expand-Archive docker-18.09.1.zip -DestinationPath $Env:ProgramFiles -Force
```

#### MSI Installation

```powershell
msiexec /i "DockerDesktop.msi"
```

Silent installation:
```powershell
msiexec /i "DockerDesktop.msi" /L*V ".\msi.log" /quiet /norestart
```

## Compose Bridge

### Converting to Kubernetes

```console
docker compose bridge convert -f compose.yaml 
Kubernetes resource api-deployment.yaml created
Kubernetes resource db-deployment.yaml created
Kubernetes resource web-deployment.yaml created
Kubernetes resource api-expose.yaml created
Kubernetes resource db-expose.yaml created
Kubernetes resource web-expose.yaml created
Kubernetes resource 0-avatars-namespace.yaml created
Kubernetes resource default-network-policy.yaml created
Kubernetes resource private-network-policy.yaml created
Kubernetes resource public-network-policy.yaml created
Kubernetes resource db-db_data-persistentVolumeClaim.yaml created
Kubernetes resource api-service.yaml created
Kubernetes resource web-service.yaml created
Kubernetes resource kustomization.yaml created
```

## AI and ML Integration

### Docker AI

```console
docker ai "What can you do?"
```

### Model Context Protocol

```dockerfile
FROM ubuntu:latest

# Install necessary dependencies (e.g., Python, pip)
RUN apt-get update && apt-get install -y python3 python3-pip

# Copy MCP server code and requirements
COPY ./app /app
WORKDIR /app
RUN pip3 install -r requirements.txt

# Expose the port the server runs on
EXPOSE 8080

# Command to run the MCP server
CMD ["python3", "-m", "mcp_server"]
```

### Time Integration Example

```bash
$ docker ai 'what time is it now in kiribati?'

    • Calling get_current_time

  The current time in Kiribati (Tarawa) is 9:38 PM on January 7, 2025.
```

## Sample Applications

### Clone Sample Applications

```console
git clone https://github.com/docker/getting-started-todo-app
cd getting-started-todo-app
```

```console
$ git clone https://github.com/docker/docker-nodejs-sample && cd docker-nodejs-sample
```

```console
git clone https://github.com/dockersamples/helloworld-demo-node
```

### Angular Application

```shell
REPOSITORY                TAG               IMAGE ID       CREATED         SIZE
docker-angular-sample     latest            34e66bdb9d40   14 seconds ago   76.4MB
```

### Language Translation

```console
git clone https://github.com/harsh4870/Docker-NLP.git
```

## Documentation and Guides

### Contributing

```console
docker compose watch
```

### Content Structure

```markdown
# Docker Documentation

This comprehensive documentation covers:

1. **Introduction**
   - Describe the problem or goal.
   - Explain the benefits of using Docker in this context.
2. **Prerequisites**
   - List required tools, technologies, and prior knowledge.
3. **Setup**
   - Provide instructions for setting up the environment.
   - Include any necessary configuration steps.
4. **Implementation**
   - Walk through the process step by step.
   - Use code snippets and explanations to illustrate key points.
5. **Running or deploying the application**
   - Guide the user on how to execute or deploy the solution.
   - Discuss any verification steps to ensure success.
6. **Conclusion**
   - Recap what was achieved.
   - Suggest further reading or advanced topics.
```

### Metadata Example

```yaml
---
title: Deploy a machine learning model with Docker
linkTitle: Docker for ML deployment
description: Learn how to containerize and deploy a machine learning model using Docker.
summary: |
  This guide walks you through the steps to containerize a machine learning
  model and deploy it using Docker, enabling scalable and portable AI
  solutions.
tags: [machine-learning, deployment]
languages: [python]
params:
  time: 30 minutes
---
```

## Additional Resources

### Links and References

- Docker Hub: https://hub.docker.com/
- Docker Documentation: https://docs.docker.com/
- Docker GitHub: https://github.com/docker/
- Community Forums: https://forums.docker.com/
- Docker Slack: http://dockr.ly/comm-slack

### Support

```markdown
If you have a paid Docker subscription, you can [contact the Support team](https://hub.docker.com/support/contact/).

All Docker users can seek support through the following resources, where Docker or the community respond on a best effort basis.
- [Docker Desktop for Windows GitHub repo](https://github.com/docker/for-win) 
- [Docker Desktop for Mac GitHub repo](https://github.com/docker/for-mac)
- [Docker Desktop for Linux GitHub repo](https://github.com/docker/desktop-linux)
- [Docker Community Forums](https://forums.docker.com/)
- [Docker Community Slack](http://dockr.ly/comm-slack)
```

---

This documentation provides comprehensive coverage of Docker concepts, commands, best practices, and advanced features. From basic container operations to complex multi-stage builds, networking configurations, and enterprise integrations, this guide serves as a complete reference for Docker usage across different environments and use cases.

The examples include real-world scenarios for various programming languages, deployment strategies, monitoring solutions, and development workflows. Whether you're getting started with Docker or implementing advanced container orchestration, this documentation covers the essential knowledge needed for successful container adoption.
