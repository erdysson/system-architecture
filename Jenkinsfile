pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('Build Backend') {
            steps {
                sh '''
                    cd app
                    docker build -t nest_app .
                    docker run nest_app -p 3000:3000'
                '''
            }
        }
    }
}
