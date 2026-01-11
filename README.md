# DevSecOps Microservices with Kubernetes CI/CD

[![DevSecOps Pipeline](https://github.com/sahilravan/Devsecops-Microservices-Kubernetes-CI-CD/actions/workflows/devsecops-pipeline.yml/badge.svg)](https://github.com/sahilravan/Devsecops-Microservices-Kubernetes-CI-CD/actions/workflows/devsecops-pipeline.yml)

## 📌 Project Description

This project is a **production-style DevSecOps implementation** that demonstrates how a containerized microservices application (frontend and backend) can be securely built, tested, deployed, and monitored using modern DevOps practices.

The application consists of:
- **Frontend**: Simple HTML/JavaScript interface served by Nginx
- **Backend**: Node.js/Express REST API with Prometheus metrics
- **Infrastructure**: Kubernetes deployments with security best practices
- **Monitoring**: Prometheus for metrics collection and Grafana for visualization
- **CI/CD**: Automated pipeline with integrated security scanning

## 🎯 Project Objective

The primary objective is to simulate a **real-world DevOps and DevSecOps workflow** as used in production environments, demonstrating:

- ✅ **End-to-end CI/CD pipelines** with GitHub Actions
- ✅ **Containerized microservices** with Docker
- ✅ **Kubernetes deployments** with proper resource management
- ✅ **Security integration (DevSecOps)** throughout the pipeline
- ✅ **Automated security scanning** (SAST, dependency checks, container scanning)
- ✅ **Application monitoring** with Prometheus and Grafana
- ✅ **Production-ready practices** (health checks, resource limits, non-root users)

This project focuses on **automation, security, reliability, and real-world DevOps workflows** rather than application complexity.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions CI/CD                     │
│  (Lint → Test → Security Scan → Build → Deploy → Monitor)   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                        │
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Frontend   │ ←────→  │   Backend    │                 │
│  │   (Nginx)    │         │  (Node.js)   │                 │
│  │   Port: 80   │         │  Port: 3000  │                 │
│  └──────────────┘         └──────────────┘                 │
│         ↓                        ↓                           │
│  ┌──────────────────────────────────────┐                  │
│  │      Monitoring Stack                │                  │
│  │  ┌──────────┐    ┌───────────┐      │                  │
│  │  │Prometheus│ ←→ │  Grafana  │      │                  │
│  │  │Port: 9090│    │Port: 3000 │      │                  │
│  │  └──────────┘    └───────────┘      │                  │
│  └──────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## 🔒 DevSecOps Pipeline

The CI/CD pipeline integrates security at every stage:

### 1. **Code Quality & Linting**
- ESLint for JavaScript code quality
- Automated testing

### 2. **Dependency Vulnerability Scanning**
- `npm audit` for Node.js dependencies
- OWASP Dependency Check for comprehensive analysis

### 3. **SAST (Static Application Security Testing)**
- GitHub CodeQL for static code analysis
- Identifies security vulnerabilities in source code

### 4. **Container Image Scanning**
- Trivy for container vulnerability scanning
- Scans for OS vulnerabilities and misconfigurations

### 5. **Kubernetes Manifest Validation**
- kubectl dry-run validation
- kubeval for manifest linting

### 6. **Deployment & Testing**
- Automated deployment to Kubernetes
- Health checks and service verification
- End-to-end testing

### 7. **Monitoring**
- Prometheus metrics collection
- Grafana dashboards for visualization

## 📁 Project Structure

```
.
├── backend/                    # Node.js backend service
│   ├── server.js              # Express API with Prometheus metrics
│   ├── package.json           # Dependencies
│   ├── Dockerfile             # Multi-stage Docker build
│   └── .eslintrc.json         # Linting configuration
│
├── frontend/                   # Frontend service
│   ├── index.html             # Single-page application
│   ├── nginx.conf             # Nginx configuration
│   └── Dockerfile             # Nginx-based container
│
├── k8s/                        # Kubernetes manifests
│   ├── namespace.yaml         # Namespace definition
│   ├── backend.yaml           # Backend deployment & service
│   └── frontend.yaml          # Frontend deployment & service
│
├── monitoring/                 # Monitoring stack
│   ├── prometheus/
│   │   └── prometheus.yaml    # Prometheus deployment & config
│   └── grafana/
│       └── grafana.yaml       # Grafana deployment & dashboards
│
├── .github/
│   └── workflows/
│       └── devsecops-pipeline.yml  # CI/CD pipeline
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Docker
- Kubernetes (minikube, kind, or any K8s cluster)
- kubectl
- Node.js 18+ (for local development)

### Local Development

#### Backend Service

```bash
cd backend
npm install
npm start
# Service runs on http://localhost:3000
```

**Endpoints:**
- `GET /health` - Health check
- `GET /api/status` - Service status
- `GET /api/data` - Sample data
- `GET /metrics` - Prometheus metrics

#### Frontend Service

```bash
cd frontend
# Using Python's HTTP server
python3 -m http.server 8080
# Or use any static file server
```

### Docker Build

```bash
# Build backend
docker build -t backend-service:latest ./backend

# Build frontend
docker build -t frontend-service:latest ./frontend

# Run backend
docker run -p 3000:3000 backend-service:latest

# Run frontend
docker run -p 8080:80 frontend-service:latest
```

### Kubernetes Deployment

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy services
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml

# Deploy monitoring
kubectl apply -f monitoring/prometheus/prometheus.yaml
kubectl apply -f monitoring/grafana/grafana.yaml

# Check deployment status
kubectl get all -n devsecops-demo

# Get service URLs (for LoadBalancer or NodePort)
kubectl get svc -n devsecops-demo
```

### Access Services

#### Local/Port Forward:

```bash
# Backend
kubectl port-forward -n devsecops-demo svc/backend-service 3000:3000

# Frontend
kubectl port-forward -n devsecops-demo svc/frontend-service 8080:80

# Prometheus
kubectl port-forward -n devsecops-demo svc/prometheus-service 9090:9090

# Grafana
kubectl port-forward -n devsecops-demo svc/grafana-service 3001:3000
```

Then access:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)

## 🧪 Testing

### Manual Testing

```bash
# Backend health check
curl http://localhost:3000/health

# Backend API
curl http://localhost:3000/api/status
curl http://localhost:3000/api/data

# Prometheus metrics
curl http://localhost:3000/metrics
```

### Kubernetes Health Checks

```bash
# Check pod health
kubectl get pods -n devsecops-demo

# Check logs
kubectl logs -n devsecops-demo deployment/backend
kubectl logs -n devsecops-demo deployment/frontend

# Describe resources
kubectl describe deployment/backend -n devsecops-demo
```

## 📊 Monitoring

### Prometheus

Access Prometheus at http://localhost:9090 (after port-forward)

**Sample Queries:**
```promql
# Request rate
rate(http_request_duration_seconds_count[5m])

# Average request duration
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])

# CPU usage
rate(process_cpu_seconds_total{job="backend-service"}[5m])
```

### Grafana

Access Grafana at http://localhost:3001 (after port-forward)
- **Username**: admin
- **Password**: admin

The deployment includes a pre-configured dashboard for backend metrics.

## 🔐 Security Features

### Application Security
- ✅ Non-root container users
- ✅ Read-only root filesystem (where applicable)
- ✅ Dropped capabilities
- ✅ Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- ✅ Health checks and readiness probes

### CI/CD Security
- ✅ Automated dependency scanning
- ✅ Static code analysis (SAST)
- ✅ Container image vulnerability scanning
- ✅ Security reports in GitHub Security tab
- ✅ Fail-safe defaults (continue-on-error for scans)

### Kubernetes Security
- ✅ Resource limits and requests
- ✅ Security contexts
- ✅ RBAC for service accounts
- ✅ Network policies (can be added)

## 🛠️ Technologies Used

### Application Stack
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, JavaScript, Nginx
- **Containerization**: Docker

### DevOps Tools
- **CI/CD**: GitHub Actions
- **Orchestration**: Kubernetes
- **Monitoring**: Prometheus, Grafana

### Security Tools
- **SAST**: GitHub CodeQL
- **Dependency Scanning**: npm audit, OWASP Dependency Check
- **Container Scanning**: Trivy
- **Manifest Validation**: kubectl, kubeval

## 📈 CI/CD Pipeline Flow

```
Code Push
    ↓
┌─────────────────┐
│ Code Quality    │ → ESLint, Tests
└─────────────────┘
    ↓
┌─────────────────┐
│ Security Scans  │ → npm audit, OWASP DC, CodeQL
└─────────────────┘
    ↓
┌─────────────────┐
│ Build Images    │ → Docker build
└─────────────────┘
    ↓
┌─────────────────┐
│ Image Scanning  │ → Trivy
└─────────────────┘
    ↓
┌─────────────────┐
│ K8s Validation  │ → kubectl, kubeval
└─────────────────┘
    ↓
┌─────────────────┐
│ Deploy to K8s   │ → kind cluster (test)
└─────────────────┘
    ↓
┌─────────────────┐
│ Verify Deploy   │ → Health checks
└─────────────────┘
    ↓
┌─────────────────┐
│ Monitor         │ → Prometheus, Grafana
└─────────────────┘
```

## 🎓 Learning Objectives Achieved

This project demonstrates practical knowledge of:

1. **CI/CD Pipeline Design**: Multi-stage pipeline with parallel jobs
2. **DevSecOps Integration**: Security scanning at every stage
3. **Container Security**: Vulnerability scanning, non-root users, minimal images
4. **Kubernetes Deployment**: Proper resource management, health checks, RBAC
5. **Monitoring & Observability**: Metrics collection and visualization
6. **Production Best Practices**: Health checks, graceful shutdowns, logging
7. **Infrastructure as Code**: Declarative Kubernetes manifests
8. **Failure Handling**: Graceful degradation, retry logic

## 🚧 Future Enhancements

- [ ] Add Helm charts for easier deployment
- [ ] Implement service mesh (Istio/Linkerd)
- [ ] Add distributed tracing (Jaeger)
- [ ] Implement GitOps with ArgoCD
- [ ] Add more comprehensive tests (integration, e2e)
- [ ] Implement canary deployments
- [ ] Add log aggregation (ELK/Loki)
- [ ] Add network policies
- [ ] Implement secrets management (Vault)
- [ ] Add backup and disaster recovery

## 📝 License

MIT License

## 🤝 Contributing

This is a personal learning project, but suggestions and improvements are welcome via issues and pull requests.

## 📧 Contact

For questions or discussions about this project, please open an issue on GitHub.

---

**Built with ❤️ to demonstrate real-world DevSecOps practices**