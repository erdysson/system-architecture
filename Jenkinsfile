pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('Build Backend') {
            steps {
                dir('app') {
                    sh '''
                        docker build -t nest_app .
                        docker run --name nest_app-container -v /usr/src/angular_app_dev -p 3000:3000 nest_app'
                    '''
                }
            }
        }
    }
}
