pipeline {
    agent any

    tools {
        nodejs('22.15.0')
    }

    environment {
        REPO_URL = 'https://github.com/EuphosiouX/react-crud-app.git'
        SONAR_TOKEN = credentials('SONAR_TOKEN')
        SNYK_TOKEN = credentials('SNYK_TOKEN')
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
            }
        }

        stage('Test') {
            steps {
                echo 'Running Jest unit and integration tests...'
                bat 'npm test'
                bat 'dir reports /s'
                junit 'reports/test-result.xml'       
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality analysis with SonarCloud...'
                withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                    bat '''
                     if exist sonar-scanner (
                        rmdir /s /q sonar-scanner
                    )
                    curl -sSLo sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-windows.zip
                    powershell -Command "Expand-Archive -Path sonar-scanner.zip -DestinationPath sonar-scanner -Force"
                    sonar-scanner\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner.bat -Dsonar.login=%SONAR_TOKEN%
                    '''
                }
            }
        }

        stage('Security') {
            steps {
                echo 'Running security analysis using Snyk...'
                withCredentials([string(credentialsId: 'SNYK_TOKEN', variable: 'SNYK_TOKEN')]) {
                    bat 'npm install -g snyk'
                    bat 'snyk auth %SNYK_TOKEN%'
                    bat 'snyk test || exit 0'
                    // bat 'type snyk-report.json'
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
