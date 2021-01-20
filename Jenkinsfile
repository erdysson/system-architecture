pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('Build Backend') {
            steps {
                sh '''
                    docker build -f app/Dockerfile -t nest_app .
                    docker run --name nest_app-container -p 3000:3000 nest_app'
                '''`
            }
        }
    }
}
