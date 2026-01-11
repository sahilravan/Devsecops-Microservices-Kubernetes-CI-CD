# DevSecOps Microservices with Kubernetes and CI/CD

![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-green)
![DevSecOps](https://img.shields.io/badge/DevSecOps-Enabled-orange)

A complete DevSecOps implementation demonstrating microservices architecture deployed on Kubernetes with comprehensive CI/CD pipelines and security scanning.

## 🏗️ Architecture

This project demonstrates a microservices architecture with:
- **Frontend Service**: Node.js/Express serving a web application
- **Backend Service**: Python/Flask API providing data endpoints
- **Kubernetes**: Container orchestration and deployment
- **CI/CD Pipeline**: Automated build, test, security scanning, and deployment
- **DevSecOps**: Integrated security scanning at every stage

```
┌─────────────────────────────────────────────────────────────┐
│                     CI/CD Pipeline                          │
│  (GitHub Actions with Security Scanning)                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                        │
│  ┌────────────────┐              ┌────────────────┐         │
│  │  Frontend      │◄────────────►│   Backend      │         │
│  │  Service       │              │   Service      │         │
│  │  (Node.js)     │              │   (Python)     │         │
│  │  Port: 3000    │              │   Port: 5000   │         │
│  └────────────────┘              └────────────────┘         │
│         │                                                    │
│         └──────────────► Ingress Controller                 │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Microservices
- **Frontend**: Interactive web interface with health checks
- **Backend**: RESTful API with JSON responses
- Containerized with Docker
- Production-ready configurations

### Kubernetes Resources
- Namespace isolation
- Deployments with replica sets
- Services for internal communication
- ConfigMaps for configuration management
- Ingress for external access
- Health probes (liveness and readiness)
- Resource limits and requests

### DevSecOps Security
- **SAST**: Static Application Security Testing with CodeQL
- **Dependency Scanning**: Vulnerability checks with Snyk
- **IaC Scanning**: Kubernetes manifests security with Checkov
- **Container Scanning**: Docker image vulnerabilities with Trivy
- **SARIF Integration**: Security results uploaded to GitHub Security

### CI/CD Pipeline
- Automated testing on every push and PR
- Multi-stage security scanning
- Docker image building and publishing
- Kubernetes deployment automation
- Security report generation

## 📋 Prerequisites

- Docker and Docker Compose
- Kubernetes cluster (minikube, kind, or cloud provider)
- kubectl CLI tool
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

## 🛠️ Quick Start

### Local Development with Docker Compose

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahilravan/Devsecops-Microservices-Kubernetes-CI-CD.git
   cd Devsecops-Microservices-Kubernetes-CI-CD
   ```

2. **Start services with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/data
   - Backend Health: http://localhost:5000/health

### Kubernetes Deployment

1. **Create namespace and resources**
   ```bash
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/configmap.yaml
   ```

2. **Deploy backend service**
   ```bash
   kubectl apply -f k8s/backend-deployment.yaml
   ```

3. **Deploy frontend service**
   ```bash
   kubectl apply -f k8s/frontend-deployment.yaml
   ```

4. **Set up ingress (optional)**
   ```bash
   kubectl apply -f k8s/ingress.yaml
   ```

5. **Verify deployments**
   ```bash
   kubectl get pods -n devsecops-demo
   kubectl get services -n devsecops-demo
   ```

6. **Access the application**
   ```bash
   # Using NodePort
   kubectl get svc frontend-service -n devsecops-demo
   # Access via http://<node-ip>:30080
   
   # Or port-forward for testing
   kubectl port-forward -n devsecops-demo svc/frontend-service 3000:3000
   ```

## 🔒 Security Features

### 1. Static Application Security Testing (SAST)
- CodeQL analyzes source code for security vulnerabilities
- Runs on every push and pull request
- Results visible in GitHub Security tab

### 2. Dependency Vulnerability Scanning
- Snyk checks Node.js and Python dependencies
- Identifies known vulnerabilities in packages
- Provides remediation advice

### 3. Infrastructure as Code (IaC) Security
- Checkov scans Kubernetes manifests
- Identifies misconfigurations and security issues
- Ensures best practices compliance

### 4. Container Image Scanning
- Trivy scans Docker images for vulnerabilities
- Checks base images and application dependencies
- Generates SARIF reports for GitHub Security

## 📊 CI/CD Pipeline Stages

The GitHub Actions workflow includes:

1. **Security Scan**: Repository-wide vulnerability scanning
2. **Dependency Check**: NPM and pip package vulnerability checks
3. **SAST Scan**: CodeQL static analysis
4. **Build and Test**: Compile and test both services
5. **Docker Build**: Create and scan container images
6. **Deploy**: Push to Kubernetes cluster (configurable)
7. **Security Report**: Consolidated security summary

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm install
npm test
```

### Backend Tests
```bash
cd backend
pip install -r requirements.txt
python -m pytest  # Add tests as needed
```

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci-cd.yaml           # CI/CD pipeline definition
├── frontend/
│   ├── server.js                # Frontend application
│   ├── package.json             # Node.js dependencies
│   ├── Dockerfile               # Frontend container image
│   └── .dockerignore
├── backend/
│   ├── app.py                   # Backend API
│   ├── requirements.txt         # Python dependencies
│   ├── Dockerfile               # Backend container image
│   └── .dockerignore
├── k8s/
│   ├── namespace.yaml           # Kubernetes namespace
│   ├── configmap.yaml           # Configuration data
│   ├── frontend-deployment.yaml # Frontend deployment & service
│   ├── backend-deployment.yaml  # Backend deployment & service
│   └── ingress.yaml             # Ingress configuration
├── docker-compose.yaml          # Local development setup
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Frontend**:
- `PORT`: Server port (default: 3000)
- `BACKEND_URL`: Backend service URL

**Backend**:
- `PORT`: Server port (default: 5000)
- `ENVIRONMENT`: Runtime environment (development/production)

### Kubernetes Configuration

Modify the following files for your environment:
- `k8s/configmap.yaml`: Application configuration
- `k8s/ingress.yaml`: Ingress host and paths
- `k8s/*-deployment.yaml`: Replica counts, resource limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🎯 Learning Objectives

This project demonstrates:
- Building and deploying microservices
- Container orchestration with Kubernetes
- CI/CD pipeline implementation
- DevSecOps integration
- Security scanning automation
- Infrastructure as Code
- Cloud-native best practices

## 📚 Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [OWASP Security](https://owasp.org/)
- [DevSecOps Best Practices](https://www.devsecops.org/)

## 🐛 Troubleshooting

### Common Issues

**Issue**: Pods not starting
```bash
kubectl describe pod <pod-name> -n devsecops-demo
kubectl logs <pod-name> -n devsecops-demo
```

**Issue**: Services not accessible
```bash
kubectl get svc -n devsecops-demo
kubectl describe svc <service-name> -n devsecops-demo
```

**Issue**: Image pull errors
- Ensure images are built and tagged correctly
- Check image registry credentials
- Verify image names in deployment files

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review CI/CD pipeline logs

---

**Built with ❤️ for learning DevSecOps practices**