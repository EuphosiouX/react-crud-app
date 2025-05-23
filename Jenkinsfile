pipeline {
    agent any

    tools {
        nodejs 'Node24'
    }

    environment {
        REPO_URL = 'https://github.com/EuphosiouX/react-crud-app.git'
        BUILD_DIR = 'react-crud-app'
        SONAR_TOKEN = credentials('SONAR_TOKEN')
        SNYK_TOKEN = credentials('SNYK_TOKEN')
        BUILD_VERSION = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: "${REPO_URL}", branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building production artefact...'
                bat 'npm install'
                bat 'npm run build'

                echo 'Archiving build artefact...'
                archiveArtifacts artifacts: 'build/**/*.*', fingerprint: true
            }
        }

        stage('Test') {
            steps {
                echo 'Running Jest unit and integration tests...'
                bat 'npm run test'
                junit 'reports/test-result.xml'
                
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality analysis with SonarCloud...'
                withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                    bat '''
                    curl -o sonar.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.7.0.2747-windows.zip
                    powershell -Command "Expand-Archive sonar.zip -Force"
                    sonar-scanner-4.7.0.2747-windows\\bin\\sonar-scanner.bat ^
                        -Dsonar.projectKey=EuphosiouX_react-crud-app ^
                        -Dsonar.organization=euphosioux ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=https://sonarcloud.io ^
                        -Dsonar.login=%SONAR_TOKEN%
                    '''
                }
            }
        }

        stage('Security') {
            steps {
                echo 'Running security analysis using Snyk...'
                withCredentials([string(credentialsId: 'SNYK_TOKEN', variable: 'SNYK_TOKEN')]) {
                    bat '''
                    npm install -g snyk
                    snyk auth %SNYK_TOKEN%
                    snyk test || exit 0
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the app to a test environment (placeholder)...'
                echo 'Deployment complete.'
            }
        }

        stage('Release') {
            steps {
                echo 'Tagging release version and pushing to GitHub...'
                bat 'git tag v1.0.0'
                bat 'git push origin v1.0.0'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring setup - placeholder for tools like Prometheus, Grafana, or Uptime Robot API'
            }
        }
    }
}
