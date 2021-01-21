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
                        sh('./build.sh')
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('app-frontend') {
                    script {
                        docker.build('angular_app', ' -f Dockerfile ${WORKSPACE}')
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
