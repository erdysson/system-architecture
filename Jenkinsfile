pipeline {
    agent any

    stages {

        stage('Build Backend') {
            steps {
                sh 'cd app && npm install && npm run build'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd app-frontend && npm install && npm run build'
            }
        }
    }
}
