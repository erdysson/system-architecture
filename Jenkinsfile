pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {

        stage('Build Frontend') {
            steps {
                dir ('app-frontend') {
                    script {
                        docker.build('angular_app', ' --no-cache -f Dockerfile .')
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('app') {
                    script {
                        docker.build('nest_app', '--no-cache -f Dockerfile .')
                    }
                }
           }
        }
    }
}
